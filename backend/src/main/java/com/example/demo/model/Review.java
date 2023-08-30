package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reviewId;

    @ManyToOne
    @JoinColumn(name = "membership_id")
    private Membership membership;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(nullable = false)
    private LocalDate createdAt;
    @Column(nullable = false)
    private String reviewTitle;
    @Column(nullable = false)
    private Integer assemblyRating;
    @Column(nullable = false)
    private Integer priceRating;
    @Column(nullable = false)
    private Integer qualityRating;
    @Column(nullable = false)
    private Integer outlookRating;
    @Column(nullable = false)
    private Integer expectationRating;
    private String comment;

    @ManyToOne
    @JoinColumn(name = "which_consent_id_accepted")
    private Consent whichConsentAccepted;
}
