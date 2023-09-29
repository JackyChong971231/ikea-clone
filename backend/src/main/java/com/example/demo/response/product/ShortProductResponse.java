package com.example.demo.response.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShortProductResponse {
    private byte[] productImage;
    private byte[] roomImage;
    private String brand;
    private String description;
    private BigDecimal originalPrice;
    private BigDecimal currentPrice;
    private BigDecimal averageRating;
    private Integer numberOfReviews;
}
