package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_variationValue")
public class VariationValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer variationValueId;

    @ManyToOne
    @JoinColumn(name = "variation_option_id")
    private VariationOption variationOption;

    @Column(nullable = false)
    private String value;
}
