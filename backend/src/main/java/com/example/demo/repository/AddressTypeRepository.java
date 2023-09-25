package com.example.demo.repository;

import com.example.demo.model.AddressType;
import com.example.demo.model.Membership;
import com.example.demo.model.Store;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AddressTypeRepository extends JpaRepository<AddressType, Integer> {
}
