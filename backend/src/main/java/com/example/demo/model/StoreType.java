package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_storeType")
public class StoreType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer storeTypeId;

    @Column(nullable = false)
    private String typeName;
}
