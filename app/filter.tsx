import  React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StackNavigationProp  } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { HeaderBackButton } from '@react-navigation/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";

import DatePicker from "../components/date_picker";
import DanceFilter from '../components/dance_filter';
import BlueButton from '../components/button';



const FilterPage = () => {

    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedDanceStyles, setSelectedDanceStyles] = useState<string[]>([]);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [applyFilters, setApplyFilters] = useState(false); // Estado para aplicar filtros

    useEffect(() => {
        loadFilters();
      }, []);

      // Guardar filtros seleccionados
    const saveFilters = async () => {
        try {
            const filters = { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
            await AsyncStorage.setItem("filters", JSON.stringify(filters));
            navigation.navigate("home", { applyFilters: true});
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
                setApplyFilters(true); // Aplicar filtros si hay filtros almacenados
                console.log(applyFilters);
            }
        } catch (error) {
        console.error("Error loading filters:", error);
        }
    };

    const clearFilters = async () => {
        try{
            const today = new Date();
            setStartDate(today);
            setEndDate(today);
            await AsyncStorage.removeItem("filters");
            navigation.navigate("home", { applyFilters: false });
            console.log(applyFilters);
        } catch (error) {
            console.error("Error clearing filters:", error);
        }
      };

return(

    <SafeAreaProvider style = {styles.container}>
        <View style = {styles.maintitle}> 
            <Text>arrow</Text>
            <Text style = {styles.titleText}>Filters</Text>
            <TouchableOpacity
            onPress = {clearFilters}>
                <Text style={styles.resetText}>Reset all</Text>
            </TouchableOpacity>
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
        </View>
        <View style = {styles.buttonContainer}>
            <TouchableOpacity
                onPress = {saveFilters}
                activeOpacity={0.2}
                style = {styles.registerButton} 
                >
                <Text style={styles.next}>{"Apply FIlters"}</Text>
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
    clearButton: {
        marginTop: 10,
        alignSelf: 'center',
        padding: 10,
        backgroundColor: Color.colorMediumslateblue_200,
        borderRadius: Border.br_sm,
    },
      clearButtonText: {
        color: "red",
        fontFamily: FontFamily.interBold,
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
    maintitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }, 
    resetText:{
        fontFamily: FontFamily.interSemiBold,
        fontSize: FontSize.size_mini,
        alignSelf: "stretch",
        textAlign: "center",
        color: Color.black,
    },

});


export default FilterPage;