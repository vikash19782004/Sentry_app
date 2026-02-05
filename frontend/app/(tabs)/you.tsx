import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import {
    Appbar,
    Avatar,
    Button,
    Card,
    Divider,
    List,
    Text,
} from "react-native-paper";

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

export default function You() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Top App Bar */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Profile" titleStyle={styles.appbarTitle} />
        <Appbar.Action
          icon="account-edit"
          onPress={() => {}}
          iconColor={COLORS.primary}
        />
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={styles.content}
        style={styles.scrollContainer}
      >
        {/* Profile Card */}
        <Card mode="outlined" style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <View style={styles.avatarContainer}>
              <Avatar.Image
                size={90}
                source={{
                  uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
                }}
              />
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
              </View>
            </View>
            <Text style={styles.name} variant="titleLarge">
              John Doe
            </Text>
            <Text style={styles.email} variant="bodyMedium">
              john.doe@example.com
            </Text>
            <View style={styles.badgeContainer}>
              <View
                style={[
                  styles.badge,
                  { backgroundColor: `${COLORS.success}20` },
                ]}
              >
                <MaterialCommunityIcons
                  name="shield-check"
                  size={14}
                  color={COLORS.success}
                />
                <Text style={[styles.badgeText, { color: COLORS.success }]}>
                  Verified
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Safety Information */}
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Safety Stats
        </Text>

        <Card mode="outlined" style={styles.statsCard}>
          <Card.Content>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <MaterialCommunityIcons
                    name="map-check"
                    size={24}
                    color={COLORS.success}
                  />
                </View>
                <Text style={styles.statValue}>92%</Text>
                <Text style={styles.statLabel}>Safe Zones</Text>
              </View>
              <View style={styles.dividerVertical} />
              <View style={styles.statItem}>
                <View style={styles.statIconContainer}>
                  <MaterialCommunityIcons
                    name="map-marker-multiple"
                    size={24}
                    color={COLORS.primary}
                  />
                </View>
                <Text style={styles.statValue}>45</Text>
                <Text style={styles.statLabel}>Safe Places</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Settings */}
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Settings
        </Text>

        <Card mode="outlined" style={styles.settingsCard}>
          <List.Item
            title="Emergency Contacts"
            description="Manage your emergency contacts"
            left={(props) => (
              <List.Icon {...props} icon="phone-alert" color={COLORS.primary} />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Privacy Settings"
            description="Control your data sharing"
            left={(props) => (
              <List.Icon {...props} icon="shield" color={COLORS.accent} />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Notifications"
            description="Manage alerts and notifications"
            left={(props) => (
              <List.Icon {...props} icon="bell" color={COLORS.warning} />
            )}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {}}
          />
        </Card>

        {/* Logout Button */}
        <Button
          mode="contained"
          onPress={() => router.push("/logout")}
          style={styles.logoutButton}
          buttonColor={COLORS.error}
          contentStyle={styles.logoutButtonContent}
          labelStyle={styles.logoutButtonLabel}
        >
          Logout
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  appbar: {
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  appbarTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40,
  },

  // Profile Card
  profileCard: {
    marginBottom: 20,
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  profileContent: {
    alignItems: "center",
    paddingVertical: 24,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  statusBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.success,
    borderWidth: 3,
    borderColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.white,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 12,
  },
  email: {
    color: COLORS.textLight,
    marginTop: 4,
    fontSize: 14,
  },
  badgeContainer: {
    marginTop: 12,
    flexDirection: "row",
    gap: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  // Section Title
  sectionTitle: {
    marginTop: 20,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    paddingHorizontal: 4,
  },

  // Stats Card
  statsCard: {
    marginBottom: 20,
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: "500",
  },
  dividerVertical: {
    width: 1,
    height: 60,
    backgroundColor: COLORS.border,
    marginHorizontal: 16,
  },

  // Settings Card
  settingsCard: {
    marginBottom: 24,
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  // Logout Button
  logoutButton: {
    marginVertical: 20,
    borderRadius: 12,
  },
  logoutButtonContent: {
    paddingVertical: 10,
  },
  logoutButtonLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});
