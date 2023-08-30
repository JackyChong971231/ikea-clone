package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_consentType")
public class ConsentType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer consentTypeId;

    @Column(nullable = false)
    private String typeName;
}
