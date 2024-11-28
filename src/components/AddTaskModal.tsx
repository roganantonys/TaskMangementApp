import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { fireDB } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import Toast from "react-native-toast-message";

type TaskItem = {
  id: string;
  title: string;
  status: "Yet to Start" | "OnGoing" | "Finished";
  priority: "High" | "Medium" | "Low";
  taskDesc: string;
};

type Props = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  item: TaskItem[];
};

const AddTaskModal = ({ modalVisible, setModalVisible, item }: Props) => {
  console.log("add task modal clikced:", item);
  const [taskTitle, setTaskTitle] = useState(item?.title || "");
  const [taskDesc, setTaskDesc] = useState(item?.description || "");
  const [dueDate, setDueDate] = useState(
    item?.dueDate ? new Date(item.dueDate) : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Dropdowns for status and priority
  const [status, setStatus] = useState(item?.status || null);
  const [priority, setPriority] = useState(item?.priority || null);
  const [statusOpen, setStatusOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [indicatorVisible, setIndicatorVisible] = useState(false);

  const statusOptions = [
    { label: "Yet to Start", value: "Yet to Start" },
    { label: "Ongoing", value: "OnGoing" },
    { label: "Finished", value: "Finished" },
  ];

  const priorityOptions = [
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
  ];

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  function onPressSave() {
    setIndicatorVisible(true);
    const newItem = {
      title: taskTitle,
      description: taskDesc,
      dueDate: dueDate.toISOString().split("T")[0],
      priority: priority,
      status: status,
    };

    console.log("new Item:", newItem);

    if (item) {
      // updating the data to fiebase
      updateDoc(doc(fireDB, "tasks", item?.id), newItem)
        .then((res) => {
          console.log("succesfull:", res);
          Toast.show({
            type: "success",
            text1: "Task Updated successfully", // Message for success
            text2: "Your task has been Updated to the list", // Optional second line
          });
        })
        .catch((error) => {
          console.error("Error sending tasks to Firestore:", error);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Something went wrong while Updating the task",
          });
        })
        .finally(() => {
          setIndicatorVisible(false);
          closeModal();
        });
    } else {
      // sending data to firebase
      addDoc(collection(fireDB, "tasks"), newItem)
        .then((res) => {
          console.log("succesfull:", res);
          Toast.show({
            type: "success",
            text1: "Task added successfully", // Message for success
            text2: "Your task has been added to the list", // Optional second line
          });
        })
        .catch((error) => {
          console.error("Error sending tasks to Firestore:", error);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Something went wrong while adding the task",
          });
        })
        .finally(() => {
          setIndicatorVisible(false);
          closeModal();
        });
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View className="flex-1 bg-[#00000080] justify-center items-center">
        <View className="w-[90%] bg-white rounded-[10px] p-[20px]">
          {/* Title */}
          {item ? (
            <Text className="font-bold text-center text-[20px] mb-[10px]">
              Edit Task
            </Text>
          ) : (
            <Text className="font-bold text-center text-[20px] mb-[10px]">
              Add Task
            </Text>
          )}

          {/* Task Title Input */}
          <TextInput
            label="Task Title"
            value={taskTitle}
            mode="outlined"
            onChangeText={(text: string) => setTaskTitle(text)}
            outlineColor="black"
            activeOutlineColor="black"
            className="mb-[10px]"
          />

          {/* Task Description Input */}
          <TextInput
            label="Task Description"
            value={taskDesc}
            mode="outlined"
            multiline={true}
            numberOfLines={4}
            style={{ height: 100 }}
            onChangeText={(text: string) => setTaskDesc(text)}
            outlineColor="black"
            activeOutlineColor="black"
            className="mb-[10px]"
          />
          <View className="">
            <Text className="font-bold text-[14px mt-[10px]">Due Date:</Text>
          </View>

          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="border border-black rounded-[5px] p-[10px] mb-[10px]"
          >
            <Text className="text-gray-700">
              {dueDate.toISOString().split("T")[0] || "Select Due Date"}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDueDate(selectedDate);
              }}
            />
          )}

          <View className="">
            <Text className="font-bold text-[14px mt-[10px]">Status:</Text>
          </View>
          <DropDownPicker
            open={statusOpen}
            value={status}
            items={statusOptions}
            setOpen={(open: boolean) => {
              setStatusOpen(open);
              if (open) setPriorityOpen(false); // Close other dropdown
            }}
            setValue={setStatus}
            placeholder="Select Status"
            style={{ marginBottom: 10 }}
            containerStyle={{ marginBottom: 10, zIndex: 3000 }}
            dropDownContainerStyle={{ zIndex: 3000 }}
          />

          <View className="">
            <Text className="font-bold text-[14px] mt-[10px]">Priority:</Text>
          </View>
          <DropDownPicker
            open={priorityOpen}
            value={priority}
            items={priorityOptions}
            setOpen={(open) => {
              setPriorityOpen(open);
              //   if (open) setStatusOpen(false); // Close other dropdown
            }}
            setValue={setPriority}
            placeholder="Select Priority"
            style={{ marginBottom: 10 }}
            containerStyle={{ marginBottom: 10, zIndex: 2000 }}
            dropDownContainerStyle={{ zIndex: 2000 }}
          />

          <View className="flex-row justify-around mt-[20px]">
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                onPressSave();
              }}
            >
              {indicatorVisible ? (
                <ActivityIndicator size="small" />
              ) : (
                <Text style={styles.buttonText}>Save</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddTaskModal;

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
