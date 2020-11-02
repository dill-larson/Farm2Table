package com.cs160fall2020.teampikachu.farm2table.service;

import com.cs160fall2020.teampikachu.farm2table.model.Farm;
import com.cs160fall2020.teampikachu.farm2table.model.User;
import com.cs160fall2020.teampikachu.farm2table.model.Order;
import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.*;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.ExecutionException;

import static com.cs160fall2020.teampikachu.farm2table.service.Constants.*;

@Service
public class FirebaseService {
    @Autowired
    FirebaseInit db;


    /**
     *
     * FirebaseImageUploadService
     */
    public ResponseEntity<String> uploadFile(MultipartFile multipartFile) throws IOException {
        String objectName = generateFileName(multipartFile);

        FileInputStream serviceAccount = new FileInputStream(FIREBASE_SDK_JSON);
        File file = convertMultiPartToFile(multipartFile);
        Path filePath = file.toPath();

        Storage storage = StorageOptions.newBuilder().setCredentials(GoogleCredentials.fromStream(serviceAccount)).setProjectId(FIREBASE_PROJECT_ID).build().getService();
        BlobId blobId = BlobId.of(FIREBASE_BUCKET, objectName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(multipartFile.getContentType()).build();

        storage.create(blobInfo, Files.readAllBytes(filePath));

        return ResponseEntity.status(HttpStatus.CREATED).body("product uploaded successfully");
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        FileOutputStream fos = new FileOutputStream(convertedFile);
        fos.write(file.getBytes());
        fos.close();
        return convertedFile;
    }

    private String generateFileName(MultipartFile multiPart) {
        return new Date().getTime() + "-" + Objects.requireNonNull(multiPart.getOriginalFilename()).replace(" ", "_");
    }


    /**
     *
     * FirebaseFarmService
     */
    public String uploadFarm(Farm farm) {
        CollectionReference userRef = db.getFirebase().collection("farms");
        userRef.document(farm.getId()).set(farm);
        return farm.getId();
    }

    public List<Farm> getAllFarm () {
        List<Farm> farmList = new ArrayList<Farm>();
        CollectionReference farmRef = db.getFirebase().collection("farms");
        ApiFuture<QuerySnapshot> querySnapshot = farmRef.get();
        try {
            for(QueryDocumentSnapshot document : querySnapshot.get().getDocuments()) {
                farmList.add(document.toObject(Farm.class));
            }
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (ExecutionException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return farmList;
    }

    public String updateFarm (Farm farm) {
        CollectionReference userRef = db.getFirebase().collection("farms");
        userRef.document(farm.getId()).set(farm);
        return farm.getId();
    }

    public Farm getFarmById (String id) {
        CollectionReference userRef = db.getFirebase().collection("farms");
        ApiFuture<DocumentSnapshot> documentSnapshot = userRef.document(id).get();
        try {
            return documentSnapshot.get().toObject(Farm.class);
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (ExecutionException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }

    public boolean deleteFarm (String id) {
        CollectionReference farmRef = db.getFirebase().collection("farms");
        ApiFuture<WriteResult> result = farmRef.document(id).delete();
        return result.isDone();
    }


    /**
     *
     * FirebaseUserService
     */
    public List<User> getAllUsers () {
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

    public User getUserById (String id) {
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

    public String uploadUser (User user) {
        CollectionReference userRef = db.getFirebase().collection("users");
        userRef.document(user.getID()).set(user);
        return user.getID();
    }

    public String updateUser (User user) {
        CollectionReference userRef = db.getFirebase().collection("users");
        userRef.document(user.getID()).set(user);
        return user.getID();
    }

    public boolean deleteUser (String id) {
        CollectionReference userRef = db.getFirebase().collection("users");
        ApiFuture<WriteResult> result = userRef.document(id).delete();
        return result.isDone();
    }


    /**
     *
     * FirebaseOrderService
     */
    public Order getOrderById (String id) {
        CollectionReference orderList = db.getFirebase().collection("orders");
        ApiFuture<DocumentSnapshot> documentSnapshot = orderList.document(id).get();
        try {
            return documentSnapshot.get().toObject(Order.class);
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (ExecutionException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }

    public List<Order> getAllOrder () {
        List<Order> orderList = new ArrayList<Order>();
        CollectionReference orderRef = db.getFirebase().collection("orders");
        ApiFuture<QuerySnapshot> querySnapshot = orderRef.get();
        try {
            for(QueryDocumentSnapshot document : querySnapshot.get().getDocuments()) {
                orderList.add(document.toObject(Order.class));
            }
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (ExecutionException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return orderList;
    }


    public String uploadOrder (Order order) {
        CollectionReference orderRef = db.getFirebase().collection("orders");
        orderRef.document(order.getId()).set(order);
        return order.getId();
    }

    public String updateOrder (Order order) {
        CollectionReference orderRef = db.getFirebase().collection("orders");
        orderRef.document(order.getId()).set(order);
        return order.getId();
    }


}