# ?? NewsLens India

> **Multi-Perspective Indian & Global News** — Read every story through a Left · Center · Right lens.

[![Expo SDK](https://img.shields.io/badge/Expo-SDK%2057-000020?logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.86-61DAFB?logo=react&logoColor=white)](https://reactnative.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

---

## ?? Overview

**NewsLens India** is a mobile-first news application built with **Expo** and **React Native** that presents Indian and global news stories from multiple political perspectives — Left, Center, and Right — side by side. It empowers readers to:

- ?? **Browse top stories** with multi-perspective summaries
- ????? **Identify blindspots** — stories you have not engaged with yet
- ?? **Explore the source directory** with factuality and bias ratings
- ?? **Track your reading bias** over time
- ?? **Authenticate** securely with persistent session storage

---

## ? Features

| Feature | Description |
|---|---|
| **Multi-Perspective Stories** | Every story is presented from Left, Center & Right viewpoints |
| **Blindspot Detection** | Flags stories you may be ignoring based on your reading patterns |
| **Source Directory** | Curated database of Indian news sources with bias & factuality scores |
| **My Bias Dashboard** | Visual breakdown of your reading lean over time |
| **Dark UI** | Full dark-mode design with a deep navy color palette |
| **Secure Auth** | Login/signup flow backed by `expo-secure-store` |
| **Offline Data** | Rich local dataset of Indian news stories (`indianNewsData.js`) |

---

## ??? Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Expo SDK 57 |
| **UI Library** | React Native 0.86 / React 19 |
| **Navigation** | React Navigation v7 — Bottom Tabs |
| **State Management** | React Context API (AppContext) |
| **Storage** | expo-secure-store · @react-native-async-storage/async-storage |
| **Web Support** | react-native-web |
| **Package Manager** | npm |

---

## ?? Folder Structure

```
groundish-app/
¦
+-- ?? App.js                   # Root component — navigation shell & auth gate
+-- ?? index.js                 # Expo entry point
+-- ?? app.json                 # Expo project configuration
+-- ?? package.json             # Dependencies & scripts
+-- ?? .gitignore               # Git ignore rules
+-- ?? LICENSE                  # MIT License
¦
+-- ?? src/                     # All application source code
¦   +-- ?? theme.js             # Global design tokens (Colors, Spacing, Radius, Typography)
¦   ¦
¦   +-- ?? screens/             # Full-page screen components (one per tab)
¦   ¦   +-- ?? StoriesScreen.jsx        # Main feed — multi-perspective news cards
¦   ¦   +-- ?? BlindspotsScreen.jsx     # Stories the user has not read yet
¦   ¦   +-- ?? SourcesScreen.jsx        # News source directory with ratings
¦   ¦   +-- ?? MyBiasScreen.jsx         # Personal reading bias analytics
¦   ¦   +-- ?? AboutScreen.jsx          # About the app & methodology
¦   ¦   +-- ?? AccountScreen.jsx        # User account & settings
¦   ¦   +-- ?? AuthScreen.jsx           # Login / Sign-up screen
¦   ¦
¦   +-- ?? components/          # Reusable UI components
¦   ¦   +-- ?? StoryCard.jsx            # News story card widget
¦   ¦   +-- ?? StoryDetailModal.jsx     # Full story detail bottom sheet
¦   ¦   +-- ?? BiasBar.jsx              # Left / Center / Right bias indicator bar
¦   ¦   +-- ?? BlindspotBadge.jsx       # Badge overlay for unseen stories
¦   ¦
¦   +-- ?? context/             # Global state via React Context
¦   ¦   +-- ?? AppContext.jsx           # Auth state, stories, bias tracking
¦   ¦
¦   +-- ?? data/                # Static / seed data
¦       +-- ?? indianNewsData.js        # Curated Indian & global news dataset
¦
+-- ?? assets/                  # Static image assets
¦   +-- ???  icon.png                    # App icon
¦   +-- ???  splash-icon.png             # Splash screen icon
¦   +-- ???  favicon.png                 # Web favicon
¦   +-- ???  android-icon-foreground.png # Adaptive icon foreground
¦   +-- ???  android-icon-background.png # Adaptive icon background
¦   +-- ???  android-icon-monochrome.png # Monochrome notification icon
¦
+-- ?? plugins/                 # Custom Expo config plugins
¦   +-- ?? withCleartextTraffic.js      # Enables cleartext HTTP on Android (dev)
¦
+-- ?? android/                 # Auto-generated Android native project (CNG)
¦
+-- ?? dist/                    # Production build output (generated)
```

> **Note:** The `android/` directory is generated via **Continuous Native Generation (CNG)**. Do not edit it by hand — configure native behavior in `app.json` instead.

---

## ?? Getting Started

### Prerequisites

- Node.js >= 18
- Expo CLI
- For Android: Android Studio or a physical device with Expo Go / a development build

### 1. Clone the repository

```bash
git clone https://github.com/ZalaShubham/News-Lens.git
cd News-Lens/groundish-app
```

### 2. Install dependencies

```bash
npm install
```

> **Tip:** Always use `npx expo install <package>` when adding new packages to ensure SDK-compatible versions.

### 3. Start the development server

```bash
npm start
# or
npx expo start
```

Then press:
- **`a`** — open on Android emulator / device
- **`i`** — open on iOS simulator (macOS only)
- **`w`** — open in the browser (web)

---

## ?? Available Scripts

| Script | Command | Description |
|---|---|---|
| `start` | `expo start` | Start the Metro dev server |
| `android` | `expo run:android` | Build & run on Android |
| `ios` | `expo run:ios` | Build & run on iOS |
| `web` | `expo start --web` | Launch the web version |
| Lint | `npx expo lint` | Run the linter |
| Type check | `npx tsc --noEmit` | TypeScript type check |
| Doctor | `npx expo-doctor` | Diagnose dependency issues |

---

## ?? Design System

All design tokens live in `src/theme.js`:

| Token | Purpose |
|---|---|
| `Colors` | Full palette — background, surface, card, text, bias colors, accent |
| `Spacing` | xs (4) · sm (8) · md (12) · lg (16) · xl (20) · xxl (28) |
| `Radius` | sm (6) · md (10) · lg (14) · full (9999) |
| `Typography` | Font weight presets for headings, body, and captions |

### Bias Color Coding

| Political Lean | Color |
|---|---|
| ?? Left | #3b82f6 (blue) |
| ? Center | #a1a1aa (neutral gray) |
| ?? Right | #ef4444 (red) |

---

## ?? Navigation Structure

```
App
+-- AppProvider (Context)
    +-- AuthScreen              ? shown when unauthenticated
    +-- NavigationContainer     ? shown when authenticated
        +-- BottomTabNavigator
            +-- ?? Stories        (StoriesScreen)
            +-- ??  Blindspots    (BlindspotsScreen)
            +-- ?? Sources        (SourcesScreen)
            +-- ?? My Bias        (MyBiasScreen)
            +-- ??  About          (AboutScreen)
            +-- ?? Account        (AccountScreen)
```

---

## ?? Authentication

Authentication state is managed in `AppContext` using:

- `expo-secure-store` — for persisting credentials securely on-device
- `@react-native-async-storage/async-storage` — for non-sensitive persistent data

The app gates all tabs behind the AuthScreen until the user is authenticated.

---

## ??? Building for Production

Use **EAS Build** (Expo Application Services) to create production builds without requiring local Xcode or Android Studio:

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure your project (first time only)
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios

# Submit to stores
eas submit
```

---

## ?? Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## ?? License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">
  Made with ?? by <strong>Shubham Zala</strong> and the NewsLens team
</div>
