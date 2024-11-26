export const task = {
  progress: {
    finishedTasks: 10,
    totalTasks: 20,
  },
  tasks: {
    yetToStart: [
      {
        id: "task1",
        title: "Design login screen and SignUp",
        description: "Design the UI for the login page and signUp page",
        dueDate: "2024-11-30",
        status: "Yet to Start",
      },
      {
        id: "task2",
        title: "Prepare API documentation",
        description: "Write the API documentation for the backend services.",
        dueDate: "2024-12-05",
        status: "Yet to Start",
      },
    ],
    ongoing: [
      {
        id: "task3",
        title: "Implement authentication logic",
        description: "Write code to handle user authentication.",
        dueDate: "2024-12-02",
        status: "onGoing",
      },
      {
        id: "task4",
        title: "Fix UI issues on dashboard",
        description: "Resolve layout issues and improve UI responsiveness.",
        dueDate: "2024-12-01",
        status: "onGoing",
      },
    ],
  },
  agenda: [
    {
      id: "agenda1",
      title: "Team Stand-up Meeting",
      time: "2024-11-27T10:00:00",
      location: "Conference Room 1",
      notes: "Discuss progress, blockers, and upcoming deadlines.",
    },
    {
      id: "agenda2",
      title: "Code Review",
      time: "2024-11-28T15:00:00",
      location: "Online Meeting",
      notes: "Review the latest pull requests and ensure code quality.",
    },
  ],
};
