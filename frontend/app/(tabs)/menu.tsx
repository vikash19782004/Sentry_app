import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Divider, Text } from "react-native-paper";
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

interface MenuItemProps {
  icon: string;
  title: string;
  description: string;
  color: string;
  onPress: () => void;
}

function MenuItem({ icon, title, description, color, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.menuItem}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
          <MaterialCommunityIcons name={icon} size={24} color={color} />
        </View>
        <View style={styles.contentContainer}>
          <Text variant="titleSmall" style={styles.menuTitle}>
            {title}
          </Text>
          <Text variant="bodySmall" style={styles.menuDescription}>
            {description}
          </Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={COLORS.textLight}
        />
      </View>
      <Divider />
    </TouchableOpacity>
  );
}

export default function Menu() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View
          style={[
            styles.headerIcon,
            { backgroundColor: `${COLORS.primary}20` },
          ]}
        >
          <MaterialCommunityIcons
            name="menu"
            size={32}
            color={COLORS.primary}
          />
        </View>
        <Text variant="headlineSmall" style={styles.headerTitle}>
          Menu
        </Text>
        <Text variant="bodyMedium" style={styles.headerSubtitle}>
          Manage your app settings and preferences
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Links Section */}
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Quick Links
        </Text>
        <Card mode="outlined" style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <MenuItem
              icon="phone-alert"
              title="Emergency Contacts"
              description="Manage your emergency contacts"
              color={COLORS.error}
              onPress={() => {}}
            />
            <MenuItem
              icon="lightbulb"
              title="Safety Tips"
              description="Learn about personal safety"
              color={COLORS.warning}
              onPress={() => {}}
            />
            <MenuItem
              icon="phone"
              title="Emergency Numbers"
              description="Quick access to emergency services"
              color={COLORS.success}
              onPress={() => {}}
            />
          </Card.Content>
        </Card>

        {/* Support Section */}
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Support
        </Text>
        <Card mode="outlined" style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <MenuItem
              icon="bug"
              title="Report an Issue"
              description="Help us improve the app"
              color={COLORS.primary}
              onPress={() => {}}
            />
            <MenuItem
              icon="comment"
              title="Feedback"
              description="Send us your suggestions"
              color={COLORS.accent}
              onPress={() => {}}
            />
            <MenuItem
              icon="help-circle"
              title="Help & FAQ"
              description="Get answers to common questions"
              color={COLORS.warning}
              onPress={() => {}}
            />
          </Card.Content>
        </Card>

        {/* About Section */}
        <Text variant="titleMedium" style={styles.sectionTitle}>
          About
        </Text>
        <Card mode="outlined" style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <MenuItem
              icon="information"
              title="About SafeTravel"
              description="Version 1.0.0"
              color={COLORS.primary}
              onPress={() => {}}
            />
            <MenuItem
              icon="file-document"
              title="Terms & Conditions"
              description="View our policies"
              color={COLORS.accent}
              onPress={() => {}}
            />
            <MenuItem
              icon="shield"
              title="Privacy Policy"
              description="How we protect your data"
              color={COLORS.success}
              onPress={() => {}}
            />
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
  sectionTitle: {
    marginTop: 8,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  card: {
    marginBottom: 20,
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    gap: 2,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },
  menuDescription: {
    fontSize: 12,
    color: COLORS.textLight,
  },
});
