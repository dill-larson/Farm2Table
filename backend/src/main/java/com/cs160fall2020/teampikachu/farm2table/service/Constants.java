package com.cs160fall2020.teampikachu.farm2table.service;

import org.springframework.stereotype.Service;

@Service
public class Constants {
    public static final String FIREBASE_SDK_JSON ="./app-farm2table-firebase-adminsdk-x9rm3-161fe6a8d5.json";//copy the sdk-config file root address, if its in root ,filename is enough
    public static final String FIREBASE_BUCKET = "app-farm2table.appspot.com";//enter your bucket name
    public static final String FIREBASE_PROJECT_ID ="app-farm2table";//enter your project id
    public static final String URL = "https://app-farm2table.firebaseio.com";
}