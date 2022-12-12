package com.blog.blogappapis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog.blogappapis.entity.Comment;

public interface CommentRepo extends JpaRepository<Comment, Integer> {

}
