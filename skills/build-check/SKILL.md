---
name: build-check
description: Auto-detect project type and run build/test verification. Use when checking if project builds successfully, running tests before committing, or verifying code changes compile correctly. Triggers on "build", "check build", "verify".
---

# Build Check

Auto-detect project type and run the appropriate build and test commands.

## When to Use This Skill

- Before committing code changes
- After making significant code modifications
- Before handing off work to the user
- When user says "check build", "verify build"
- As part of CI/CD verification

## Project Type Detection

Detect project type by checking for config files in the workspace root:

| Config File | Project Type | Build Command | Test Command |
|---|---|---|---|
| `Cargo.toml` | Rust | `cargo build` | `cargo test` |
| `package.json` | Node.js | `npm run build` | `npm test` |
| `pubspec.yaml` | Flutter/Dart | `flutter build` | `flutter test` |
| `build.gradle` / `build.gradle.kts` | Android/Kotlin | `./gradlew build` | `./gradlew test` |
| `*.xcodeproj` / `Package.swift` | iOS/Swift | `swift build` | `swift test` |
| `Makefile` | Make | `make build` | `make test` |
| `pyproject.toml` / `setup.py` | Python | `python -m build` | `pytest` |
| `CMakeLists.txt` | C/C++ | `cmake --build .` | `ctest` |
| `go.mod` | Go | `go build ./...` | `go test ./...` |

## How to Use

### Step 1: Detect Project Type

Check workspace root for config files in this priority order:
1. `Cargo.toml` → Rust
2. `package.json` → Node.js
3. `pubspec.yaml` → Flutter
4. `build.gradle` → Android
5. Others as listed above

### Step 2: Run Build

```bash
# Rust
cargo build 2>&1 | tail -5

# Node.js (check if build script exists first)
npm run build --if-present

# Flutter
flutter build apk --debug  # or flutter build ios --no-codesign

# Android
./gradlew assembleDebug
```

### Step 3: Run Tests

```bash
# Rust
cargo test 2>&1 | tail -20

# Node.js
npm test --if-present

# Flutter
flutter test

# Android
./gradlew test
```

### Step 4: Report Results

Report to user:
- ✅ Build succeeded / ❌ Build failed
- ✅ Tests passed / ❌ Tests failed (with count)
- ⚠️ Warnings (if important)

## Multi-Project Workspaces

For monorepos or workspaces with multiple project types:

```bash
# Check what config files exist
ls -la Cargo.toml package.json pubspec.yaml build.gradle* 2>/dev/null
```

Run build for each detected project type in order.

## Best Practices

1. **Always check build before committing** — Prevent broken builds
2. **Show only relevant output** — Use `tail` to limit verbose output
3. **Report warnings** — Don't silently ignore build warnings
4. **Run in correct directory** — `cd` to the right project directory first
5. **Use debug/dev mode** — Don't do production builds unless specifically asked
