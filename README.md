# Back End Tavola Italiana

## Dev setup

### Build, Run and stop the project

```bash
docker-compose build
```

```bash
docker-compose up
```

- press ctrl + c

### Running Sequelize-CLI commands inside the container

- Make sure the container(daemon mode) is running; along with the postgres one

```bash
docker-compose up -d
```

- Run the migration

```bash
docker-compose exec backend yarn migrate
```

- Run the reverse migration

```bash
docker-compose exec backend yarn migrate:undo
```

- Run the migration create (pre-automated mode)

```bash
docker-compose exec backend yarn migration:create create-product-offers-column
```

- Run the migration create (manual mode)

```bash
docker-compose exec backend yarn sequelize migration:create --name=create-product-offers-column
```
