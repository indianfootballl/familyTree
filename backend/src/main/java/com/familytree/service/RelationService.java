package com.familytree.service;

import com.familytree.dto.RelationDTO;
import com.familytree.dto.UserDTO;
import com.familytree.entity.Relation;
import com.familytree.entity.User;
import com.familytree.repository.RelationRepository;
import com.familytree.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RelationService {

    @Autowired
    private RelationRepository relationRepository;

    @Autowired
    private UserRepository userRepository;

    public List<RelationDTO> getUserRelations(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Relation> relations = relationRepository.findByUser(user);
        return relations.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public RelationDTO addRelation(Long userId, Long relatedUserId, String relationType) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        User relatedUser = userRepository.findById(relatedUserId)
                .orElseThrow(() -> new RuntimeException("Related user not found"));

        // Check if relation already exists
        if (relationRepository.existsByParentAndChildAndRelationType(user, relatedUser, relationType)) {
            throw new RuntimeException("Relation already exists");
        }

        Relation relation = new Relation(user, relatedUser, relationType);
        Relation savedRelation = relationRepository.save(relation);
        return convertToDTO(savedRelation);
    }

    public void deleteRelation(Long relationId, Long userId) {
        Relation relation = relationRepository.findById(relationId)
                .orElseThrow(() -> new RuntimeException("Relation not found"));

        // Check if user is authorized to delete this relation
        if (!relation.getParent().getId().equals(userId) && !relation.getChild().getId().equals(userId)) {
            throw new RuntimeException("Not authorized to delete this relation");
        }

        relationRepository.delete(relation);
    }

    private RelationDTO convertToDTO(Relation relation) {
        UserDTO parentDTO = new UserDTO(
                relation.getParent().getId(),
                relation.getParent().getPhone(),
                relation.getParent().getName(),
                relation.getParent().getEmail(),
                relation.getParent().getProfilePhoto(),
                relation.getParent().getBio()
        );

        UserDTO childDTO = new UserDTO(
                relation.getChild().getId(),
                relation.getChild().getPhone(),
                relation.getChild().getName(),
                relation.getChild().getEmail(),
                relation.getChild().getProfilePhoto(),
                relation.getChild().getBio()
        );

        return new RelationDTO(
                relation.getId(),
                parentDTO,
                childDTO,
                relation.getRelationType(),
                relation.getCreatedAt()
        );
    }
}
