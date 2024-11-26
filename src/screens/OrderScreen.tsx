import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { colors } from '../constants/colors';
import { ImageCapture } from '../components/ImageCapture';

const ServiceCard = ({ type, isSelected, onSelect }) => {
  const getIcon = () => {
    switch (type) {
      case 'Livraison Express':
        return 'bicycle';
      case 'Courses':
        return 'cart';
      case 'Colis':
        return 'cube';
      default:
        return 'cube';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.serviceCard, isSelected && styles.serviceCardActive]}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, isSelected && styles.iconContainerActive]}>
        <Ionicons 
          name={getIcon()} 
          size={28} 
          color={isSelected ? 'white' : colors.primary} 
        />
      </View>
      <Text style={[styles.serviceText, isSelected && styles.serviceTextActive]}>
        {type}
      </Text>
    </TouchableOpacity>
  );
};

export default function OrderScreen() {
  const [address, setAddress] = useState('');
  const [service, setService] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImageTaken = (uri: string) => {
    setImageUri(uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View 
        animation="fadeInDown" 
        duration={800} 
        style={styles.header}
      >
        <Text style={styles.title}>Commander</Text>
      </Animatable.View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeInUp" duration={800} delay={200}>
          <View style={styles.photoSection}>
            <ImageCapture onImageTaken={handleImageTaken} />
            <Text style={styles.photoHelper}>
              {imageUri ? '✓ Photo prise avec succès' : 'Prenez en photo l\'article à livrer'}
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Adresse de livraison</Text>
            <View style={styles.inputContainer}>
              <View style={styles.iconBackground}>
                <Ionicons name="location-outline" size={22} color={colors.primary} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Entrez l'adresse de livraison"
                placeholderTextColor={colors.textSecondary}
                value={address}
                onChangeText={setAddress}
              />
            </View>
          </View>

          <View style={styles.serviceTypes}>
            <Text style={styles.label}>Type de service</Text>
            <View style={styles.serviceGrid}>
              {['Livraison Express', 'Courses', 'Colis'].map((type) => (
                <ServiceCard
                  key={type}
                  type={type}
                  isSelected={service === type}
                  onSelect={() => setService(type)}
                />
              ))}
            </View>
          </View>
        </Animatable.View>
      </ScrollView>

      <Animatable.View 
        animation="fadeInUp" 
        duration={800} 
        style={styles.footer}
      >
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.priceLabel}>Prix estimé</Text>
            <Text style={styles.deliveryTime}>Livraison en 30 min</Text>
          </View>
          <Text style={styles.price}>1500 FCFA</Text>
        </View>
        <TouchableOpacity 
          style={[
            styles.confirmButton,
            (!imageUri || !service || !address) && styles.confirmButtonDisabled
          ]}
          activeOpacity={0.8}
          disabled={!imageUri || !service || !address}
        >
          <Text style={styles.confirmButtonText}>
            {!imageUri ? 'Prenez une photo pour continuer' : 
             !service ? 'Choisissez un service' :
             !address ? 'Entrez l\'adresse' : 
             'Confirmer la commande'}
          </Text>
          <View style={styles.buttonIconContainer}>
            <Ionicons 
              name={imageUri && service && address ? "arrow-forward" : "alert-circle"} 
              size={20} 
              color="white" 
            />
          </View>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  photoSection: {
    marginBottom: 24,
  },
  photoHelper: {
    marginTop: 8,
    textAlign: 'center',
    color: imageUri ? colors.primary : colors.textSecondary,
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconBackground: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.text,
    height: 50,
  },
  serviceTypes: {
    marginBottom: 24,
  },
  serviceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  serviceCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  serviceCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainerActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  serviceText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  serviceTextActive: {
    color: colors.surface,
  },
  footer: {
    padding: 20,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  deliveryTime: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
  },
  confirmButtonDisabled: {
    backgroundColor: colors.border,
  },
  confirmButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 12,
  },
  buttonIconContainer: {
    width: 28,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});