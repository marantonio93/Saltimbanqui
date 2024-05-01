import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";
import { Image } from "expo-image";
import api from "../app/api"; // Importa api.tsx desde la ruta correcta



// Define la interfaz Event
export interface Event {
    id: number;
    title: string;
    date: string;
    city: string;
    price: number;
    // Otros campos del evento
  }
  
  interface EventCardProps {
    event: Event;
  }

  const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    
    return (
      <TouchableOpacity
        key={event.id}
        onPress={() => navigation.navigate("Flyer", { eventId: event.id })}
        activeOpacity={1}
        style={styles.flyerContainer}
      >
        <View style={styles.imageFlyerContainer}>
          <Image
            style={styles.flyerImage}
            contentFit="cover"
            source={require("../assets/images/flyersalsaricafreitagneu1200px.jpeg")}
          />
        </View>
  
        <View style={styles.flyerDataContainer}>
          <View style={styles.flyerPlaceTimeContainer}>
            <Text style={styles.flyerTime}> {event.date} </Text>
          </View>
          <View>
            <Text style={styles.flyerTitle}>{event.title}</Text>
          </View>
          <View style={styles.flyerInfo}>
            <View style={styles.flyerInfo}>
              <Image
                style={styles.flyerMapIcon}
                contentFit="cover"
                source={require("../assets/map_in.png")}
              />
              <Text style={styles.flyerPlace}>{event.city}</Text>
            </View>
            <View style={styles.flyerPrice}>
              <Text>{event.price}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
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
  
  export default EventCard;