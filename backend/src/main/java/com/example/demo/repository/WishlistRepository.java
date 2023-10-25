package com.example.demo.repository;

import com.example.demo.model.Membership;
import com.example.demo.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {
    List<Wishlist> findByMembership(Membership membership);
}
