/**
 * Design tokens. Prefer these over literals so spacing and type stay in step
 * across screens.
 *
 * Colour naming: `brand` is the accent (amber). Anything drawn *on top of*
 * brand-coloured fills uses `onBrand`, which is dark — amber is light, so
 * white-on-amber fails contrast.
 */
export const theme = {
  color: {
    background: "#12151C",
    surface: "#12151C",
    surfaceElevated: "#1A1F29",
    border: "#252A35",
    shadow: "#000000",

    brand: "#FBBF24",
    onBrand: "#12151C",

    /** Voice / audio affordances only. */
    accent: "#22D3A6",

    text: "#F8FAFC",
    textSecondary: "#94A3B8",

    success: "#34D399",
    warning: "#FB923C",
    error: "#F87171",
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },

  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    pill: 999,
  },

  fontSize: {
    xs: 12,
    sm: 13,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
    xxxl: 28,
    display: 36,
  },
} as const;

/**
 * Repeated text styles. `sectionTitle` in particular was redeclared in three
 * home components before this existed.
 */
export const typography = {
  sectionTitle: {
    color: theme.color.text,
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
  },
  screenTitle: {
    color: theme.color.text,
    fontSize: theme.fontSize.xxxl,
    fontWeight: "700",
  },
  body: {
    color: theme.color.text,
    fontSize: theme.fontSize.lg,
  },
  caption: {
    color: theme.color.textSecondary,
    fontSize: theme.fontSize.md,
  },
} as const;
