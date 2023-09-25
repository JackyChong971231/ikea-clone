package com.example.demo.config;

import com.example.demo.repository.ConsentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DatabaseConfig {
    private final ConsentRepository consentRepository;
    
}
