#!/bin/bash

# Build optimitzat per Ionos
echo "🏗️ Building Kimedes for Ionos production..."

# Neteja builds anteriors
rm -rf dist/
rm -rf deploy-temp/

# Build de producció
npm run build

# Verificar que el build ha anat bé
if [ ! -d "dist/spa" ]; then
    echo "❌ Error: Build failed - dist/spa not found"
    exit 1
fi

# Crear directori de desplegament
mkdir -p deploy-temp

# Copiar fitxers necessaris per Ionos
echo "📦 Preparing files for Ionos..."
cp -r dist/spa/* deploy-temp/
cp .htaccess deploy-temp/

# Verificar estructura
echo "📁 Deploy structure:"
ls -la deploy-temp/

echo "✅ Ready for Ionos deployment!"
echo "📂 Files prepared in: deploy-temp/"
