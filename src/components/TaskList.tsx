import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Card } from "react-native-paper";
import Entypo from "@expo/vector-icons/Entypo";
import AddTaskModal from "./AddTaskModal";

type TaskItem = {
  id: string;
  title: string;
  status: "Yet to Start" | "OnGoing" | "Completed";
  priority: "High" | "Medium" | "Low";
};

type Props = {
  data: TaskItem[];
  // setModalVisible: (visible: boolean) => void;
};

const TaskList = ({ data }: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [taskItem, setTaskItem] = useState<TaskItem>();

  function openModal(item: TaskItem) {
    console.log("single item:", item);
    setTaskItem(item);
    setModalVisible(true);
  }

  const renderTaskItem = ({ item }: { item: TaskItem }) => (
    <Card className="mb-4 rounded-lg bg-white shadow">
      <Card.Title
        title={item.title}
        subtitle={item.description}
        titleStyle={{ fontSize: 18, fontWeight: "bold" }}
        subtitleStyle={{ fontSize: 14, color: "#4B5563" }}
        right={() => (
          <View className="flex items-center mr-2">
            <View
              className={`w-5 h-5 rounded-full ${
                item.status === "Yet to Start"
                  ? "bg-red-500"
                  : item.status === "OnGoing"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            />

            <Text className="mt-1 text-xs text-gray-600">{item.status}</Text>
          </View>
        )}
      />
      <Card.Content>
        <View className="flex-row justify-between mr-[2px]">
          <Text
            className={`font-bold ${
              item.priority === "High"
                ? "text-red-600"
                : item.priority === "Medium"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {item.priority}
          </Text>
          <TouchableOpacity onPress={() => console.log("edit clicked")}>
            <Entypo
              name="edit"
              size={18}
              color="black"
              onPress={() => openModal(item)}
            />
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View className="p-4 bg-white">
      <FlatList
        data={data}
        renderItem={renderTaskItem}
        keyExtractor={(item) => `${item.id}-${item.status}`}
        showsVerticalScrollIndicator={false}
      />
      {modalVisible && (
        <AddTaskModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          item={taskItem}
        />
      )}
    </View>
  );
};

export default TaskList;
