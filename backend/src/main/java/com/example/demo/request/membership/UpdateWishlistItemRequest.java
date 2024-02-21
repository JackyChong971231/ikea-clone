package com.example.demo.request.membership;

import com.example.demo.model.WishlistItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateWishlistItemRequest {
    private Integer wishlistItemId;
    private Integer Quantity;
}
