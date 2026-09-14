import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CountryCard from '../components/CountryCard';

export default function FavoritesScreen({ favorites, isFavorite, onToggleFavorite }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favoritos</Text>
      </View>

      {favorites.length === 0 ? (
        <Text style={styles.empty}>Todavía no agregaste países favoritos.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.cca3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <CountryCard
              country={item}
              isFavorite={isFavorite(item)}
              onToggleFavorite={onToggleFavorite}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  titleIcon: {
    fontSize: 26,
    lineHeight: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
  },
  list: {
    paddingBottom: 24,
  },
  empty: {
    color: '#475569',
    fontSize: 15,
    marginTop: 24,
    textAlign: 'center',
  },
});
