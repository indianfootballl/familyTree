package com.familytree.repository;

import com.familytree.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByPhone(String phone);
    
    Optional<User> findByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.name LIKE %:query% OR u.phone LIKE %:query%")
    List<User> searchByNameOrPhone(@Param("query") String query);
    
    @Query("SELECT u FROM User u WHERE u.id != :userId AND (u.name LIKE %:query% OR u.phone LIKE %:query%)")
    List<User> searchByNameOrPhoneExcludingUser(@Param("query") String query, @Param("userId") Long userId);
}
