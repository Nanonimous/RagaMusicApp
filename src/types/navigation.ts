export type RootStackParamList = {
  HomeTabs: undefined;
   Detail: {itemId : number | null};
    //Detail: undefined;

};

export type BottomTabParamList = {
  Keyboard: undefined;
  Search: undefined;
  AllShows: undefined;
};

export interface Item {
  id: number;
  name: string;
  seq : string[];
  cat : string
}
