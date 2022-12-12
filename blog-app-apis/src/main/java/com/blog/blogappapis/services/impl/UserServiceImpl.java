package com.blog.blogappapis.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.blog.blogappapis.config.AppConstants;
import com.blog.blogappapis.entity.Role;
import com.blog.blogappapis.entity.User;
import com.blog.blogappapis.payloads.UserDto;
import com.blog.blogappapis.repository.RoleRepo;
import com.blog.blogappapis.repository.UserRepo;
import com.blog.blogappapis.services.UserService;
import com.blog.blogappapis.exceptions.ResourceNotFoundException;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepo userRepo;
	
	//modelmapper library is use to convert one object to another object
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder passwordEndcoder;
	
	@Autowired
	private RoleRepo roleRepo;

	@Override
	public UserDto createUser(UserDto userDto) {
		User user = this.dtoToUser(userDto);
		User saveduser = this.userRepo.save(user);
		return this.userToDto(saveduser);
		
	}

	@Override
	public UserDto updateUser(UserDto userDto, Integer userId) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(()-> new ResourceNotFoundException("User","id",userId));
		user.setName(userDto.getName());
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getPassword());
		user.setAbout(userDto.getAbout());
		
		User updatedUser =this.userRepo.save(user);
		return this.userToDto(updatedUser);
		
	}

	@Override
	public UserDto getUserById(Integer userId) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(()-> new ResourceNotFoundException("User","id",userId));
		return this.userToDto(user);
		
	}

	@Override
	public List<UserDto> getAllUsers() {
		List<User> users = this.userRepo.findAll();
		
		List<UserDto>userdtos=users.stream().map(user->this.userToDto(user)).collect(Collectors.toList());
		return userdtos;
	}

	@Override
	public void deleteUser(Integer userId) {
		User user = this.userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("User","id",userId));
		this.userRepo.delete(user);
		
	}
	
	//methods for converting dto to user and user to dto - initlally we did it manually but now we used modelmapper to convert 
	//one object to another object
	public User dtoToUser(UserDto userDto) {
		User user = this.modelMapper.map(userDto, User.class);
//		user.setId(userDto.getId());
//		user.setName(userDto.getName());
//		user.setAbout(userDto.getAbout());
//		user.setPassword(userDto.getPassword());
//		user.setEmail(userDto.getEmail());
		return user;
	}
	
	public UserDto userToDto(User user) {
		UserDto userdto = this.modelMapper.map(user, UserDto.class);
		
		return userdto;
	}

	@Override
	public UserDto registerNewUser(UserDto userDto) {
		User user = this.modelMapper.map(userDto, User.class);
		
		//encoded the password
		user.setPassword(this.passwordEndcoder.encode(user.getPassword()));
		
		//roles
		Role role =  this.roleRepo.findById(AppConstants.NORMAL_USER).get();
		
		user.getRole().add(role);
		User newUser = this.userRepo.save(user);
		return this.modelMapper.map(newUser, UserDto.class);
		
	}
	
	
	

}
