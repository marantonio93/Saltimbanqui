import * as React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp  } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";
import EventCard, {Event} from '../components/flyer';
import DanceFilter from '../components/dance_filter';
import api from "./api";


const ProfilePhoto = require('../assets/images/photo.png');

const Home = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    
    // Inicializa events como un array vacío
    const [events, setEvents] = React.useState<Event[]>([]);

    React.useEffect(() => {
      // Realiza una solicitud GET para obtener eventos desde el backend
      const fetchEvents = async () => {
        try {
          const response = await api.get("/events");
          setEvents(response.data); // Actualiza el estado con los eventos recibidos del backend
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };
  
      fetchEvents(); // Llama a la función para obtener eventos cuando el componente se monte
    }, []); // El segundo argumento [] asegura que este efecto se ejecute solo una vez al montar el componente    

  return (
    <SafeAreaProvider style={styles.container}>
      <View style= {styles.topbar}>
        <View style= {styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
          source={ProfilePhoto}
          style = {styles.topbarprofile} >
          </Image>
        </TouchableOpacity>
        </View>
        <View  style={styles.locationContainer} >        
        <TouchableOpacity onPress={() => navigation.navigate("City")}>
          <View style={styles.iconLocationContainer}>
            <Image
            style={styles.locationIcon}
            source={require("../assets/location_Icon_Blue.png")}>
            </Image>
            <Text style={styles.locationText}> Location</Text>
          </View>
          <Text style={styles.locationCityText}> City</Text>
        </TouchableOpacity>
        </View>
        <View style = {styles.dateContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Calendar")} style = {styles.dateContainer}>
          <Text style={styles.dateText}> Anytime</Text>
          <Image
          style={styles.calendarIcon}
          source={require("../assets/calendar_icon_blue.png")}>
          </Image>
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.linemenu}></View>
      
      <View style={styles.eventMenu}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <ScrollView scrollEventThrottle={16} horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.danceFilter} >
            <DanceFilter danceType="Salsa" />
            <DanceFilter danceType="Bachata" />
            <DanceFilter danceType="Kizomba" />
            <DanceFilter danceType="Timba" />
            </View>
          </ScrollView>
          <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
          {events.map((event: Event) =>(
            <View style={styles.flyerViewContainer} key={event.id}>
              <EventCard event={event} />
            </View>
            ))}
          </ScrollView>
        </ScrollView>
      </View>
      </SafeAreaProvider>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1,
      justifyContent: 'space-between',
    },
    topbar: {
      height: 90,
      paddingTop: 40,
      paddingBottom: 3,
      paddingLeft: 10,
      paddingRight: 10,
      margin: 2,
      flexDirection: "row",
      alignContent: "stretch",
    },
    linemenu: {
      backgroundColor: "grey",
      height: 5,
    },
    eventMenu:{
      backgroundColor: "#EDF1F9",
      flex: 1,
    },
    scrollContainer:{
        flexGrow: 1,
    },
    topbarprofile: {
        width: 40,
        height: 40,
        borderRadius: 18,
        backgroundColor: "green"
    },
    profileContainer:{
      flex: 1,
    },
    locationContainer: {
      flex: 1,
      alignItems:"center",
      paddingTop: 5,
    },
    dateContainer:{
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
      paddingTop: 3,
    },
    iconLocationContainer: {
      flex: 1,
      flexDirection: "row",
    },
    locationIcon: {
      width: 11,
      height: 16,
    },
    locationText: {
      color: Color.black,
      fontFamily: FontFamily.interBlack,
      fontWeight: "600",
      letterSpacing: -0.3,
      fontSize: FontSize.size_xs,
      marginLeft: 5,
    },
    locationCityText: {
      flex: 1,
      fontSize: FontSize.size_xs,
      letterSpacing: -0.2,
      color: Color.darkGrey,
      fontFamily: FontFamily.interBlack,
      fontWeight: "100",
      textAlignVertical: "top",
      marginLeft: 15,
      marginBottom: 5,
    },
    dateText: {
      color: Color.black,
      fontFamily: FontFamily.interBlack,
      fontWeight: "600",
      letterSpacing: -0.3,
      fontSize: FontSize.size_xs,
    },
    calendarIcon: {
      width: 22,
      height: 25,
      marginLeft: 5,
    },
    danceFilter: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 5,
      marginBottom: 5,
      paddingTop: 5,
    },
    flyerViewContainer: {
      paddingHorizontal: 10,
      paddingBottom: 20,
    },
    flyerContainer: {
      backgroundColor: Color.colorWhite,
      borderRadius: Border.br_base, 
      margin: 5, 
    }, 
    
  });
  
  export default Home;