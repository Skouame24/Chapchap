import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

const vehicles = [
  {
    id: 'moto',
    name: 'Moto',
    icon: 'bicycle',
    maxWeight: '30kg',
    description: 'Pour petits colis',
  },
  {
    id: 'van',
    name: 'Camionnette',
    icon: 'car',
    maxWeight: '200kg',
    description: 'Pour meubles moyens',
  },
  {
    id: 'truck',
    name: 'Camion',
    icon: 'bus',
    maxWeight: '1000kg',
    description: 'Pour gros meubles',
  },
];

interface VehicleSelectorProps {
  selectedVehicle: string | null;
  onSelectVehicle: (vehicleId: string) => void;
}

export default function VehicleSelector({
  selectedVehicle,
  onSelectVehicle,
}: VehicleSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Type de véhicule</Text>
      <View style={styles.vehiclesContainer}>
        {vehicles.map((vehicle) => (
          <TouchableOpacity
            key={vehicle.id}
            style={[
              styles.vehicleCard,
              selectedVehicle === vehicle.id && styles.vehicleCardSelected,
            ]}
            onPress={() => onSelectVehicle(vehicle.id)}
          >
            <Ionicons
              name={vehicle.icon as any}
              size={32}
              color={selectedVehicle === vehicle.id ? colors.surface : colors.primary}
            />
            <Text
              style={[
                styles.vehicleName,
                selectedVehicle === vehicle.id && styles.vehicleNameSelected,
              ]}
            >
              {vehicle.name}
            </Text>
            <Text
              style={[
                styles.vehicleDescription,
                selectedVehicle === vehicle.id && styles.vehicleDescriptionSelected,
              ]}
            >
              {vehicle.description}
            </Text>
            <Text
              style={[
                styles.vehicleWeight,
                selectedVehicle === vehicle.id && styles.vehicleWeightSelected,
              ]}
            >
              Max: {vehicle.maxWeight}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  vehiclesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vehicleCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  vehicleCardSelected: {
    backgroundColor: colors.primary,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
  },
  vehicleNameSelected: {
    color: colors.surface,
  },
  vehicleDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  vehicleDescriptionSelected: {
    color: colors.overlay,
  },
  vehicleWeight: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  vehicleWeightSelected: {
    color: colors.overlay,
  },
});