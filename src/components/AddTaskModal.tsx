import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";

type Props = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

const AddTaskModal = ({ modalVisible, setModalVisible }: Props) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Dropdowns for status and priority
  const [status, setStatus] = useState(null);
  const [priority, setPriority] = useState(null);
  const [statusOpen, setStatusOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);

  const statusOptions = [
    { label: "Yet to Start", value: "Yet to Start" },
    { label: "Ongoing", value: "Ongoing" },
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
    const newItem = {
      title: taskTitle,
      description: taskDesc,
      dueDate: dueDate.toISOString().split("T")[0],
      priority: priority,
      status: status,
    };

    console.log("new Item:", newItem);
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
          <Text className="font-bold text-center text-[20px] mb-[10px]">
            Add Task
          </Text>

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
              {dueDate.toDateString() || "Select Due Date"}
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

          {/* Action Buttons */}
          <View className="flex-row justify-around mt-[20px]">
            <Button mode="contained" onPress={closeModal} color="#FF3B30">
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                // Handle save action here
                onPressSave();
              }}
              color="#34C759"
            >
              Save
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddTaskModal;
