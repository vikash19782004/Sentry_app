import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
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

interface IncidentReport {
  id: string;
  type: "theft" | "robbery" | "harassment" | "accident";
  title: string;
  description: string;
  location: string;
  timestamp: string;
  status: "pending" | "registered" | "closed";
  refNumber: string;
}

export default function EFIRScreen() {
  const [activeTab, setActiveTab] = useState<"report" | "history">("report");
  const [reportType, setReportType] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  // Dummy history data
  const reportHistory: IncidentReport[] = [
    {
      id: "1",
      type: "theft",
      title: "Wallet Stolen",
      description: "Lost wallet with cash and cards at market",
      location: "Central Market",
      timestamp: "2 days ago",
      status: "registered",
      refNumber: "FIR-2026-001234",
    },
    {
      id: "2",
      type: "robbery",
      title: "Phone Robbery",
      description: "Mobile phone stolen at night",
      location: "Railway Station",
      timestamp: "5 days ago",
      status: "registered",
      refNumber: "FIR-2026-001233",
    },
  ];

  const incidentTypes = [
    {
      type: "theft",
      icon: "briefcase",
      title: "Theft",
      description: "Belongings stolen",
      color: COLORS.warning,
    },
    {
      type: "robbery",
      icon: "alert-octagon",
      title: "Robbery",
      description: "Forceful taking",
      color: COLORS.error,
    },
    {
      type: "harassment",
      icon: "shield-alert",
      title: "Harassment",
      description: "Threatening behavior",
      color: COLORS.error,
    },
    {
      type: "accident",
      icon: "car-crash",
      title: "Accident",
      description: "Traffic incident",
      color: COLORS.primary,
    },
  ];

  const handleSubmitReport = () => {
    if (!reportType || !description.trim() || !location.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("E-FIR Report Filed Successfully!\nReference: FIR-2026-001235");
      setReportType(null);
      setDescription("");
      setLocation("");
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Header */}
      <View style={styles.headerCard}>
        <View style={styles.headerTop}>
          <View
            style={[
              styles.headerIcon,
              { backgroundColor: `${COLORS.error}20` },
            ]}
          >
            <MaterialCommunityIcons
              name="alert-circle"
              size={32}
              color={COLORS.error}
            />
          </View>
          <View>
            <Text variant="headlineSmall" style={styles.headerTitle}>
              E-FIR Report
            </Text>
            <Text variant="bodySmall" style={styles.headerSubtitle}>
              File incident reports instantly
            </Text>
          </View>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "report" && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab("report")}
        >
          <MaterialCommunityIcons
            name="pencil"
            size={20}
            color={activeTab === "report" ? COLORS.primary : COLORS.textLight}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "report" && styles.tabTextActive,
            ]}
          >
            File Report
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "history" && styles.tabButtonActive,
          ]}
          onPress={() => setActiveTab("history")}
        >
          <MaterialCommunityIcons
            name="history"
            size={20}
            color={activeTab === "history" ? COLORS.primary : COLORS.textLight}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "history" && styles.tabTextActive,
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === "report" ? (
          <>
            {/* Info Card */}
            <Card mode="outlined" style={styles.infoCard}>
              <Card.Content style={styles.infoContent}>
                <View style={styles.infoRow}>
                  <MaterialCommunityIcons
                    name="information"
                    size={20}
                    color={COLORS.primary}
                  />
                  <Text variant="bodySmall" style={styles.infoText}>
                    Your report is confidential and will be registered with
                    local authorities
                  </Text>
                </View>
              </Card.Content>
            </Card>

            {/* Incident Type Selection */}
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Select Incident Type
            </Text>

            <View style={styles.incidentTypesGrid}>
              {incidentTypes.map((incident) => (
                <TouchableOpacity
                  key={incident.type}
                  style={[
                    styles.incidentTypeCard,
                    reportType === incident.type &&
                      styles.incidentTypeCardSelected,
                  ]}
                  onPress={() => setReportType(incident.type)}
                >
                  <View
                    style={[
                      styles.incidentTypeIcon,
                      {
                        backgroundColor:
                          reportType === incident.type
                            ? `${incident.color}20`
                            : `${COLORS.border}`,
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={incident.icon as any}
                      size={28}
                      color={incident.color}
                    />
                  </View>
                  <Text style={styles.incidentTypeTitle}>{incident.title}</Text>
                  <Text style={styles.incidentTypeDesc}>
                    {incident.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Incident Details Form */}
            {reportType && (
              <>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Incident Details
                </Text>

                {/* Location Input */}
                <TextInput
                  label="Incident Location*"
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Enter exact location or address"
                  mode="outlined"
                  style={styles.input}
                  left={
                    <TextInput.Icon icon="map-marker" color={COLORS.primary} />
                  }
                />

                {/* Description Input */}
                <TextInput
                  label="Detailed Description*"
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Describe what happened, any suspects, injuries, etc."
                  mode="outlined"
                  multiline
                  numberOfLines={5}
                  style={styles.textAreaInput}
                  left={
                    <TextInput.Icon icon="note-text" color={COLORS.primary} />
                  }
                />

                {/* Additional Info Card */}
                <Card mode="outlined" style={styles.additionalCard}>
                  <Card.Content>
                    <View style={styles.fieldRow}>
                      <MaterialCommunityIcons
                        name="clock-outline"
                        size={18}
                        color={COLORS.primary}
                      />
                      <View style={styles.fieldInfo}>
                        <Text style={styles.fieldLabel}>Date & Time</Text>
                        <Text style={styles.fieldValue}>
                          Today at {new Date().toLocaleTimeString()}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.fieldRow}>
                      <MaterialCommunityIcons
                        name="map-marker"
                        size={18}
                        color={COLORS.accent}
                      />
                      <View style={styles.fieldInfo}>
                        <Text style={styles.fieldLabel}>GPS Location</Text>
                        <Text style={styles.fieldValue}>
                          Recording automatically
                        </Text>
                      </View>
                    </View>
                  </Card.Content>
                </Card>

                {/* Submit Button */}
                <Button
                  mode="contained"
                  onPress={handleSubmitReport}
                  loading={loading}
                  disabled={loading}
                  buttonColor={COLORS.primary}
                  style={styles.submitButton}
                  contentStyle={styles.submitButtonContent}
                  labelStyle={styles.submitButtonLabel}
                >
                  {loading ? "Filing Report..." : "File E-FIR Report"}
                </Button>

                {/* Help Contact */}
                <Card mode="outlined" style={styles.helpCard}>
                  <Card.Content style={styles.helpContent}>
                    <MaterialCommunityIcons
                      name="phone"
                      size={20}
                      color={COLORS.error}
                    />
                    <View style={styles.helpText}>
                      <Text style={styles.helpTitle}>Need Immediate Help?</Text>
                      <Text style={styles.helpSubtitle}>
                        Call Emergency: {"\n"}100 (Police) | 102 (Ambulance)
                      </Text>
                    </View>
                  </Card.Content>
                </Card>
              </>
            )}
          </>
        ) : (
          <>
            {/* History Tab */}
            {reportHistory.length > 0 ? (
              <>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Your Reports ({reportHistory.length})
                </Text>

                {reportHistory.map((report) => (
                  <Card
                    key={report.id}
                    mode="outlined"
                    style={styles.historyCard}
                  >
                    <View style={styles.historyCardHeader}>
                      <View
                        style={[
                          styles.historyIcon,
                          {
                            backgroundColor:
                              report.type === "theft"
                                ? `${COLORS.warning}20`
                                : `${COLORS.error}20`,
                          },
                        ]}
                      >
                        <MaterialCommunityIcons
                          name={
                            report.type === "theft"
                              ? "briefcase"
                              : "alert-octagon"
                          }
                          size={24}
                          color={
                            report.type === "theft"
                              ? COLORS.warning
                              : COLORS.error
                          }
                        />
                      </View>
                      <View style={styles.historyInfo}>
                        <Text style={styles.historyTitle}>{report.title}</Text>
                        <Text style={styles.historyMeta}>
                          {report.location} • {report.timestamp}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.statusBadge,
                          {
                            backgroundColor:
                              report.status === "registered"
                                ? `${COLORS.success}20`
                                : `${COLORS.warning}20`,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusText,
                            {
                              color:
                                report.status === "registered"
                                  ? COLORS.success
                                  : COLORS.warning,
                            },
                          ]}
                        >
                          {report.status.charAt(0).toUpperCase() +
                            report.status.slice(1)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.historyDetails}>
                      <Text style={styles.detailsDesc}>
                        {report.description}
                      </Text>
                      <View style={styles.refRow}>
                        <Text style={styles.refLabel}>Reference:</Text>
                        <Text style={styles.refNumber}>{report.refNumber}</Text>
                      </View>
                    </View>

                    <View style={styles.cardActions}>
                      <TouchableOpacity style={styles.actionButton}>
                        <MaterialCommunityIcons
                          name="download"
                          size={18}
                          color={COLORS.primary}
                        />
                        <Text style={styles.actionText}>Download</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton}>
                        <MaterialCommunityIcons
                          name="share-variant"
                          size={18}
                          color={COLORS.primary}
                        />
                        <Text style={styles.actionText}>Share</Text>
                      </TouchableOpacity>
                    </View>
                  </Card>
                ))}
              </>
            ) : (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons
                  name="file-check-outline"
                  size={64}
                  color={COLORS.border}
                />
                <Text style={styles.emptyStateTitle}>No Reports Yet</Text>
                <Text style={styles.emptyStateSubtitle}>
                  Your filed E-FIR reports will appear here
                </Text>
              </View>
            )}
          </>
        )}
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
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabButtonActive: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textLight,
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 32,
  },
  infoCard: {
    marginBottom: 20,
    backgroundColor: `${COLORS.primary}08`,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  infoContent: {
    paddingVertical: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  infoText: {
    flex: 1,
    color: COLORS.text,
    lineHeight: 18,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  incidentTypesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  incidentTypeCard: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  incidentTypeCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}06`,
  },
  incidentTypeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  incidentTypeTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
    textAlign: "center",
  },
  incidentTypeDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    textAlign: "center",
  },
  input: {
    marginBottom: 14,
    backgroundColor: COLORS.white,
  },
  textAreaInput: {
    marginBottom: 14,
    backgroundColor: COLORS.white,
    minHeight: 120,
  },
  additionalCard: {
    marginBottom: 14,
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  fieldInfo: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: "600",
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 14,
    borderRadius: 10,
  },
  submitButtonContent: {
    paddingVertical: 10,
  },
  submitButtonLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
  helpCard: {
    backgroundColor: `${COLORS.error}08`,
    borderColor: COLORS.error,
    borderWidth: 1,
  },
  helpContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  helpText: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.error,
    marginBottom: 2,
  },
  helpSubtitle: {
    fontSize: 12,
    color: COLORS.text,
    lineHeight: 18,
  },
  historyCard: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  historyCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  historyIcon: {
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 2,
  },
  historyMeta: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  historyDetails: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  detailsDesc: {
    fontSize: 12,
    color: COLORS.text,
    lineHeight: 18,
    marginBottom: 10,
  },
  refRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  refLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: "600",
  },
  refNumber: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "700",
  },
  cardActions: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: `${COLORS.primary}10`,
  },
  actionText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 16,
  },
  emptyStateSubtitle: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 6,
    textAlign: "center",
  },
});
