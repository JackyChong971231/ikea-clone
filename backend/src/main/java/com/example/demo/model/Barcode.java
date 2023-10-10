package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_barcode")
public class Barcode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer barcodeId;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "variation_1_value_id")
    private VariationValue variation1Value;

    @ManyToOne
    @JoinColumn(name = "variation_2_value_id")
    private VariationValue variation2Value;

    @ManyToOne
    @JoinColumn(name = "variation_3_value_id")
    private VariationValue variation3Value;

    @ManyToOne
    @JoinColumn(name = "variation_4_value_id")
    private VariationValue variation4Value;

    @ManyToOne
    @JoinColumn(name = "variation_5_value_id")
    private VariationValue variation5Value;

    @Lob
    private byte[] productImage;

    @Lob
    private byte[] roomImage;
    // To do: set default value to false
    private Boolean isDefaultForThumbnail;

    @Column(nullable = false)
    private BigDecimal widthCm;
    @Column(nullable = false)
    private BigDecimal depthCm;
    @Column(nullable = false)
    private BigDecimal heightCm;
    @Column(nullable = false)
    private BigDecimal weightKg;
    private BigDecimal originalPrice;
    private BigDecimal avgRating; //To-Do: update with a cron job
    private Integer numOfReviews; //To-Do: update with a cron job
}
