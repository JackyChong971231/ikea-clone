package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_paymentMethod")
public class PaymentMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentMethodId;

    @ManyToOne
    @JoinColumn(name = "membership_id")
    private Membership membership;

    @Column(nullable = false)
    private String accountNumber;
    @Column(nullable = false)
    private java.sql.Date expiryDate;
    @Column(nullable = false)
    private String securityCode;

    @ManyToOne
    @JoinColumn(name = "billing_address_id")
    private Address billingAddress;

    private Boolean isDefault;
}
