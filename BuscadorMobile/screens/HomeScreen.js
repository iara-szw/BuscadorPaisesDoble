import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import CountryCard from '../components/CountryCard';
import { obtenerPaises } from '../services/APIcontries';

export default function HomeScreen({ favorites, isFavorite, onToggleFavorite }) {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPaises = async () => {
      try {
        setLoading(true);
        const paises = await obtenerPaises();
        setCountries(paises);
      } catch {
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    cargarPaises();
  }, []);

  const paisesFiltrados = useMemo(() => {
    const texto = query.trim().toLowerCase();

    if (!texto) {
      return countries;
    }

    return countries.filter((pais) => {
      const nombre = pais.name?.common ?? pais.nombre ?? '';
      return nombre.toLowerCase().includes(texto);
    });
  }, [countries, query]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Inicio</Text>
      </View>

      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Ej. Argentina"
        placeholderTextColor="#94a3b8"
        autoCapitalize="words"
      />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0284c7" />
          <Text style={styles.loadingText}>Cargando información...</Text>
        </View>
      ) : paisesFiltrados.length === 0 ? (
        <Text style={styles.empty}>No encontramos resultados.</Text>
      ) : (
        <FlatList
          data={paisesFiltrados}
          keyExtractor={(item) => item.cca3 || item.codigo || item.name?.common}
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
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#0f172a',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginBottom: 16,
    width: '100%',
    alignSelf: 'center',
  },
  list: {
    paddingBottom: 24,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#475569',
    fontSize: 14,
  },
  empty: {
    color: '#475569',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 24,
  },
});
