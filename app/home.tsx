import * as React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Animated,
} from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp  } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import Swiper from 'react-native-swiper';
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";
import SearchBar from '../components/search_bar';
import EventCard, {Event} from '../components/flyer';
import FilterPage from './filter';
import api from "./api";


const ProfilePhoto = require('../assets/images/photo.png');

const Home = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    // Inicializa events como un array vacío
    const [events, setEvents] = React.useState<Event[]>([]);
    const [searchResults, setSearchResults] = React.useState<Event[]>([]);

    
      // Realiza una solicitud GET para obtener eventos desde el backend
      const fetchEvents = async () => {
        try {
          const response = await api.get("/events");
          setEvents(response.data); // Actualiza el estado con los eventos recibidos del backend
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };
  
    React.useEffect(() => {
      fetchEvents(); // Llama a la función para obtener eventos cuando el componente se monte
    }, []); // El segundo argumento [] asegura que este efecto se ejecute solo una vez al montar el componente    

      const handleSearch = async (searchTerm: string) => {
        if (searchTerm.trim() === ""){
          fetchEvents();
          setSearchResults([]);
        }else{
          try {
            const response = await api.get(`/filter/events/${searchTerm}`);
            setSearchResults(response.data); // Actualiza el estado con los resultados de la búsqueda
          } catch (error) {
            console.error("Error searching events:", error);
          }
        }
      };

  return (
  
  <Swiper
    loop = {false}
    showsPagination = {false}
    index={0}
    >
    <SafeAreaProvider style={styles.container}>
      <View style = {styles.topbar}>
        <View style = {styles.ubication}>
          <Image
            style = {styles.ubicationIcon}
            contentFit="contain"
            source={require("../assets/ubication_icon.svg")}
          />
          <Text> Zurich </Text>
        </View>
        <SearchBar onSearch={handleSearch} />
        <View style = {styles.ubication}>
          <Image
            style = {styles.filterIcon}
            contentFit="contain"
            source={require("../assets/filter.svg")}
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}>
        {(searchResults.length > 0 ? searchResults : events).map((event:Event) => (
          <View style={styles.flyerViewContainer} key={event.id}>
            <EventCard event={event} />
          </View>
          ))}
      </ScrollView>
    </SafeAreaProvider>
    <Swiper
    loop = {false}
    showsPagination = {false}
    index={1}
    >
    <SafeAreaProvider>
        <FilterPage />
    </SafeAreaProvider>
    </Swiper>
  </Swiper>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1,
      marginTop: 25,
    },
    topbar: {
      flexDirection: "row",
      alignItems: "center", // Alinea los elementos verticalmente
      paddingHorizontal: 10, // Añade espacio horizontal
      paddingVertical: 10,

    },
    ubication: {
      paddingTop: 10,
      paddingLeft: 10,
      flexDirection:"row",
      alignItems: "center", // Alinea los elementos verticalmente

    },
    ubicationIcon: {
      width: 11,
      height: 17,
      marginRight: 4,
    },
    filterIcon: {
      width: 30,
      height: 30,
    },
    scrollContent:{
      paddingTop: 15,
    },

    flyerViewContainer: {
      width: "100%",
      paddingBottom: 20,
      paddingHorizontal: 10,
    },
    
  });
  
  export default Home;