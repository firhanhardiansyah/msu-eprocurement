# MSU e-Procurement

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn dev
```

## Production

Build the application for production:

#### PM2 Configuration

Start the production server on `http://34.101.206.252:3000`:

```bash
pm2 start ecosystem.config.cjs --env production
pm2 restart ecosystem.config.cjs --env production
pm2 stop ecosystem.config.cjs --env production
pm2 delete all
```

#### Production Step By Step

```bash
git pull
yarn build
pm2 restart ecosystem.config.cjs --env production
```
