import { View, FlatList, StyleSheet } from "react-native";

import MealItem from "./MealItem";
import Meal from "../../models/meal";

type MealListProps = {
    items: Meal[]
}

const MealsList = ({ items }: MealListProps) => {
    const renderMealItem = (item: Meal) => {
        return <MealItem meal={item} />;
      };
    
      return (
        <View style={styles.container}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderMealItem(item)}
          />
        </View>
      );
};

export default MealsList;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
  });
  