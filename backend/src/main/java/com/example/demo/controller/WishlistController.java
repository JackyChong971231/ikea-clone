package com.example.demo.controller;

import com.example.demo.request.membership.AddWishlistItemRequest;
import com.example.demo.service.MembershipService;
import com.example.demo.service.StoreService;
import com.example.demo.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/ikea-clone/wishlist")
@CrossOrigin(origins = "http://localhost:3000")
public class WishlistController {
    private final WishlistService wishlistService;

    @Autowired
    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @PostMapping("/addWishlistItem")
    public ResponseEntity<Object> addWishlistItem (
            @RequestBody AddWishlistItemRequest request
    ) {
        return ResponseEntity.ok(wishlistService.addWishlistItem(request));
    }
}