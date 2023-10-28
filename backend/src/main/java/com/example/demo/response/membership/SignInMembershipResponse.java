package com.example.demo.response.membership;

import com.example.demo.model.Store;
import com.example.demo.model.Wishlist;
import com.example.demo.model.WishlistItem;
import com.example.demo.specificInterface.BarcodeOnly;
import com.example.demo.specificInterface.WishlistItemIdOnly;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignInMembershipResponse {
    private String signedInToken;
    private Integer membershipId;
    private String firstName;
    private String lastName;
    private String email;
    private String postalCode;
    private Store preferredStore;
    private List<WishlistItemIdOnly> wishlistItems;
    private List<Wishlist> wishlists;
    private Object cart;
}
