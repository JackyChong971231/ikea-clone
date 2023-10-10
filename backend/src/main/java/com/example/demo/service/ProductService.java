package com.example.demo.service;

import com.example.demo.model.Barcode;
import com.example.demo.model.Product;
import com.example.demo.repository.BarcodeRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.response.error.GeneralResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final BarcodeRepository barcodeRepository;

    public Object getAllProducts () {
        List<Product> allProducts = productRepository.findAll();
        return allProducts;
    }

    public Object searchProductsByKeyword(String keyword) {
        String keywordQuery = keyword.substring(0, keyword.length() - 1).substring(1);
//        List<Product> products = productRepository.findByDescriptionLike("%"+keywordQuery+"%");
        List<Barcode> barcodes = barcodeRepository.findByProductDescriptionLikeOrderByProductProductId("%"+keywordQuery+"%");
        var response = new GeneralResponse(GeneralResponse.CODE_0000_NO_ERROR);
        response.setData(barcodes);
        return response;
    }
}
