import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Chip, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  primary: "#1E40AF",
  accent: "#14B8A6",
  error: "#FF6B6B",
  warning: "#F59E0B",
  success: "#10B981",
  background: "#F8FAFC",
  text: "#1F2937",
  textLight: "#6B7280",
  border: "#E5E7EB",
  white: "#FFFFFF",
};

interface SafePlaceProps {
  icon: string;
  title: string;
  distance: string;
  status: string;
  color: string;
  onPress: () => void;
}

function SafePlaceCard({
  icon,
  title,
  distance,
  status,
  color,
  onPress,
}: SafePlaceProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card mode="outlined" style={styles.placeCard}>
        <View style={styles.placeContent}>
          <View style={[styles.placeIcon, { backgroundColor: `${color}15` }]}>
            <MaterialCommunityIcons name={icon} size={28} color={color} />
          </View>
          <View style={styles.placeInfo}>
            <Text variant="titleSmall" style={styles.placeTitle}>
              {title}
            </Text>
            <View style={styles.placeMetaRow}>
              <MaterialCommunityIcons
                name="map-marker-distance"
                size={14}
                color={COLORS.textLight}
              />
              <Text style={styles.placeDistance}>{distance}</Text>
            </View>
          </View>
          <View style={styles.placeStatus}>
            <View style={styles.statusBadge}>
              <MaterialCommunityIcons
                name="check-circle"
                size={14}
                color={COLORS.success}
              />
              <Text style={styles.statusText}>{status}</Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default function Map() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View
          style={[styles.headerIcon, { backgroundColor: `${COLORS.accent}20` }]}
        >
          <MaterialCommunityIcons name="map" size={32} color={COLORS.accent} />
        </View>
        <Text variant="headlineSmall" style={styles.headerTitle}>
          Safety Map
        </Text>
        <Text variant="bodyMedium" style={styles.headerSubtitle}>
          Find nearby safe places and services
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Map Placeholder */}
        <Card mode="outlined" style={styles.mapCard}>
          <View style={styles.mapPlaceholder}>
            <View style={styles.mapIconWrapper}>
              <MaterialCommunityIcons
                name="map-outline"
                size={56}
                color={COLORS.accent}
              />
            </View>
            <Text
              variant="titleMedium"
              style={[styles.mapPlaceholderText, { marginTop: 12 }]}
            >
              Interactive Map
            </Text>
            <Text variant="bodySmall" style={styles.mapPlaceholderSubtext}>
              Real-time map with nearby services will be displayed here
            </Text>
            <TouchableOpacity style={styles.mapButton}>
              <MaterialCommunityIcons
                name="compass"
                size={18}
                color={COLORS.white}
              />
              <Text style={styles.mapButtonText}>Launch Map</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Nearby Safe Places */}
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Nearby Safe Places
        </Text>

        <SafePlaceCard
          icon="shield-alert"
          title="Police Station"
          distance="2.5 km away"
          status="24/7"
          color={COLORS.error}
          onPress={() => {}}
        />

        <SafePlaceCard
          icon="hospital-box"
          title="Hospital"
          distance="1.8 km away"
          status="Open"
          color={COLORS.error}
          onPress={() => {}}
        />

        <SafePlaceCard
          icon="fire"
          title="Fire Station"
          distance="3.2 km away"
          status="24/7"
          color={COLORS.warning}
          onPress={() => {}}
        />

        <SafePlaceCard
          icon="cctv"
          title="Surveillance Zone"
          distance="0.8 km away"
          status="Active"
          color={COLORS.primary}
          onPress={() => {}}
        />

        {/* Filter Options */}
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Filter by Type
        </Text>

        <View style={styles.filterSection}>
          <View style={styles.chipContainer}>
            <Chip
              icon="shield-alert"
              onPress={() => {}}
              style={styles.chip}
              mode="outlined"
            >
              Police
            </Chip>
            <Chip
              icon="hospital-box"
              onPress={() => {}}
              style={styles.chip}
              mode="outlined"
            >
              Hospital
            </Chip>
            <Chip
              icon="fire"
              onPress={() => {}}
              style={styles.chip}
              mode="outlined"
            >
              Fire
            </Chip>
          </View>

          <View style={styles.chipContainer}>
            <Chip
              icon="lightbulb"
              onPress={() => {}}
              style={styles.chip}
              mode="outlined"
            >
              Well-Lit
            </Chip>
            <Chip
              icon="cctv"
              onPress={() => {}}
              style={styles.chip}
              mode="outlined"
            >
              CCTV
            </Chip>
          </View>
        </View>

        {/* Map Features Info */}
        <Card mode="outlined" style={styles.infoCard}>
          <Card.Content>
            <View style={styles.infoItem}>
              <View
                style={[styles.infoBullet, { backgroundColor: COLORS.success }]}
              />
              <Text style={styles.infoText}>Green areas are well-lit</Text>
            </View>
            <View style={styles.infoItem}>
              <View
                style={[styles.infoBullet, { backgroundColor: COLORS.warning }]}
              />
              <Text style={styles.infoText}>Yellow areas need attention</Text>
            </View>
            <View style={styles.infoItem}>
              <View
                style={[styles.infoBullet, { backgroundColor: COLORS.error }]}
              />
              <Text style={styles.infoText}>Red areas are high-risk zones</Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerCard: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 32,
  },
  mapCard: {
    marginBottom: 24,
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
  mapPlaceholder: {
    backgroundColor: `${COLORS.accent}08`,
    borderRadius: 12,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 260,
  },
  mapIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${COLORS.accent}20`,
    justifyContent: "center",
    alignItems: "center",
  },
  mapPlaceholderText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
  },
  mapPlaceholderSubtext: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  mapButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  placeCard: {
    marginBottom: 12,
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  placeContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  placeIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  placeInfo: {
    flex: 1,
    gap: 4,
  },
  placeTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },
  placeMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  placeDistance: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: "500",
  },
  placeStatus: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: `${COLORS.success}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    color: COLORS.success,
    fontWeight: "600",
  },
  filterSection: {
    marginBottom: 20,
  },
  chipContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  chip: {
    borderColor: COLORS.border,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  infoBullet: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: "500",
    flex: 1,
  },
});
