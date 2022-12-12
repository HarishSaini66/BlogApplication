package com.blog.blogappapis.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.blogappapis.entity.Category;
import com.blog.blogappapis.exceptions.ResourceNotFoundException;
import com.blog.blogappapis.payloads.CategoryDto;
import com.blog.blogappapis.repository.CategoryRepo;
//import com.blog.blogappapis.repository.CategoryRepo;
import com.blog.blogappapis.services.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	private CategoryRepo categoryRepo;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public CategoryDto createCategory(CategoryDto categoryDto) {
		Category category = this.modelMapper.map(categoryDto,Category.class);
		Category updateCategory = this.categoryRepo.save(category);
		return this.modelMapper.map(updateCategory, CategoryDto.class);
	
	}

	@Override
	public CategoryDto updateCategory(CategoryDto categoryDto, Integer categoryId) {
		Category cat =this.categoryRepo.findById(categoryId)
				.orElseThrow(()->new ResourceNotFoundException("category", "category Id", categoryId ));
		cat.setCategoryTitle(categoryDto.getCategoryTitle());
		cat.setCategoryDescription(categoryDto.getCategoryDescription());
		
		Category savedCategory = this.categoryRepo.save(cat);
		return this.modelMapper.map(savedCategory, CategoryDto.class);
	}

	@Override
	public void deleteCategory(Integer categoryId) {
		Category cat = this.categoryRepo.findById(categoryId)
				.orElseThrow(()->new ResourceNotFoundException("category","category Id",categoryId));
		this.categoryRepo.delete(cat);
		
	}

	@Override
	public CategoryDto getCategory(Integer categoryId) {
		Category ct = this.categoryRepo.findById(categoryId)
				.orElseThrow(()->new ResourceNotFoundException("category","category Id",categoryId));
		return this.modelMapper.map(ct, CategoryDto.class);
	}

	@Override
	public List<CategoryDto> getAllCategory() {
		List<Category> ct = this.categoryRepo.findAll();
		List<CategoryDto>cDto =ct.stream().map(cat->this.modelMapper.map(cat, CategoryDto.class)).collect(Collectors.toList());
		return cDto;
		
	}

}
