import React, { useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  const [favorites, setFavorites] = useState([]);

  const getCountryKey = (country) =>
    country?.cca3 || country?.codigo || country?.name?.common || country?.nombre || '';

  const toggleFavorite = (country) => {
    setFavorites((currentFavorites) => {
      const key = getCountryKey(country);
      const isFavorite = currentFavorites.some(
        (item) => getCountryKey(item) === key
      );

      if (isFavorite) {
        return currentFavorites.filter((item) => getCountryKey(item) !== key);
      }

      return [...currentFavorites, country];
    });
  };

  const isFavorite = useMemo(
    () => (country) => {
      const key = getCountryKey(country);
      return favorites.some((item) => getCountryKey(item) === key);
    },
    [favorites]
  );

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#566892',
            },
            headerTintColor: '#f8fafc',
            headerTitleAlign: 'center',
            tabBarStyle: {
              backgroundColor: '#ffffff',
              borderTopColor: '#e2e8f0',
              paddingTop: 8,
              height: 64,
            },
            tabBarActiveTintColor: '#0284c7',
            tabBarInactiveTintColor: '#64748b',
          }}
        >
          <Tab.Screen
            name="Home"
            options={{
              title: 'Buscador de países',
              tabBarLabel: 'Inicio',
              tabBarIcon: ({ color, size }) => (
                <Text style={{ color, fontSize: size }}>🏠</Text>
              ),
            }}
          >
            {() => (
              <HomeScreen
                favorites={favorites}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Favoritos"
            options={{
              title: 'Buscador de países',
              tabBarLabel: 'Favoritos',
              tabBarIcon: ({ color, size }) => (
                <Text style={{ color, fontSize: size }}>⭐</Text>
              ),
            }}
          >
            {() => (
              <FavoritesScreen
                favorites={favorites}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
