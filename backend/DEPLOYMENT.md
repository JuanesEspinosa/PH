# 🚀 Guía de Despliegue

Guía para desplegar el backend en producción.

## 📋 Requisitos

- Node.js 18+ instalado
- MySQL 8+ instalado
- Dominio (opcional)
- SSL/TLS certificado (recomendado)

---

## 🌐 Despliegue en Producción

### 1. Preparar el Servidor

#### Actualizar el sistema
```bash
sudo apt update && sudo apt upgrade -y
```

#### Instalar Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

#### Instalar MySQL
```bash
sudo apt install -y mysql-server
sudo mysql_secure_installation
```

#### Instalar PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### 2. Clonar y Configurar el Proyecto

```bash
# Clonar repositorio
git clone tu-repositorio.git
cd backend

# Instalar dependencias
npm install --production

# Compilar TypeScript
npm run build
```

### 3. Configurar Variables de Entorno

Crea el archivo `.env` en producción:

```env
PORT=5000
NODE_ENV=production

DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario_mysql
DB_PASSWORD=contraseña_segura_mysql
DB_NAME=sistema_agricola_prod

JWT_SECRET=clave_jwt_muy_segura_y_larga_cambiar_esto
JWT_EXPIRES_IN=7d
JWT_RESET_EXPIRES_IN=1h

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_password_aplicacion
EMAIL_FROM=noreply@tudominio.com

FRONTEND_URL=https://tudominio.com
```

⚠️ **IMPORTANTE**: Usa contraseñas fuertes y secretos únicos en producción.

### 4. Configurar la Base de Datos

```bash
# Crear base de datos y tablas
npm run db:setup

# Crear usuario administrador
npm run create:admin
```

### 5. Iniciar con PM2

```bash
# Iniciar aplicación
pm2 start dist/server.js --name "backend-api"

# Guardar configuración de PM2
pm2 save

# Configurar PM2 para iniciar al arrancar el sistema
pm2 startup
```

### 6. Configurar Nginx como Reverse Proxy

#### Instalar Nginx
```bash
sudo apt install -y nginx
```

#### Configurar dominio
```bash
sudo nano /etc/nginx/sites-available/api.tudominio.com
```

Agregar esta configuración:

```nginx
server {
    listen 80;
    server_name api.tudominio.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### Activar configuración
```bash
sudo ln -s /etc/nginx/sites-available/api.tudominio.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 7. Configurar SSL con Let's Encrypt

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtener certificado SSL
sudo certbot --nginx -d api.tudominio.com

# El certificado se renovará automáticamente
```

---

## 🔧 Comandos PM2 Útiles

```bash
# Ver estado de aplicaciones
pm2 status

# Ver logs en tiempo real
pm2 logs backend-api

# Ver logs de errores
pm2 logs backend-api --err

# Reiniciar aplicación
pm2 restart backend-api

# Detener aplicación
pm2 stop backend-api

# Ver información detallada
pm2 show backend-api

# Monitorear recursos
pm2 monit
```

---

## 🐳 Despliegue con Docker

### Dockerfile

Crea un archivo `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Exponer puerto
EXPOSE 5000

# Comando de inicio
CMD ["node", "dist/server.js"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: sistema_agricola
      MYSQL_USER: app_user
      MYSQL_PASSWORD: app_password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: production
      DB_HOST: mysql
      DB_USER: app_user
      DB_PASSWORD: app_password
      DB_NAME: sistema_agricola
      JWT_SECRET: tu_secreto_jwt
    depends_on:
      - mysql
    restart: unless-stopped

volumes:
  mysql_data:
```

### Comandos Docker

```bash
# Construir y ejecutar
docker-compose up -d

# Ver logs
docker-compose logs -f backend

# Detener
docker-compose down

# Reconstruir
docker-compose up -d --build
```

---

## ☁️ Despliegue en Plataformas Cloud

### Heroku

```bash
# Instalar Heroku CLI
npm install -g heroku

# Login
heroku login

# Crear aplicación
heroku create tu-app-backend

# Agregar MySQL addon
heroku addons:create cleardb:ignite

# Configurar variables de entorno
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=tu_secreto

# Desplegar
git push heroku main

# Ver logs
heroku logs --tail
```

### Railway

1. Conecta tu repositorio GitHub
2. Selecciona el proyecto
3. Railway detectará Node.js automáticamente
4. Agrega servicio MySQL
5. Configura variables de entorno
6. Deploy automático

### DigitalOcean App Platform

1. Conecta tu repositorio
2. Selecciona Node.js
3. Agrega base de datos MySQL
4. Configura variables de entorno
5. Deploy

---

## 🔒 Checklist de Seguridad

- [ ] Usar HTTPS (SSL/TLS)
- [ ] Contraseñas fuertes en BD
- [ ] JWT_SECRET único y seguro (mínimo 32 caracteres)
- [ ] Deshabilitar logs de debug en producción
- [ ] Configurar CORS correctamente
- [ ] Implementar rate limiting
- [ ] Mantener dependencias actualizadas
- [ ] Backups automáticos de BD
- [ ] Monitoring y alertas
- [ ] Firewall configurado

---

## 📊 Monitoring

### Configurar logs con PM2

```bash
# Instalar pm2-logrotate
pm2 install pm2-logrotate

# Configurar rotación
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Monitoreo con PM2 Plus (opcional)

```bash
pm2 link [secret] [public]
```

---

## 🔄 Actualizaciones

```bash
# Detener aplicación
pm2 stop backend-api

# Actualizar código
git pull origin main

# Instalar nuevas dependencias
npm install --production

# Compilar
npm run build

# Reiniciar aplicación
pm2 restart backend-api

# Verificar
pm2 logs backend-api
```

---

## 🗄️ Backup de Base de Datos

### Backup manual
```bash
mysqldump -u usuario -p sistema_agricola > backup_$(date +%Y%m%d).sql
```

### Backup automático (cron)
```bash
# Editar crontab
crontab -e

# Agregar backup diario a las 2 AM
0 2 * * * mysqldump -u usuario -p'password' sistema_agricola > /backups/db_$(date +\%Y\%m\%d).sql
```

### Restaurar backup
```bash
mysql -u usuario -p sistema_agricola < backup_20241017.sql
```

---

## 📈 Optimizaciones de Producción

### 1. Pool de Conexiones MySQL
Ya configurado en `src/config/database.ts`:
```typescript
connectionLimit: 10
```

### 2. Compresión
```bash
npm install compression
```

```typescript
import compression from 'compression';
app.use(compression());
```

### 3. Rate Limiting
```bash
npm install express-rate-limit
```

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de peticiones
});

app.use('/api/', limiter);
```

### 4. Helmet (Seguridad)
```bash
npm install helmet
```

```typescript
import helmet from 'helmet';
app.use(helmet());
```

---

## 🆘 Solución de Problemas

### La aplicación no inicia
```bash
# Ver logs
pm2 logs backend-api --lines 50

# Verificar puerto
sudo lsof -i :5000
```

### No conecta a MySQL
```bash
# Verificar estado de MySQL
sudo systemctl status mysql

# Verificar conectividad
mysql -u usuario -p -h localhost
```

### Certificado SSL expirado
```bash
# Renovar manualmente
sudo certbot renew

# Reiniciar Nginx
sudo systemctl restart nginx
```

---

## 📞 Soporte

Para más ayuda, revisa:
- [README.md](./README.md)
- [QUICK_START.md](./QUICK_START.md)
- [API_DOCS.md](./API_DOCS.md)

