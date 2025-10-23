package com.familytree.dto;

import java.time.LocalDateTime;

public class RelationDTO {
    private Long id;
    private UserDTO parent;
    private UserDTO child;
    private String relationType;
    private LocalDateTime createdAt;

    // Constructors
    public RelationDTO() {}

    public RelationDTO(Long id, UserDTO parent, UserDTO child, String relationType, LocalDateTime createdAt) {
        this.id = id;
        this.parent = parent;
        this.child = child;
        this.relationType = relationType;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserDTO getParent() {
        return parent;
    }

    public void setParent(UserDTO parent) {
        this.parent = parent;
    }

    public UserDTO getChild() {
        return child;
    }

    public void setChild(UserDTO child) {
        this.child = child;
    }

    public String getRelationType() {
        return relationType;
    }

    public void setRelationType(String relationType) {
        this.relationType = relationType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
