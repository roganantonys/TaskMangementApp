import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
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

  const task = useSelector((state: any) => state.tasks.tasks);
  console.log("tasks:", task);
  const onGoingTask = task.filter((task: any) => task.status === "OnGoing");
  const yetToStart = task.filter((task: any) => task.status === "Yet to Start");

  const [animationStatus, setAnimationStatus] = useState<boolean>(true);
  const [progressPer, setProgressPer] = useState(0);
  const progress = 0.75;

  function animationTimer() {
    setTimeout(() => {
      setAnimationStatus(false); // Stop animation after 3 seconds
    }, 2000);
  }
  useEffect(() => {
    animationTimer();
  }, []);

  useLayoutEffect(() => {
    const getData = async () => {
      onSnapshot(collection(fireDB, "tasks"), (res) => {
        console.log("size", res.size);
        const task = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log("fetched data:", task);
        dispatch(setTask(task));
        const finishedTaskCount = task.filter(
          (item) => item.status == "Finished"
        ).length;
        const progress =
          res.size > 0 ? (finishedTaskCount / res.size) * 100 : 0;
        setProgressPer(Math.round(progress));
        console.log("Progress Percentage:", Math.round(progress));

        animationTimer();
      });
    };
    getData();
  }, []);

  return (
    <View className="bg-white flex-1">
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Task Progress</Text>
          </View>

          <View style={styles.progressContainer}>
            <Circle
              progress={progressPer / 100}
              size={80}
              thickness={10}
              showsText={true}
              color="#659287"
              unfilledColor="#DEAA79"
              textStyle={styles.progressText}
              animated={true}
              formatText={() => `${progressPer}%`}
              indeterminateAnimationDuration={2000}
              indeterminate={animationStatus}
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
    </View>
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
