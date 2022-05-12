import { createContext, useState } from "react";

interface FavouritesState {
  ids: Array<string>;
  addFavourite: (id: string) => void;
  removeFavourite: (id: string) => void;
}

export const FavouritesContext = createContext<FavouritesState>({
  ids: [],
  addFavourite: (_id: string) => {},
  removeFavourite: (_id: string) => {},
});

const FavouriteContextProvider = ({ children }: { children: JSX.Element}) => {
  const [favouriteMeals, setFavouriteMeals] = useState<Array<string>>([]);

  const addFavourite = (id: string) => {
    setFavouriteMeals((prevMeals) => [...prevMeals, id]);
  }

  const removeFavourite = (id: string) => {
    setFavouriteMeals((prevMeals) => {
      return prevMeals.filter((meal) => meal !== id)
    });
  }

  const defaulState: FavouritesState = {
    ids: favouriteMeals,
    addFavourite,
    removeFavourite
  }

  return <FavouritesContext.Provider value={defaulState}>{children}</FavouritesContext.Provider>;
};

export default FavouriteContextProvider;
