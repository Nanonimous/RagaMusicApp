export type RootStackParamList = {
  Splash:undefined;
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
  arohanam : string[];
  avarohanam : string[];
  cat : string
}
