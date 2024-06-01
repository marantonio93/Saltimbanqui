import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, Pressable } from "react-native";
import { FontFamily, FontSize, Padding } from "../GlobalStyles";

interface DatePickerProps {
    date: Date;
    onChange: (selectedDate: Date) => void;
    show: boolean;
    setShow: (show: boolean) => void;
    mode: "date" | "time" | "datetime" | "countdown";
}

const DatePicker: React.FC<DatePickerProps> = ({ date, onChange, show, setShow, mode }) => {
    const handlePress = () => {
        setShow(true);
    };

    const handleChange = (_event: any, selectedDate: Date | undefined) => {
        setShow(false);
        if (selectedDate) {
            onChange(selectedDate);
        }
    };

    return (
        <>
            <Pressable style={styles.dateButton} onPress={handlePress} >
                <Text style={styles.dateText}>{date.toLocaleDateString('de-DE', {day: '2-digit', month: 'short', year: 'numeric' })}</Text>
                {show && (
                    <DateTimePicker
                        testID="datePicker"
                        value={date}
                        mode={mode}
                        display="default"
                        onChange={handleChange}
                    />
                )}
            </Pressable>
        </>
    );
};

const styles = StyleSheet.create({
    dateButton: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 4,
        paddingHorizontal: Padding.p_xs,
    },
    dateText: {
        fontSize: FontSize.size_mini,
    }
});

export default DatePicker;
