package com.example.campapp.controllers;

import com.example.campapp.UserEventProducer;
import com.example.campapp.dto.AuthenticationResponse;
import com.example.campapp.dto.ResetPasswordRequest;
import com.example.campapp.entities.User;
import com.example.campapp.services.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AuthenticationController {

    private final AuthenticationService authService;
    private final UserEventProducer userEventProducer;
    public AuthenticationController(AuthenticationService authService  ,UserEventProducer userEventProducer) {
        this.authService = authService; this.userEventProducer = userEventProducer;
    }
    @PostMapping("/someAction")
    public ResponseEntity<?> someAction() {
        Integer currentUserId = authService.getCurrentUserId();

        // envoyer l'ID au MS reservation via RabbitMQ
        userEventProducer.sendUserId(currentUserId);

        // faire d'autres actions

        return ResponseEntity.ok("Action done");
    }
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return authService.getAllUsers();
    }
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody User request
            ) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User request) {
        AuthenticationResponse response = authService.authenticate(request);

        // Vérifie que l'authentification a réussi et qu'un ID est retourné
        if (response.getId() != null && response.getToken() != null) {
            // Envoie l'ID à RabbitMQ
            userEventProducer.sendUserId(response.getId());
        }

        return ResponseEntity.ok(response);
    }

    @PutMapping("/updateProfile")
    public ResponseEntity<AuthenticationResponse> updateProfile(@RequestBody User request) {
        return ResponseEntity.ok(authService.updateUserProfile(request));
    }
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        boolean result = authService.resetPassword(request.getUsername(), request.getNewPassword());
        if (result) {
            return ResponseEntity.ok("Password successfully reset");
        } else {

            return ResponseEntity.ok("Password reset failed");
        }
    }


}
