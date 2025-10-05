# Parking Advisor
This project is a microservice that finds relevant parking options near a destination point considering available parking slots.

## What problem does it solve
Everyone of us has faced the frustration of driving around in circles looking for a parking spot near a destination — especially in busy urban areas. Traditional navigation tools may show nearby parking lots, but they often lack real-time availability data.

Parking Advisor solves this problem by not only finding nearby parking options but also considering whether parking spaces are actually available. This helps users save time, reduce stress, and avoid unnecessary fuel consumption by directing them to the most suitable and available parking spots

## Quick start 🚀

### Requirements 📦
-   [Docker](https://docs.docker.com/get-docker/)
-   [Go 1.25.1+](https://golang.org/doc/install)

### 1. Clone Repository 📂
```bash
git clone https://github.com/Util787/parking-advisor
cd parking-advisor
```

### 2. Configure `.env` ⚙️
Create 2 `.env` files and configure: 

First one is general env for docker compose:
```env
HTTP_SERVER_PORT=
PARKING_INFO_PORT=
FRONTEND_PORT=
```

Second one is for api, choose `ENV` var according to your environment (`prod`, `dev`, or `local`):
```env
# Environment
ENV=local

# Shutdown settings
SHUTDOWN_TIMEOUT=

# HTTP Server config
HTTP_SERVER_HOST=
HTTP_SERVER_PORT=
HTTP_SERVER_READ_HEADER_TIMEOUT=
HTTP_SERVER_WRITE_TIMEOUT=
HTTP_SERVER_READ_TIMEOUT=

# HTTP Client config
HTTP_CLIENT_RETRIES=
HTTP_CLIENT_TIMEOUT=
TWO_GIS_API_KEY=
TWO_GIS_ITEMS_URL=
TWO_GIS_DIST_MATRIX_URL=
PARKING_INFO_URL=
```

### 3. Run with Docker Compose 🐳
Now you can run the entire project using Docker Compose

```bash
docker compose up --build
```

### 4. UI
UI is available on

```bash
http://localhost:FRONTEND_PORT
```
