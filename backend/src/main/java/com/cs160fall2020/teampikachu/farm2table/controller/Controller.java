package com.cs160fall2020.teampikachu.farm2table.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cs160fall2020.teampikachu.farm2table.model.User;
import com.cs160fall2020.teampikachu.farm2table.service.FirebaseInit;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class Controller {
	
	@Autowired
	FirebaseInit db;
	
	/**
	 * Gets all users from the database
	 * @return
	 */
	@GetMapping(value = "/getAllUsers")
	public List<User> getAllUsers() {
		List<User> userList = new ArrayList<User>();
		CollectionReference userRef = db.getFirebase().collection("users");
		ApiFuture<QuerySnapshot> querySnapshot = userRef.get();
		try {
			for(QueryDocumentSnapshot document : querySnapshot.get().getDocuments()) {
				userList.add(document.toObject(User.class));
			}
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return userList;
	}
	
	/**
	 * Gets user by id
	 * @param id - id of user
	 * @return - null if user does not exist
	 */
	@GetMapping(value = "/getUser/{id}")
	public User getUser(@PathVariable String id) {
		CollectionReference userRef = db.getFirebase().collection("users");
		ApiFuture<DocumentSnapshot> documentSnapshot = userRef.document(id).get();
		try {
			return documentSnapshot.get().toObject(User.class);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null; //error: retrieving user
	}
	
	/**
	 * Create user
	 * @param user
	 * @return
	 */
	@PostMapping(value = "/createUser")
	public String addUser(@RequestBody User user) {
		CollectionReference userRef = db.getFirebase().collection("users");
		userRef.document(user.getID()).set(user);
		return user.getID();
	}
	
	/**
	 * Update user
	 * @param user
	 * @return
	 */
	@PutMapping(value = "/updateUser")
	public String updateUser(@RequestBody User user) {
		CollectionReference userRef = db.getFirebase().collection("users");
		userRef.document(user.getID()).set(user);
		return user.getID();
	}
	
	/**
	 * Deletes user by id
	 * @param id - id of user
	 * @return
	 */
	@DeleteMapping(value = "/deleteUser/{id}")
	public boolean updateUser(@RequestBody String id) {
		CollectionReference userRef = db.getFirebase().collection("users");
		ApiFuture<WriteResult> result = userRef.document(id).delete();
		return result.isDone();
	}
}
