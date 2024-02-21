package com.example.demo.controller;

import com.example.demo.config.ServerConfig;
import com.example.demo.model.Wishlist;
import com.example.demo.model.WishlistItem;
import com.example.demo.request.common.ShortUserDetail;
import com.example.demo.request.membership.AddWishlistItemRequest;
import com.example.demo.request.membership.CreateWishlistRequest;
import com.example.demo.request.membership.DelWishlistItemRequest;
import com.example.demo.request.membership.UpdateWishlistItemRequest;
import com.example.demo.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/ikea-clone/wishlist")
@CrossOrigin(origins = ServerConfig.ikeaCloneCrossOrigin, allowCredentials = "true")
public class WishlistController {
    private final WishlistService wishlistService;

    @Autowired
    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @PostMapping("/wishlistItem/add")
    public ResponseEntity<Object> addWishlistItem (
            @RequestBody AddWishlistItemRequest request
    ) {
        return ResponseEntity.ok(wishlistService.addWishlistItem(request));
    }

    @PostMapping("/wishlistItem/del")
    public ResponseEntity<Object> delWishlistItem (
            @RequestBody DelWishlistItemRequest request
    ) {
        return ResponseEntity.ok(wishlistService.delWishlistItem(request));
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createWishlist (
            @RequestBody CreateWishlistRequest request
    ) {
        return ResponseEntity.ok(wishlistService.createWishlistHandler(request));
    }

    @PostMapping("/wishlistItem/get")
    public ResponseEntity<Object> getWishlistItem (
            @RequestBody ShortUserDetail request
    ) {
        return ResponseEntity.ok(wishlistService.getWishlistItemByMembership(request));
    }

    @PostMapping("/wishlistItem/update")
    public ResponseEntity<Object> updateWishlistItem (
            @RequestBody UpdateWishlistItemRequest request
    ) {
        return ResponseEntity.ok(wishlistService.updateWishlistItem(request));
    }
}
