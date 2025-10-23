package com.familytree.service;

import com.familytree.dto.CommentDTO;
import com.familytree.dto.UserDTO;
import com.familytree.entity.Comment;
import com.familytree.entity.User;
import com.familytree.repository.CommentRepository;
import com.familytree.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    public List<CommentDTO> getCommentsForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Comment> comments = commentRepository.findCommentsOnUserProfile(user);
        return comments.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public CommentDTO addComment(Long authorId, Long userId, String content) {
        User author = userRepository.findById(authorId)
                .orElseThrow(() -> new RuntimeException("Author not found"));
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = new Comment(content, author, user);
        Comment savedComment = commentRepository.save(comment);
        return convertToDTO(savedComment);
    }

    public void deleteComment(Long commentId, Long authorId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        // Check if user is authorized to delete this comment
        if (!comment.getAuthor().getId().equals(authorId)) {
            throw new RuntimeException("Not authorized to delete this comment");
        }

        commentRepository.delete(comment);
    }

    private CommentDTO convertToDTO(Comment comment) {
        UserDTO authorDTO = new UserDTO(
                comment.getAuthor().getId(),
                comment.getAuthor().getPhone(),
                comment.getAuthor().getName(),
                comment.getAuthor().getEmail(),
                comment.getAuthor().getProfilePhoto(),
                comment.getAuthor().getBio()
        );

        UserDTO userDTO = new UserDTO(
                comment.getUser().getId(),
                comment.getUser().getPhone(),
                comment.getUser().getName(),
                comment.getUser().getEmail(),
                comment.getUser().getProfilePhoto(),
                comment.getUser().getBio()
        );

        return new CommentDTO(
                comment.getId(),
                comment.getContent(),
                authorDTO,
                userDTO,
                comment.getCreatedAt()
        );
    }
}
