import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Meal from "../../models/meal";
import { RootStackParamList } from "../../screens/navigation/RootStackParams";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MealDetails from "../MealDetails";

interface MealItemProps {
  meal: Meal;
}

type NavigationProps = NativeStackScreenProps<RootStackParamList>;

const MealItem = ({ meal }: MealItemProps) => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.mealItem}>
      <Pressable
        onPress={() => {
          navigation.navigate("MealDetail", {
            mealId: meal.id,
          });
        }}
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
      >
        <View style={styles.innerContainer}>
          <View>
            <Image style={styles.image} source={{ uri: meal.imageUrl }} />
            <Text style={styles.title}>{meal.title}</Text>
          </View>
          <MealDetails
            duration={meal.duration}
            complexity={meal.complexity}
            affordability={meal.affordability}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
});
