import * as React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  Button,
} from "react-native";
import { Image } from "expo-image";
import { StackNavigationProp  } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { Event } from "../components/flyer";
import api from "./api"; // Importa api.tsx desde la ruta correcta


const ProfilePhoto = require('../assets/images/photo.png');

const Home = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    const [buttonColorSalsa, setButtonColorSalsa] = React.useState(false);
    const [buttonColorBachata, setButtonColorBachata] = React.useState(false);
    const [buttonColorKizomba, setButtonColorKizomba] = React.useState(false);
    const [buttonColorTimba, setButtonColorTimba] = React.useState(false);

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


    const handlePress = (button: 'Salsa' | 'Bachata' | 'Kizomba' | 'Timba') => {
      switch (button) {
        case 'Salsa':
          setButtonColorSalsa(!buttonColorSalsa);
          break;
        case 'Bachata':
          setButtonColorBachata(!buttonColorBachata);
          break;
        case 'Kizomba':
          setButtonColorKizomba(!buttonColorKizomba);
          break;
        case 'Timba':
          setButtonColorTimba(!buttonColorTimba);
          break;
        default:
          break;
      }
    };

    
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          <ScrollView scrollEventThrottle={16} horizontal={true} showsHorizontalScrollIndicator={false}> 
            <View style={styles.danceFilter} >
              <TouchableOpacity
              onPress= { () =>handlePress('Salsa')}
              activeOpacity={0.2}
              style={buttonColorSalsa === false ? styles.registerButtonOFF : styles.registerButtonON}>
                <Text style={styles.next}>Salsa Cubana</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.danceFilter} >
              <TouchableOpacity
              onPress={() => handlePress('Bachata')}
              activeOpacity={0.2} 
              style={buttonColorBachata === false ? styles.registerButtonOFF : styles.registerButtonON}>
                <Text style={styles.next}>Bachata</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.danceFilter} >
              <TouchableOpacity
              onPress={() => handlePress('Kizomba')}
              activeOpacity={0.2} 
              style={buttonColorKizomba === false ? styles.registerButtonOFF : styles.registerButtonON}>
                <Text style={styles.next}>Kizomba</Text>
              </TouchableOpacity>
            </View>
              
            <View style={styles.danceFilter} >
              <TouchableOpacity
              onPress={() => handlePress('Timba')}
              activeOpacity={0.2} 
              style={buttonColorTimba === false ? styles.registerButtonOFF : styles.registerButtonON}>
                <Text style={styles.next}>Timba</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          
          <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
          {events.map(event =>(
            <View style={styles.flyerViewContainer}>
            <TouchableOpacity
              key={event.id}
              onPress= { () => navigation.navigate("Flyer", {eventId: event.id})}
              activeOpacity={1}
              style={ styles.flyerContainer }>

                <View style ={ styles.imageFlyerContainer }>
                  <Image
                  style={styles.flyerImage}
                  contentFit="cover"
                  source={require("../assets/images/flyersalsaricafreitagneu1200px.jpeg")}>
                  </Image>
                </View>

                <View style= {styles.flyerDataContainer }>
                  <View style = {styles.flyerPlaceTimeContainer}>
                    <Text style = {styles.flyerTime}> {event.date} </Text>
                  </View>
                  <View>
                    <Text style = {styles.flyerTitle}> {event.title}
                    </Text>
                  </View>
                  <View style={styles.flyerInfo}>
                    <View style={styles.flyerInfo}>
                      <Image
                        style={styles.flyerMapIcon}
                        contentFit="cover"
                        source={require("../assets/map_in.png")}>
                      </Image>
                      <Text style = {styles.flyerPlace}>
                          Madrid
                      </Text>
                    </View>
                    <View style={styles.flyerPrice}>
                      <Text>
                          15€
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
              onPress= { () => navigation.navigate("Flyer", {eventId: event.id})}
              activeOpacity={1}
              style={ styles.flyerContainer }>

                <View style ={ styles.imageFlyerContainer }>
                  <Image
                  style={styles.flyerImage}
                  contentFit="cover"
                  source={require("../assets/images/flyersalsaricafreitagneu1200px.jpeg")}>
                  </Image>
                </View>

                <View style= {styles.flyerDataContainer }>
                  <View style = {styles.flyerPlaceTimeContainer}>
                    <Text style = {styles.flyerTime}> {event.date} </Text>
                  </View>
                  <View>
                    <Text style = {styles.flyerTitle}> {event.title}
                    </Text>
                  </View>
                  <View style={styles.flyerInfo}>
                    <View style={styles.flyerInfo}>
                      <Image
                        style={styles.flyerMapIcon}
                        contentFit="cover"
                        source={require("../assets/map_in.png")}>
                      </Image>
                      <Text style = {styles.flyerPlace}>
                          Madrid
                      </Text>
                    </View>
                    <View style={styles.flyerPrice}>
                      <Text>
                          15€
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
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
      paddingTop: 10,
      paddingHorizontal: 10,

    },
    registerButtonOFF: {
      borderRadius: Border.br_sm,
      paddingHorizontal: 10,
      paddingVertical: 10,
      borderColor: "white",
      borderWidth: 0.5,
      backgroundColor: Color.colorMediumslateblue_50,
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 10,
      width: 100,
    },
    registerButtonON: {
    borderRadius: Border.br_sm,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: Color.colorMediumslateblue_200,
    backgroundColor: Color.colorMediumslateblue_200,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    width: 100,
    },
    next: {
        color: Color.bG,
        textAlign: "left",
        fontSize: FontSize.size_xs,
        letterSpacing: -0.3,
        fontWeight: "500",
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
    imageFlyerContainer: {
      flex: 1,
    },
    flyerImage: {
      borderTopRightRadius: Border.br_base, 
      borderTopLeftRadius: Border.br_base, 
      height: 300,
      maxWidth: "100%",
      width: "100%",
    },
    flyerDataContainer:{
      flex: 1/4,
      padding: Padding.p_xs,
    },
    flyerPlaceTimeContainer:{
      flexDirection: "row",
      paddingTop: 3,
    },
    flyerTime:{
      textAlign: "left",
      lineHeight: 18,
      fontSize: FontSize.size_xs,
      color: Color.greyscale400,
      fontFamily: FontFamily.interBlack,
    },
    flyerTitle: {
      alignSelf: "stretch",
      marginTop: 4,
      color: Color.greyscale900,
      fontFamily: FontFamily.interBlack,
    },
    flyerMapIcon: {
      height: 12.32,
      width: 10.67,
    },
    flyerInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 5,
    },
    flyerPrice:{
      justifyContent: "flex-end",
      alignSelf: "flex-end",
    },
    flyerPlace: {
      marginLeft: 3,
    },

  });
  


  export default Home;