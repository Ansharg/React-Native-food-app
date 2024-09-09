import React, { useLayoutEffect } from "react";
import { MEALS } from "../data/dummy-data";
import { useRoute, useNavigation } from "@react-navigation/native";
import { CATEGORIES } from "../data/dummy-data";
import MealsList from "../components/MealsList/MealsList";

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
  return(
    <MealsList items={displayedMeals}/>
  )
};

export default MealsOverviewScreen;


