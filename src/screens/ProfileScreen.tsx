// // import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// // import React from "react";
// // import { fireAuth } from "../firebase"; // Import your firebase instance
// // import { signOut } from "firebase/auth";

// // const LogoutButton = () => {
// //   const handleLogout = () => {
// //     signOut(fireAuth)
// //       .then(() => {
// //         console.log("User signed out successfully");
// //         // Optionally, navigate to a login screen or show a confirmation
// //       })
// //       .catch((error) => {
// //         console.error("Error signing out: ", error.message);
// //       });
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <TouchableOpacity style={styles.button} onPress={handleLogout}>
// //         <Text style={styles.buttonText}>Log Out</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // export default LogoutButton;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   button: {
// //     backgroundColor: "red",
// //     padding: 15,
// //     borderRadius: 5,
// //   },
// //   buttonText: {
// //     color: "white",
// //     fontWeight: "bold",
// //     textAlign: "center",
// //   },
// // });

// import React, { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
// import { fireAuth, fireDB } from "../firebase"; // Replace with your Firebase imports
// import { doc, getDoc } from "firebase/firestore";
// import { signOut } from "firebase/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const ProfileScreen = () => {
//   const [userData, setUserData] = useState<{
//     name: string;
//     email: string;
//   } | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userId = await AsyncStorage.getItem("userUUID");
//         if (userId) {
//           const userDoc = await getDoc(doc(fireDB, "users", userId));
//           if (userDoc.exists()) {
//             setUserData(userDoc.data() as { name: string; email: string });
//           } else {
//             console.log("No user data found!");
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(fireAuth);
//       console.log("User signed out successfully");
//       await AsyncStorage.removeItem("userUUID");
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-gray-100">
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (!userData) {
//     return (
//       <View className="flex-1 justify-center items-center bg-gray-100">
//         <Text className="text-red-500 text-lg font-bold">
//           Failed to load user data.
//         </Text>
//       </View>
//     );
//   }

//   const firstLetter = userData.name.charAt(0).toUpperCase();

//   return (
//     <View className="flex-1 items-center justify-center bg-gray-100 p-5">
//       {/* Circular Avatar */}
//       <View className="w-24 h-24 bg-blue-500 rounded-full justify-center items-center mb-5">
//         <Text className="text-white text-3xl font-bold">{firstLetter}</Text>
//       </View>

//       {/* User Details */}
//       <Text className="text-2xl font-bold mb-2">{userData.name}</Text>
//       <Text className="text-lg text-gray-600 mb-5">{userData.email}</Text>

//       {/* Logout Button */}
//       <TouchableOpacity
//         className="bg-red-500 px-6 py-3 rounded-md w-3/4 items-center"
//         onPress={handleLogout}
//       >
//         <Text className="text-white text-lg font-semibold">Log Out</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ProfileScreen;

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { fireAuth } from "../firebase"; // Import your firebase config
import { signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firestore functions
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

// Assuming that your Firestore users collection is 'users' and each user has their data under their UID
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
        <View className="mb-5">
          <Text className="text-lg text-gray-600">Name: {userData.name}</Text>
          <Text className="text-lg text-gray-600">
            Email ID: {userData.email}
          </Text>
        </View>
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
