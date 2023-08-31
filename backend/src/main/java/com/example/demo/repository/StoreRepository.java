package com.example.demo.repository;

import com.example.demo.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, Integer> {
    Store findByDisplayName(String displayName);
}
