package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_productCategory")
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productCategoryId;

    @Column(nullable = false)
    private String categoryName;

    @ManyToOne
    @JoinColumn(name = "parent_product_category_id")
    private ProductCategory parentProductCategory;
}
