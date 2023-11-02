package com.example.demo.request.membership;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateWishlistRequest {
    private String signedInToken;
    private String email;
    private String wishlistName;
}
