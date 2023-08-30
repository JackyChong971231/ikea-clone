package com.example.demo.controller;

import com.example.demo.model.Membership;
import com.example.demo.service.MembershipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/membership")
public class MembershipController {

    private final MembershipService membershipService;

    @Autowired
    public MembershipController(MembershipService membershipService) {
        this.membershipService = membershipService;
    }

    @GetMapping
    public List<String> getMembership() {
        return membershipService.getMemberships();
    }
}
