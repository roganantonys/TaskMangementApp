import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import { Circle } from "react-native-progress";
import { task } from "../data/tasksData";
import CustomCard from "../components/CustomCard";
import { FAB } from "react-native-paper";
import AddTaskModal from "../components/AddTaskModal";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { fireDB } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setTask } from "../store/slices/taskSlice";

type Props = {};

const DashboardScreen = (props: Props) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const task = useSelector((state) => state.tasks.tasks);
  console.log("tasks:", task);
  const onGoingTask = task.filter((task: any) => task.status === "OnGoing");
  const yetToStart = task.filter((task: any) => task.status === "Yet to Start");

  const [animationStatus, setAnimationStatus] = useState<boolean>(true);
  const progress = 0.75;

  // for task progress bar animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStatus(false); // Stop animation after 3 seconds
    }, 2000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const getData = async () => {
      onSnapshot(collection(fireDB, "tasks"), (res) => {
        const task = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log("fetched data:", task);
        dispatch(setTask(task));
      });
    };
    getData();
  }, []);

  return (
    <>
      <View>
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Task Progress</Text>
            </View>

            <View style={styles.progressContainer}>
              <Circle
                progress={progress}
                size={80}
                thickness={10}
                showsText={true}
                color="#659287"
                unfilledColor="#DEAA79"
                textStyle={styles.progressText}
                animated={true}
                formatText={() => "75%"}
                indeterminateAnimationDuration={2000}
                indeterminate={animationStatus}
                // textStyle={{ color: "blue", fontWeight: "bold" }}
              />
            </View>
          </Card.Content>
        </Card>

        <View>
          <View className="ml-2 mb-2">
            <Text className="text-left text-xl font-bold text-gray-800">
              Yet To Start
            </Text>
          </View>

          <CustomCard data={yetToStart} />
        </View>

        <View>
          <View className="ml-2 mb-2">
            <Text className="text-left text-xl font-bold text-gray-800">
              onGoing
            </Text>
          </View>
          <CustomCard data={onGoingTask} />
        </View>
      </View>
      <FAB
        icon="plus"
        className="bg-[#659287] bottom-[-4px] right-0 m-[16px] absolute"
        onPress={() => setModalVisible(true)}
      />
      {modalVisible && (
        <AddTaskModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  card: {
    marginTop: 50,
    margin: 20,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#FFE6A9",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#000000",
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
