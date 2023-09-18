package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_membership")
public class Membership implements UserDetails {
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
    private String postalCode;

    @ManyToOne
    @JoinColumn(name = "preferred_store_id")
    private Store preferredStore;

    private String promotionConsent;

    @Column(nullable = false)
    private boolean isReadConsentId0;
    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
