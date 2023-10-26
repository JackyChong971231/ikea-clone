package com.example.demo.service;

import com.example.demo.model.WishlistItem;
import com.example.demo.repository.BarcodeRepository;
import com.example.demo.repository.WishlistItemRepository;
import com.example.demo.repository.WishlistRepository;
import com.example.demo.request.membership.AddWishlistItemRequest;
import com.example.demo.response.error.GeneralResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private final BarcodeRepository barcodeRepository;

    public Object addWishlistItem(AddWishlistItemRequest request) {
        WishlistItem wishlistItem = WishlistItem.builder()
                .barcode(barcodeRepository.findById(request.getBarcodeId())
                        .orElseThrow(() -> new EntityNotFoundException("Barcode id not found")))
                .wishlist(wishlistRepository.findById(request.getWishlistId())
                        .orElseThrow(() -> new EntityNotFoundException("Wishlist id not found")))
                .quantity(request.getQuantity())
                .build();
        wishlistItemRepository.save(wishlistItem);
        return new GeneralResponse(GeneralResponse.CODE_0000_NO_ERROR);
    }
}
