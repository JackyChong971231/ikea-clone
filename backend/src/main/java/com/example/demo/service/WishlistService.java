package com.example.demo.service;

import com.example.demo.model.Membership;
import com.example.demo.model.Wishlist;
import com.example.demo.model.WishlistItem;
import com.example.demo.repository.BarcodeRepository;
import com.example.demo.repository.MembershipRepository;
import com.example.demo.repository.WishlistItemRepository;
import com.example.demo.repository.WishlistRepository;
import com.example.demo.request.common.ShortUserDetail;
import com.example.demo.request.membership.*;
import com.example.demo.response.error.GeneralResponse;
import com.example.demo.response.wishlist.WishlistFullDataResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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
        Optional<Wishlist> optionalWishlist = wishlistRepository.findById(wishlistItem.getId());
        if (optionalWishlist.isPresent()) {
            Wishlist wishlist = optionalWishlist.get();
            LocalDateTime rightNow = LocalDateTime.now();
            wishlist.setLastUpdate(rightNow);
            wishlistRepository.save(wishlist);
        }
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
        Optional<Wishlist> optionalWishlist = wishlistRepository.findById(wishlistItem.getId());
        if (optionalWishlist.isPresent()) {
            Wishlist wishlist = optionalWishlist.get();
            LocalDateTime rightNow = LocalDateTime.now();
            wishlist.setLastUpdate(rightNow);
            wishlistRepository.save(wishlist);
        }
        var response = new GeneralResponse(GeneralResponse.CODE_0000_NO_ERROR);
        Optional<Membership> membershipOptional = membershipRepository.findByEmail(request.getEmail());
        response.setData(membershipService.getUserDetail(membershipOptional.get()));
        return response;
    }

    public Object createWishlistHandler(CreateWishlistRequest request) {
        Optional<Membership> membershipOptional = membershipRepository.findByEmail(request.getEmail());
        LocalDateTime rightNow = LocalDateTime.now();
                Wishlist wishlist = Wishlist.builder()
                .membership(membershipOptional.get())
                .wishlistName(request.getWishlistName())
                .lastUpdate(rightNow)
                .build();
        wishlistRepository.save(wishlist);
        RefreshMembershipRequest refreshMembershipRequest = RefreshMembershipRequest.builder()
                .email(request.getEmail())
                .signedInToken(request.getSignedInToken())
                .build();
        return membershipService.refresh(refreshMembershipRequest);
//        Optional<Membership> membershipOptional = membershipRepository.findByEmail(request.getEmail());
//        response.setData(wishlist);
//        return response;
    }

    public Object getWishlistAndWishlistItemByMembership(GetWishlistRequest request) {
        var response = new GeneralResponse(GeneralResponse.CODE_0000_NO_ERROR);
        Optional<Membership> membershipOptional = membershipRepository.findByEmail(request.getShortUserDetail().getEmail());
        if (request.getWishlistId() instanceof java.lang.Integer) {
            Optional<Wishlist> wishlistOptional = wishlistRepository.findById(request.getWishlistId());
            List<Wishlist> wishlistList = new ArrayList<Wishlist>();
            wishlistList.add(wishlistOptional.get());
            List<WishlistItem> wishlistItemList = wishlistItemRepository.findBarcodeByWishlistMembershipAndWishlistWishlistId(membershipOptional.get(), request.getWishlistId());
            WishlistFullDataResponse wishlistFullDataResponse = WishlistFullDataResponse.builder()
                    .wishlists(wishlistList)
                    .wishlistItems(wishlistItemList)
                    .build();
            response.setData(wishlistFullDataResponse);
        } else {
            List<Wishlist> wishlistList = wishlistRepository.findByMembership(membershipOptional.get());
            List<WishlistItem> wishlistItemList = wishlistItemRepository.findBarcodeByWishlistMembership(membershipOptional.get());
            WishlistFullDataResponse wishlistFullDataResponse = WishlistFullDataResponse.builder()
                    .wishlists(wishlistList)
                    .wishlistItems(wishlistItemList)
                    .build();
            response.setData(wishlistFullDataResponse);
        }
        return response;
    }

    public Object updateWishlistItem(UpdateWishlistItemRequest request) {
        Optional<WishlistItem> wishlistItemOptional = wishlistItemRepository.findById(request.getWishlistItemId());
        if (wishlistItemOptional.isPresent()) {
            WishlistItem wishlistItem = wishlistItemOptional.get();
            wishlistItem.setQuantity(request.getQuantity());
            wishlistItemRepository.save(wishlistItem);
            var response = new GeneralResponse(GeneralResponse.CODE_0000_NO_ERROR);
            response.setData(wishlistItem);
            return response;
        } else {
            return new GeneralResponse(GeneralResponse.CODE_9999_UNKNOWN_ERROR);
        }
    }
}
