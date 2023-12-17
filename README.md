
# news_app

A simple angular app with jwt authorization and socket-io bullet messages



## Authors

- [@ZMizgalski](https://github.com/ZMizgalski)


## API Reference

#### Authorize

```http
  POST /auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required** |
| `password`      | `string` | **Required** |

#### Register

```http
  GET /auth/register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required** |
| `password`      | `string` | **Required** |
| `role`      | `string` | **Required** 'user' or 'admin' |

#### Get all users

```http
  GET /api/getAllUsers
```

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

#### Get news

```http
  GET /api/getNews/:id
```

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required** User id |



## Deployment

To deploy this project run

```bash
  yarn
  yarn build
  yarn (start-prev | start-prod-compiled)
```


## Documentation

Frontend
- Angular
- PrimeNG
- JWT Token
- Scss
- HTML
- TypeScript
- ngx-socket-io

Backend
- TypeScript
- NodeJs
- Primsa PostgreSQL
- Bcrypt
- Express
- Socekt.io


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL=''`

`JWT_SECRET=''`
