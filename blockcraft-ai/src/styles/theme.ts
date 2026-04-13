export const theme = {
  colors: {
    background: {
      primary: "#09090B",
      secondary: "#18181B",
      tertiary: "#27272A",
      elevated: "#3F3F46",
    },
    accent: {
      primary: "#6366F1",
      secondary: "#8B5CF6",
      success: "#10B981",
      warning: "#F59E0B",
      danger: "#EF4444",
    },
    text: {
      primary: "#FAFAFA",
      secondary: "#A1A1AA",
      muted: "#71717A",
    },
    border: {
      subtle: "rgba(255,255,255,0.06)",
      default: "rgba(255,255,255,0.1)",
      strong: "rgba(255,255,255,0.2)",
    },
    glass: {
      background: "rgba(24,24,27,0.7)",
      border: "rgba(255,255,255,0.08)",
      blur: "20px",
    },
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
  },
  borderRadius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },
  typography: {
    fontFamily: {
      sans: "'Inter', system-ui, -apple-system, sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
  },
  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      default: "cubic-bezier(0.4, 0, 0.2, 1)",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
  },
};