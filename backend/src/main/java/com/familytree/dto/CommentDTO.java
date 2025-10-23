package com.familytree.dto;

import java.time.LocalDateTime;

public class CommentDTO {
    private Long id;
    private String content;
    private UserDTO author;
    private UserDTO user;
    private LocalDateTime createdAt;

    // Constructors
    public CommentDTO() {}

    public CommentDTO(Long id, String content, UserDTO author, UserDTO user, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.author = author;
        this.user = user;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public UserDTO getAuthor() {
        return author;
    }

    public void setAuthor(UserDTO author) {
        this.author = author;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
