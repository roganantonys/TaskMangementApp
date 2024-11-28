import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Agenda, AgendaItemsMap, AgendaEntry } from "react-native-calendars";
import { FAB } from "react-native-paper";
import AgendaModal from "../components/AgendaModal";
import { onSnapshot, collection, deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../firebase";
import { AntDesign } from "@expo/vector-icons";

// Define the Task type
interface Task {
  time: string;
  title: string;
  id: string;
  date: string;
}

const AgendaScreen: React.FC = () => {
  const [events, setEvents] = useState<AgendaItemsMap<Task>>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    // Real-time listener for Firestore collection
    const unsubscribe = onSnapshot(
      collection(fireDB, "agendaItems"),
      (querySnapshot) => {
        const fetchedEvents: AgendaItemsMap<Task> = {};

        querySnapshot.forEach((doc) => {
          const data = doc.data(); // Explicitly cast to Task
          const eventDate = data.date; // Date in 'YYYY-MM-DD' format
          console.log("date", data);
          if (!fetchedEvents[eventDate]) {
            fetchedEvents[eventDate] = [];
          }

          fetchedEvents[eventDate].push({
            ...data,
            id: doc.id,
          });
        });

        console.log("events:", fetchedEvents);
        setEvents(fetchedEvents);
      }
    );

    return () => unsubscribe();
  }, []);

  const onDeleteAgendaItem = async (id: any) => {
    await deleteDoc(doc(fireDB, "agendaItems", id))
      .then((res) => {
        console.log("even deleted");
      })
      .catch((err) => {
        console.log("event not deleted:", err);
      });
  };
  const renderAgendaItem = (item: Task) => (
    <View className="bg-white p-4 rounded-lg shadow-md my-2 mr-[20px]">
      <View>
        <Text className="text-lg font-bold">{item.title}</Text>
        <Text className="text-sm text-gray-500">{item.time}</Text>
      </View>

      <View className="flex-row justify-end items-center">
        <TouchableOpacity onPress={() => onDeleteAgendaItem(item.id)}>
          <AntDesign name="delete" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyData = () => (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-gray-500">No events for this day</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 mt-[10px]">
      <Agenda
        items={events}
        selected={"2024-11-26"}
        renderItem={(item) => renderAgendaItem(item)}
        renderEmptyData={renderEmptyData}
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
        />
      )}
      <FAB
        icon="plus"
        className="absolute bottom-4 right-4 bg-green-500"
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
};

export default AgendaScreen;
