import React from "react";
import { useLayoutEffect } from "react";
import { Text, View, Image, StyleSheet, ScrollView, Button } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components /MealDetails";
import Subtitle from "../components /MealDetail/Subtitle";
import List from "../components /MealDetail/List";
import IconButton from "../components /IconButton";

const MealDetailScreen = () => {
  const route = useRoute();
  const { setOptions } = useNavigation();
  const mealId = route.params.mealId;
  const displayMeal = MEALS.find((meal) => {
    return meal.id === mealId;
  });

  function headerButtonPressHandler(){
    console.log("pressed")
  }

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => {
        return <IconButton icon={'star'} color={'white'} onPress={headerButtonPressHandler}/>;
      },
    });
  },[setOptions,headerButtonPressHandler ]);
  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: displayMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{displayMeal.title}</Text>
      <MealDetails
        duration={displayMeal.duration}
        complexity={displayMeal.complexity}
        affordability={displayMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={displayMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={displayMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    height: 350,
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
