import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';

export default function CountryCard({ country, isFavorite, onToggleFavorite }) {
  const nombre = country?.name?.common ?? country?.nombre ?? 'Sin nombre';
  const region = country?.region ?? 'Sin región';
  const capital = Array.isArray(country?.capital)
    ? country.capital[0] ?? 'Sin capital'
    : country?.capital ?? 'Sin capital';
  const poblacion = Number(country?.population ?? country?.poblacion ?? 0).toLocaleString('es-AR');
  const bandera =
    country?.flags?.png ||
    country?.flag?.url_png ||
    country?.flag ||
    country?.bandera ||
    country?.flags?.svg ||
    '';

  return (
    <View style={styles.card}>
      {bandera ? (
        <Image
          source={{ uri: bandera }}
          style={styles.flag}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.flag, styles.flagPlaceholder]}>
          <Text style={styles.flagPlaceholderText}>🌍</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.name}>{nombre}</Text>
        <Text style={styles.meta}>{region}</Text>
        <Text style={styles.meta}>Capital: {capital}</Text>
        <Text style={styles.meta}>Población: {poblacion}</Text>
      </View>

      <Pressable
        onPress={() => onToggleFavorite(country)}
        style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
        accessibilityRole="button"
      >
        <Text style={styles.favoriteText}>
          {isFavorite ? 'Quitar favorito' : 'Hacer favorito'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  flag: {
    width: 64,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#e2e8f0',
  },
  flagPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagPlaceholderText: {
    fontSize: 22,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 2,
  },
  favoriteButton: {
    minWidth: 108,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#8bb9d8',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  favoriteButtonActive: {
    backgroundColor: '#638dda',
  },
  favoriteText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
});
