import React from "react";
import { View, Text, FlatList } from "react-native";
import { Card } from "react-native-paper";
import { task } from "../data/tasksData";

type Props = {};

const TaskScreen = (props: Props) => {
  const taskData = task;
  const allTasks = [
    ...taskData.tasks.yetToStart.map((item) => ({
      ...item,
      category: "Yet to Start",
    })),
    ...taskData.tasks.ongoing.map((item) => ({
      ...item,
      category: "OnGoing",
    })),
    ...taskData.tasks.finishedTasks.map((item) => ({
      ...item,
      category: "Completed",
    })),
  ];

  const renderTaskItem = ({ item }: { item: any }) => (
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
      </Card.Content>
    </Card>
  );

  return (
    <View className="flex-1">
      <View className="bg-[#A1EEBD] h-[20%] rounded-l-[40px] rounded-r-[40px] overflow-hidden"></View>

      <View className="p-4 bg-gray-100">
        <FlatList
          data={allTasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => `${item.id}-${item.category}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default TaskScreen;
