package com.familytree.repository;

import com.familytree.entity.Relation;
import com.familytree.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RelationRepository extends JpaRepository<Relation, Long> {
    List<Relation> findByParent(User parent);
    
    List<Relation> findByChild(User child);
    
    @Query("SELECT r FROM Relation r WHERE r.parent = :user OR r.child = :user")
    List<Relation> findByUser(@Param("user") User user);
    
    @Query("SELECT r FROM Relation r WHERE (r.parent = :user1 AND r.child = :user2) OR (r.parent = :user2 AND r.child = :user1)")
    List<Relation> findRelationsBetweenUsers(@Param("user1") User user1, @Param("user2") User user2);
    
    boolean existsByParentAndChildAndRelationType(User parent, User child, String relationType);
}
