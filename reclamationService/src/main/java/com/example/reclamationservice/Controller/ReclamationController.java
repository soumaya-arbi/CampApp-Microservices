package com.example.reclamationservice.Controller;


import com.example.reclamationservice.entities.Reclamation;
import com.example.reclamationservice.services.IReclamationService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reclamations")
@RequiredArgsConstructor
public class ReclamationController {

    private final IReclamationService service;

    @PostMapping
    public ResponseEntity<Reclamation> add(@RequestBody Reclamation r) {
        return ResponseEntity.ok(service.addReclamation(r));
    }

    @GetMapping
    public List<Reclamation> getAll() {
        return service.getAllReclamations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reclamation> getById(@PathVariable Long id) {
        return service.getReclamationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.removeReclamation(id);
    }

    @PutMapping
    public ResponseEntity<Reclamation> update(@RequestBody Reclamation r) {
        return ResponseEntity.ok(service.modifyReclamation(r));
    }

    @GetMapping("/by-date")
    public List<Reclamation> getByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        return service.getReclamationsByDate(date);
    }

    @GetMapping("/count-by-sujet")
    public Map<String, Long> countBySujet() {
        return service.countBySujet();
    }
}
