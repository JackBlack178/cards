FROM node:16

# Устанавливаем json-server глобально
RUN npm install -g json-server

# Указываем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем db.json в рабочую директорию
COPY db.json /app/db.json

# Открываем порт 3000 для взаимодействия с json-server
EXPOSE 3000

# Запускаем json-server с db.json
CMD ["json-server", "--watch", "db.json", "--host", "0.0.0.0"]
