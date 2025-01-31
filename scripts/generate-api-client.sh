#!/bin/bash

# Check if openapi-generator-cli is installed
if ! command -v openapi-generator &>/dev/null; then
  echo "openapi-generator not found. Installing via npm..."
  npm install @openapitools/openapi-generator-cli -g
fi

# Set paths
SPEC_PATH="./apps/backend/openapi-spec.json"
OUTPUT_PATH="./apps/frontend/src/data/api"

# Check if spec file exists
if [ ! -f "$SPEC_PATH" ]; then
  echo "Error: OpenAPI spec file not found at $SPEC_PATH"
  exit 1
fi

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_PATH"

# Generate API client
echo "Generating API client..."
openapi-generator generate \
  -i "$SPEC_PATH" \
  -g typescript-axios \
  -o "$OUTPUT_PATH" \
  --additional-properties=supportsES6=true,withSeparateModelsAndApi=true,modelPackage="models",apiPackage="services"

# Clean up unnecessary files
rm -f "$OUTPUT_PATH"/.gitignore
rm -f "$OUTPUT_PATH"/.openapi-generator-ignore
rm -rf "$OUTPUT_PATH"/.openapi-generator

echo "API client generation complete!"
