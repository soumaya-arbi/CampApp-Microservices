package com.example.reclamationservice.services;


import com.example.reclamationservice.entities.Reclamation;
import com.example.reclamationservice.repositories.ReclamationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReclamationServiceImpl implements IReclamationService {

    private final ReclamationRepository repository;

    @Override
    public Reclamation addReclamation(Reclamation r) {
        return repository.save(r);
    }

    @Override
    public void removeReclamation(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<Reclamation> getAllReclamations() {
        return repository.findAll();
    }

    @Override
    public Reclamation modifyReclamation(Reclamation r) {
        return repository.save(r);
    }

    @Override
    public List<Reclamation> getReclamationsByDate(Date date) {
        return repository.findByDate(date);
    }

    @Override
    public Optional<Reclamation> getReclamationById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Map<String, Long> countBySujet() {
        return repository.findAll()
                .stream()
                .collect(Collectors.groupingBy(Reclamation::getSujet, Collectors.counting()));
    }
}