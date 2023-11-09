package com.example.demo.controller;

import com.example.demo.config.ServerConfig;
import com.example.demo.model.Membership;
import com.example.demo.model.Store;
import com.example.demo.service.MembershipService;
import com.example.demo.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/ikea-clone/store")
@CrossOrigin(origins = ServerConfig.crossOrigin)
public class StoreController {
    private final StoreService storeService;

    @Autowired
    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @GetMapping
    public List<Store> getStore() {
        return storeService.getStores();
    }
}
