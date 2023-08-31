package com.example.demo.request.membership;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewMembershipRequest {
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private String phone;
    private String email;
    private String passwordHash;
    private Integer preferredStoreId;
    private Integer promotionConsent;
    private Boolean isReadConsentId0;
    private Integer role;
}
