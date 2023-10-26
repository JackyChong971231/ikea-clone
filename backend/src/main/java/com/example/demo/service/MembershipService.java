package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import com.example.demo.request.membership.*;
import com.example.demo.response.membership.SignInMembershipResponse;
import com.example.demo.response.error.GeneralResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MembershipService {

    private final MembershipRepository membershipRepository;
    private final StoreRepository storeRepository;
    private final AddressTypeRepository addressTypeRepository;
    private final AddressRepository addressRepository;
    private final WishlistRepository wishlistRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private final AddressService addressService;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public List<Membership> getMemberships() {
        return membershipRepository.findAll();
    }

    private Wishlist createDefaultWishlist(Membership membership) {
        Wishlist wishlist = Wishlist.builder()
                .membership(membership)
                .wishlistName("My list")
                .build();
        wishlistRepository.save(wishlist);
        return wishlist;
    }

    public Object addNewMembership(SignUpMembershipRequest request) {
        Optional<Membership> membershipOptional = membershipRepository.findByEmail(request.getEmail());
        if (membershipOptional.isPresent()) {
            return new GeneralResponse(GeneralResponse.CODE_0001_EMAIL_TAKEN);
        }
        System.out.println(request); //debug purposes
        var membership = Membership.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .dateOfBirth(request.getDateOfBirth())
                .postalCode(request.getPostalCode())
                .phone(request.getPhone())
                .email(request.getEmail())
                .passwordHash(request.getPasswordHash())
                .preferredStore(storeRepository.findById(request.getPreferredStoreId())
                        .orElseThrow(() -> new EntityNotFoundException("Store id not found")))
                .promotionConsent(request.getPromotionConsent())
                .isReadConsentId0(request.getIsReadConsentId0())
                .role(Role.CUSTOMER)
                .build();
        var membershipJustAdded = membershipRepository.save(membership);
//        Wishlist wishlist = createDefaultWishlist(membershipJustAdded);
//        Map<Wishlist, List<WishlistItem>> wishlistMap = new HashMap<>();
//        wishlistMap.put(wishlist.getWishlistId(), defaultWishlistContent);
        var jwtToken = jwtService.generateToken(membership);
        var addressTypeForMembershipSignUp = addressTypeRepository.findByTypeName("shipping");
        addressService.addNewAddress(request.getNewAddressRequest(), membershipJustAdded, addressTypeForMembershipSignUp);
        var response = new GeneralResponse(GeneralResponse.CODE_0000_NO_ERROR);
        response.setData(
                SignInMembershipResponse.builder()
                        .signedInToken(jwtToken)
                        .membershipId(membership.getMembershipId())
                        .firstName(membership.getFirstName())
                        .lastName(membership.getLastName())
                        .email(membership.getEmail())
                        .postalCode(membership.getPostalCode())
                        .preferredStore(membership.getPreferredStore())
//                        .wishlists(wishlistMap)
                        .build()
        );
        return response;
    }

    public Object signIn(SignInMembershipRequest request) {
        System.out.println(request);
        Optional<Membership> membershipOptional = membershipRepository.findByEmail(request.getEmail());
        // Check whether email exists
        if (membershipOptional.isPresent()) {
            var requestPasswordHash = request.getPasswordHash();
            var databasePasswordHash =   membershipOptional.get().getPasswordHash();
            if (requestPasswordHash.equals(databasePasswordHash)) {
                var jwtToken = jwtService.generateToken(membershipOptional.get());
                List<WishlistItem> wishlistItems = wishlistItemRepository.findBarcodeByWishlistMembership(membershipOptional.get());
                List<Wishlist> wishlists = wishlistRepository.findByMembership(membershipOptional.get());
                var response = new GeneralResponse(GeneralResponse.CODE_0000_NO_ERROR);
                response.setData(
                        SignInMembershipResponse.builder()
                                .signedInToken(jwtToken)
                                .membershipId(membershipOptional.get().getMembershipId())
                                .firstName(membershipOptional.get().getFirstName())
                                .lastName(membershipOptional.get().getLastName())
                                .email(membershipOptional.get().getEmail())
                                .postalCode(membershipOptional.get().getPostalCode())
                                .preferredStore(membershipOptional.get().getPreferredStore())
                                .wishlistItems(wishlistItems)
                                .wishlists(wishlists)
                                .build()
                );
                return response;
            } else {
                return new GeneralResponse(GeneralResponse.CODE_0003_EMAIL_OR_PW_INVALID);
            }

        } else {
            return new GeneralResponse(GeneralResponse.CODE_0002_USER_NOT_FOUND);
        }
    }

    // userDetail structure will be same as the sign-in response
    public Object updateMembershipPostalCode(MembershipUpdatePostalCodeRequest request) {
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(request.getEmail());
        if ( jwtService.isTokenValid(request.getSignedInToken(), userDetails) ) {
            Optional<Membership> membershipOptional = membershipRepository.findByEmail(request.getEmail());
            // Check whether email exists
            if (membershipOptional.isPresent()) {
                var response = new GeneralResponse(GeneralResponse.CODE_0000_NO_ERROR);
                Map<String, String> changes = new HashMap<>();
                Membership membership = membershipOptional.get();
                membership.setPostalCode(request.getPostalCode());
                changes.put("Postal Code", request.getPostalCode());
                membershipRepository.save(membership);
                response.setData(changes);
                return response;
            }
        } else {
            return new GeneralResponse(GeneralResponse.CODE_0004_INVALID_TOKEN);
        }
        return new GeneralResponse(GeneralResponse.CODE_9999_UNKNOWN_ERROR);
    }

    public Object updateMembershipStore(MembershipUpdateStoreRequest request) {
        System.out.println(request);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(request.getEmail());
        if ( jwtService.isTokenValid(request.getSignedInToken(), userDetails) ) {
            Optional<Membership> membershipOptional = membershipRepository.findByEmail(request.getEmail());
            // Check whether email exists
            if (membershipOptional.isPresent()) {
                var response = new GeneralResponse(GeneralResponse.CODE_0000_NO_ERROR);
                Map<String, String> changes = new HashMap<>();
                Membership membership = membershipOptional.get();
                membership.setPreferredStore(request.getPreferredStore());
                changes.put("Preferred Store", request.getPreferredStore().getDisplayName());
                membershipRepository.save(membership);
                response.setData(changes);
                return response;
            }
        } else {
            return new GeneralResponse(GeneralResponse.CODE_0004_INVALID_TOKEN);
        }
        return new GeneralResponse(GeneralResponse.CODE_9999_UNKNOWN_ERROR);
    }
}
