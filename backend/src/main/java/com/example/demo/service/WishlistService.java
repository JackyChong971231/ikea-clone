package com.example.demo.service;

import com.example.demo.model.Barcode;
import com.example.demo.model.Membership;
import com.example.demo.model.WishlistItem;
import com.example.demo.repository.BarcodeRepository;
import com.example.demo.repository.MembershipRepository;
import com.example.demo.repository.WishlistItemRepository;
import com.example.demo.repository.WishlistRepository;
import com.example.demo.request.membership.AddWishlistItemRequest;
import com.example.demo.request.membership.DelWishlistItemRequest;
import com.example.demo.response.error.GeneralResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private final BarcodeRepository barcodeRepository;
    private final MembershipService membershipService;
    private final MembershipRepository membershipRepository;

    public Object addWishlistItem(AddWishlistItemRequest request) {
        WishlistItem wishlistItem = WishlistItem.builder()
                .barcode(barcodeRepository.findById(request.getBarcodeId())
                        .orElseThrow(() -> new EntityNotFoundException("Barcode id not found")))
                .wishlist(wishlistRepository.findById(request.getWishlistId())
                        .orElseThrow(() -> new EntityNotFoundException("Wishlist id not found")))
                .quantity(request.getQuantity())
                .build();
        wishlistItemRepository.save(wishlistItem);
        var response = new GeneralResponse(GeneralResponse.CODE_0000_NO_ERROR);
        Optional<Membership> membershipOptional = membershipRepository.findByEmail(request.getEmail());
        response.setData(membershipService.getUserDetail(membershipOptional.get()));
        return response;
    }

    public Object delWishlistItem(DelWishlistItemRequest request) {
        WishlistItem wishlistItem = wishlistItemRepository.findByBarcodeBarcodeIdAndWishlistWishlistId(request.getBarcodeId(), request.getWishlistId());
        wishlistItemRepository.deleteById(
                wishlistItem.getId()
        );
        var response = new GeneralResponse(GeneralResponse.CODE_0000_NO_ERROR);
        Optional<Membership> membershipOptional = membershipRepository.findByEmail(request.getEmail());
        response.setData(membershipService.getUserDetail(membershipOptional.get()));
        return response;
    }
}
