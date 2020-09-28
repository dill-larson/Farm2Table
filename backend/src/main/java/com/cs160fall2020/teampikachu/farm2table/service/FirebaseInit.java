package com.cs160fall2020.teampikachu.farm2table.service;

import java.io.FileInputStream;
import java.io.InputStream;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class FirebaseInit {
	
	@PostConstruct
	private void initDatabase() {
		try {
			InputStream serviceAccount = this.getClass().getClassLoader().getResourceAsStream("./app-farm2table-firebase-adminsdk-x9rm3-161fe6a8d5.json");
			//FileInputStream serviceAccount = new FileInputStream("../../../../resources/app-farm2table-firebase-adminsdk-x9rm3-161fe6a8d5.json");
		
			FirebaseOptions options = new FirebaseOptions.Builder()
			  .setCredentials(GoogleCredentials.fromStream(serviceAccount))
			  .setDatabaseUrl("https://app-farm2table.firebaseio.com")
			  .build();
		
			if(FirebaseApp.getApps().isEmpty()) {
				FirebaseApp.initializeApp(options);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public Firestore getFirebase() {
		return FirestoreClient.getFirestore();
	}
}
