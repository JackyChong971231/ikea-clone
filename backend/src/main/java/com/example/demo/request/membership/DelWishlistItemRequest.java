package com.example.demo.request.membership;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DelWishlistItemRequest {
    private String email;
    private Integer barcodeId;
    private Integer wishlistId;
}
