# Node.js Backend Monitoring with Prometheus, Loki, and Grafana

This project is a backend monitoring solution built with Node.js (Express.js) to track the performance of routes, collect metrics, and log data for visualization with Grafana. Prometheus to collect metrics and Loki for logging, allowing you to monitor route performance (slow/fast routes) and visualize key information and errors.

## Problem Statement

![Problem Statement](https://github.com/asimar007/Cross-Region-Migration-of-AWS-EBS-Volumes/blob/main/Screenshot/Grafana.png?raw=true)

# Screenshots

### Metrics Dashboard

![Metrics Dashboard](https://github.com/asimar007/Cross-Region-Migration-of-AWS-EBS-Volumes/blob/main/Screenshot/G-1.png?raw=true)

### Route Performance Monitoring

![Route Performance Monitoring](https://github.com/asimar007/Cross-Region-Migration-of-AWS-EBS-Volumes/blob/main/Screenshot/G-3.png?raw=true)

### Logs in Grafana

![Logs in Grafana](https://github.com/asimar007/Cross-Region-Migration-of-AWS-EBS-Volumes/blob/main/Screenshot/G-2.png?raw=true)

## Features

- **Route Performance Monitoring**: Monitors individual routes to track their response times, allowing you to identify slow and fast routes.
- **Metrics Collection**: Uses Prometheus to collect metrics from the backend server.
- **Logging**: Logs both informational and error messages to Loki.
- **Visualization**: Integrates Grafana to provide a dashboard for metrics and logs, making it easy to visualize and analyze the collected data.

## Technology Stack

- **Node.js** (Express.js) - Backend framework
- **Prometheus** - For collecting and storing metrics
- **Loki** - For log aggregation
- **Grafana** - For visualizing metrics and logs

## Prerequisites

- **Node.js** (v18+)
- **Docker** (for running Prometheus, Loki, and Grafana in containers)

## Getting Started

### 1. Clone the Repository

```
git clone https://github.com/asimar007/Grafana
cd Grafana
```

### Install dependencies

```
npm i
```

### Run

```
node index.js
```
