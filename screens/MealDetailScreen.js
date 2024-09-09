import React from "react";
import { useLayoutEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { useContext } from "react";
// import { FavoritesContext } from "../store/context/favorites-context"; this we can use if we are using context api of react to play around data in our app.
import {useDispatch, useSelector} from 'react-redux'
import {addFavorite, removeFavorite} from '../store/redux/favorites'

const MealDetailScreen = () => {
  // const favoriteMealsCtx = useContext(FavoritesContext); getting context from useContext hook and then change according to our need.
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids)
  const dispatch = useDispatch() //to invoke the methods to change the state in redux we have dispatch the functions.


  const route = useRoute();
  const { setOptions } = useNavigation();
  const mealId = route.params.mealId;
  const displayMeal = MEALS.find((meal) => {
    return meal.id === mealId;
  });

  //state management for isfavorite item
  const mealIsFavorite = favoriteMealIds.includes(mealId);

  function changeFavoriteStatusHandler() {
    if (mealIsFavorite) {
      // favoriteMealsCtx.removeFavorite(mealId);
      dispatch(removeFavorite({id: mealId}));
    } else {
      // favoriteMealsCtx.addFavorite(mealId);
      dispatch(addFavorite({id: mealId}));
    }
  }

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "star" : "star-outline"}
            color={"white"}
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [setOptions, changeFavoriteStatusHandler]);
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
