import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const TOKEN_KEY = "mneme_access_token";

/**
 * SecureStore has no web implementation, so web falls back to AsyncStorage.
 * That fallback is *not* secure — it is there so `expo start --web` keeps
 * working during development, not for a shipped web build.
 */
const useSecureStore = Platform.OS !== "web";

export async function getToken(): Promise<string | null> {
  try {
    return useSecureStore
      ? await SecureStore.getItemAsync(TOKEN_KEY)
      : await AsyncStorage.getItem(TOKEN_KEY);
  } catch {
    // A corrupted or inaccessible keychain entry should read as "signed out"
    // rather than crash the app on launch.
    return null;
  }
}

export async function setToken(token: string): Promise<void> {
  // SecureStore rejects non-strings with an opaque message, so a response
  // shape that does not carry a token surfaces here instead of at the keychain.
  if (typeof token !== "string" || token.length === 0) {
    throw new Error("setToken: expected a non-empty string token.");
  }

  if (useSecureStore) {
    await SecureStore.setItemAsync(TOKEN_KEY, token, {
      keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
    });
    return;
  }
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function clearToken(): Promise<void> {
  try {
    if (useSecureStore) {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      return;
    }
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch {
    // Already gone — sign-out should not fail on this.
  }
}
