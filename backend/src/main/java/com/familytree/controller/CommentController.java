package com.familytree.controller;

import com.familytree.dto.CommentDTO;
import com.familytree.service.CommentService;
import com.familytree.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<CommentDTO>> getCommentsForUser(@PathVariable Long userId) {
        try {
            List<CommentDTO> comments = commentService.getCommentsForUser(userId);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<CommentDTO> addComment(
            @RequestBody Map<String, Object> request,
            Authentication authentication) {
        try {
            String phone = authentication.getName();
            Long authorId = userService.getUserByPhone(phone).getId();
            Long userId = Long.valueOf(request.get("userId").toString());
            String content = request.get("content").toString();
            
            CommentDTO comment = commentService.addComment(authorId, userId, content);
            return ResponseEntity.ok(comment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long commentId,
            Authentication authentication) {
        try {
            String phone = authentication.getName();
            Long authorId = userService.getUserByPhone(phone).getId();
            commentService.deleteComment(commentId, authorId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
