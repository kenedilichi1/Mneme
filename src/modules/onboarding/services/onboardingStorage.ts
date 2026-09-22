import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Single owner of the onboarding-completed flag. The key used to be duplicated
 * as a literal in both the splash screen and the onboarding screen.
 */
const ONBOARDING_KEY = "mneme_onboarding_completed";

export async function hasCompletedOnboarding(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(ONBOARDING_KEY)) === "true";
  } catch {
    // Storage unavailable — show onboarding rather than crash on launch.
    return false;
  }
}

export async function markOnboardingComplete(): Promise<void> {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, "true");
  } catch {
    // Non-fatal: the user just sees onboarding again next launch.
  }
}
