import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-helvetica)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-mona)", "ui-sans-serif", "system-ui"]
      },
      colors: {
        bg: {
          0: "#06030F",
          1: "#0B0719",
          2: "#120B25",
          3: "#1A1133"
        },
        line: "rgba(255,255,255,0.07)",
        violet: {
          50: "#E8FAFD",
          100: "#CDF3FA",
          200: "#A0E8F4",
          300: "#6FDDED",
          400: "#4AD4E8",
          500: "#3CD1EB",
          600: "#28B6CF",
          700: "#1D90A8",
          800: "#166D81",
          900: "#0E4A58"
        }
      },
      backgroundImage: {
        "violet-radial":
          "radial-gradient(60% 60% at 50% 0%, rgba(60,209,235,0.55) 0%, rgba(60,209,235,0.18) 35%, rgba(0,0,0,0) 70%)",
        "halo-dome":
          "radial-gradient(80% 70% at 50% 0%, rgba(111,221,237,0.65) 0%, rgba(60,209,235,0.35) 25%, rgba(22,109,129,0.18) 50%, rgba(0,0,0,0) 75%)"
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(60,209,235,0.55)",
        "glow-lg": "0 30px 120px -30px rgba(60,209,235,0.6)",
        soft: "0 10px 40px -10px rgba(0,0,0,0.5)",
        "inset-line": "inset 0 1px 0 rgba(255,255,255,0.06)"
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        gradient: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        pulseSoft: {
          "0%,100%": { opacity: "0.55" },
          "50%": { opacity: "1" }
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        gradient: "gradient 8s ease infinite",
        pulseSoft: "pulseSoft 3s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
        marquee: "marquee 35s linear infinite"
      },
      letterSpacing: {
        tightest: "-0.045em"
      }
    }
  },
  plugins: []
};
export default config;
