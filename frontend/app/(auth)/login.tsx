import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Checkbox, Text, TextInput } from "react-native-paper";

const COLORS = {
  primary: "#1E40AF",
  accent: "#14B8A6",
  error: "#FF6B6B",
  background: "#F8FAFC",
  text: "#1F2937",
  textLight: "#6B7280",
  white: "#FFFFFF",
  border: "#E5E7EB",
  success: "#10B981",
};

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      shakeAnimation();
      return false;
    }
    return true;
  };

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    try {
      // TODO: Call Firebase or backend API
      // Example: const response = await loginUser(email, password);
      // if (rememberMe) { await saveLoginCredentials(email); }

      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.replace("/(tabs)");
    } catch (error) {
      setErrors({ email: "Invalid email or password" });
      shakeAnimation();
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = () => {
    // TODO: Implement biometric authentication
    console.log("Biometric login tapped");
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login
    console.log(`${provider} login tapped`);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Gradient Background Header */}
          <LinearGradient
            colors={["#E0F2FE", "#F0F9FF"]}
            style={styles.headerGradient}
          >
            {/* Logo & Icon */}
            <View style={styles.logoContainer}>
              <View style={styles.shieldIcon}>
                <MaterialCommunityIcons
                  name="shield-account"
                  size={50}
                  color={COLORS.primary}
                />
              </View>
            </View>

            {/* Headline */}
            <Text style={styles.headline}>Welcome Back</Text>
            <Text style={styles.subheadline}>Your safety companion awaits</Text>
          </LinearGradient>

          {/* Form Container */}
          <Animated.View
            style={[
              styles.formContainer,
              { transform: [{ translateX: shakeAnim }] },
            ]}
          >
            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                label="Email Address"
                value={email}
                onChangeText={(value) => {
                  setEmail(value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
                style={styles.input}
                left={<TextInput.Icon icon="email-outline" />}
                error={!!errors.email}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                label="Password"
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  if (errors.password)
                    setErrors({ ...errors, password: undefined });
                }}
                placeholder="Min 6 characters"
                secureTextEntry={secureText}
                editable={!loading}
                style={styles.input}
                left={<TextInput.Icon icon="lock-outline" />}
                right={
                  <TextInput.Icon
                    icon={secureText ? "eye-off-outline" : "eye-outline"}
                    onPress={() => setSecureText(!secureText)}
                  />
                }
                error={!!errors.password}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Remember Me & Forgot Password */}
            <View style={styles.optionsRow}>
              <View style={styles.rememberCheckbox}>
                <Checkbox
                  status={rememberMe ? "checked" : "unchecked"}
                  onPress={() => setRememberMe(!rememberMe)}
                  color={COLORS.accent}
                />
                <Text style={styles.rememberText}>Remember me</Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push("/forget-password")}
                disabled={loading}
              >
                <Text style={styles.forgotLink}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.loginButton}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialLogin("Google")}
                disabled={loading}
              >
                <MaterialCommunityIcons
                  name="google"
                  size={24}
                  color={COLORS.text}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialLogin("Apple")}
                disabled={loading}
              >
                <MaterialCommunityIcons
                  name="apple"
                  size={24}
                  color={COLORS.text}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialLogin("Facebook")}
                disabled={loading}
              >
                <MaterialCommunityIcons
                  name="facebook"
                  size={24}
                  color="#1877F2"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleBiometricLogin}
                disabled={loading}
              >
                <MaterialCommunityIcons
                  name="fingerprint"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => router.push("/register")}
                disabled={loading}
              >
                <Text style={styles.signupLink}>Sign up here</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  headerGradient: {
    paddingVertical: 48,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 32,
  },
  logoContainer: {
    marginBottom: 24,
  },
  shieldIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  headline: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },
  subheadline: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: "500",
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  rememberCheckbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    marginLeft: 8,
    color: COLORS.text,
    fontSize: 14,
  },
  forgotLink: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    marginBottom: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 12,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: 12,
    color: COLORS.textLight,
    fontSize: 13,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    marginBottom: 24,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: COLORS.textLight,
    fontSize: 14,
  },
  signupLink: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: "700",
  },
});
