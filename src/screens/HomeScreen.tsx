import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../constants/colors';
import Header from '../components/Header';
import WelcomeCard from '../components/Welcome';
import StatsOverview from '../components/StatsOverview';
import QuickActions from '../components/QuickActions';
import RecentOrders from '../components/RecentOrders';


export default function HomeScreen() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          {/* <Animated.View entering={FadeInDown.delay(100).springify()}>
            <WelcomeCard />
          </Animated.View> */}

          <Animated.View entering={FadeInDown.delay(200).springify()}>
            <StatsOverview />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300).springify()}>
            <QuickActions />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).springify()}>
            <RecentOrders />
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
});