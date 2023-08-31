package com.example.demo.service;

import com.example.demo.auth.AuthenticationRequest;
import com.example.demo.auth.AuthenticationResponse;
import com.example.demo.auth.RegisterRequest;
import com.example.demo.model.Membership;
import com.example.demo.model.Role;
import com.example.demo.repository.ConsentRepository;
import com.example.demo.repository.MembershipRepository;
import com.example.demo.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final MembershipRepository membershipRepository;
    private final StoreRepository storeRepository;
    private final ConsentRepository consentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = Membership.builder()
                .firstName(request.getFirstname())
                .lastName(request.getLastname())
                .dateOfBirth(request.getDob())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .preferredStore(storeRepository.findByDisplayName("North York"))
                .isReadConsentId0(true)
                .role(Role.CUSTOMER)
                .build();
        membershipRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = membershipRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
