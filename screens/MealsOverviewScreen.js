import React, { useLayoutEffect } from "react";
import { MEALS } from "../data/dummy-data";
import { FlatList, View, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import MealItem from "../components /MealItem";
import { CATEGORIES } from "../data/dummy-data";

const MealsOverviewScreen = () => {
  const route = useRoute();
  const catId = route.params.categoryId;
  const { setOptions } = useNavigation();

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;
    setOptions({
      title: categoryTitle,
    });
  },[catId, setOptions]);

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  function renderMealItem({ item }) {
    const object = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability,
    };
    return <MealItem {...object} />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
