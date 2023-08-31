package com.example.demo.repository;

import com.example.demo.model.Membership;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MembershipRepository extends JpaRepository<Membership, Integer> {

    Optional<Membership> findByEmail(String email);

}
