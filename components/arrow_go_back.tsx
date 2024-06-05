import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";


type ArrowGoBackProps = {
    onPress: () => void;
}

const ArrowGoBack: React.FC<ArrowGoBackProps> = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.overlayArrow} onPress={onPress}>
            <Image 
            style = {styles.arrow}
            contentFit= "cover"
            contentPosition={"center"}
            source={require("../assets/smallArrow.svg")}
            />
        </TouchableOpacity>
    );
}


export default ArrowGoBack;

const styles = StyleSheet.create({
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
});