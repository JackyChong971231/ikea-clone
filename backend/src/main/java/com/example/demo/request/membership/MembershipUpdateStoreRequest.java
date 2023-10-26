package com.example.demo.request.membership;

import com.example.demo.model.Store;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MembershipUpdateStoreRequest {
    private String signedInToken;
    private String email;
    private Store preferredStore;
}
