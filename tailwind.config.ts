import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        elevated: "var(--bg-elevated)",
        graphite: "var(--graphite)",
        ink: "var(--ink)",
        body: "var(--text-body)",
        muted: "var(--text-muted)",
        line: "var(--border)",
        "gray-1": "var(--gray-1)",
        "gray-2": "var(--gray-2)",
        "gray-3": "var(--gray-3)",
        "gray-4": "var(--gray-4)",
        "gray-5": "var(--gray-5)",
      },
      fontFamily: {
        display: ["var(--font-display-active)"],
        sans: ["var(--font-body-active)"],
      },
      maxWidth: { content: "90rem" },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.76, 0, 0.24, 1)",
        reveal: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
} satisfies Config;
