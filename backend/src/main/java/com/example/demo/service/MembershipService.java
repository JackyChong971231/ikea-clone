package com.example.demo.service;

import com.example.demo.model.Membership;
import com.example.demo.model.Role;
import com.example.demo.repository.ConsentRepository;
import com.example.demo.repository.MembershipRepository;
import com.example.demo.repository.StoreRepository;
import com.example.demo.request.membership.SignUpMembershipRequest;
import com.example.demo.request.membership.SignInMembershipRequest;
import com.example.demo.response.membership.SignInMembershipResponse;
import com.example.demo.response.error.GeneralResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MembershipService {

    private final MembershipRepository membershipRepository;
    private final StoreRepository storeRepository;
    private final ConsentRepository consentRepository;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public List<Membership> getMemberships() {
        return membershipRepository.findAll();
    }

    public Object addNewMembership(SignUpMembershipRequest request) {
        Optional<Membership> membershipOptional = membershipRepository.findByEmail(request.getEmail());
        if (membershipOptional.isPresent()) {
            return new GeneralResponse(GeneralResponse.CODE_0001_EMAIL_TAKEN);
        }
        System.out.println(request); //debug purposes
        var membership = Membership.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .dateOfBirth(request.getDateOfBirth())
                .postalCode(request.getPostalCode())
                .phone(request.getPhone())
                .email(request.getEmail())
                .passwordHash(request.getPasswordHash())
                .preferredStore(storeRepository.findById(request.getPreferredStoreId())
                        .orElseThrow(() -> new EntityNotFoundException("Store id not found")))
                .promotionConsent(request.getPromotionConsent())
                .isReadConsentId0(request.getIsReadConsentId0())
                .role(Role.CUSTOMER)
                .build();
        membershipRepository.save(membership);
        var jwtToken = jwtService.generateToken(membership);
        var response = new GeneralResponse(GeneralResponse.CODE_0000_NO_ERROR);
        response.setData(
                SignInMembershipResponse.builder()
                        .signedInToken(jwtToken)
                        .membershipId(membership.getMembershipId())
                        .firstName(membership.getFirstName())
                        .lastName(membership.getLastName())
                        .email(membership.getEmail())
                        .postalCode(membership.getPostalCode())
                        .preferredStore(membership.getPreferredStore())
                        .build()
        );
        return response;
    }

    public Object signIn(SignInMembershipRequest request) {
        Optional<Membership> membershipOptional = membershipRepository.findByEmail(request.getEmail());
        // Check whether email exists
        if (membershipOptional.isPresent()) {
            var requestPasswordHash = request.getPasswordHash();
            var databasePasswordHash =   membershipOptional.get().getPasswordHash();
            if (requestPasswordHash.equals(databasePasswordHash)) {
                var jwtToken = jwtService.generateToken(membershipOptional.get());
                var response = new GeneralResponse(GeneralResponse.CODE_0000_NO_ERROR);
                response.setData(
                        SignInMembershipResponse.builder()
                                .signedInToken(jwtToken)
                                .membershipId(membershipOptional.get().getMembershipId())
                                .firstName(membershipOptional.get().getFirstName())
                                .lastName(membershipOptional.get().getLastName())
                                .email(membershipOptional.get().getEmail())
                                .postalCode(membershipOptional.get().getPostalCode())
                                .preferredStore(membershipOptional.get().getPreferredStore())
                                .build()
                );
                return response;
            } else {
                return new GeneralResponse(GeneralResponse.CODE_0003_EMAIL_OR_PW_INVALID);
            }

        } else {
            return new GeneralResponse(GeneralResponse.CODE_0002_USER_NOT_FOUND);
        }
    }

    // userDetail structure will be same as the sign-in response
    public Object updateMembershipInfo(SignInMembershipResponse userDetail) {
        System.out.println(userDetail);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(userDetail.getEmail());
        if ( jwtService.isTokenValid(userDetail.getSignedInToken(), userDetails) ) {
            Optional<Membership> membershipOptional = membershipRepository.findByEmail(userDetail.getEmail());
            // Check whether email exists
            if (membershipOptional.isPresent()) {
                var response = new GeneralResponse(GeneralResponse.CODE_0000_NO_ERROR);
                Map<String, String> changes = new HashMap<>();
                Membership membership = membershipOptional.get();
                if (!userDetail.getPostalCode().equals(membership.getPostalCode())) {
                    membership.setPostalCode(userDetail.getPostalCode());
                    changes.put("Postal Code", userDetail.getPostalCode());
                }
                if (!userDetail.getPreferredStore().equals(membership.getPreferredStore())) {
                    membership.setPreferredStore(userDetail.getPreferredStore());
                    changes.put("Preferred Store", userDetail.getPreferredStore().getDisplayName());
                }
                membershipRepository.save(membership);
                response.setData(changes);
                return response;
            }
        }
        return new GeneralResponse(GeneralResponse.CODE_9999_UNKNOWN_ERROR);
    }
}
