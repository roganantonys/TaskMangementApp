import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { fireAuth } from "../firebase"; // Import your firebase config
import { signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firestore functions
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const ProfileScreen = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    uid: "",
  });
  const [firstLetter, setFirstLetter] = useState("");

  useEffect(() => {
    const fetchUserData = () => {
      const user = fireAuth.currentUser;
      if (user) {
        // Get user data from Firestore
        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid); // Assuming the collection name is 'users'

        getDoc(userDocRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              setUserData({
                name: data.name || "User", // Replace with the field names in your Firestore document
                email: user.email || "No email",
                uid: user.uid,
              });
              setFirstLetter(data.name ? data.name.charAt(0) : "U");
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Failed to fetch user data",
            });
          });
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    signOut(fireAuth)
      .then(() => {
        AsyncStorage.removeItem("userUid") // Remove the userUid from AsyncStorage
          .then(() => {
            Toast.show({
              type: "success",
              text2: "Logged out successfully",
            });
          })
          .catch((error) => {
            console.error("Error removing userUid from AsyncStorage:", error);
          });
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to log out",
        });
      });
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-5">
      {/* Card with user details */}
      <View className="bg-white w-full max-w-md p-5 rounded-lg shadow-lg">
        {/* Circular Avatar */}
        <View className="w-24 h-24 bg-blue-500 rounded-full justify-center items-center mb-5 self-center">
          <Text className="text-white text-3xl font-bold">{firstLetter}</Text>
        </View>
        {/* User Details */}
        <Text className="text-2xl font-bold text-center mb-2">
          {userData.name}
        </Text>
        <Text className="text-lg text-gray-600 text-center mb-5">
          {userData.email}
        </Text>
        {/* Display Name and Email in a more structured way */}
        {/* <View className="mb-5">
          <Text className="text-lg text-gray-600">Name: {userData.name}</Text>
          <Text className="text-lg text-gray-600">
            Email ID: {userData.email}
          </Text>
        </View> */}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        className="bg-red-500 px-6 py-3 rounded-md w-3/4 items-center mt-5"
        onPress={handleLogout}
      >
        <Text className="text-white text-lg font-semibold">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
