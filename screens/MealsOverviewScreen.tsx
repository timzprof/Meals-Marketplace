import { useLayoutEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { MEALS, CATEGORIES } from "../data/dummy-data";

import { RootStackParamList } from "./navigation/RootStackParams";
import MealsList from "../components/MealsList/MealsList";

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

  return (
    <MealsList items={displayedMeals} />
  );
};

export default MealsOverviewScreen;

