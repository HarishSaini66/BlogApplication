package com.blog.blogappapis.services;

import java.util.List;

import com.blog.blogappapis.entity.Post;
import com.blog.blogappapis.payloads.PostDto;
import com.blog.blogappapis.payloads.PostResponse;

public interface PostService {
	
	//create 
	PostDto createPost(PostDto postDto,Integer userId,Integer categoryId);
	
	//update 
	PostDto updatePost(PostDto postDto,Integer postId);
	
	//delete
	void deletePost(Integer postId);
	
	//get All post
	PostResponse getAllPost(Integer pageNumber,Integer pageSize,String sortBy,String sortDir);
	
	//get single post
	PostDto getPostById(Integer postId);
	
	//get all post by category 
	List<PostDto> getPostsByCategory(Integer categoryId);
	
	//get all post by users;
	List<PostDto> getPostsByUser(Integer userId);
	
	
	//search posts
	List<PostDto> searchPosts(String keyword);

}
