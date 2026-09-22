import { useCallback, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { theme } from "@/constant/theme";

export const CODE_LENGTH = 6;

type OtpCodeInputProps = {
  /** Called once every box is filled, whether typed or pasted. */
  readonly onComplete: (code: string) => void;
};

/**
 * The row of single-digit boxes. Owns the digits and the focus shuffling; the
 * screen only hears about a finished code.
 */
export default function OtpCodeInput({ onComplete }: OtpCodeInputProps) {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChange = useCallback(
    (text: string, index: number) => {
      if (text.length > 1) {
        const digits = text.replace(/\D/g, "").slice(0, CODE_LENGTH).split("");
        const newCode = [...code];
        digits.forEach((digit, i) => {
          if (index + i < CODE_LENGTH) {
            newCode[index + i] = digit;
          }
        });
        setCode(newCode);
        const nextIndex = Math.min(index + digits.length, CODE_LENGTH - 1);
        inputRefs.current[nextIndex]?.focus();

        if (newCode.every((digit) => digit !== "")) {
          onComplete(newCode.join(""));
        }
        return;
      }

      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text && index < CODE_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (text && index === CODE_LENGTH - 1) {
        const fullCode = newCode.join("");
        if (fullCode.length === CODE_LENGTH) {
          onComplete(fullCode);
        }
      }
    },
    [code, onComplete],
  );

  const handleKeyPress = useCallback(
    (key: string, index: number) => {
      if (key === "Backspace" && !code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
      }
    },
    [code],
  );

  return (
    <View style={styles.container}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          accessibilityLabel={`Digit ${index + 1} of ${CODE_LENGTH}`}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          style={[styles.codeBox, digit ? styles.codeBoxFilled : null]}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
          keyboardType="number-pad"
          // Every box accepts a full paste; handleChange redistributes the
          // digits. Capping non-first boxes at 1 made paste a no-op anywhere
          // but the first field.
          maxLength={CODE_LENGTH}
          textContentType="oneTimeCode"
          autoFocus={index === 0}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  codeBox: {
    width: 48,
    height: 56,
    borderRadius: 12,
    backgroundColor: theme.color.surfaceElevated,
    borderColor: theme.color.border,
    borderWidth: 1,
    color: theme.color.text,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  codeBoxFilled: {
    borderColor: theme.color.brand,
  },
});
