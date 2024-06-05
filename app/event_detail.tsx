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
import { enGB } from 'date-fns/locale'; 
import { format, parseISO } from 'date-fns';
import { Color, Border, FontSize, FontFamily, Padding } from "../GlobalStyles";
import ArrowGoBack from "../components/arrow_go_back";

/* type EventDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, "EventDetail">;
type EventDetailScreenRouteProp = RouteProp<RootStackParamList, "EventDetail">;
 */

type Props = {
    navigation: any;
    route: any;
  };

const EventDetail: React.FC<Props> = ({navigation, route}) => {
    const { event } = route.params ?? {} as {event: Event};

    const handleGoBack = () => {
        navigation.goBack(); 
    }

    const parsedDate = parseISO(event.date);
    const formattedDate = format(parsedDate, "dd MMM, yyyy", { locale: enGB });
    const formattedDay = format(parsedDate, "EEEE", { locale: enGB });

    return (
    <SafeAreaProvider style={styles.container}>
        <View style = {styles.imageContainer}>
            <ArrowGoBack onPress={handleGoBack} />
            <Image style = {styles.flyerImage}
                contentFit="cover"
                contentPosition={"center"}
                source={require("../assets/images/bananenreiferei.jpg")}
            />
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}
            scrollEventThrottle={16}>
            <View style = {styles.eventBasicInfo}>
                <Text style={styles.flyerTitle}>{event.title}</Text>
                <View style={styles.calendarContainer}>
                    <View style={styles.dateContainer}>
                        <Image style = {styles.calendarImage}
                            contentFit="cover"
                            contentPosition={"center"}
                            source={require("../assets/calendar_event_detail.svg")}
                        />
                    </View>
                    <View>
                        <Text style={styles.textDate}>{formattedDate}</Text>
                        <Text style={styles.textDay}>{formattedDay}</Text>
                    </View>
                </View>
                <View style={styles.calendarContainer}>
                    <View style={styles.locationContainer}>
                        <Image style = {styles.locationImage}
                            contentFit="cover"
                            contentPosition={"center"}
                            source={require("../assets/location_event_detail.svg")}
                        />
                    </View>
                    <View>
                        <Text style={styles.textDate}>{event.place}</Text>
                        <Text style={styles.textDay}>{event.street}, {event.city}</Text>
                    </View>
                </View>
                <View style={styles.danceContainer}>
                    <Text style={styles.subtitle}>About Event</Text>
                    <Text style={styles.description}>{event.description}</Text>
                </View>

            </View>
    </ScrollView>
    </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.bG,
        flex: 1,
        marginTop: 25,
        marginHorizontal: 15,
    },
    scrollView:{
        flex:1,   
    },
    scrollContent: {
        paddingTop: 210, // Para que el contenido comience después de la imagen
    },
    imageContainer: {
        ...StyleSheet.absoluteFillObject,
        height: 200, // Ajusta esto según sea necesario
        //overflow: "hidden",
        borderRadius: Border.br_base,
 
    },
    flyerImage: {
        flex: 1,
        height: undefined,
        width: undefined,
        borderRadius: Border.br_base, 
    },
    eventBasicInfo: {
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: Color.bG,
    },
    flyerTitle: {
        alignSelf: "stretch",
        color: Color.greyscale900,
        fontSize: FontSize.size_titleXXL,
        fontFamily: FontFamily.interBlack,
        paddingBottom: 10,
      },
    overlayArrow: {
        position: "absolute",
        left:10,
        top: 10,
        padding: 10,
        borderRadius: 10,
        zIndex: 1, // Asegura que el botón esté sobre la imagen
        backgroundColor: "rgba(255, 255, 255, 0.3)", // Color blanco con transparencia
      },
    arrow: {
        width: 5.78,
        height: 11.47,
      },
    calendarContainer: {
        flexDirection: "row",
        paddingVertical: 7,
    },
    dateContainer: {
        backgroundColor: Color.bgBlueIcons,
        padding: 10,
        borderRadius: 10,
        marginRight: 15,
    },
    calendarImage: {
        width: 22.5,
        height: 25,
    },
    locationContainer: {
        backgroundColor: Color.bgBlueIcons,
        paddingHorizontal: 12.5,
        paddingVertical: 10,
        borderRadius: 10,
        marginRight: 15,
    },
    locationImage: {
        width: 17.5,
        height: 25,
    },

    textDate: {
        paddingVertical: Padding.p_2xs,
        fontSize: FontSize.size_mini,
        fontFamily: FontFamily.interMedium,
    },
    textDay: {
        paddingVertical: Padding.p_2xs, 
        fontSize: FontSize.size_xs,
        fontFamily: FontFamily.interMedium,
        color: Color.greyscale,
    },
    danceContainer: {
        paddingVertical: 10,
    },
    subtitle:{
        fontSize: FontSize.size_mid_7,
        fontFamily: FontFamily.interMedium,
        color: Color.blackscale400,
    },
    description:{
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.interLight,
        paddingVertical: 5,
        lineHeight: 23,

    },
});
export default EventDetail;