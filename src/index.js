// index.js
// This is the main entry point of our application
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

//импортируем локальные модули
const typeDefs = require('./schema');
const db = require('./db');
const models = require('./models');
const resolvers = require('./resolvers');

//Запускаем сервер на порте, указанном в файле .env, или на порте 4000
const port = process.env.PORT || 4000;
//Сохраняем значение DB_HOST в виде переменной
const DB_HOST = process.env.DB_HOST;

const app = express();

//Подключаем БД
db.connect(DB_HOST);

// Настройка Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    //Добавление моделей БД в context
    return { models };
  }
});

// Применяем промежуточное ПО Apollo GraphQL и указываем путь к /api
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
