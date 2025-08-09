#!/bin/bash

# Script de desplegament per Kimedes a Ionos
echo "🚀 Iniciant desplegament de Kimedes..."

# Colors per output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Build del projecte
echo -e "${YELLOW}📦 Creant build de producció...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build creat correctament${NC}"
else
    echo -e "${RED}❌ Error en el build${NC}"
    exit 1
fi

# Crear directori temporal per desplegament
echo -e "${YELLOW}📁 Preparant fitxers per desplegament...${NC}"
rm -rf deploy-temp
mkdir deploy-temp

# Copiar fitxers necessaris
cp -r dist/ deploy-temp/
cp package.json deploy-temp/
cp package-lock.json deploy-temp/
cp .htaccess deploy-temp/

# Crear zip per càrrega manual
echo -e "${YELLOW}🗜️ Creant arxiu ZIP...${NC}"
cd deploy-temp
zip -r ../kimedes-deploy.zip .
cd ..

echo -e "${GREEN}✅ Desplegament preparat!${NC}"
echo -e "${YELLOW}📦 Fitxer: kimedes-deploy.zip${NC}"
echo -e "${YELLOW}🌐 Puja aquest fitxer al directori /demo.kimedes.com/ a Ionos${NC}"

# Neteja
rm -rf deploy-temp

echo -e "${GREEN}🎉 Procés completat!${NC}"
