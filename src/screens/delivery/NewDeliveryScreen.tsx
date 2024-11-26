import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import LocationInput from '../../components/delivery/LocationInput';
import VehicleSelector from '../../components/delivery/VehicleSelector';

export default function NewDeliveryScreen({ navigation }) {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [description, setDescription] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleContinue = () => {
    navigation.navigate('PhotoValidation', {
      pickupLocation,
      dropLocation,
      description,
      selectedVehicle,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Adresses</Text>
          <LocationInput
            label="Point de ramassage"
            value={pickupLocation}
            onChangeText={setPickupLocation}
            placeholder="Où récupérer l'article ?"
            icon="location-outline"
          />
          <LocationInput
            label="Point de livraison"
            value={dropLocation}
            onChangeText={setDropLocation}
            placeholder="Où livrer l'article ?"
            icon="navigate-outline"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description de l'article</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
              placeholder="Décrivez l'article à livrer (taille, poids, etc.)"
            />
          </View>
        </View>

        <VehicleSelector
          selectedVehicle={selectedVehicle}
          onSelectVehicle={setSelectedVehicle}
        />

        <View style={styles.estimationCard}>
          <Text style={styles.estimationTitle}>Estimation</Text>
          <View style={styles.estimationRow}>
            <Text style={styles.estimationLabel}>Distance</Text>
            <Text style={styles.estimationValue}>5.2 km</Text>
          </View>
          <View style={styles.estimationRow}>
            <Text style={styles.estimationLabel}>Durée</Text>
            <Text style={styles.estimationValue}>25 min</Text>
          </View>
          <View style={styles.estimationRow}>
            <Text style={styles.estimationLabel}>Prix estimé</Text>
            <Text style={styles.estimationPrice}>2500 FCFA</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={[
          styles.continueButton,
          (!pickupLocation || !dropLocation || !selectedVehicle) && styles.continueButtonDisabled
        ]}
        onPress={handleContinue}
        disabled={!pickupLocation || !dropLocation || !selectedVehicle}
      >
        <Text style={styles.continueButtonText}>Continuer</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  textAreaContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  estimationCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  estimationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  estimationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  estimationLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  estimationValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  estimationPrice: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: colors.primary,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: colors.border,
  },
  continueButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
});