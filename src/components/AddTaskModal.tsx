import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type TaskItem = {
  id: string;
  title: string;
  status: "Yet to Start" | "OnGoing" | "Finished";
  priority: "High" | "Medium" | "Low";
  description: string;
  dueDate: Date;
};

type Props = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  item: TaskItem;
};

const schema = z.object({
  taskTitle: z.string().min(1, { message: "Task title is required" }), // Title must not be empty
  taskDesc: z
    .string()
    .min(5, { message: "Description must be at least 5 characters long" }), // Description length validation
  dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format", // Ensures that the date is valid
  }),
  status: z.enum(["pending", "in-progress", "completed"], {
    message: "Status must be one of: pending, in-progress, or completed", // Enum for status values
  }),
  priority: z.enum(["low", "medium", "high"], {
    message: "Priority must be one of: low, medium, or high", // Enum for priority values
  }),
});

type AddTask = z.infer<typeof schema>;

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
  const [statusOpen, setStatusOpen] = useState<boolean>(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [indicatorVisible, setIndicatorVisible] = useState(false);

  const {
    formState: { errors },
  } = useForm<AddTask>({ resolver: zodResolver(schema) });

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
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        className="flex-1 bg-[#00000080]"
      >
        <View className="justify-center items-center mt-20">
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
            {errors.taskTitle && (
              <Text className="text-red-500 text-xs mb-2">
                {errors.taskTitle.message}
              </Text>
            )}

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
              setOpen={(open) => {
                setStatusOpen(open);
                // if (open) setPriorityOpen(false);
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
                className="bg-[#4CAF50] p-2 rounded-md flex-1 mr-2"
                onPress={() => {
                  onPressSave();
                }}
              >
                {indicatorVisible ? (
                  <ActivityIndicator size="small" />
                ) : (
                  <Text className="text-white text-center font-bold">Save</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#f44336] p-2 rounded-md flex-1"
                onPress={closeModal}
              >
                <Text className="text-white text-center font-bold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

export default AddTaskModal;
