import React from "react";
import { View, Text, FlatList } from "react-native";

import { task } from "../data/tasksData";
import TaskList from "../components/TaskList";

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

  return (
    <View className="flex-1">
      <View className="bg-[#A1EEBD] h-[20%] rounded-l-[40px] rounded-r-[40px] overflow-hidden"></View>
      <TaskList data={allTasks} />
    </View>
  );
};

export default TaskScreen;
