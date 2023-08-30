package com.example.demo.service;

import com.example.demo.model.Membership;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MembershipService {
    public List<String> getMemberships() {
        return List.of(
                "hi1",
                "h2"
        );
    }
}
