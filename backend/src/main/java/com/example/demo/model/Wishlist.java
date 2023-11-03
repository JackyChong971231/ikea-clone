package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_wishlist")
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer wishlistId;

    @Column(nullable = false)
    private String wishlistName;

    @ManyToOne
    @JoinColumn(name = "membership_id")
    private Membership membership;
    private LocalDateTime lastUpdate;
}
