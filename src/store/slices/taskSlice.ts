import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define the structure of a task
type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string; // ISO string or any other format
};

// Define the initial state type
interface TaskState {
  tasks: Task[];
}

// Initial state
const initialState: TaskState = {
  tasks: [],
};

// Create the slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Set all tasks (e.g., when fetching from Firestore)
    setTask(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    // Add a single task
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
  },
});

// Export actions
export const { setTask, addTask } = taskSlice.actions;

// Export reducer
export default taskSlice.reducer;
