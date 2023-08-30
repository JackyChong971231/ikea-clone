package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_consent")
public class Consent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer consentId;

    @ManyToOne
    @JoinColumn(name = "consent_type_id")
    private ConsentType consentType;

    @Column(nullable = false)
    private String description;
}
