package com.example.demo.specificInterface;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class WishlistItemIdOnly {
    private Integer barcodeId;
    private Integer wishlistId;
}
