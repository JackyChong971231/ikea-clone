package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_membership_address")
public class MembershipAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer membershipAddressId;

    @ManyToOne
    @JoinColumn(name = "membership_id")
    private Membership membership;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    private Boolean isDefault;

}
