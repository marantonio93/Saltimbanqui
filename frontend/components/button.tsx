import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";

interface BlueButtonProps {
  title: string,
  onPress?: () => void;
}

const BlueButton: React.FC<BlueButtonProps> = ({title, onPress = () => {}}) => {
    return (
    <View style={styles.registerButton}>
        <TouchableOpacity
            onPress = {onPress}
            activeOpacity={0.2}>
              <Text style={styles.next}>{title}</Text>
        </TouchableOpacity>
    </View>
    );
}


export default BlueButton;

const styles = StyleSheet.create({
    registerButton: {
        borderRadius: Border.br_sm,
        paddingHorizontal: 20,
        paddingVertical: 22,
        backgroundColor: Color.colorMediumslateblue_200,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    next: {
        color: Color.bG,
        textAlign: "left",
        fontSize: FontSize.size_base,
        letterSpacing: -0.3,
        fontWeight: "500",
    },
});