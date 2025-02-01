#!/bin/bash

# Set paths
SPEC_PATH="./apps/backend/openapi-spec.json"
OUTPUT_PATH="./apps/frontend/src/data/sources/mocks/api-schema.ts"

# Check if spec file exists
if [ ! -f "$SPEC_PATH" ]; then
  echo "Error: OpenAPI spec file not found at $SPEC_PATH"
  exit 1
fi

# Create output directory if it doesn't exist
mkdir -p "$(dirname "$OUTPUT_PATH")"

echo "Cleaning up existing API schema..."
# Remove existing output file if it exists
rm -f "$OUTPUT_PATH"

# Generate TypeScript types from OpenAPI spec
echo "Generating TypeScript types..."
npx openapi-typescript "$SPEC_PATH" -o "$OUTPUT_PATH" --make-paths-enum --generate-path-params

echo "TypeScript types generation complete!"
