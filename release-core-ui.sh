#!/bin/bash

set -e

TAG=$1

if [ -z "$TAG" ]; then
	echo "❌ Please provide a version tag: ./release-core-ui.sh v0.1.0"
	exit 1
fi

BUILD_DIR="lib"
TEMP_DIR=".release-temp"

echo "🚀 Building Core UI..."
echo "📦 Running quality checks..."
pnpm quality

echo "🔨 Building with Vite..."
pnpm vite:build-production

echo "✅ Verifying build output..."
if [ ! -d "$BUILD_DIR" ]; then
    echo "❌ Build failed: $BUILD_DIR directory not found"
    exit 1
fi

echo "✅ Build verification successful"

echo "🧹 Cleaning previous temp folder if exists..."
rm -rf "$TEMP_DIR"
mkdir "$TEMP_DIR"

echo "📦 Copying build output and package metadata..."
cp -R "$BUILD_DIR" "$TEMP_DIR/"

# Update version in package.json for the release
echo "📝 Updating version to $TAG..."
VERSION=${TAG#v}  # Remove 'v' prefix if present
sed "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" package.json > "$TEMP_DIR/package.json"

[ -f README.md ] && cp README.md "$TEMP_DIR/"

cd "$TEMP_DIR"
git init
git add .
git commit -m "chore: release build-only tag $TAG"
git tag "$TAG"

echo "📋 Release contents:"
echo "  - Main bundle: index.es.js"
echo "  - Individual components: @button, @input, @label, @combobox, @icons, @hook, @utils, @zustand"
echo "  - CSS files: core-ui.css + individual component CSS"
echo "  - TypeScript declarations: *.d.ts files"
echo "  - Version: $VERSION"

echo "📤 Pushing tag $TAG to GitHub..."
git remote remove origin 2>/dev/null || true
git remote add origin git@github.com:kelvyn-thai/core-ui.git
git push origin "$TAG" --force

cd ..
rm -rf "$TEMP_DIR"

echo "✅ Released tag $TAG with only built output from $BUILD_DIR/"
