import React from "react";
import { FlatList } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";
import { useNavigation } from "@react-navigation/native";

const CategoriesScreen = () => {
  const { navigate } = useNavigation()
  const renderCategoryItem = ({title,color,id}) => {
    function pressHandler(){
      navigate('MealsOverview',{
        categoryId: id
      })
    }
    return (
      <CategoryGridTile title={title} color={color} onPress={pressHandler}/>
    );
  };
  return (
    <>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={({item})=>renderCategoryItem(item)}
        numColumns={2}
      />
    </>
  );
};

export default CategoriesScreen;
