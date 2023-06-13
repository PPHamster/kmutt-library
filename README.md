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

Build project
```bash
docker compose -f docker-compose.prod.yaml
```

Each application will be started in different port
  - **Backend**: http://localhost:3000
  - **Frontend**: http://localhost:3001

Contributer
| Id | Name |
|---|---|
| 64070501002 | Kasinphat Ketchom |
| 64070501041 | Panumeth Kongsawatkiat |
| 64070501061 | Shinnapat Koparamestrisin |
| 64070501078 | Phutsakorn Thunwattanakul |
| 64070501089 | Akkarachai Pawongjit |
