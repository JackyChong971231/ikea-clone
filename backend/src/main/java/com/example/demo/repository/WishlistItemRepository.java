package com.example.demo.repository;

import com.example.demo.model.Barcode;
import com.example.demo.model.Membership;
import com.example.demo.model.Wishlist;
import com.example.demo.model.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishlistItemRepository extends JpaRepository<WishlistItem, Integer> {

    List<WishlistItem> findBarcodeByWishlistMembership(Membership membership);
    List<WishlistItem> findBarcodeByWishlistMembershipAndWishlistWishlistId(Membership membership, Integer wishlistId);

    WishlistItem findByBarcodeBarcodeIdAndWishlistWishlistId(Integer barcodeId, Integer wishlistId);
}
