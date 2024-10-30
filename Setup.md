## Monitoring and Logging Setup with Express, Prometheus, Grafana, and Loki

### Prerequisites

1.  **Ensure Docker and Docker Compose** are installed on your machine.
2.  **Private IP**: Replace `192.168.0.102` in the configuration with your private IP address for Prometheus scraping.

### 1. Express Server

Install Express for setting up a basic server to monitor

```
npm install express
```

### 2. Prometheus for Metrics Collection

Install `prom-client`, a Prometheus client for Node.js, to collect and expose metrics:

```
npm install prom-client
```

### 3. Prometheus Configuration

#### 3.1 Create Prometheus Configuration File

Create a file named `prometheus-config.yml` and add the following configuration. This file tells Prometheus to scrape the Express server metrics every 4 seconds:

```
global:
  scrape_interval: 4s

scrape_configs:
  - job_name: "express_server"
    static_configs:
      - targets: ["192.168.0.102:8000"] # Replace with your private IP and server port
```

#### 3.2 Docker-Compose Setup for Prometheus

Set up Prometheus as a service using Docker Compose.

Create a `docker-compose.yml` file and add the following configuration:

```
version: "3"

services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus-config.yml:/etc/prometheus/prometheus.yml
```

#### 3.3 Run Prometheus with Docker Compose

In the terminal, start Prometheus:

```
docker-compose up -d
```

### 4. Grafana for Visualization

Run Grafana in a Docker container to visualize Prometheus metrics:

```
docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss
```

\_Grafana will be accessible at `http://localhost:3000`. Default credentials are `admin/admin`.

### 5. Loki for Log Collection

#### 5.1 Install Winston and Winston-Loki

Install `winston` and `winston-loki` packages to handle logging from the Express server to Loki:

```
npm install winston winston-loki
```

#### 5.2 Run Loki for Log Collection

Run Loki in a Docker container to collect and manage logs:

```
docker run -d --name=loki -p 3100:3100 grafana/loki
```

_Loki will be accessible at `http://localhost:3100`._

---

### 6. Summary

- **Express** - Backend server for monitoring.
- **Prometheus** - Collects and stores metrics from Express server.
- **Grafana** - Visualizes metrics collected by Prometheus.
- **Loki** - Collects and manages logs from Express using Winston.

After setting up, configure Grafana to use Prometheus and Loki as data sources and create dashboards to visualize metrics and logs.
