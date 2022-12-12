package com.blog.blogappapis.payloads;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.validation.annotation.Validated;

import com.blog.blogappapis.entity.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// this class will pass in entire application mean we can pass the user data through this class ,we will not pass user class directly
// mean directly user class ko expose na kre because entity me kuch problem bhi ho skti h
@NoArgsConstructor
@Getter
@Setter
public class UserDto {
	
	private int id;
	@NotEmpty
	@Size(min=4 ,message="User Name must be of 4 character")
	private String name;
	
	@Email(message="Your email address is not valid")
	@NotEmpty
	private String email;
	
	@NotEmpty
	@Size(min=3,max=10 ,message="password must be min of 3 characters and max of 10 characters")
	private String password;
	
	@NotEmpty
	private String about;
	
	private Set<RoleDto> role = new HashSet<>();
	
	@JsonIgnore
	public String getPassword() {
		return this.password;
	}
	
	@JsonProperty
	public void setPassword(String password) {
		this.password = password;
	}

}
