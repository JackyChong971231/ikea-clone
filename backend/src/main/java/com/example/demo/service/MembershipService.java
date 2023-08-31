package com.example.demo.service;

import com.example.demo.model.Membership;
import com.example.demo.model.Role;
import com.example.demo.repository.ConsentRepository;
import com.example.demo.repository.MembershipRepository;
import com.example.demo.repository.StoreRepository;
import com.example.demo.request.membership.NewMembershipRequest;
import com.example.demo.response.error.GeneralResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MembershipService {

    private final MembershipRepository membershipRepository;
    private final StoreRepository storeRepository;
    private final ConsentRepository consentRepository;

    public List<Membership> getMemberships() {
        return membershipRepository.findAll();
    }

    public GeneralResponse addNewMembership(NewMembershipRequest request) {
        Optional<Membership> membershipOptional = membershipRepository.findByEmail(request.getEmail());
        if (membershipOptional.isPresent()) {
            return GeneralResponse.builder()
                    .errorCode("0001")
                    .responseMessage("Email Taken")
                    .build();
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
        return GeneralResponse.builder()
                .errorCode("0000")
                .responseMessage("Membership added")
                .build();
    }

    public GeneralResponse signIn(Object request) {
        return null;
    }
}
