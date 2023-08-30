package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;

    @ManyToOne
    @JoinColumn(name = "product_category_id")
    private ProductCategory productCategory;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    private String description;

    @ManyToOne
    @JoinColumn(name = "parent_product_id")
    private Product parentProduct;

    @Column(nullable = false)
    private boolean isForSale;

    @ManyToOne
    @JoinColumn(name = "promotion_id")
    private Promotion promotion;
}
