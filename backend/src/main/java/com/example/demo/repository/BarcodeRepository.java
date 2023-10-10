package com.example.demo.repository;

import com.example.demo.model.Barcode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BarcodeRepository extends JpaRepository<Barcode, Integer> {

    List<Barcode> findByProductDescriptionLikeOrderByProductProductId(String description);
}
