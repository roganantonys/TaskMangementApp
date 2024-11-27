import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

import { task } from "../data/tasksData";
import TaskList from "../components/TaskList";

import { FAB } from "react-native-paper";

type Props = {};

const TaskScreen = (props: Props) => {
  const taskData = task;
  const allTasks = taskData.tasks;

  return (
    <View className="flex-1">
      <View className="bg-[#A1EEBD] h-[20%] rounded-l-[40px] rounded-r-[40px] overflow-hidden justify-center items-center">
        <TouchableOpacity className="bg-white w-[80px] h-[40px] rounded-[10px] border border-white justify-center items-center">
          <Text className="text-black font-semibold">Completed</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1">
        <TaskList data={allTasks} />
      </View>
    </View>
  );
};

export default TaskScreen;
