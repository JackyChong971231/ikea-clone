package com.example.demo.repository;

import com.example.demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
//    @Query("SELECT * FROM _product p INNER JOIN _barcode b ON p.id=b.product_id WHERE p.description LIKE :description")
    List<Product> findByDescriptionLike(String description);
}
