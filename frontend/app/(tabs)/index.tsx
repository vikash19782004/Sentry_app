import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

// Constants
const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = (SCREEN_WIDTH - 56) / 2;
const COLORS = {
  primary: "#1E40AF",
  accent: "#14B8A6",
  error: "#FF6B6B",
  warning: "#F59E0B",
  success: "#10B981",
  background: "#F8FAFC",
  text: "#1F2937",
  textLight: "#6B7280",
  white: "#FFFFFF",
  border: "#E5E7EB",
};

interface QuickActionCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
  onPress: () => void;
}

interface SafetyAlert {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "warning" | "info" | "alert";
}

interface SafeDestination {
  id: string;
  name: string;
  safetyScore: number;
  distance: string;
  image: string;
}

// Quick Action Card Component
const QuickActionCard: React.FC<
  QuickActionCardProps & { scaleAnim: Animated.Value }
> = ({ icon, title, description, color, onPress, scaleAnim }) => {
  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => onPress?.());
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        style={[
          styles.quickActionCard,
          { borderLeftColor: color, borderLeftWidth: 4 },
        ]}
      >
        <View
          style={[styles.cardIconContainer, { backgroundColor: `${color}15` }]}
        >
          <MaterialCommunityIcons name={icon as any} size={28} color={color} />
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Safety Alert Item
const SafetyAlertItem: React.FC<SafetyAlert> = ({
  title,
  description,
  timestamp,
  type,
}) => {
  const alertColors = {
    warning: "#FEF3C7",
    info: "#DBEAFE",
    alert: "#FEE2E2",
  };

  const iconColors = {
    warning: "#F59E0B",
    info: "#3B82F6",
    alert: "#EF4444",
  };

  const icons = {
    warning: "alert",
    info: "information",
    alert: "alert-circle",
  };

  return (
    <View style={[styles.alertItem, { backgroundColor: alertColors[type] }]}>
      <MaterialCommunityIcons
        name={icons[type] as any}
        size={20}
        color={iconColors[type]}
        style={styles.alertIcon}
      />
      <View style={styles.alertContent}>
        <Text style={styles.alertTitle}>{title}</Text>
        <Text style={styles.alertDescription}>{description}</Text>
        <Text style={styles.alertTimestamp}>{timestamp}</Text>
      </View>
    </View>
  );
};

// Safe Destination Card
const SafeDestinationCard: React.FC<SafeDestination> = ({
  name,
  safetyScore,
  distance,
}) => {
  const scoreColor =
    safetyScore >= 80
      ? COLORS.success
      : safetyScore >= 60
        ? COLORS.warning
        : COLORS.error;

  return (
    <TouchableOpacity style={styles.destinationCard} activeOpacity={0.7}>
      <View
        style={[
          styles.destinationImagePlaceholder,
          { backgroundColor: COLORS.border },
        ]}
      >
        <MaterialCommunityIcons
          name="map-marker"
          size={32}
          color={COLORS.primary}
        />
      </View>
      <View style={styles.destinationInfo}>
        <Text style={styles.destinationName}>{name}</Text>
        <View style={styles.destinationMetrics}>
          <View style={styles.scoreContainer}>
            <View
              style={[
                styles.scoreBar,
                { backgroundColor: scoreColor, width: `${safetyScore}%` },
              ]}
            />
          </View>
          <Text style={[styles.safetyScore, { color: scoreColor }]}>
            {safetyScore}%
          </Text>
        </View>
        <Text style={styles.distanceText}>{distance}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Main Home Screen Component
export default function HomeScreen() {
  const [safetyScore, setSafetyScore] = useState(92);
  const [refreshing, setRefreshing] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Dummy data
  const safetyAlerts: SafetyAlert[] = [
    {
      id: "1",
      title: "Heavy Traffic",
      description: "Congestion on Main Street",
      timestamp: "2 hours ago",
      type: "warning",
    },
    {
      id: "2",
      title: "Area Safe",
      description: "Current area has good safety rating",
      timestamp: "Just now",
      type: "info",
    },
  ];

  const safeDestinations: SafeDestination[] = [
    {
      id: "1",
      name: "Downtown Center",
      safetyScore: 95,
      distance: "2.3 km",
      image: "",
    },
    {
      id: "2",
      name: "Riverside Park",
      safetyScore: 88,
      distance: "5.1 km",
      image: "",
    },
    {
      id: "3",
      name: "Harbor District",
      safetyScore: 72,
      distance: "3.8 km",
      image: "",
    },
  ];

  const quickActions = [
    {
      icon: "share-variant",
      title: "Share Location",
      description: "Share with trusted contacts",
      color: COLORS.accent,
      onPress: () => console.log("Share Location"),
    },
    {
      icon: "shield-check",
      title: "Safe Routes",
      description: "Find verified safe paths",
      color: COLORS.primary,
      onPress: () => console.log("Safe Routes"),
    },
    {
      icon: "map-marker",
      title: "View Map",
      description: "Explore nearby & safe areas",
      color: COLORS.accent,
      onPress: () => console.log("View Map"),
    },
    {
      icon: "information",
      title: "Safety Status",
      description: "Check your current safety",
      color: COLORS.primary,
      onPress: () => console.log("Safety Status"),
    },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setSafetyScore(Math.floor(Math.random() * 40) + 60);
      setRefreshing(false);
    }, 1500);
  };

  const getSafetyScoreColor = () => {
    if (safetyScore >= 80) return COLORS.success;
    if (safetyScore >= 60) return COLORS.warning;
    return COLORS.error;
  };

  const getSafetyStatus = () => {
    if (safetyScore >= 80) return "Safe Zone";
    if (safetyScore >= 60) return "Moderate Risk";
    return "High Risk";
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
          />
        }
      >
        {/* Header Section */}
        <LinearGradient
          colors={[COLORS.background, `${COLORS.primary}08`]}
          style={styles.headerSection}
        >
          {/* Top Bar with Logo */}
          <View style={styles.topBar}>
            <View style={styles.logoContainer}>
              <MaterialCommunityIcons
                name="shield-account"
                size={32}
                color={COLORS.primary}
              />
              <Text style={styles.appName}>Sentry</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <MaterialCommunityIcons
                name="bell-outline"
                size={24}
                color={COLORS.text}
              />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          {/* Greeting */}
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Welcome, Tourist</Text>
            <Text style={styles.greetingSubtitle}>
              Your safety is our priority
            </Text>
          </View>

          {/* Current Location */}
          <View style={styles.locationContainer}>
            <View style={styles.locationLeft}>
              <MaterialCommunityIcons
                name="map-marker"
                size={20}
                color={COLORS.primary}
              />
              <View>
                <Text style={styles.locationLabel}>Current Location</Text>
                <Text style={styles.locationName}>Downtown City Center</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.locationButton}>
              <MaterialCommunityIcons
                name="map"
                size={20}
                color={COLORS.accent}
              />
            </TouchableOpacity>
          </View>

          {/* Safety Score Card */}
          <LinearGradient
            colors={[COLORS.white, `${COLORS.primary}08`]}
            style={styles.safetyScoreCard}
          >
            <View style={styles.scoreLeft}>
              <View
                style={[
                  styles.scoreCircle,
                  { borderColor: getSafetyScoreColor() },
                ]}
              >
                <Text
                  style={[styles.scoreNumber, { color: getSafetyScoreColor() }]}
                >
                  {safetyScore}%
                </Text>
              </View>
              <View>
                <Text style={styles.scoreStatus}>{getSafetyStatus()}</Text>
                <Text style={styles.scoreSubtext}>Updated just now</Text>
              </View>
            </View>
            <View style={styles.scoreRight}>
              <MaterialCommunityIcons
                name={
                  safetyScore >= 80
                    ? "check-circle"
                    : safetyScore >= 60
                      ? "alert-circle"
                      : "close-circle"
                }
                size={32}
                color={getSafetyScoreColor()}
              />
            </View>
          </LinearGradient>
        </LinearGradient>

        {/* Emergency SOS Bar */}
        <View style={styles.emergencySosContainer}>
          <TouchableOpacity style={styles.sosButton} activeOpacity={0.8}>
            <MaterialCommunityIcons
              name="phone-alert"
              size={24}
              color={COLORS.white}
            />
            <Text style={styles.sosButtonText}>EMERGENCY SOS</Text>
            <View style={styles.sosPulse} />
          </TouchableOpacity>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <QuickActionCard key={index} {...action} scaleAnim={scaleAnim} />
            ))}
          </View>
        </View>

        {/* Safety Alerts Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Safety Alerts</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.alertsContainer}>
            {safetyAlerts.map((alert) => (
              <SafetyAlertItem key={alert.id} {...alert} />
            ))}
          </View>
        </View>

        {/* Explore Safe Destinations Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore Safe Destinations</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>See More</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={safeDestinations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SafeDestinationCard {...item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            contentContainerStyle={styles.destinationsScroll}
          />
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },

  // Header Section
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
  },
  notificationButton: {
    position: "relative",
    padding: 8,
  },
  notificationBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },

  // Greeting
  greetingContainer: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  greetingSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
  },

  // Location
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  locationLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  locationName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  locationButton: {
    padding: 8,
  },

  // Safety Score Card
  safetyScoreCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  scoreLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  scoreCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreNumber: {
    fontSize: 24,
    fontWeight: "700",
  },
  scoreStatus: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 2,
  },
  scoreSubtext: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  scoreRight: {
    padding: 8,
  },

  // Section Container
  sectionContainer: {
    paddingHorizontal: 20,
    marginVertical: 12,
  },

  // Emergency SOS Bar
  emergencySosContainer: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  sosButton: {
    backgroundColor: COLORS.error,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 10,
    shadowColor: COLORS.error,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    position: "relative",
    overflow: "hidden",
  },
  sosButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1,
  },
  sosPulse: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    right: 14,
    opacity: 0.8,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
  },

  // Quick Actions Grid
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "space-between",
  },
  quickActionCard: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: "center",
    lineHeight: 16,
  },

  // Safety Alerts
  alertsContainer: {
    gap: 12,
  },
  alertItem: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 14,
    alignItems: "flex-start",
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  alertIcon: {
    marginTop: 2,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 2,
  },
  alertDescription: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  alertTimestamp: {
    fontSize: 11,
    color: COLORS.textLight,
  },

  // Safe Destinations
  destinationsScroll: {
    paddingRight: 20,
  },
  destinationCard: {
    marginRight: 14,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    width: 160,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  destinationImagePlaceholder: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  destinationInfo: {
    padding: 12,
  },
  destinationName: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
  destinationMetrics: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  scoreContainer: {
    flex: 1,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    overflow: "hidden",
  },
  scoreBar: {
    height: "100%",
    borderRadius: 2,
  },
  safetyScore: {
    fontSize: 12,
    fontWeight: "600",
  },
  distanceText: {
    fontSize: 11,
    color: COLORS.textLight,
  },

  // Bottom Spacing
  bottomSpacer: {
    height: 40,
  },
});
