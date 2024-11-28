// import React, { useState } from "react";
// import { View, Text, FlatList, TouchableOpacity } from "react-native";

// import { task } from "../data/tasksData";
// import TaskList from "../components/TaskList";
// import { useSelector } from "react-redux";
// import { FAB } from "react-native-paper";
// import AddTaskModal from "../components/AddTaskModal";
// import FilterButtons from "../components/filterButtons";
// import DropDownPicker from "react-native-dropdown-picker";
// type Props = {};

// const TaskScreen = (props: Props) => {
//   const [status, setStatus] = useState(null);
//   const [priority, setPriority] = useState(null);
//   const [statusOpen, setStatusOpen] = useState(false);
//   const [priorityOpen, setPriorityOpen] = useState(false);

//   const statusOptions = [
//     { label: "Select Status", value: "null" },
//     { label: "Yet to Start", value: "Yet to Start" },
//     { label: "Ongoing", value: "OnGoing" },
//     { label: "Finished", value: "Finished" },
//   ];

//   const priorityOptions = [
//     { label: "Select Priority", value: "null" },
//     { label: "High", value: "High" },
//     { label: "Medium", value: "Medium" },
//     { label: "Low", value: "Low" },
//   ];

//   const task = useSelector((state: any) => state.tasks.tasks);

//   return (
//     <View className="flex-1">
//       {/* Header Section */}
//       <View className="bg-[#A1EEBD] py-4 px-4">
//         {/* Dropdown Section */}
//         <View className="flex-row justify-between w-full mb-4 mt-[20px]">
//           <View style={{ width: "45%" }}>
//             <DropDownPicker
//               open={priorityOpen}
//               value={priority}
//               items={priorityOptions}
//               setOpen={(open) => {
//                 setPriorityOpen(open);
//                 if (open) setStatusOpen(false); // Close the other dropdown
//               }}
//               setValue={setPriority}
//               placeholder="Select Priority"
//               containerStyle={{ zIndex: priorityOpen ? 2000 : 1 }}
//               dropDownContainerStyle={{ zIndex: 2000 }}
//             />
//           </View>

//           <View style={{ width: "45%" }}>
//             <DropDownPicker
//               open={statusOpen}
//               value={status}
//               items={statusOptions}
//               setOpen={(open) => {
//                 setStatusOpen(open);
//                 if (open) setPriorityOpen(false); // Close the other dropdown
//               }}
//               setValue={setStatus}
//               placeholder="Select Status"
//               containerStyle={{ zIndex: statusOpen ? 2000 : 1 }}
//               dropDownContainerStyle={{ zIndex: 2000 }}
//             />
//           </View>
//         </View>
//       </View>

//       {/* Task List Section */}
//       <View className="flex-1 bg-white">
//         <TaskList data={task} />
//       </View>
//     </View>
//   );
// };

// export default TaskScreen;

import React, { useState, useMemo } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import TaskList from "../components/TaskList";

type Props = {};

const TaskScreen = (props: Props) => {
  const [status, setStatus] = useState(null);
  const [priority, setPriority] = useState(null);
  const [statusOpen, setStatusOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);

  const statusOptions = [
    { label: "Select Status", value: null },
    { label: "Yet to Start", value: "Yet to Start" },
    { label: "Ongoing", value: "OnGoing" },
    { label: "Finished", value: "Finished" },
  ];

  const priorityOptions = [
    { label: "Select Priority", value: null },
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
  ];

  const allTasks = useSelector((state: any) => state.tasks.tasks);

  // Filter tasks based on selected dropdown values
  const filteredTasks = useMemo(() => {
    return allTasks.filter((task: any) => {
      const matchesStatus = status ? task.status === status : true;
      const matchesPriority = priority ? task.priority === priority : true;
      return matchesStatus && matchesPriority;
    });
  }, [allTasks, status, priority]);

  return (
    <View className="flex-1">
      {/* Header Section */}
      <View className="bg-[#A1EEBD] py-4 px-4">
        {/* Dropdown Section */}
        <View className="flex-row justify-between w-full mb-4 mt-[20px]">
          <View style={{ width: "45%" }}>
            <DropDownPicker
              open={priorityOpen}
              value={priority}
              items={priorityOptions}
              setOpen={(open) => {
                setPriorityOpen(open);
                if (open) setStatusOpen(false); // Close the other dropdown
              }}
              setValue={setPriority}
              placeholder="Select Priority"
              containerStyle={{ zIndex: priorityOpen ? 2000 : 1 }}
              dropDownContainerStyle={{ zIndex: 2000 }}
            />
          </View>

          <View style={{ width: "45%" }}>
            <DropDownPicker
              open={statusOpen}
              value={status}
              items={statusOptions}
              setOpen={(open) => {
                setStatusOpen(open);
                if (open) setPriorityOpen(false); // Close the other dropdown
              }}
              setValue={setStatus}
              placeholder="Select Status"
              containerStyle={{ zIndex: statusOpen ? 2000 : 1 }}
              dropDownContainerStyle={{ zIndex: 2000 }}
            />
          </View>
        </View>
      </View>

      {/* Task List Section */}
      <View className="flex-1 bg-white">
        <TaskList data={filteredTasks} />
      </View>
    </View>
  );
};

export default TaskScreen;
