package com.example.demo.request.membership;

import com.example.demo.response.membership.SignInMembershipResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MembershipUpdateRequest {
    private SignInMembershipResponse localStorageUserDetail;
    private String columnName;
}
