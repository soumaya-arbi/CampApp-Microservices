package com.example.reclamationservice.services;

import com.example.reclamationservice.entities.Reclamation;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface IReclamationService {
    Reclamation addReclamation(Reclamation r);
    void removeReclamation(Long id);
    List<Reclamation> getAllReclamations();
    Reclamation modifyReclamation(Reclamation r);
    List<Reclamation> getReclamationsByDate(Date date);
    Optional<Reclamation> getReclamationById(Long id);
    Map<String, Long> countBySujet();
}