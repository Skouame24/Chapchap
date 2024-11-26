import React, { useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Platform, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const CustomDot = ({ selected }) => {
  const dotStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(selected ? 20 : 6),
      height: 6,
      borderRadius: 3,
      backgroundColor: selected ? colors.primary : colors.border,
      marginHorizontal: 3,
    };
  });

  return <Animated.View style={dotStyle} />;
};

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const lottieRef = useRef(null);

  const onDone = () => {
    navigation.navigate('MainApp' as never);
  };

  const NextButton = ({ ...props }) => (
    <TouchableOpacity 
      style={styles.buttonCircle} 
      {...props}
    >
      <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>
  );

  const SkipButton = ({ ...props }) => (
    <TouchableOpacity 
      style={[styles.buttonCircle, styles.skipButton]} 
      {...props}
    >
      <Text style={[styles.buttonText, styles.skipText]}>Skip</Text>
    </TouchableOpacity>
  );

  const DoneButton = ({ ...props }) => (
    <TouchableOpacity 
      style={styles.doneButton} 
      {...props}
      activeOpacity={0.8}
    >
      <Text style={styles.doneButtonText}>Get Started</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    return (
      <Animatable.View 
        animation="fadeIn" 
        duration={1000} 
        delay={500}
        style={styles.slideContainer}
      >
        <View style={styles.lottieContainer}>
          <LottieView
            ref={lottieRef}
            source={item.animation}
            autoPlay
            loop
            style={styles.lottie}
            speed={0.8}
          />
        </View>
        <Animatable.View 
          animation="slideInUp" 
          duration={800} 
          delay={600}
          style={styles.textContainer}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </Animatable.View>
      </Animatable.View>
    );
  };

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={onDone}
        onSkip={onDone}
        DoneButtonComponent={DoneButton}
        NextButtonComponent={NextButton}
        SkipButtonComponent={SkipButton}
        DotComponent={CustomDot}
        showSkip={true}
        showNext={true}
        bottomBarHighlight={false}
        containerStyles={styles.containerStyle}
        imageContainerStyles={styles.imageContainer}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
        transitionAnimationDuration={800}
        onIndexChanged={setCurrentIndex}
        pages={[
          {
            backgroundColor: colors.surface,
            image: renderItem({
              item: {
                animation: require('../assets/animations/delivery.json'),
                title: 'Livraison Express',
                subtitle: 'Vos colis livrés en un temps record avec un service premium'
              }
            }),
          },
          {
            backgroundColor: colors.background,
            image: renderItem({
              item: {
                animation: require('../assets/animations/tracking.json'),
                title: 'Suivi en Direct',
                subtitle: 'Localisez votre livraison en temps réel avec une précision maximale'
              }
            }),
          },
          {
            backgroundColor: colors.surface,
            image: renderItem({
              item: {
                animation: require('../assets/animations/payment.json'),
                title: 'Paiement Sécurisé',
                subtitle: 'Transactions protégées et sécurisées pour votre tranquillité'
              }
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  containerStyle: {
    paddingHorizontal: 0,
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 0.6,
    justifyContent: 'center',
  },
  lottieContainer: {
    width: width * 0.8,
    height: height * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'sans-serif-medium',
      },
    }),
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'sans-serif',
      },
    }),
  },
  buttonCircle: {
    width: 100,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  skipText: {
    color: colors.primary,
  },
  doneButton: {
    width: 120,
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OnboardingScreen;