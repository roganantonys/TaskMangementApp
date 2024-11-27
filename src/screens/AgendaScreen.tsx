import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { Agenda, AgendaSchedule } from "react-native-calendars";
import { FAB } from "react-native-paper";
import AgendaModal from "../components/AgendaModal";

const AgendaScreen = () => {
  console.log("profile clicked");

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  interface Event {
    time: string;
    title: string;
    location: string;
    notes: string;
    // other fields relevant to your event
  }

  type AgendaItems = {
    [key: string]: Event[]; // A dictionary where the key is the date string, and the value is an array of events
  };

  const items: AgendaItems = {
    "2024-11-27": [
      {
        time: "10:00 AM",
        title: "Team Stand-up Meeting",
        location: "Conference Room 1",
        notes: "Discuss progress, blockers, and upcoming deadlines.",
      },
      {
        time: "2:00 PM",
        title: "Code Review",
        location: "Online Meeting",
        notes: "Review the latest pull requests and ensure code quality.",
      },
    ],
    "2024-11-28": [
      {
        time: "9:00 AM",
        title: "Project Planning",
        location: "Meeting Room 2",
        notes: "Plan for the next sprint and allocate tasks.",
      },
    ],
    "2024-11-29": [
      {
        time: "3:00 PM",
        title: "Client Demo",
        location: "Conference Room 1",
        notes: "Show the client the latest build and gather feedback.",
      },
    ],
  };

  const renderAgendaItem = (item: Event) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.time}>{item.time}</Text>
      <Text style={styles.location}>{item.location}</Text>
      <Text style={styles.notes}>{item.notes}</Text>
    </View>
  );

  return (
    <View className="flex-1 p-4">
      <Agenda
        items={items}
        selected={"2024-11-26"}
        renderItem={renderAgendaItem}
        renderEmptyData={() => (
          <View style={styles.emptyData}>
            <Text>No events for this day</Text>
          </View>
        )}
        theme={{
          selectedDayBackgroundColor: "#00adf5",
          todayTextColor: "#00adf5",
          dotColor: "#00adf5",
          selectedDotColor: "#00adf5",
        }}
      />
      {modalVisible && (
        <AgendaModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          items={items}
        />
      )}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
};

export default AgendaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  time: {
    fontSize: 14,
    color: "#555",
  },
  location: {
    fontSize: 14,
    color: "#777",
  },
  notes: {
    fontSize: 12,
    color: "#444",
    marginTop: 5,
  },
  emptyData: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#659287",
  },
});
