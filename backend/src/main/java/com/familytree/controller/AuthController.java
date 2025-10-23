package com.familytree.controller;

import com.familytree.dto.AuthResponse;
import com.familytree.dto.LoginRequest;
import com.familytree.dto.RegisterRequest;
import com.familytree.dto.UserDTO;
import com.familytree.service.UserService;
import com.familytree.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        try {
            UserDTO user = userService.createUser(
                request.getPhone(),
                request.getName(),
                request.getPassword(),
                request.getEmail()
            );

            String token = jwtUtil.generateToken(user.getPhone());
            AuthResponse response = new AuthResponse(token, user, "User registered successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                new AuthResponse(null, null, e.getMessage())
            );
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getPhone(), request.getPassword())
            );

            UserDTO user = userService.getUserByPhone(request.getPhone());
            String token = jwtUtil.generateToken(user.getPhone());
            AuthResponse response = new AuthResponse(token, user, "Login successful");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                new AuthResponse(null, null, "Invalid credentials")
            );
        }
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(Authentication authentication) {
        try {
            String phone = authentication.getName();
            UserDTO user = userService.getUserByPhone(phone);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
