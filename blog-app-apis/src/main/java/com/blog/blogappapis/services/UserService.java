package com.blog.blogappapis.services;


import java.util.List;

import com.blog.blogappapis.payloads.UserDto;

public interface UserService {
	
	UserDto registerNewUser(UserDto userDto);
	
	UserDto createUser(UserDto user);
	UserDto updateUser(UserDto user,Integer userid);
	UserDto getUserById(Integer userId);
	List<UserDto> getAllUsers();
	void deleteUser(Integer userId);
	
	
}
