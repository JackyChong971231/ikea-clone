package com.example.demo.repository;

import com.example.demo.model.Membership;
import com.example.demo.model.WishlistItem;
import com.example.demo.specificInterface.BarcodeOnly;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishlistItemRepository extends JpaRepository<WishlistItem, Integer> {

    List<WishlistItem> findBarcodeByWishlistMembership(Membership membership);
}
