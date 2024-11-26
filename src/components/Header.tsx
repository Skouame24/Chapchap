import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';


export default function Header() {
  const [notificationCount, setNotificationCount] = React.useState(3);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [notificationCount]);

  return (
    <View style={[styles.header, { backgroundColor: colors.primary }]}>
  <View style={styles.headerTop}>
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeText}>Bonjour, John 👋</Text>
      <Text style={styles.subtitleText}>Prêt pour une nouvelle livraison ?</Text>
    </View>
    <TouchableOpacity style={styles.notificationIcon} onPress={() => {}}>
      <Ionicons name="notifications-outline" size={24} color={colors.surface} />
    </TouchableOpacity>
  </View>
    </View>

  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#1E1E1E', // Fond sombre (peut être ajusté)
    marginBottom: 10, // Fond sombre (peut être ajusté)
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitleText: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
  },
  notificationIcon: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
  },
});
