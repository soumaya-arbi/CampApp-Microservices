package com.example.campapp.dto;

public class AuthenticationResponse {
    private String token;
    private String message;
    private String role;
    private String username;
    private String firstName;
    private String lastName;
    private String password;
    private Integer id;

    // Constructeur avec id
    public AuthenticationResponse(String token, String message, String role, String username, String firstName, String lastName, String password, Integer id) {
        this.token = token;
        this.message = message;
        this.role = role;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.id = id;
    }

    // Constructeur sans id
    public AuthenticationResponse(String token, String message, String role, String username, String firstName, String lastName, String password) {
        this(token, message, role, username, firstName, lastName, password, null);
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
