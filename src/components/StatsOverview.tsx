import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import AnimatedNumbers from 'react-native-animated-numbers';
import { colors } from '../constants/colors';

const stats = [
  { label: 'En cours', value: 5, icon: '🚚' },
  { label: 'Livrées', value: 8, icon: '✅' },
  { label: 'Total', value: 133, icon: '📦' },
];

export default function StatsOverview() {
    return (
      <View style={styles.container}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={styles.statIcon}>{stat.icon}</Text>
            <View style={styles.numberContainer}>
              <AnimatedNumbers
                animateToNumber={stat.value}
                fontStyle={styles.statValue}
              />
            </View>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
      gap: 8,
      ...Platform.select({
        ios: {
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    statIcon: {
      fontSize: 24,
    },
    numberContainer: {
      minWidth: 50, // Largeur minimale pour centrer les chiffres
      alignItems: 'center',
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
    },
    statLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });
  