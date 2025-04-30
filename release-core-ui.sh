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
yarn build:lib

echo "🧹 Cleaning previous temp folder if exists..."
rm -rf "$TEMP_DIR"
mkdir "$TEMP_DIR"

echo "📦 Copying build output and package metadata..."
cp -R "$BUILD_DIR" "$TEMP_DIR/"
cp package.json "$TEMP_DIR/"
[ -f README.md ] && cp README.md "$TEMP_DIR/"

cd "$TEMP_DIR"
git init
git add .
git commit -m "chore: release build-only tag $TAG"
git tag "$TAG"

echo "📤 Pushing tag $TAG to GitHub..."
git remote remove origin 2>/dev/null || true
git remote add origin git@github.com:kelvyn-thai/core-ui.git
git push origin "$TAG" --force

cd ..
rm -rf "$TEMP_DIR"

echo "✅ Released tag $TAG with only built output from $BUILD_DIR/"
