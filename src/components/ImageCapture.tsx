import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Animatable from 'react-native-animatable';
import { colors } from '../constants/colors';

interface ImageCaptureProps {
  onImageTaken: (uri: string) => void;
}

export const ImageCapture: React.FC<ImageCaptureProps> = ({ onImageTaken }) => {
  const [image, setImage] = useState<string | null>(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Nous avons besoin de la permission pour accéder à votre caméra');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImageTaken(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Animatable.View animation="fadeIn" style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity 
            style={styles.retakeButton}
            onPress={takePhoto}
          >
            <Ionicons name="camera-reverse" size={22} color={colors.primary} />
            <Text style={styles.retakeText}>Reprendre la photo</Text>
          </TouchableOpacity>
        </Animatable.View>
      ) : (
        <TouchableOpacity 
          style={styles.captureButton}
          onPress={takePhoto}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="camera" size={32} color={colors.primary} />
          </View>
          <Text style={styles.captureText}>
            Photographier l'article
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  captureButton: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  captureText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  imageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  retakeText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '500',
    color: colors.primary,
  },
});