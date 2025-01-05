# Back End Tavola Italiana

## Local project infrastructure

```bash

```

## Build and run, this project using different modes:

## Just build and run

- Build on (first time) using a copy of .env.example (.env)

```bash
docker-compose up --build
```

- Build on (another time) using a copy of .env.example (.env)

```bash
docker-compose up
```

### Development building

- Build on (dev mode) using a copy of .env.example (.env) (basically, i set this mode, to use the hot reload with nodemon)

```bash
docker-compose up --dev
```

### Simulated production building

- Build on (prod) in this case with two docker-compose.yml the standard and the production;

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

- Build on (prod) and injecting a specific file (for a simulated production, the idea is not tracked this file...)

```bash
docker-compose --env-file .env.production up --build
```
