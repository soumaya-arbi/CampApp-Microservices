package com.example.camapp.services;

import com.example.camapp.entities.Forum;
import com.example.camapp.repositories.ForumRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class ForumServiceImpl implements IForumService {
    private final ForumRepository forumRepository;

    @Override
    public Forum addForum(Forum forum) {
        log.info("Tentative d'ajout du forum: {}", forum);
        Forum savedForum = forumRepository.save(forum);
        log.info("Forum sauvegardé avec succès: {}", savedForum);
        return savedForum;
    }

    @Override
    public void removeForum(Long forumId) {
        forumRepository.deleteById(forumId);
    }

    @Override
    public List<Forum> getAllForums() {
        return forumRepository.findAll();
    }

    @Override
    public Forum modifyForum(Forum forum) {
        log.info("Tentative de modification du forum: {}", forum);
        Forum updatedForum = forumRepository.save(forum);
        log.info("Forum modifié avec succès: {}", updatedForum);
        return updatedForum;
    }

    @Override
    public Forum getForumById(Long id) {
        return forumRepository.findById(id).orElse(null);
    }
}
