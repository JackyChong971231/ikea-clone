package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_wishlistItem")
public class WishlistItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "wishlist_id")
    private Wishlist wishlist;

    @ManyToOne
    @JoinColumn(name = "barcode_id")
    private Barcode barcode;

    @Column(nullable = false)
    private Integer quantity;
}
