package com.familytree.controller;

import com.familytree.dto.AddRelationRequest;
import com.familytree.dto.RelationDTO;
import com.familytree.service.RelationService;
import com.familytree.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/relationships")
@CrossOrigin(origins = "*")
public class RelationController {

    @Autowired
    private RelationService relationService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<RelationDTO>> getUserRelations(Authentication authentication) {
        try {
            String phone = authentication.getName();
            Long userId = userService.getUserByPhone(phone).getId();
            List<RelationDTO> relations = relationService.getUserRelations(userId);
            return ResponseEntity.ok(relations);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<RelationDTO> addRelation(
            @Valid @RequestBody AddRelationRequest request,
            Authentication authentication) {
        try {
            String phone = authentication.getName();
            Long userId = userService.getUserByPhone(phone).getId();
            RelationDTO relation = relationService.addRelation(
                userId,
                request.getRelatedUserId(),
                request.getRelationType()
            );
            return ResponseEntity.ok(relation);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{relationId}")
    public ResponseEntity<Void> deleteRelation(
            @PathVariable Long relationId,
            Authentication authentication) {
        try {
            String phone = authentication.getName();
            Long userId = userService.getUserByPhone(phone).getId();
            relationService.deleteRelation(relationId, userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
