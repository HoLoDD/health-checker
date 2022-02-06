# Health Checker
Test Task at Tonti Laguna Mobile

Сервис для отслеживание веб-сервисов на доступность

# Tech Stack: 
Nestjs, TypeORM, PostgreSQL

Запросы к сервисам - axios, cron

Телеграм бот - telegraf

Уведомления на почту - nodemailer, mailgun

Документация REST API - SwaggerUI

# Принцип работы
1) Пользователь добавляется в базу через телеграм бота
2) Через REST Api добавляется веб-сервис с привязкой к ID пользователя
3) Сервисы проверяются на доступность каждые 5 минут и если их статус меняется пользователь получает уведомление

# Data Base Models
![models](https://user-images.githubusercontent.com/85313700/152651017-d4ba1224-d522-480b-97b7-bebc40764e85.png)
# REST API Documentation
![api-docs](https://user-images.githubusercontent.com/85313700/152651036-899f5e52-df9a-410b-a7be-1be143c913a4.png)
