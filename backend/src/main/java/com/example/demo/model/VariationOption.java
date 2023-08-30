package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_variationOption")
public class VariationOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer variationOptionId;

    @Column(nullable = false)
    private String optionName;
}
