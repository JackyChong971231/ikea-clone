package com.example.demo.response.wishlist;

import com.example.demo.model.Wishlist;
import com.example.demo.model.WishlistItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WishlistFullDataResponse {
    private List<Wishlist> wishlists;
    private List<WishlistItem> wishlistItems;
}
