package com.example.demo.request.membership;

import com.example.demo.model.Barcode;
import com.example.demo.model.Wishlist;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddWishlistItemRequest {
    private String email;
    private Integer barcodeId;
    private Integer wishlistId;
    private Integer quantity;
}
