import { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navigation/RootStackParams";

import { MEALS } from "../data/dummy-data";
import Meal from "../models/meal";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";

import {useAppSelector, useAppDispatch} from '../store/redux/hooks';
import {removeFavourite, addFavourite} from '../store/redux/favourites';
//import {FavouritesContext} from '../store/context/favourite-context';

type NavigationProps = NativeStackScreenProps<RootStackParamList, "MealDetail">;

const MealDetailScreen = ({ navigation, route }: NavigationProps) => {
  //const favouriteMealsCtx = useContext(FavouritesContext);
  const favouriteMealsIds = useAppSelector((state) => state.favouriteMeals.ids);
  const dispatch = useAppDispatch();

  const mealId: string = route.params.mealId;
  const selectedMeal: Meal = MEALS.find(
    (meal) => meal.id === mealId
  )!;

  const mealIsFavourite: boolean = favouriteMealsIds.includes(mealId);

  const changeFavouriteStatus = () => {
    if(mealIsFavourite){
      dispatch(removeFavourite({id: mealId}));
    } else {
      dispatch(addFavourite({id: mealId}));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavourite ? 'star': 'star-outline'}
            color={"white"}
            onPress={changeFavouriteStatus}
          />
        );
      },
    });
  }, [navigation, changeFavouriteStatus]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
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
    width: "100%",
    height: 200,
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
