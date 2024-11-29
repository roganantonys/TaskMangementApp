import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { Card } from "react-native-paper";

const CustomCard = ({ data }: { data: any }) => {
  // Function to render each card
  function renderItem(data: any) {
    // Determine background color based on task status
    const cardBackgroundColor =
      data.status === "Yet to Start" ? "#FFE6A9" : "#D3F9D8"; // Yellow for Yet to Start, Green for Ongoing

    return (
      <Card
        className="my-3 rounded-2xl shadow-lg w-80 mx-3 pb-2.5 pt-1.5"
        style={{ backgroundColor: cardBackgroundColor }}
      >
        <Card.Title
          title={data.title}
          titleStyle={{
            fontSize: 16,
            fontWeight: "600",
            color: "#333",
          }}
        />
        <Card.Content>
          <View className="p-4">
            <Text className="text-sm text-gray-600 text-left leading-5">
              {data.description}
            </Text>
          </View>
        </Card.Content>
        <Card.Content>
          <Text className="text-xs italic text-gray-500 font-bold text-left mt-1">
            {`Due Date: ${data.dueDate}`}
          </Text>
        </Card.Content>
      </Card>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => renderItem(item)}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CustomCard;
