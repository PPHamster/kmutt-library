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
docker compose -f docker-compose.prod.yaml up -d
```

Each application will be started in different port
  - **Backend**: http://localhost:3000
  - **Frontend**: http://localhost:3001

Contributer
| Student Id | Name |
|---|---|
| 64070501002 | <a href="https://github.com/kasinphatspam" target="_blank">Kasinphat Ketchom</a> |
| 64070501041 | <a href="https://github.com/Kobayashi-UwU" target="_blank">Panumeth Kongsawatkiat</a> |
| 64070501061 | <a href="https://github.com/PPHamster" target="_blank">Shinnapat Koparamestrisin</a> |
| 64070501078 | <a href="https://github.com/cinnamonjs" target="_blank">Phutsakorn Thunwattanakul</a> |
| 64070501089 | <a href="https://github.com/Akkarachai6787" target="_blank">Akkarachai Pawongjit</a> |
