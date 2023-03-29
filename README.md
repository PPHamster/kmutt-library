# The Library System of KMUTT
This is mororepo for KMUTT library using [**Yarn**](https://yarnpkg.com/) to run project and [**Turbo**](https://turbo.build/) for higher efficiency

## 📄 Project Detail
- Frontend use [**React**](https://react.dev/) (JavaScript) with [**Tailwind CSS**](https://tailwindcss.com/)
- Backend use [**NestJS**](https://nestjs.com/) (TypeScript) and [**MySQL**](https://www.mysql.com/)

## 🛠️ How to develop
Fill all env file
  - Root of project
  - Frontend
  - Backend

Install all package with
```bash
yarn install
```

Prepare the database using [**Docker**](https://www.docker.com/)
```bash
docker compose up -d
yarn db:generate
```

To develop all application
```bash
yarn dev
```

To develop only frontend or backend
```bash
yarn dev:frontend
yarn dev:backend
```

Each application will be started in different port
  - **Backend**: http://localhost:3000
  - **Frontend**: http://localhost:3001
