package com.example.demo.request.membership;

import com.example.demo.response.membership.SignInMembershipResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MembershipUpdatePostalCodeRequest {
    private String signedInToken;
    private String email;
    private String postalCode;
}
