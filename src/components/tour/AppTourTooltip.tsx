import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { TooltipProps } from "react-native-copilot";
import { useCopilot } from "react-native-copilot";

import { colors } from "@/constants/colors";
import { useAppSettingsStore } from "@/store/useAppSettingsStore";

type TourStep = {
  text?: string;
  order?: number;
  name?: string;
};

type CopilotRuntime = {
  currentStep?: TourStep;
  goToNth?: (stepNumber: number) => void;
  stop?: () => void;
};

type AppTourTooltipProps = TooltipProps & {
  labels?: {
    previous?: string;
    next?: string;
    skip?: string;
    finish?: string;
  };
};

const TOTAL_TOUR_STEPS = 4;

export function AppTourTooltip(props: AppTourTooltipProps) {
  const theme = useAppSettingsStore((state) => state.resolvedTheme);
  const themeColors = colors[theme];

  const { currentStep, goToNth, stop } =
    useCopilot() as unknown as CopilotRuntime;

  const stepNumber = currentStep?.order ?? 1;
  const message = String(currentStep?.text ?? "");

  const isFirstStep = stepNumber <= 1;
  const isLastStep = stepNumber >= TOTAL_TOUR_STEPS;

  const markCurrentGuideAsSeen = () => {
    const stepName = currentStep?.name;

    if (!stepName) {
      return;
    }

    if (stepName.startsWith("home-")) {
      useAppSettingsStore.getState().markGuideAsSeen("home_tour");
      return;
    }

    if (stepName.startsWith("statistics-")) {
      useAppSettingsStore.getState().markGuideAsSeen("statistics_tour");
    }
  };

  const handlePrev = () => {
    if (isFirstStep) {
      return;
    }

    goToNth?.(stepNumber - 1);
  };

  const handleNext = () => {
    if (isLastStep) {
      markCurrentGuideAsSeen();
      stop?.();
      return;
    }

    goToNth?.(stepNumber + 1);
  };

  const handleSkip = () => {
    markCurrentGuideAsSeen();
    stop?.();
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: themeColors.card,
            borderColor: themeColors.border,
          },
        ]}
      >
        <View style={styles.header}>
          <View
            style={[
              styles.stepBadge,
              {
                backgroundColor: themeColors.primary + "22",
              },
            ]}
          >
            <Text
              style={[
                styles.stepBadgeText,
                {
                  color: themeColors.primary,
                },
              ]}
            >
              {stepNumber}
            </Text>
          </View>

          <Text
            style={[
              styles.headerLabel,
              {
                color: themeColors.textMuted,
              },
            ]}
          >
            Guía rápida
          </Text>
        </View>

        <Text
          numberOfLines={5}
          style={[
            styles.message,
            {
              color: themeColors.text,
            },
          ]}
        >
          {message || "Aprende cómo usar esta sección de Orvian."}
        </Text>

        <View style={styles.actions}>
          <Pressable
            onPress={handleSkip}
            hitSlop={10}
            style={({ pressed }) => [
              styles.skipButton,
              {
                borderColor: themeColors.border,
                opacity: pressed ? 0.75 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.skipText,
                {
                  color: themeColors.textMuted,
                },
              ]}
            >
              {props.labels?.skip ?? "Omitir"}
            </Text>
          </Pressable>

          <View style={styles.navigation}>
            {!isFirstStep ? (
              <Pressable
                onPress={handlePrev}
                style={({ pressed }) => [
                  styles.secondaryButton,
                  {
                    backgroundColor: themeColors.cardSoft,
                    borderColor: themeColors.border,
                    opacity: pressed ? 0.75 : 1,
                  },
                ]}
              >
                <ChevronLeft size={16} color={themeColors.text} />

                <Text
                  style={[
                    styles.secondaryButtonText,
                    {
                      color: themeColors.text,
                    },
                  ]}
                >
                  {props.labels?.previous ?? "Atrás"}
                </Text>
              </Pressable>
            ) : null}

            <Pressable
              onPress={handleNext}
              style={({ pressed }) => [
                styles.primaryButton,
                {
                  backgroundColor: themeColors.primary,
                  opacity: pressed ? 0.82 : 1,
                },
              ]}
            >
              <Text style={styles.primaryButtonText}>
                {isLastStep
                  ? (props.labels?.finish ?? "Finalizar")
                  : (props.labels?.next ?? "Siguiente")}
              </Text>

              {!isLastStep ? <ChevronRight size={16} color="#FFFFFF" /> : null}
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

export function AppTourStepNumber() {
  return null;
}

const styles = StyleSheet.create({
  wrapper: {
    width: 300,
    maxWidth: 300,
    backgroundColor: "transparent",
  },

  card: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 22,
    padding: 14,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.22,
    shadowRadius: 24,
    elevation: 14,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  stepBadge: {
    minWidth: 36,
    height: 36,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  stepBadgeText: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "900",
  },

  headerLabel: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "800",
  },

  message: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
  },

  actions: {
    gap: 10,
  },

  skipButton: {
    alignSelf: "flex-start",
    minHeight: 34,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 12,
  },

  skipText: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "800",
  },

  navigation: {
    flexDirection: "row",
    gap: 8,
  },

  secondaryButton: {
    minHeight: 44,
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  secondaryButtonText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900",
  },

  primaryButton: {
    minHeight: 44,
    borderRadius: 15,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    flex: 1,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900",
  },
});
