package com.familytree.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AddRelationRequest {
    @NotNull(message = "Related user ID is required")
    private Long relatedUserId;
    
    @NotBlank(message = "Relation type is required")
    private String relationType;

    // Constructors
    public AddRelationRequest() {}

    public AddRelationRequest(Long relatedUserId, String relationType) {
        this.relatedUserId = relatedUserId;
        this.relationType = relationType;
    }

    // Getters and Setters
    public Long getRelatedUserId() {
        return relatedUserId;
    }

    public void setRelatedUserId(Long relatedUserId) {
        this.relatedUserId = relatedUserId;
    }

    public String getRelationType() {
        return relationType;
    }

    public void setRelationType(String relationType) {
        this.relationType = relationType;
    }
}
