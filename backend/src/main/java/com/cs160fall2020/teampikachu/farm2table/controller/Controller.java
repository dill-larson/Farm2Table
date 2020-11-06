package com.cs160fall2020.teampikachu.farm2table.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import com.cs160fall2020.teampikachu.farm2table.model.Farm;
import com.cs160fall2020.teampikachu.farm2table.model.Order;
import com.cs160fall2020.teampikachu.farm2table.service.FirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cs160fall2020.teampikachu.farm2table.model.User;
import com.cs160fall2020.teampikachu.farm2table.service.FirebaseInit;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class Controller {
	
	@Autowired
	FirebaseInit db;

	@Autowired
	private FirebaseService firebaseService;
	
	/**
	 * Gets all users from the database
	 * @return
	 */
	@GetMapping(value = "/getAllUsers")
	public List<User> getAllUsers() {
		return firebaseService.getAllUsers();
	}
	
	/**
	 * Gets user by id
	 * @param id - id of user
	 * @return - null if user does not exist
	 */
	@GetMapping(value = "/getUser/{id}")
	public User getUser(@PathVariable String id) {
		return firebaseService.getUserById(id);
	}
	
	/**
	 * Create user
	 * @param user
	 * @return
	 */
	@PostMapping(value = "/createUser")
	public String addUser(@RequestBody User user) {
		return firebaseService.uploadUser(user);
	}
	
	/**
	 * Update user
	 * @param user
	 * @return
	 */
	@PutMapping(value = "/updateUser")
	public String updateUser(@RequestBody User user) {
		return firebaseService.updateUser(user);
	}
	
	/**
	 * Deletes user by id
	 * @param id - id of user
	 * @return
	 */
	@DeleteMapping(value = "/deleteUser/{id}")
	public boolean deleteUser(@RequestParam("id") String id) {
		return firebaseService.deleteUser(id);
	}

	/**
	 * this method is used to post/upload files into the google cloud firebase
	 * @param file variable shall contain multipart file to be uploaded
	 * @return success message on uploading the file
	 * @throws Exception
	 */
	@PostMapping("/upload-image")
	public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) throws Exception {
		return firebaseService.uploadFile(file);
	}

	/**
	 * Create farm
	 * @param farm
	 * @return
	 */
	@PostMapping(value = "/createFarm")
	public String addFarm(@RequestBody Farm farm) {
		return firebaseService.uploadFarm(farm);
	}

	/**
	 * Gets all farm from the database
	 * @return
	 */
	@GetMapping(value = "/getAllFarms")
	public List<Farm> getAllFarms() {
		return firebaseService.getAllFarm();
	}

	/**
	 * Gets Farm by id
	 * @param id - id of Farm
	 * @return - null if Farm does not exist
	 */
	@GetMapping(value = "/getFarm/{id}")
	public Farm getFarm (@PathVariable String id) {
		return firebaseService.getFarmById(id);
	}

	/**
	 * Update farm
	 * @param farm
	 * @return
	 */
	@PutMapping(value = "/updateFarm")
	public String updateFarm(@RequestBody Farm farm) {
		return firebaseService.updateFarm(farm);
	}


	/**
	 * Deletes farm by id
	 * @param id - id of farm
	 * @return
	 */
	@DeleteMapping(value = "/deleteFarm/{id}")
	public boolean updateFarm (@RequestBody String id) {
		return firebaseService.deleteFarm(id);
	}

	@PostMapping(value = "/updateOrder")
	public String updateOrder (@RequestBody Order order) {
		return firebaseService.uploadOrder(order);
	}

	@GetMapping(value = "/getAllOrders")
	public List<Order> getAllOrders () {
		return firebaseService.getAllOrder();
	}

	@GetMapping(value = "/getOrderById")
	public Order getOrderById (@RequestBody String id) {
		return firebaseService.getOrderById(id);
	}
}
