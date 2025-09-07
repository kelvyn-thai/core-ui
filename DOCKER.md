# 🐳 Docker Setup for Core UI

This document explains how to use Docker with the Core UI project for containerized Storybook deployment.

## 📋 Prerequisites

- Docker Desktop or Docker Engine
- Docker Compose (included with Docker Desktop)

## 🚀 Quick Start

### 1. Build and Run Storybook

```bash
# Build and run the production Storybook
docker-compose up storybook

# Access Storybook at http://localhost:8080
```

### 2. Development Mode

```bash
# Run Storybook in development mode
docker-compose --profile dev up storybook-dev

# Access Storybook at http://localhost:6006
```

## 🔧 Docker Commands

### Build Docker Image

```bash
# Build the Docker image
docker build -t core-ui-storybook:latest .

# Build with specific tag
docker build -t core-ui-storybook:v1.0.20 .
```

### Run Container

```bash
# Run the container
docker run -d -p 8080:80 --name core-ui-storybook core-ui-storybook:latest

# Run with custom port
docker run -d -p 3000:80 --name core-ui-storybook core-ui-storybook:latest
```

### Container Management

```bash
# Stop the container
docker stop core-ui-storybook

# Remove the container
docker rm core-ui-storybook

# View container logs
docker logs core-ui-storybook

# Execute commands in running container
docker exec -it core-ui-storybook sh
```

## 🏗️ Multi-Stage Build

The Dockerfile uses a multi-stage build approach:

### Stage 1: Base (Build)
- Uses Node.js 20 Alpine
- Installs pnpm via Corepack
- Installs dependencies
- Builds the library
- Builds Storybook

### Stage 2: Production
- Uses Nginx Alpine
- Copies Storybook build
- Configures Nginx for SPA routing
- Sets up health checks

## 🌐 Nginx Configuration

The included `nginx.conf` provides:

- **Gzip compression** for better performance
- **Security headers** for production safety
- **Static asset caching** (1 year)
- **SPA routing support** for Storybook
- **Health check endpoint** at `/health`

## 📊 Performance Benefits

### Build Optimization
- **Multi-stage build** reduces final image size
- **Alpine Linux** base images are lightweight
- **Layer caching** speeds up rebuilds

### Runtime Optimization
- **Nginx** serves static files efficiently
- **Gzip compression** reduces bandwidth
- **Long-term caching** for static assets

## 🔍 Health Checks

The container includes health checks:

```bash
# Check container health
docker inspect --format='{{.State.Health.Status}}' core-ui-storybook

# Manual health check
curl http://localhost:8080/health
```

## 🚀 GitHub Actions Integration

The enhanced GitHub Actions workflow includes:

1. **Build Job**: Builds Storybook and creates artifacts
2. **Deploy Job**: Deploys to GitHub Pages
3. **Docker Job**: Builds and tests Docker container

### Workflow Features

- **Artifact sharing** between jobs
- **Build verification** with size reporting
- **Docker testing** with health checks
- **Conditional deployment** (main branch only)

## 🛠️ Development Workflow

### Local Development

```bash
# Start development environment
docker-compose --profile dev up storybook-dev

# Make changes to source code
# Storybook will hot-reload automatically
```

### Production Testing

```bash
# Build and test production image
docker-compose up storybook

# Test the production build locally
curl http://localhost:8080/health
```

## 📁 File Structure

```
├── Dockerfile              # Multi-stage build configuration
├── docker-compose.yml      # Development and production services
├── nginx.conf              # Nginx configuration for production
├── .dockerignore           # Docker build context exclusions
└── DOCKER.md               # This documentation
```

## 🔧 Customization

### Environment Variables

```bash
# Set custom environment variables
docker run -e NODE_ENV=production -p 8080:80 core-ui-storybook:latest
```

### Custom Nginx Configuration

```bash
# Use custom nginx config
docker run -v /path/to/custom-nginx.conf:/etc/nginx/conf.d/default.conf -p 8080:80 core-ui-storybook:latest
```

### Volume Mounts

```bash
# Mount custom static files
docker run -v /path/to/custom-assets:/usr/share/nginx/html/assets -p 8080:80 core-ui-storybook:latest
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Use different port
   docker run -p 3000:80 core-ui-storybook:latest
   ```

2. **Build failures**
   ```bash
   # Check build logs
   docker build --no-cache -t core-ui-storybook:latest .
   ```

3. **Container won't start**
   ```bash
   # Check container logs
   docker logs core-ui-storybook
   ```

### Debug Mode

```bash
# Run container in debug mode
docker run -it --entrypoint sh core-ui-storybook:latest
```

## 📈 Monitoring

### Resource Usage

```bash
# Monitor container resources
docker stats core-ui-storybook

# Check container details
docker inspect core-ui-storybook
```

### Logs

```bash
# Follow logs in real-time
docker logs -f core-ui-storybook

# View last 100 lines
docker logs --tail 100 core-ui-storybook
```

## 🚀 Production Deployment

### Docker Registry

```bash
# Tag for registry
docker tag core-ui-storybook:latest your-registry/core-ui-storybook:v1.0.20

# Push to registry
docker push your-registry/core-ui-storybook:v1.0.20
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: core-ui-storybook
spec:
  replicas: 3
  selector:
    matchLabels:
      app: core-ui-storybook
  template:
    metadata:
      labels:
        app: core-ui-storybook
    spec:
      containers:
      - name: storybook
        image: your-registry/core-ui-storybook:v1.0.20
        ports:
        - containerPort: 80
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
```

This Docker setup provides a robust, production-ready containerization solution for the Core UI Storybook! 🎯
