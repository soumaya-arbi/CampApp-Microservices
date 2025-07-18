package com.example.campapp.services;

import com.example.campapp.UserEventProducer;
import com.example.campapp.dto.AuthenticationResponse;
import com.example.campapp.entities.Token;
import com.example.campapp.entities.User;
import com.example.campapp.repositories.TokenRepository;
import com.example.campapp.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final AuthenticationManager authenticationManager;
    private final UserEventProducer userEventProducer;

    public AuthenticationService(UserRepository repository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 TokenRepository tokenRepository,
                                 AuthenticationManager authenticationManager,
                                 UserEventProducer userEventProducer) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.authenticationManager = authenticationManager;
        this.userEventProducer = userEventProducer;
    }

    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public AuthenticationResponse register(User request) {
        if (repository.findByUsername(request.getUsername()).isPresent()) {
            return new AuthenticationResponse(null, "User already exists", null, null, null, null, null, null);
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user = repository.save(user);

        String jwt = jwtService.generateToken(user);
        saveUserToken(jwt, user);

        return new AuthenticationResponse(jwt, "User registration was successful",
                user.getRole().name(), user.getUsername(), user.getFirstName(),
                user.getLastName(), null, user.getId());
    }

    public AuthenticationResponse authenticate(User request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (Exception e) {
            return new AuthenticationResponse(null, "Invalid username or password",
                    null, null, null, null, null, null);
        }

        User user = repository.findByUsername(request.getUsername()).orElseThrow();
        String jwt = jwtService.generateToken(user);

        revokeAllTokenByUser(user);
        saveUserToken(jwt, user);

        // ✅ Envoi automatique de l'ID vers RabbitMQ après login
        userEventProducer.sendUserId(user.getId());

        return new AuthenticationResponse(jwt, "User login was successful",
                user.getRole().name(), user.getUsername(), user.getFirstName(),
                user.getLastName(), null, user.getId());
    }

    public Integer getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User currentUser = repository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));

        return currentUser.getId();
    }

    public AuthenticationResponse updateUserProfile(User updatedUser) {
        Integer id = updatedUser.getId();

        User userToUpdate = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));

        userToUpdate.setFirstName(updatedUser.getFirstName());
        userToUpdate.setLastName(updatedUser.getLastName());
        userToUpdate.setUsername(updatedUser.getUsername());
        userToUpdate.setPassword(passwordEncoder.encode(updatedUser.getPassword()));

        User updatedUserEntity = repository.save(userToUpdate);
        String jwt = jwtService.generateToken(updatedUserEntity);

        revokeAllTokenByUser(updatedUserEntity);
        saveUserToken(jwt, updatedUserEntity);

        return new AuthenticationResponse(jwt, "User profile updated successfully",
                updatedUserEntity.getRole().name(), updatedUserEntity.getUsername(),
                updatedUserEntity.getFirstName(), updatedUserEntity.getLastName(),
                null, updatedUserEntity.getId());
    }

    private void revokeAllTokenByUser(User user) {
        List<Token> validTokens = tokenRepository.findAllTokensByUser(user.getId());
        if (validTokens.isEmpty()) return;

        validTokens.forEach(t -> t.setLoggedOut(true));
        tokenRepository.saveAll(validTokens);
    }

    private void saveUserToken(String jwt, User user) {
        Token token = new Token();
        token.setToken(jwt);
        token.setLoggedOut(false);
        token.setUser(user);
        tokenRepository.save(token);
    }

    public boolean resetPassword(String username, String newPassword) {
        Optional<User> userOptional = repository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            repository.save(user);
            return true;
        } else {
            return false;
        }
    }
}
