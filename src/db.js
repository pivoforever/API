//Затребуем библиотеку mongoose
const mongoose = require('mongoose');

module.exports = {
  connect: (DB_HOST) => {
    //Используем обновленный парсер строки URL драйвера Mongo
    mongoose.set('useNewUrlParser', true);
    //Поставим findOneAndUpdate() вместо findAndModify()
    mongoose.set('useFindAndModify', false);
    //Поставим createIndex() вместо sureIndex()
    mongoose.set('useCreateIndex', true);
    //Используем новый механизм обнаружения и мониторинга серверов
    mongoose.set('useUnifiedTopology', true);
    //Подключаемся к БД
    mongoose.connect(DB_HOST);
    //Выводим ошибку при неуспешном подключении
    mongoose.connection.on('error', (err) => {
      console.error(err);
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running'
      );
      process.exit();
    });
  },

  close: () => {
    mongoose.connection.close();
  }
};
