package com.blog.blogappapis.services.impl;

import java.util.Date;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.support.ClasspathScanningPersistenceUnitPostProcessor;

import com.blog.blogappapis.entity.Category;
import com.blog.blogappapis.entity.Post;
import com.blog.blogappapis.entity.User;
import com.blog.blogappapis.exceptions.ResourceNotFoundException;
import com.blog.blogappapis.payloads.PostDto;
import com.blog.blogappapis.payloads.PostResponse;
import com.blog.blogappapis.repository.CategoryRepo;
import com.blog.blogappapis.repository.PostRepo;
import com.blog.blogappapis.repository.UserRepo;
import com.blog.blogappapis.services.PostService;

@Service
public class PostServiceImpl implements PostService {
	
	@Autowired
	private PostRepo postRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private CategoryRepo categoryRepo;
	
	

	@Override
	public PostDto createPost(PostDto postDto,Integer userId,Integer categoryId) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(()->new ResourceNotFoundException("user", "user Id", userId));
		Category category = this.categoryRepo.findById(categoryId)
				.orElseThrow(()->new ResourceNotFoundException("category","category id",categoryId));
		
		Post pp=this.modelMapper.map(postDto, Post.class);
		pp.setImageName("default.png");
		pp.setAddedDate(new Date());
		pp.setUser(user);
		pp.setCategory(category);
		Post saveedPP = this.postRepo.save(pp);
		
		return this.modelMapper.map(saveedPP, PostDto.class);
	}

	@Override
	public PostDto updatePost(PostDto postDto, Integer postId) {
		Post post  = this.postRepo.findById(postId).orElseThrow(()->new ResourceNotFoundException("Post","post id",postId));
		Category category = this.categoryRepo.findById(postDto.getCategory().getCategoryId()).get();
		post.setTitle(postDto.getTitle());
		post.setContent(postDto.getContent());
		post.setImageName(postDto.getImageName());
		post.setCategory(category);	
		
		Post updatedPost = this.postRepo.save(post);
		return this.modelMapper.map(updatedPost,PostDto.class );
	
	}

	@Override
	public void deletePost(Integer postId) {
		Post post  = this.postRepo.findById(postId).orElseThrow(()->new ResourceNotFoundException("Post","post id",postId));
		this.postRepo.delete(post);

	}

	@Override
	public PostResponse getAllPost(Integer pageNumber ,Integer pageSize,String sortBy,String sortDir) {
		
		Sort sort =null;
		if(sortDir.equalsIgnoreCase("asc")) {
			sort = Sort.by(sortBy).ascending();
		}else {
			sort = Sort.by(sortBy).descending();
		}
		//apply paging
		Pageable p = PageRequest.of(pageNumber, pageSize,sort);
		
		Page<Post> pagePost = this.postRepo.findAll(p);
		List<Post> post = pagePost.getContent();
		List<PostDto> postDto = post.stream().map((po)->this.modelMapper.map(po, PostDto.class)).collect(Collectors.toList());
		
		PostResponse postRespone = new PostResponse();
		postRespone.setContent(postDto);
		postRespone.setPageNumber(pagePost.getNumber());
		postRespone.setPageSize(pagePost.getSize());
		postRespone.setTotalElement(pagePost.getTotalElements());
		postRespone.setTotalPages(pagePost.getTotalPages());
		postRespone.setLastPage(pagePost.isLast());
		
		return postRespone;
	}

	@Override
	public PostDto getPostById(Integer postId) {
		 Post post = this.postRepo.findById(postId).orElseThrow(()->new ResourceNotFoundException("post","post id",postId));
		 PostDto poDto = this.modelMapper.map(post, PostDto.class);
		 return poDto;
	}

	@Override
	public List<PostDto> getPostsByCategory(Integer categoryId) {
		Category cat = this.categoryRepo.findById(categoryId)
				.orElseThrow(()->new ResourceNotFoundException("category","category id",categoryId));
		List <Post>pp =this.postRepo.findByCategory(cat);
		//now we convert all post to postdto
		List<PostDto> postDtos= pp.stream().map((posts)->this.modelMapper.map(posts,PostDto.class)).collect(Collectors.toList());
		return postDtos;
	}

	@Override
	public List<PostDto> getPostsByUser(Integer userId) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(()->new ResourceNotFoundException("user","user id",userId));
		List <Post>pp =this.postRepo.findByUser(user);
		//now we convert all post to postdto
		List<PostDto> postDtos= pp.stream().map((posts)->this.modelMapper.map(posts,PostDto.class)).collect(Collectors.toList());
		return postDtos;
	}

	@Override
	public List<PostDto> searchPosts(String keyword) {
		List<Post> post = this.postRepo.searchByTitle("%"+keyword+"%");
		List<PostDto> postDto = post.stream().map((posts)->this.modelMapper.map(posts, PostDto.class)).collect(Collectors.toList());
		return postDto;
	}

}
