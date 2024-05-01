import  React, {useState, useEffect} from "react";
import {StyleSheet, Button, Text, SafeAreaView, Pressable, Platform} from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Color } from "../GlobalStyles";
import DatePicker from "../components/date_picker";


const FilterPage = () => {
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

return(

    <SafeAreaProvider style = {styles.container}>
    <Text>Fecha de Inicio</Text>
    <DatePicker
        date={startDate}
        onChange={setStartDate}
        show={showStartDatePicker}
        setShow={setShowStartDatePicker}
        mode="date"
    />

    <Text>Fecha de Finalización</Text>
    <DatePicker
        date={endDate}
        onChange={setEndDate}
        show={showEndDatePicker}
        setShow={setShowEndDatePicker}
        mode="date"
    />
    
    </SafeAreaProvider>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
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
    }

});


export default FilterPage;