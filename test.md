#Тестовое задание на позицию Upper Junior Node.js Developer at Tonti Laguna Mobile


##Бизнес требования
Реализовать сервис для проверки web-сервисов на доступность (дальше HealthChecker), в котором будет реализован следующий функционал:

Если сервис соответствует заданным условиям, HealthChecker отправляет сообщение о том, что сервис не доступен. Если через некоторое время сервис снова становится доступным - отправляет сообщение, что он доступен.

Условия отправки алерт-уведомления:
* http status code _>= 500_ 
* время ответа сервиса (_latency_) больше заданного для этого сервиса 
* обрыв связи с сервисом и прочие ошибки сети

Каналы для уведомлений:
- email
- telegram-канал
- возможность добавить новый

---
__Список web-сервисов должен храниться в бд. Предоставить функционал добавления, редактирования и удаления web-сервисов через REST-API__

__Интервал запросов к сервисам 5 минут__

---

Пример сообщения в telegram

````
Alert!

Service {name} unavailable
Status code 503 или Latency > 700ms
URL: https://localhost:3000/healthcheck
````

````
OK!

Service {name} available
Unavailable from 2022-01-01 23:50:00 to 2022-01-02 01:15:00
URL: https://localhost:3000/healthcheck
````

Пример REST API:

````
Список сервисов

GET https://healthchecker/services

[
 {
  "id": 1,
  "name": "localhost",  
  "checkUrl": "https://localhost:3000/healthcheck",  
 },
 ..
]
````

````
Статус сервиса

GET https://healthchecker/services/1/status

{
  "status": "available", // available или unavailable
  "unavailableFrom": "2022-01-01 23:50:00",  // Последнее время, когда сервис был недоступен. Если сервис всегда был доступен значение равно null
  "unavailableTo": "2022-01-02 01:15:00",  
}
````

````
Добавление сервиса

POST https://healthchecker/services

{
  "name": "localhost",  
  "checkUrl": "https://localhost:3000/healthcheck"
}
````

````
Редактирование сервиса

PUT https://healthchecker/services/1

{
  "name": "new localhost",  
  "checkUrl": "https://localhost:3000/healthcheck2"
}
````

````
Удаление сервиса

DELETE https://healthchecker/services/1
````

##Технические требования
1. Сервис должен быть реализован на платформе Node.js с использованием TypeScript
2. В качестве хранилища можно взять любую реляционную БД + TypeORM
3. Добавление новых каналов для уведомлений не должно повлиять на существующую архитектуру проекта