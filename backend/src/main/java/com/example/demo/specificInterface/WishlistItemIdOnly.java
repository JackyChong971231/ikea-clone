package com.example.demo.specificInterface;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WishlistItemIdOnly {
    private Integer barcodeId;
    private Integer wishlistId;


}
