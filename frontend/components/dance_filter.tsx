import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Color, FontSize, Border } from '../GlobalStyles';

interface DanceFilterProps {
  danceType: 'Salsa' | 'Bachata' | 'Kizomba' | 'Timba';
  selected: boolean;
  onSelect: (danceType: 'Salsa' | 'Bachata' | 'Kizomba' | 'Timba', selected: boolean) => void;
}

const DanceFilter: React.FC<DanceFilterProps> = ({ danceType, selected, onSelect}) => {
  const [isSelected, setIsSelected] = useState<boolean>(selected);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const handlePress = () => {
    const newSelected = !isSelected;
    setIsSelected(newSelected);
    onSelect(danceType, newSelected);
  };

  return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.2}
        style={isSelected ? styles.registerButtonOFF : styles.registerButtonON}>
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