import React, {useState, useEffect} from "react";
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
    price_amount: number;
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
        onPress={() => navigation.navigate("event_detail", { event })}
        activeOpacity={1}
        style={styles.flyerContainer}
      >
        <View>
          <Image
            style={styles.flyerImage}
            contentFit= "cover"
            contentPosition={"center"}
            source={require("../assets/images/12_05_2024Zug.jpg")}
          />
        </View>
  
        <View style={styles.flyerDataContainer}>
          <View>
            <Text 
              style={styles.flyerTitle}
              numberOfLines={2}
              ellipsizeMode="tail"
            >{event.title}</Text>
          </View>
          
          <View style={styles.flyerPlaceTimeContainer}>
            <Text style={styles.dateText}> {event.date} </Text>
          </View>
          
          <View style={styles.flyerInfo}>
            <View style={styles.flyerInfo}>
              <Image
                style={styles.flyerMapIcon}
                contentFit="cover"
                source={require("../assets/map_pin.svg")}
              />
              <Text style={styles.placeText}>{event.city}</Text>
            </View>
            <View style={styles.flyerPrice}>
              <Text style = {styles.priceText}>{event.price_amount} CHF</Text>
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
      height:400, 
    },     
    flyerImage: {
      borderTopRightRadius: Border.br_base, 
      borderTopLeftRadius: Border.br_base, 
      height: 250,
      width: "100%",
    },
    flyerDataContainer:{
      padding: Padding.p_mini,
      backgroundColor: Color.colorWhite,
      borderBottomLeftRadius: Border.br_smi,
      borderBottomRightRadius: Border.br_smi,
      flex: 1, // Asegura que el contenido se distribuya de manera uniforme
      justifyContent: 'space-between', // Distribuye el espacio entre los elementos
    },
    flyerPlaceTimeContainer:{
      flexDirection: "row",
    },
    flyerTitle: {
      alignSelf: "stretch",
      color: Color.greyscale900,
      fontSize: FontSize.size_mid_7,
      fontFamily: FontFamily.interBlack,
      height: 50,
      
    },
    dateText:{
      textAlign: "left",
      lineHeight: 18,
      fontSize: FontSize.size_xs,
      color: Color.greyscale400,
      fontFamily: FontFamily.interBlack,
      marginTop: Padding.p_xs,
    },
    flyerInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 5,
    },
    flyerMapIcon: {
      height: 16,
      width: 16,
    },
    placeText: {
      marginLeft: 3,
      color: Color.greyscale200,
      fontFamily: FontFamily.interBlack,
      fontSize: FontSize.size_xs,
    },
    flyerPrice:{
      justifyContent: "flex-end",
      alignSelf: "flex-end",
      backgroundColor: Color.bGBlue200,
      paddingVertical: Padding.p_5xs,
      paddingHorizontal: Padding.p_mini,
      borderRadius: Border.br_5xs,
    },
    priceText:{
      color: Color.bluescale800,
      fontSize: FontSize.size_xs,
      fontFamily: FontFamily.interBlack,
    }
  });
  
  export default EventCard;