import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Color, FontSize, Border } from '../GlobalStyles';

interface DanceFilterProps {
  danceType: 'Salsa' | 'Bachata' | 'Kizomba' | 'Timba';
}

const DanceFilter: React.FC<DanceFilterProps> = ({ danceType }) => {
  const [buttonColor, setButtonColor] = useState<boolean>(false);

  const handlePress = () => {
    setButtonColor(!buttonColor);
    // Aquí podrías llamar a una función que maneje el cambio de estado en el componente padre
    // Puedes pasar danceType como argumento para identificar qué tipo de baile se está seleccionando
  };

  return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.2}
        style={buttonColor === false ? styles.registerButtonOFF : styles.registerButtonON}>
        <Text style={styles.next}>{danceType}</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  registerButtonOFF: {
    borderRadius: Border.br_sm,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "white",
    borderWidth: 0.5,
    backgroundColor: Color.colorMediumslateblue_50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 5,
    width: 100,
  },
  registerButtonON: {
    borderRadius: Border.br_sm,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: Color.colorMediumslateblue_200,
    backgroundColor: Color.colorMediumslateblue_200,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 5,
    width: 100,
  },
  next: {
    color: Color.bG,
    textAlign: "left",
    fontSize: FontSize.size_xs,
    letterSpacing: -0.3,
    fontWeight: "500",
  },
});

export default DanceFilter;