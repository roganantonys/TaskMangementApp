import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import Entypo from "@expo/vector-icons/Entypo";

type TaskItem = {
  id: string;
  title: string;
  category: "Yet to Start" | "OnGoing" | "Completed";
  priority: "High" | "Medium" | "Low";
};

type Props = {
  data: TaskItem[];
};

const renderTaskItem = ({ item }: { item: TaskItem }) => (
  <Card className="mb-4 rounded-lg bg-white shadow">
    <Card.Title
      title={item.id}
      subtitle={item.title}
      titleStyle={{ fontSize: 18, fontWeight: "bold" }}
      subtitleStyle={{ fontSize: 14, color: "#4B5563" }}
      right={() => (
        <View className="flex items-center mr-2">
          <View
            className={`w-5 h-5 rounded-full ${
              item.category === "Yet to Start"
                ? "bg-red-500"
                : item.category === "OnGoing"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          />

          <Text className="mt-1 text-xs text-gray-600">{item.category}</Text>
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
          <Entypo name="edit" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </Card.Content>
  </Card>
);

const TaskList = ({ data }: Props) => {
  return (
    <View className="p-4 bg-gray-100">
      <FlatList
        data={data}
        renderItem={renderTaskItem}
        keyExtractor={(item) => `${item.id}-${item.category}`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TaskList;