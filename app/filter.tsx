import  React, {useState, useEffect} from "react";
import {StyleSheet, Button, Text, View, Pressable, Platform, ScrollView, TouchableOpacity} from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StackNavigationProp  } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";

import DatePicker from "../components/date_picker";
import DanceFilter from '../components/dance_filter';
import BlueButton from '../components/button';


const FilterPage = () => {

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

return(

    <SafeAreaProvider style = {styles.container}>
        <View> 
            <Text style = {styles.titleText}>Filters</Text>
        </View>
        <View style={styles.content}>
            <View>
                <Text>Fecha de Inicio</Text>
                <DatePicker
                    date={startDate}
                    onChange={setStartDate}
                    show={showStartDatePicker}
                    setShow={setShowStartDatePicker}
                    mode="date"
                />
            </View>
            <View>
                <Text>Fecha de Finalización</Text>
                <DatePicker
                    date={endDate}
                    onChange={setEndDate}
                    show={showEndDatePicker}
                    setShow={setShowEndDatePicker}
                    mode="date"
                />
            </View>
            <View>
                <Text>Estilos de baile</Text>
                <View style={styles.danceFilter}>
                    <ScrollView scrollEventThrottle={16} horizontal={true} showsHorizontalScrollIndicator={false}>
                        <DanceFilter danceType="Salsa" />
                        <DanceFilter danceType="Bachata" />
                        <DanceFilter danceType="Kizomba" />
                        <DanceFilter danceType="Timba" />   
                    </ScrollView>
                </View>
            </View>
            <View>
                <Text>Localización</Text>
                <Text>Madrid, España</Text>
            </View>
        </View>
        <View style = {styles.buttonContainer}>
            <TouchableOpacity
                onPress = {() => navigation.navigate("home")}
                activeOpacity={0.2}
                style = {styles.registerButton} 
                >
                <Text style={styles.next}>Apply</Text>
            </TouchableOpacity>
        </View>
        <View></View>   
    </SafeAreaProvider>

);
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 30,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },

    titleText: {
        fontSize: 22,
        letterSpacing: -1.5,
        lineHeight: 48,
        alignSelf: "stretch",
        textAlign: "center",
        color: Color.black,
        fontFamily: FontFamily.interBlack,
    },

    content: {
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },

    datebutton:{
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
    },

    datetext:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
    
    danceFilter: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginLeft: -10,
        marginVertical: 5,
        paddingTop: 5,
        paddingBottom: 5,
    },

    buttonContainer:{
        alignItems:'center',
        marginTop: 60,
    },
    next: {
        color: Color.bG,
        textAlign: "left",
        fontSize: FontSize.size_base,
        letterSpacing: -0.3,
        fontWeight: "500",
    },
    registerButton: {
        borderRadius: Border.br_sm,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Color.colorMediumslateblue_200,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        width: 200,
    },

});


export default FilterPage;