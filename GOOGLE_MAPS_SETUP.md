# 🗺️ Configuración de Google Maps API

Este proyecto usa Google Maps para visualizar y delimitar lotes agrícolas. Necesitas obtener tu propia API Key.

## 📋 Pasos para Obtener tu API Key

### 1️⃣ **Ir a Google Cloud Console**
- Visita: https://console.cloud.google.com/
- Inicia sesión con tu cuenta de Google

### 2️⃣ **Crear un Proyecto**
1. Click en el selector de proyectos (esquina superior izquierda)
2. Click en **"Nuevo Proyecto"**
3. Nombre del proyecto: `Sistema Agrícola` (o el que prefieras)
4. Click **"Crear"**

### 3️⃣ **Habilitar las APIs Necesarias**
1. En el menú lateral: **"APIs y servicios"** → **"Biblioteca"**
2. Busca y habilita:
   - ✅ **Maps JavaScript API** (OBLIGATORIA)
   - ✅ **Geocoding API** (Opcional, para búsqueda de direcciones)
   - ✅ **Places API** (Opcional, para autocompletado de lugares)

### 4️⃣ **Crear la API Key**
1. Ve a: **"APIs y servicios"** → **"Credenciales"**
2. Click en **"+ CREAR CREDENCIALES"**
3. Selecciona **"Clave de API"**
4. Se generará automáticamente tu API Key
5. **¡CÓPIALA!** La necesitarás en el siguiente paso

### 5️⃣ **Configurar Restricciones (IMPORTANTE para Seguridad)**

#### **Restricciones de Aplicación:**
1. Click en el nombre de tu API Key
2. En **"Restricciones de aplicación"** selecciona: **"Referentes HTTP (sitios web)"**
3. Click en **"AGREGAR UN ELEMENTO"**
4. Agrega tus dominios:
   ```
   http://localhost:5173/*
   http://localhost:3000/*
   https://tudominio.com/*
   https://www.tudominio.com/*
   ```

#### **Restricciones de API:**
1. Selecciona: **"Restringir clave"**
2. Marca únicamente:
   - ✅ Maps JavaScript API
   - ✅ Geocoding API (si la habilitaste)
   - ✅ Places API (si la habilitaste)
3. Click **"GUARDAR"**

---

## ⚙️ Configuración en el Proyecto

### **Opción 1: Variables de Entorno (Recomendado)**

1. Crea un archivo `.env` en la raíz del proyecto:
```bash
VITE_GOOGLE_MAPS_API_KEY=TU_API_KEY_AQUI
```

2. Agrega `.env` a tu `.gitignore` (si no está ya):
```bash
# .gitignore
.env
.env.local
```

3. El proyecto automáticamente usará esta variable

### **Opción 2: Editar Directamente el Archivo de Configuración**

1. Abre el archivo: `src/config/googleMaps.ts`

2. Reemplaza la API Key en la línea:
```typescript
apiKey: 'TU_API_KEY_AQUI',
```

**⚠️ IMPORTANTE:** Si usas esta opción, NO subas este archivo a un repositorio público.

---

## 🧪 Verificar que Funciona

1. Ejecuta el proyecto:
```bash
yarn dev
```

2. Ve a: `http://localhost:5173/dashboard/lotes/nuevo`

3. Deberías ver un mapa de Google Maps sin el mensaje "For development purposes only"

4. Prueba dibujar un lote en el mapa

---

## 💰 Costos

Google Maps ofrece:
- **$200 USD de crédito mensual GRATIS**
- Esto equivale a aproximadamente **28,000 cargas de mapa al mes**
- Para un sistema interno de agricultura, es más que suficiente
- Solo pagas si excedes el uso gratuito

### Monitorear Uso:
- Ve a: https://console.cloud.google.com/
- Sección: **"Facturación"** → **"Informes"**

---

## 🔒 Seguridad

✅ **Buenas Prácticas:**
- Usa variables de entorno (`.env`)
- Restringe la API Key a tus dominios
- Restringe las APIs habilitadas
- NO compartas tu API Key públicamente
- Agrega `.env` a `.gitignore`

❌ **Evita:**
- Subir la API Key a GitHub
- Usar la misma key en producción y desarrollo
- Dejar la key sin restricciones

---

## 🆘 Solución de Problemas

### "For development purposes only"
- ✅ Crea una cuenta de facturación en Google Cloud
- ✅ Verifica que Maps JavaScript API esté habilitada
- ✅ Asegúrate de que la API Key tenga permisos

### El mapa no carga
- ✅ Revisa la consola del navegador (F12)
- ✅ Verifica que la API Key esté correcta
- ✅ Confirma que las restricciones de dominio incluyan `localhost:5173`

### Error de facturación
- ✅ Agrega un método de pago en Google Cloud Console
- ✅ No te preocupes, solo se cobra si excedes $200/mes

---

## 📞 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12) para ver errores específicos
2. Verifica tu configuración en: https://console.cloud.google.com/
3. Consulta la documentación oficial: https://developers.google.com/maps/documentation

---

## 📝 Archivos Relacionados

- `src/config/googleMaps.ts` - Configuración centralizada
- `src/pages/dashboard/lotes/components/MapaReal.tsx` - Visualización de lotes
- `src/pages/dashboard/lotes/components/SelectorMapaInteractivo.tsx` - Dibujo de lotes

---

**¡Listo! Ahora tienes Google Maps configurado correctamente en tu sistema agrícola.** 🌾

