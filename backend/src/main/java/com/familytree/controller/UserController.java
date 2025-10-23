package com.familytree.controller;

import com.familytree.dto.UserDTO;
import com.familytree.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getProfile(Authentication authentication) {
        try {
            String phone = authentication.getName();
            UserDTO user = userService.getUserByPhone(phone);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<UserDTO> updateProfile(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String bio,
            @RequestParam(required = false) MultipartFile profilePhoto,
            Authentication authentication) {
        try {
            String phone = authentication.getName();
            UserDTO currentUser = userService.getUserByPhone(phone);
            
            // Handle file upload (simplified - in production, save to cloud storage)
            String profilePhotoUrl = null;
            if (profilePhoto != null && !profilePhoto.isEmpty()) {
                // For demo purposes, just use a placeholder URL
                profilePhotoUrl = "/uploads/" + System.currentTimeMillis() + "_" + profilePhoto.getOriginalFilename();
            }

            UserDTO updatedUser = userService.updateUser(
                currentUser.getId(),
                name,
                email,
                bio,
                profilePhotoUrl
            );
            
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDTO>> searchUsers(
            @RequestParam String q,
            Authentication authentication) {
        try {
            String phone = authentication.getName();
            UserDTO currentUser = userService.getUserByPhone(phone);
            List<UserDTO> users = userService.searchUsers(q, currentUser.getId());
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
