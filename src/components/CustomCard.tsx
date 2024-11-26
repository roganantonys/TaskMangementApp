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
      <Card style={[styles.flexCard, { backgroundColor: cardBackgroundColor }]}>
        <Card.Title
          title={data.id}
          titleStyle={styles.cardTitle}
          subtitle={data.title}
        />
        <Card.Content>
          <View style={styles.cardContent}>
            <Text style={styles.cardDescription}>{data.description}</Text>
          </View>
        </Card.Content>
        <Card.Content>
          <Text style={styles.dueDate}>{`Due Date: ${data.dueDate}`}</Text>
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

const styles = StyleSheet.create({
  flexCard: {
    marginVertical: 12,
    borderRadius: 16,
    elevation: 6,
    width: 320,
    marginHorizontal: 12,
    paddingBottom: 10,
    paddingTop: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "left",
    lineHeight: 20,
  },
  dueDate: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#777",
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 5,
  },
});
