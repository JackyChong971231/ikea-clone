package com.example.demo.controller;

import com.example.demo.config.ServerConfig;
import com.example.demo.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/ikea-clone/product")
@CrossOrigin(origins = ServerConfig.ikeaCloneCrossOrigin, allowCredentials = "true")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping("/search")
    public ResponseEntity<Object> getProductsByDescriptionLike(
            @RequestBody String keyword
    ) {
        return ResponseEntity.ok(productService.searchProductsByKeyword(keyword));
    }
}
