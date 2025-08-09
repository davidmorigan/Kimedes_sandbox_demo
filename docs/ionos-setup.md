# 🚀 Kimedes - Configuració Ionos

## 📋 Checklist Ionos

### 1. Dades FTP a obtenir:
- [ ] **Servidor FTP**: _____________________
- [ ] **Usuari FTP**: _______________________  
- [ ] **Contrasenya FTP**: __________________
- [ ] **Port FTP**: _________ (normalment 21)

### 2. Configuració del subdomini:
- [ ] **Crear subdomini**: `demo`
- [ ] **Directori destí**: `/demo.kimedes.com/` o `/demo/`
- [ ] **SSL activat**: Sí ✅

### 3. Estructura de fitxers a Ionos:
```
/demo.kimedes.com/
├── index.html          # From dist/spa/
├── assets/             # From dist/spa/assets/
│   ├── index-xxx.css
│   └── index-xxx.js
└── .htaccess           # Routing config
```

### 4. URLs finals:
- 🌐 **Principal**: https://demo.kimedes.com
- 🔐 **Login**: https://demo.kimedes.com/login
- 📊 **Dashboard**: https://demo.kimedes.com/dashboard

## 🔧 On trobar les dades FTP a Ionos:

1. **Panel Ionos** → **Hosting**
2. **Cerca**: "File Manager", "FTP", "cPanel"
3. **Secció**: "Accés FTP" o "FTP Access"

## 🆘 Problemes comuns:

- **Error 404**: Verificar que .htaccess està pujat
- **CSS no carrega**: Verificar rutes relatives
- **Deploy falla**: Verificar credencials FTP
