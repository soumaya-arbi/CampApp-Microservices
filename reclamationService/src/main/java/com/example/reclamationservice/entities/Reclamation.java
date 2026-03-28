package com.example.reclamationservice.entities;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;



@Entity
@Getter
@Setter
@Builder
public class Reclamation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sujet;


    private Date date;


    private String description;

    private Long userId; // ID de l'utilisateur

    public Reclamation() {
    }

    public Reclamation(Long id, String sujet, Date date, String description, Long userId) {
        this.id = id;
        this.sujet = sujet;
        this.date = date;
        this.description = description;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSujet() {
        return sujet;
    }

    public void setSujet(String sujet) {
        this.sujet = sujet;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
