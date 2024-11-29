// import React, { useState } from "react";
// import {
//   Modal,
//   Text,
//   View,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Platform,
//   ActivityIndicator,
// } from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { collection, getDocs, addDoc } from "firebase/firestore";
// import { fireDB } from "../firebase";
// import Toast from "react-native-toast-message";

// type prop = {
//   modalVisible: boolean;
//   setModalVisible: (visible: boolean) => void;
// };
// const AgendaModal = ({ modalVisible, setModalVisible }: prop) => {
//   const [task, setTask] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [time, setTime] = useState(new Date());

//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showTimePicker, setShowTimePicker] = useState(false);
//   const [indicatorVisible, setIndicatorVisible] = useState(false);

//   const openModal = () => setModalVisible(true);
//   const closeModal = () => setModalVisible(false);

//   const handleDateChange = (event: any, selectedDate?: Date) => {
//     if (selectedDate) setDate(selectedDate);
//     setShowDatePicker(false);
//   };

//   const handleTimeChange = (event: any, selectedTime?: Date) => {
//     if (selectedTime) setTime(selectedTime);
//     setShowTimePicker(false);
//   };

//   function onSaveTask() {
//     setIndicatorVisible(true);
//     let AgendaItem = {
//       title: task,
//       time: time.toLocaleTimeString(),
//       date: date.toISOString().split("T")[0],
//     };
//     console.log("new AgendaItem:", AgendaItem);
//     addDoc(collection(fireDB, "agendaItems"), AgendaItem)
//       .then((res) => {
//         setIndicatorVisible(false);
//         console.log("saved succesfully");
//         Toast.show({
//           type: "success",
//           text1: "Event added successfully", // Message for success
//           text2: "Your Event added to the agenda", // Optional second line
//         });
//       })
//       .catch((err) => {
//         setIndicatorVisible(false);
//         console.log("can'save agenda");
//         Toast.show({
//           type: "error",
//           text1: "Error",
//           text2: "Something went wrong while adding the event",
//         });
//       })
//       .finally(() => {
//         closeModal();
//       });
//   }
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.openButton} onPress={openModal}>
//         <Text style={styles.openButtonText}>Open Modal</Text>
//       </TouchableOpacity>

//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={closeModal}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Add Task</Text>

//             {/* Text Input */}
//             <TextInput
//               style={styles.input}
//               placeholder="Enter task name"
//               value={task}
//               onChangeText={setTask}
//             />

//             {/* Date Picker */}
//             <TouchableOpacity
//               style={styles.pickerButton}
//               onPress={() => setShowDatePicker(true)}
//             >
//               <Text style={styles.pickerButtonText}>
//                 {`Date: ${date.toLocaleDateString()}`}
//               </Text>
//             </TouchableOpacity>
//             {showDatePicker && (
//               <DateTimePicker
//                 mode="date"
//                 display="default"
//                 value={date}
//                 onChange={handleDateChange}
//               />
//             )}

//             {/* Time Picker */}
//             <TouchableOpacity
//               style={styles.pickerButton}
//               onPress={() => setShowTimePicker(true)}
//             >
//               <Text style={styles.pickerButtonText}>
//                 {`Time: ${time.toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}`}
//               </Text>
//             </TouchableOpacity>
//             {showTimePicker && (
//               <DateTimePicker
//                 mode="time"
//                 display="default"
//                 value={time}
//                 onChange={handleTimeChange}
//               />
//             )}

//             {/* Buttons */}
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity
//                 style={styles.saveButton}
//                 onPress={() => {
//                   onSaveTask();
//                 }}
//               >
//                 {indicatorVisible ? (
//                   <ActivityIndicator size="small" />
//                 ) : (
//                   <Text style={styles.buttonText}>Save</Text>
//                 )}
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.cancelButton}
//                 onPress={closeModal}
//               >
//                 <Text style={styles.buttonText}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default AgendaModal;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   openButton: {
//     backgroundColor: "#4CAF50",
//     padding: 10,
//     borderRadius: 5,
//   },
//   openButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContainer: {
//     width: "80%",
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 20,
//     alignItems: "center",
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     width: "100%",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 20,
//   },
//   pickerButton: {
//     width: "100%",
//     padding: 10,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginBottom: 10,
//   },
//   pickerButtonText: {
//     color: "#333",
//     textAlign: "center",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   saveButton: {
//     backgroundColor: "#4CAF50",
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginRight: 10,
//   },
//   cancelButton: {
//     backgroundColor: "#f44336",
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
// });

import React, { useState } from "react";
import {
  Modal,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { collection, addDoc } from "firebase/firestore";
import { fireDB } from "../firebase";
import Toast from "react-native-toast-message";
import { z } from "zod";

type prop = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

const AgendaModal = ({ modalVisible, setModalVisible }: prop) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [indicatorVisible, setIndicatorVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) setDate(selectedDate);
    setShowDatePicker(false);
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (selectedTime) setTime(selectedTime);
    setShowTimePicker(false);
  };

  const taskSchema = z.object({
    task: z
      .string()
      .min(1, "Task name is required")
      .max(100, "Task name is too long"),
    date: z.date(),
    time: z.date(),
  });

  function onSaveTask() {
    try {
      const validatedData = taskSchema.parse({
        task,
        date,
        time,
      });

      setIndicatorVisible(true);
      let AgendaItem = {
        title: validatedData.task,
        time: validatedData.time.toLocaleTimeString(),
        date: validatedData.date.toISOString().split("T")[0],
      };

      addDoc(collection(fireDB, "agendaItems"), AgendaItem)
        .then(() => {
          setIndicatorVisible(false);
          Toast.show({
            type: "success",
            text1: "Event added successfully",
            text2: "Your Event added to the agenda",
          });
        })
        .catch(() => {
          setIndicatorVisible(false);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Something went wrong while adding the event",
          });
        })
        .finally(() => {
          closeModal();
        });
    } catch (err: any) {
      if (err.errors) {
        const errorMessages = err.errors.map((e: any) => e.message).join("\n");
        Toast.show({
          type: "error",
          text1: "Validation Error",
          text2: errorMessages,
        });
      }
    }
  }

  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity
        className="bg-green-500 p-3 rounded"
        onPress={openModal}
      >
        <Text className="text-white font-bold">Open Modal</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-4/5 bg-white rounded p-5 items-center">
            <Text className="text-lg font-bold mb-5">Add Task</Text>

            <TextInput
              className="w-full border border-gray-300 rounded p-2 mb-5"
              placeholder="Enter task name"
              value={task}
              onChangeText={setTask}
            />

            <TouchableOpacity
              className="w-full p-3 rounded border border-gray-300 mb-3"
              onPress={() => setShowDatePicker(true)}
            >
              <Text className="text-center text-gray-700">
                {`Date: ${date.toLocaleDateString()}`}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display="default"
                value={date}
                onChange={handleDateChange}
              />
            )}

            <TouchableOpacity
              className="w-full p-3 rounded border border-gray-300 mb-3"
              onPress={() => setShowTimePicker(true)}
            >
              <Text className="text-center text-gray-700">
                {`Time: ${time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}
              </Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                mode="time"
                display="default"
                value={time}
                onChange={handleTimeChange}
              />
            )}

            <View className="flex-row justify-between w-full mt-5">
              <TouchableOpacity
                className="flex-1 bg-green-500 p-3 rounded mr-2"
                onPress={onSaveTask}
              >
                {indicatorVisible ? (
                  <ActivityIndicator size="small" />
                ) : (
                  <Text className="text-white text-center font-bold">Save</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-red-500 p-3 rounded ml-2"
                onPress={closeModal}
              >
                <Text className="text-white text-center font-bold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AgendaModal;
