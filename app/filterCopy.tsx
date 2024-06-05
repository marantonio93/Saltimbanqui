/* import  React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StackNavigationProp  } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";

import DatePicker from "../components/date_picker";
import DanceFilter from '../components/dance_filter';
import BlueButton from '../components/button';


const FilterPageCopy = () => {

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedDanceStyles, setSelectedDanceStyles] = useState<string[]>([]);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    useEffect(() => {
        loadFilters();
      }, []);

      // Guardar filtros seleccionados
    const saveFilters = async () => {
        try {
        const filters = { startDate, endDate, selectedDanceStyles };
        await AsyncStorage.setItem("filters", JSON.stringify(filters));
        navigation.navigate("home");
        } catch (error) {
        console.error("Error saving filters:", error);
        }
    };

    // Cargar filtros almacenados
    const loadFilters = async () => {
        try {
        const filtersString = await AsyncStorage.getItem("filters");
        if (filtersString) {
            const filters = JSON.parse(filtersString);
            setStartDate(new Date(filters.startDate));
            setEndDate(new Date(filters.endDate));
            setSelectedDanceStyles(filters.selectedDanceStyles || []);
        }
        } catch (error) {
        console.error("Error loading filters:", error);
        }
    };

    // Función para manejar la selección de un estilo de baile
    const handleDanceStyleSelection = (danceType: string, selected: boolean) => {
        if (selected) {
            setSelectedDanceStyles([...selectedDanceStyles, danceType]);
        } else {
            setSelectedDanceStyles(selectedDanceStyles.filter(style => style !== danceType));
        }
    };

return(

    <SafeAreaProvider style = {styles.container}>
        <View> 
            <Text style = {styles.titleText}>Filters</Text>
        </View>
        <View style={styles.content}>
            <View style = {styles.categoryView}>
                <Text style = {styles.categoryText}>Dates</Text>
                <View style = {styles.datePickers}>
                <DatePicker
                    date={startDate}
                    onChange={setStartDate}
                    show={showStartDatePicker}
                    setShow={setShowStartDatePicker}
                    mode="date"
                />
                <Text style = {styles.guion}> _ </Text>
                
                <DatePicker
                    date={endDate}
                    onChange={setEndDate}
                    show={showEndDatePicker}
                    setShow={setShowEndDatePicker}
                    mode="date"
                />
                </View>
            </View>
            <View style = {styles.categoryView}>
                <Text style = {styles.categoryText}>Dance Styles</Text>
                <View style={styles.danceFilter}>
                    <ScrollView scrollEventThrottle={16} horizontal={true} showsHorizontalScrollIndicator={false}>
                        <DanceFilter danceType="Salsa" selected={selectedDanceStyles.includes("Salsa")} onSelect={handleDanceStyleSelection} />
                        <DanceFilter danceType="Bachata" selected={selectedDanceStyles.includes("Bachata")} onSelect={handleDanceStyleSelection} />
                        <DanceFilter danceType="Kizomba" selected={selectedDanceStyles.includes("Kizomba")} onSelect={handleDanceStyleSelection} />
                        <DanceFilter danceType="Timba" selected={selectedDanceStyles.includes("Timba")} onSelect={handleDanceStyleSelection} />  
                    </ScrollView>
                </View>
            </View>
            <View style = {styles.categoryView}>
                <Text style = {styles.categoryText}>Location</Text>
                <Text style = {styles.datePickers}>Madrid, España</Text>
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
        paddingHorizontal: 10,
        backgroundColor: Color.bG,

    },
    titleText: {
        fontSize: FontSize.size_screenTitleFilter,
        alignSelf: "stretch",
        textAlign: "center",
        color: Color.black,
        fontFamily: FontFamily.interBold,
        paddingTop: Padding.p_xl_2,
        paddingBottom: Padding.p_xl_2,
    },
    content: {
        justifyContent: 'space-between',
        paddingHorizontal: Padding.p_xl_2,
        marginHorizontal: 10
    },
    categoryView: {
        justifyContent: "center",
    },
    categoryText: {
        fontSize: FontSize.size_mini,
        fontFamily: FontFamily.interBlack,
        paddingVertical: Padding.p_xs,
    },
    datePickers: {
        flexDirection: "row",
    },
    guion: {
        marginTop: 5,
        alignContent:"center",
    },
    danceFilter: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: -10,
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


export default FilterPageCopy; */