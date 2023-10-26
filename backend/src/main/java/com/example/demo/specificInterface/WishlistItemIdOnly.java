package com.example.demo.specificInterface;

public class WishlistItemIdOnly {
    private Integer barcodeId;
    private Integer wishlistId;

    public WishlistItemIdOnly(Integer barcodeId, Integer wishlistId) {
        this.wishlistId = wishlistId;
        this.barcodeId = barcodeId;
    }
}
