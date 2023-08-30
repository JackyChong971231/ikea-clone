package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_addressType")
public class AddressType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer addressTypeId;

    @Column(nullable = false)
    private String typeName;
}
