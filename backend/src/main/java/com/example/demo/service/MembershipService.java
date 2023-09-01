package com.example.demo.service;

import com.example.demo.model.Membership;
import com.example.demo.model.Role;
import com.example.demo.repository.ConsentRepository;
import com.example.demo.repository.MembershipRepository;
import com.example.demo.repository.StoreRepository;
import com.example.demo.request.membership.SignUpMembershipRequest;
import com.example.demo.request.membership.SignInMembershipRequest;
import com.example.demo.response.membership.SignInMembershipResponse;
import com.example.demo.response.membership.SignUpMembershipResponse;
import com.example.demo.response.error.ErrorResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MembershipService {

    private final MembershipRepository membershipRepository;
    private final StoreRepository storeRepository;
    private final ConsentRepository consentRepository;
    private final JwtService jwtService;

    public List<Membership> getMemberships() {
        return membershipRepository.findAll();
    }

    public Object addNewMembership(SignUpMembershipRequest request) {
        Optional<Membership> membershipOptional = membershipRepository.findByEmail(request.getEmail());
        if (membershipOptional.isPresent()) {
            return new ErrorResponse(ErrorResponse.CODE_0001_EMAIL_TAKEN);
        }
        var membership = Membership.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .dateOfBirth(request.getDateOfBirth())
                .phone(request.getPhone())
                .email(request.getEmail())
                .passwordHash(request.getPasswordHash())
                .preferredStore(storeRepository.findById(request.getPreferredStoreId())
                        .orElseThrow(() -> new EntityNotFoundException("Store id not found")))
                .promotionConsent(consentRepository.findById(request.getPromotionConsent())
                        .orElseThrow(() -> new EntityNotFoundException("Promotion Consent id not found")))
                .isReadConsentId0(request.getIsReadConsentId0())
                .role(Role.CUSTOMER)
                .build();
        membershipRepository.save(membership);
        var jwtToken = jwtService.generateToken(membership);
        return SignUpMembershipResponse.builder()
                .SignedInToken(jwtToken)
                .build();
    }

    public Object signIn(SignInMembershipRequest request) {
        Optional<Membership> membershipOptional = membershipRepository.findByEmail(request.getEmail());
        // Check whether email exists
        if (membershipOptional.isPresent()) {
            var requestPasswordHash = request.getPasswordHash();
            var databasePasswordHash =   membershipOptional.get().getPasswordHash();
            if (requestPasswordHash.equals(databasePasswordHash)) {
                var jwtToken = jwtService.generateToken(membershipOptional.get());
                return SignInMembershipResponse.builder()
                        .SignedInToken(jwtToken)
                        .build();
            } else {
                return new ErrorResponse(ErrorResponse.CODE_0003_EMAIL_OR_PW_INVALID);
            }

        } else {
            return new ErrorResponse(ErrorResponse.CODE_0002_USER_NOT_FOUND);
        }
    }
}
