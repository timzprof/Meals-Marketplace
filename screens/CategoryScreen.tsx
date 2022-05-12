import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import CategoryGridTile from '../components/CategoryGridTile';

import {CATEGORIES} from '../data/dummy-data';
import Category from '../models/category';

import {RootStackParamList} from './navigation/RootStackParams';

type NavigationProps = NativeStackScreenProps<RootStackParamList, 'MealsOverview'>;

const CategoryScreen = ({ navigation }: NavigationProps) => {

    const renderCategoryItem = (item: Category) => {
        const pressHandler = () => {
            navigation.navigate("MealsOverview", {categoryId: item.id});
        };
        return <CategoryGridTile title={item.title} color={item.color} onPress={pressHandler} />;
    }

    return <FlatList 
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => renderCategoryItem(item)}
        numColumns={2}
    />
};

export default CategoryScreen;
