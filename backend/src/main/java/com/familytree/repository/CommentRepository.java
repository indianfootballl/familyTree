package com.familytree.repository;

import com.familytree.entity.Comment;
import com.familytree.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByUserOrderByCreatedAtDesc(User user);
    
    List<Comment> findByAuthorOrderByCreatedAtDesc(User author);
    
    @Query("SELECT c FROM Comment c WHERE c.user = :user ORDER BY c.createdAt DESC")
    List<Comment> findCommentsOnUserProfile(@Param("user") User user);
}
