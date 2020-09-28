package com.cs160fall2020.teampikachu.farm2table.model;

import org.springframework.stereotype.Component;

@Component
public class User {
	
	private String id;
	private String displayName;
	private String email;
	
	public String getID() {
		return id;
	}
	public void setID(String id) {
		this.id = id;
	}
	
	public String getDisplayName() {
		return displayName;
	}
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	@Override
	public String toString() {
		return "User{" + 
				"id='" + this.id +
				"\', displayName='" + this.displayName +
				"\', email=" + this.email + "\'}"; 
	}
	
}
