// app/(tabs)/logout.tsx
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, Card, Icon, Text } from "react-native-paper";

export default function Logout() {
  const handleLogout = () => {
    // TODO: Clear token / asyncStorage / firebase signOut
    // Example: await AsyncStorage.removeItem('authToken');
    // Example: await firebaseAuth.signOut();

    router.replace("/login");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      {/* Top App Bar */}
      <Appbar.Header>
        <Appbar.BackAction onPress={handleCancel} />
        <Appbar.Content title="Logout" />
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >
        {/* Warning Card */}
        <Card mode="outlined" style={styles.warningCard}>
          <Card.Content style={styles.warningContent}>
            <Icon source="alert" size={60} color="#FF6B6B" />
            <Text style={styles.warningTitle} variant="headlineSmall">
              Confirm Logout
            </Text>
            <Text style={styles.warningText} variant="bodyMedium">
              Are you sure you want to logout? You will need to sign in again to
              access your account.
            </Text>
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleLogout}
            style={styles.logoutButton}
            buttonColor="#FF6B6B"
          >
            Logout
          </Button>

          <Button
            mode="outlined"
            onPress={handleCancel}
            style={styles.cancelButton}
          >
            Cancel
          </Button>
        </View>

        {/* Additional Info */}
        <Card mode="outlined" style={styles.infoCard}>
          <Card.Content>
            <Text variant="bodySmall" style={{ textAlign: "center" }}>
              Your data will be securely stored and you can access it anytime by
              logging back in.
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  warningCard: {
    marginBottom: 24,
    borderColor: "#FF6B6B",
    borderWidth: 2,
  },
  warningContent: {
    alignItems: "center",
    paddingVertical: 24,
  },
  warningTitle: {
    marginTop: 16,
    marginBottom: 12,
    textAlign: "center",
  },
  warningText: {
    textAlign: "center",
    color: "#666",
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 24,
  },
  logoutButton: {
    paddingVertical: 6,
  },
  cancelButton: {
    paddingVertical: 6,
  },
  infoCard: {
    backgroundColor: "#f5f5f5",
  },
});
