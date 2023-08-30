package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderId;

    @ManyToOne
    @JoinColumn(name = "payment_method_id")
    private PaymentMethod paymentMethod;

    @ManyToOne
    @JoinColumn(name = "shipping_address_id")
    private Address shippingAddress;

    @Column(nullable = false)
    private LocalDate orderDatetime;

    @Column(nullable = false)
    private BigDecimal orderTotal;

    @ManyToOne
    @JoinColumn(name = "order_status_id")
    private OrderStatus orderStatus;
}
