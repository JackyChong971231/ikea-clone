package com.example.demo.repository;

import com.example.demo.model.StoreType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreTypeRepository extends JpaRepository<StoreType, Integer> {
}
