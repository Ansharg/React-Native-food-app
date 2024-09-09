import React, { useContext } from "react";
import MealsList from "../components/MealsList/MealsList";
// import { FavoritesContext } from "../store/context/favorites-context";
import { MEALS } from "../data/dummy-data";
import { StyleSheet, View , Text } from "react-native";
import { useSelector } from "react-redux";

const FavouriteScreen = () => {
  // const favoriteMealsCtx = useContext(FavoritesContext);
  const favoriteMealIds = useSelector(state => state.favoriteMeals.ids)

  const displayMeals = MEALS.filter((meal) => {
    return favoriteMealIds.includes(meal.id);
  });
  if (displayMeals.length > 0) {
    return <MealsList items={displayMeals} />;
  }
  else{
    return <View style={styles.rootContainer}>
      <Text style={styles.text}>You have no favorite meals yet.</Text>
    </View>
  }
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
})
