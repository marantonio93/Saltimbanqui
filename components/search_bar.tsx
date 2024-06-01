import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        returnKeyType="search" // Configura el botón de retorno del teclado para que muestre "Buscar"
        onSubmitEditing={handleSearch} // Esta función se llama al presionar el botón de "buscar" en el teclado virtual
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:10,
  },
  input: {
    borderBottomWidth: 0.4,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlignVertical: "bottom",
    paddingBottom: 5,
  },
});

export default SearchBar;
