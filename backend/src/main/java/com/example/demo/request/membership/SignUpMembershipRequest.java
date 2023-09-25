package com.example.demo.request.membership;

import com.example.demo.request.address.NewAddressRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpMembershipRequest {
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private String postalCode;
    private String phone;
    private String email;
    private String passwordHash;
    private Integer preferredStoreId;
    private String promotionConsent;
    private Boolean isReadConsentId0;
    private Integer role;

    private NewAddressRequest newAddressRequest;
}
