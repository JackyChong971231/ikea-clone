package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_inventory")
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer inventoryId;

    @ManyToOne
    @JoinColumn(name = "barcode_id")
    private Barcode barcode;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    @Column(nullable = false)
    private Integer clickNCollectQuantity;
    @Column(nullable = false)
    private Integer storeQuantity;
}
