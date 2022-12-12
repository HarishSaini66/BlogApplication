package com.blog.blogappapis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog.blogappapis.entity.Role;

public interface RoleRepo extends JpaRepository<Role, Integer> {

}
