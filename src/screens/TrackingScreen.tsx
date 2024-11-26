import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const TimelineItem = ({ title, time, isCompleted, isLast }) => (
  <View style={styles.timelineItem}>
    <View style={styles.timelineLeft}>
      <View style={[styles.timelineDot, isCompleted && styles.timelineDotCompleted]} />
      {!isLast && <View style={[styles.timelineLine, isCompleted && styles.timelineLineCompleted]} />}
    </View>
    <View style={styles.timelineContent}>
      <Text style={styles.timelineTitle}>{title}</Text>
      <Text style={styles.timelineTime}>{time}</Text>
    </View>
  </View>
);

export default function TrackingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Suivi de commande</Text>
        <Text style={styles.subtitle}>Commande #12345</Text>
      </View>

      <View style={styles.deliveryInfo}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Temps estimé</Text>
          <Text style={styles.infoValue}>15 min</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Distance</Text>
          <Text style={styles.infoValue}>2.5 km</Text>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Statut de la livraison</Text>
        <View style={styles.statusTimeline}>
          <TimelineItem
            title="Commande confirmée"
            time="10:30"
            isCompleted={true}
          />
          <TimelineItem
            title="En préparation"
            time="10:35"
            isCompleted={true}
          />
          <TimelineItem
            title="En route"
            time="10:45"
            isCompleted={true}
          />
          <TimelineItem
            title="Livré"
            time="--:--"
            isCompleted={false}
            isLast={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  deliveryInfo: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  infoCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    width: '48%',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  infoTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginVertical: 8,
  },
  infoValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  statusContainer: {
    padding: 16,
    backgroundColor: colors.surface,
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 20,
  },
  statusTimeline: {
    flex: 1,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timelineLeft: {
    alignItems: 'center',
    width: 24,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineDotCompleted: {
    backgroundColor: colors.success,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  timelineLineCompleted: {
    backgroundColor: colors.success,
  },
  timelineContent: {
    marginLeft: 12,
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  timelineTime: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
});