package com.blog.blogappapis.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private JwtTokenHelper jwtTokenHelper;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		
		//1. get Token
		String requestToken = request.getHeader("Authorization");
		
		//Bearer
		System.out.println(requestToken);
		
		String userName=null;
		
		String token=null;
		
		if(requestToken !=null && requestToken.startsWith("Bearer")) {
			
			 token = requestToken.substring(7);
			 try {
				 userName = this.jwtTokenHelper.getUserNameFromToken(token);
			 }catch(IllegalArgumentException e) {
				 System.out.println("Unable to get JWT token");
			 }catch(ExpiredJwtException e){
				 System.out.println("Token has expired");
			 }catch(MalformedJwtException e) {
				 System.out.println("Invalid JWT");
			 }
			
			
			
		}else {
			System.out.println("JWT token does not begin with Bearer");
		}
		
		// once we get the token , now validate
		if(userName !=null && SecurityContextHolder.getContext().getAuthentication()==null) {
			
			UserDetails userDetail = this.userDetailsService.loadUserByUsername(userName);
			if(this.jwtTokenHelper.validateToken(token, userDetail)) {
				
				UsernamePasswordAuthenticationToken userNamePasswordAuthenticationToken =
						new UsernamePasswordAuthenticationToken(userDetail,null, userDetail.getAuthorities());
				
				userNamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				SecurityContextHolder.getContext().setAuthentication(userNamePasswordAuthenticationToken);
				
			}else {
				System.out.println("Invalid JWT Token");
			}
			
		}else {
			System.out.println("userName is null or context is not null");
		}
		
		filterChain.doFilter(request, response);
	}

}
