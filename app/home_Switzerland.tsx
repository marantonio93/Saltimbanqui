import React, {useState, useEffect} from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  SectionList,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp  } from "@react-navigation/stack";
import { useNavigation, ParamListBase, useIsFocused, useRoute, RouteProp } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";
import SearchBar from '../components/search_bar';
import api from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventCard, {Event} from '../components/flyer_small';
import { enGB } from 'date-fns/locale'; 
import { format, parseISO } from 'date-fns';

type HomeScreenRouteProp = RouteProp<{ params: { applyFilters?: boolean } }, 'params'>;

interface EventSection {
  title: string;
  data: Event[];
}

const {width, height} = Dimensions.get('window')
const ITEM_Size = width*0.7

const groupEventsByDate = (events: Event[]): EventSection[] => {
  const groupedEvents: { [key: string]: Event[] } = {};

  events.forEach(event => {
    const date = event.date;
    if (!groupedEvents[date]) {
      groupedEvents[date] = [];
    }
    groupedEvents[date].push(event);
  });

  return Object.keys(groupedEvents).map(date => ({
    title: date,
    data: groupedEvents[date],
  }));
};



const HomeSwitzerland = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    
  const isFocused = useIsFocused();
  const route = useRoute<HomeScreenRouteProp>();
  const [events, setEvents] = React.useState<Event[]>([]);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("Fetching events...");
        const response = await api.get("/events");
        console.log("Events response:", response.data); // Agrega esta línea para imprimir la respuesta
        setEvents(response.data);
        const initialExpandedState: { [key: string]: boolean } = {};
       (response.data as Event[]).forEach((event:Event) => {
          initialExpandedState[event.date] = true;
        });
        setExpandedSections(initialExpandedState);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const sections = groupEventsByDate(events);

  const toggleSection = (title: string) => {
    setExpandedSections(prevState => ({
      ...prevState,
      [title]: !prevState[title],
    }));
  };  

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'EEEE, MMMM d, yyyy'); // Ejemplo: Lunes, Enero 1, 2022
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <View style = {styles.topbar}>
        <View>
          <Image
            style = {styles.stbkIcon}
            contentFit="contain"
            source={require("../assets/STBQ.svg")} 
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("filter")}
          activeOpacity={1}>
        <View style = {styles.filter}>
          <Image
            style = {styles.filterIcon}
            contentFit="contain"
            source={require("../assets/filter.svg")}
          />
        </View>
        </TouchableOpacity>
      </View>
      <View style={styles.viewContent}>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          renderSectionHeader={({ section }) => (
            <>
            <TouchableOpacity onPress={() => toggleSection(section.title)} style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{formatDate(section.title)}</Text>
              <Text style={styles.sectionArrow}>
                {expandedSections[section.title] ? '▼' : '▶'}
              </Text>
            </TouchableOpacity>
            {expandedSections[section.title] && (
              <FlatList
                data={section.data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                snapToInterval={ITEM_Size}
                bounces={false}
                renderItem={({ item }) => (
                  <View style={styles.flyerViewContainer}>
                    <EventCard event={item} />
                  </View>
                )}
                contentContainerStyle={styles.scrollContent}
              />
            )}
            </>
          )}
          renderItem={() => null}
          contentContainerStyle={styles.scrollContent}
        />
      </View>
    </SafeAreaProvider>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: Color.bG,
      flex: 1,
      marginTop: 25,
    },
    topbar: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center", // Alinea los elementos verticalmente
      paddingHorizontal: 15, // Añade espacio horizontal
      paddingTop: 10,
      paddingBottom: 10,
    },
    ubication: {
      paddingLeft: 10,
      flexDirection:"row",
      alignItems: "center", // Alinea los elementos verticalmente
      marginTop: 5,
      },
    ubicationIcon: {
      width: 11,
      height: 17,
      marginRight: 4,
    },
    ubicationText: {
      fontFamily: FontFamily.interBlack,
      color: Color.grey,
    },
    filter: {
      paddingLeft: 10,
      paddingRight: 10,
    },
    filterIcon: {
      width: 30,
      height: 30,
    },
    stbkIcon: {
      width:  106,
      height: 42,
    },
    scrollContent:{
      paddingTop: 15,
    },

    viewContent: {
      paddingBottom: 30,
    },

    flyerViewContainer: {
      width: ITEM_Size,
      paddingBottom: 20,
      paddingHorizontal: 10,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: Color.colorWhite,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: Border.br_base,
      marginVertical: 5,
    },
    sectionTitle: {
      fontFamily: FontFamily.interBold,
      fontSize: FontSize.size_mini,
      color: Color.greyscale900,
    },
    sectionArrow: {
      fontSize: FontSize.size_mini,
      fontFamily: FontFamily.interBlack,
      color: Color.blueLogo,
    },
    
  });
  
  export default HomeSwitzerland;