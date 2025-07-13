package com.example.camapp.services;

import com.example.camapp.entities.Forum;

import java.util.List;

public interface IForumService {
    Forum addForum(Forum forum);
    void removeForum(Long forumId);
    List<Forum> getAllForums();
    Forum modifyForum(Forum forum);
    Forum getForumById(Long id);
}
