package com.familytree.service;

import com.familytree.dto.UserDTO;
import com.familytree.entity.User;
import com.familytree.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        User user = userRepository.findByPhone(phone)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with phone: " + phone));
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getPhone())
                .password(user.getPassword())
                .authorities("ROLE_USER")
                .build();
    }

    public UserDTO createUser(String phone, String name, String password, String email) {
        if (userRepository.findByPhone(phone).isPresent()) {
            throw new RuntimeException("User with phone number already exists");
        }

        if (email != null && !email.isEmpty() && userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("User with email already exists");
        }

        User user = new User();
        user.setPhone(phone);
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));

        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }

    public UserDTO getUserByPhone(String phone) {
        User user = userRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDTO(user);
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDTO(user);
    }

    public UserDTO updateUser(Long id, String name, String email, String bio, String profilePhoto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (name != null && !name.isEmpty()) {
            user.setName(name);
        }
        if (email != null && !email.isEmpty()) {
            if (userRepository.findByEmail(email).isPresent() && !user.getEmail().equals(email)) {
                throw new RuntimeException("Email already exists");
            }
            user.setEmail(email);
        }
        if (bio != null) {
            user.setBio(bio);
        }
        if (profilePhoto != null) {
            user.setProfilePhoto(profilePhoto);
        }

        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }

    public List<UserDTO> searchUsers(String query, Long excludeUserId) {
        List<User> users;
        if (excludeUserId != null) {
            users = userRepository.searchByNameOrPhoneExcludingUser(query, excludeUserId);
        } else {
            users = userRepository.searchByNameOrPhone(query);
        }
        return users.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private UserDTO convertToDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getPhone(),
                user.getName(),
                user.getEmail(),
                user.getProfilePhoto(),
                user.getBio()
        );
    }
}
