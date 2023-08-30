package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_membership")
public class Membership {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer membershipId;

    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    private LocalDate dateOfBirth;
    private String phone;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String passwordHash;

    @ManyToOne
    @JoinColumn(name = "preferred_store_id")
    private Store preferredStore;

    @ManyToOne
    @JoinColumn(name = "promotion_consent_id")
    private Consent promotionConsent;

    @Column(nullable = false)
    private boolean isReadConsentId0;
}
