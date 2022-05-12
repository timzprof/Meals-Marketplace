import { useLayoutEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import MealItem from "../components/MealItem";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import Meal from "../models/meal";

import { RootStackParamList } from "./navigation/RootStackParams";

type NavigationProps = NativeStackScreenProps<RootStackParamList, "MealsOverview">;

const MealsOverviewScreen = ({ route, navigation }: NavigationProps) => {
  const { categoryId } = route.params;

  const displayedMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(categoryId)
  );

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === categoryId
    )?.title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [categoryId, navigation]);

  const renderMealItem = (item: Meal) => {
    return <MealItem meal={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderMealItem(item)}
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
