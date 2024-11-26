import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

const orders = [
  {
    id: '1',
    status: 'En cours',
    address: '15 Rue de la Paix, Paris',
    time: '15:30',
    statusColor: colors.primary,
  },
  {
    id: '2',
    status: 'Livré',
    address: '8 Avenue des Champs-Élysées, Paris',
    time: '14:15',
    statusColor: colors.success,
  },
  {
    id: '3',
    status: 'En attente',
    address: '25 Rue du Commerce, Paris',
    time: '16:45',
    statusColor: colors.warning,
  },
];

export default function RecentOrders() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Commandes récentes</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>Voir tout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.ordersList}>
        {orders.map((order, index) => (
          <TouchableOpacity
            key={order.id}
            style={[
              styles.orderCard,
              index === orders.length - 1 && styles.lastOrder,
            ]}
          >
            <View style={styles.orderInfo}>
              <View style={[styles.statusDot, { backgroundColor: order.statusColor }]} />
              <View style={styles.orderDetails}>
                <Text style={styles.orderStatus}>{order.status}</Text>
                <Text style={styles.orderAddress}>{order.address}</Text>
              </View>
            </View>
            <View style={styles.orderTime}>
              <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.timeText}>{order.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  viewAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  ordersList: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
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
  orderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lastOrder: {
    borderBottomWidth: 0,
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  orderDetails: {
    gap: 4,
  },
  orderStatus: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  orderAddress: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  orderTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});