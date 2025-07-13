package com.example.camapp.controllers;

import com.example.camapp.entities.Forum;
import com.example.camapp.services.IForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forums")
public class ForumController {

    private final IForumService forumService;

    @Autowired
    public ForumController(IForumService forumService) {
        this.forumService = forumService;
    }

    @PostMapping("/add-forum")
    public ResponseEntity<Forum> addForum(@RequestBody Forum forum) {
        try {
            Forum savedForum = forumService.addForum(forum);
            return ResponseEntity.ok(savedForum);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeForum(@PathVariable Long id) {
        forumService.removeForum(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public List<Forum> getAllForums() {
        return forumService.getAllForums();
    }

    @PutMapping("/modify-forum")
    public ResponseEntity<Forum> modifyForum(@RequestBody Forum forum) {
        System.out.println("=== MODIFICATION FORUM ===");
        System.out.println("Forum reçu: " + forum);
        System.out.println("ID: " + forum.getIdForum());
        System.out.println("Sujet: " + forum.getSujet());
        System.out.println("Message: " + forum.getMessage());
        
        try {
            Forum updatedForum = forumService.modifyForum(forum);
            System.out.println("Forum modifié avec succès: " + updatedForum);
            return ResponseEntity.ok(updatedForum);
        } catch (Exception e) {
            System.err.println("Erreur lors de la modification: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Forum> getForumById(@PathVariable Long id) {
        Forum forum = forumService.getForumById(id);
        if (forum != null) {
            return ResponseEntity.ok(forum);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
