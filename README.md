# Job listing website

Resources:
  - [express](https://expressjs.com/)
  - [trpc](https://trpc.io/docs/quickstart)
  - [prisma](https://www.prisma.io/docs/getting-started)
  - [tanstack-query](https://tanstack.com/query/docs)
  - [react](https://react.dev/)

Tech stack:
  - express / trpc for backend
  - react for frontend
  - tanstack query to manage queries and mutations
  - tailwindcss for styling


I'm not good at web design, so I just search for job listing app and copy the layout as much as I can 🤣. [ph.indeed.com](https://ph.indeed.com/)


If you don't want to install postgresql locally and want to use docker
```sh
cd backend
docker compose up -d
```

If you're using podman because docker always unable to start engine. Install podman first
add POSTGRES_USER=postgres POSTGERS_PASSWORD=postgres to .env in the backend folder
```
  podman pod create --name joblesspod --publish 5432:5432 --publish 8080:8080
  podman run -d --pod joblesspod --env-file .env -v joblessdata:/var/lib/postgresql/data docker.io/library/postgres:16
   podman run -d --pod joblesspod docker.io/library/adminer
```
