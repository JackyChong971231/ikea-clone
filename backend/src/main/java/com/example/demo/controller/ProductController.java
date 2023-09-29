package com.example.demo.controller;

import com.example.demo.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/ikea-clone/product")
@CrossOrigin(origins = "http://localhost:3000")
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
