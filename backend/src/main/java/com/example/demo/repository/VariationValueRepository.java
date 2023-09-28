package com.example.demo.repository;

import com.example.demo.model.VariationValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VariationValueRepository extends JpaRepository<VariationValue, Integer> {
}
