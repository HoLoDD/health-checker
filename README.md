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
2) Через REST Api добавляется веб-сервисы с привязкой к ID пользователя
3) Сервисы проверяются на доступность каждые 5 минут и если их статус меняется пользователь получет уведомление

# Data Base Models
