# BarberShop Website - HTML/CSS/JS/PHP/MySQL

Веб-сайт барбершопу з функціями онлайн-бронювання, використовуючи чистий HTML, CSS, JavaScript, PHP та MySQL.

## 🚀 Технології

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: PHP 7.4+
- **Database**: MySQL 5.7+
- **Server**: Apache (XAMPP)

## 📋 Вимоги

- XAMPP (Apache + MySQL + PHP)
- Веб-браузер (Chrome, Firefox, Safari)

## 🛠️ Встановлення

### 1. Встановіть XAMPP

Завантажте та встановіть XAMPP з [офіційного сайту](https://www.apachefriends.org/)

### 2. Налаштування проєкту

1. Запустіть XAMPP Control Panel
2. Запустіть Apache та MySQL

3. Скопіюйте файли проєкту в папку `htdocs`:
```
C:\xampp\htdocs\barbershop\
```

### 3. Створення бази даних

1. Відкрийте phpMyAdmin: `http://localhost/phpmyadmin`
2. Створіть нову базу даних `barbershop`
3. Імпортуйте файл `database.sql` або виконайте SQL-запити з цього файлу

Альтернативно, можете створити базу через команду:
```sql
CREATE DATABASE barbershop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Налаштування підключення до БД

Відкрийте файл `config.php` та перевірте налаштування:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', ''); // За замовчуванням порожній для XAMPP
define('DB_NAME', 'barbershop');
```

### 5. Запуск проєкту

Відкрийте в браузері:
```
http://localhost/barbershop/
```

## 📁 Структура проєкту

```
barbershop/
│
├── index.html              # Головна сторінка
├── services.html           # Сторінка послуг
├── barbers.html            # Сторінка барберів
├── barber.html             # Профіль барбера
├── gallery.html            # Галерея
├── login.html              # Вхід
├── register.html           # Реєстрація
├── booking.html            # Бронювання
├── account.html            # Особистий кабінет
│
├── css/
│   └── styles.css          # Основні стилі
│
├── js/
│   ├── app.js              # Основний JavaScript
│   ├── home.js             # JS для головної
│   ├── services.js         # JS для послуг
│   ├── barbers.js          # JS для барберів
│   └── account.js          # JS для акаунту
│
├── config.php              # Конфігурація БД
├── api.php                 # REST API
├── database.sql            # SQL структура БД
└── README.md              # Ця інструкція
```

## 🔑 API Endpoints

### Публічні

- `GET /api.php?request=services` - Отримати всі послуги
- `GET /api.php?request=barbers` - Отримати всіх барберів
- `GET /api.php?request=barber&id={id}` - Отримати барбера за ID
- `GET /api.php?request=testimonials` - Отримати відгуки
- `GET /api.php?request=gallery` - Отримати галерею

### Авторизація

- `POST /api.php?request=register` - Реєстрація
- `POST /api.php?request=login` - Вхід
- `POST /api.php?request=logout` - Вихід
- `GET /api.php?request=current-user` - Поточний користувач

### Бронювання (потребує авторизації)

- `GET /api.php?request=bookings` - Отримати бронювання користувача
- `POST /api.php?request=bookings` - Створити бронювання
- `POST /api.php?request=cancel-booking` - Скасувати бронювання
- `POST /api.php?request=update-profile` - Оновити профіль

## 🎨 Особливості

- ✅ Responsive дизайн
- ✅ Онлайн бронювання
- ✅ Система авторизації
- ✅ Особистий кабінет
- ✅ Галерея робіт
- ✅ Профілі барберів
- ✅ Відгуки клієнтів

## 🔐 Тестовий доступ

Після імпорту бази даних, ви можете зареєструвати нового користувача через форму реєстрації.

## 🐛 Вирішення проблем

### Apache не запускається

- Перевірте, чи порт 80 не зайнятий іншою програмою
- Спробуйте змінити порт в налаштуваннях XAMPP

### MySQL не запускається

- Перевірте, чи порт 3306 не зайнятий
- Перевірте файли логів в XAMPP

### Помилка підключення до БД

- Перевірте налаштування в `config.php`
- Переконайтесь, що MySQL запущено
- Перевірте, чи існує база даних `barbershop`

### Не завантажуються дані

- Відкрийте консоль розробника (F12)
- Перевірте вкладку Network на помилки API
- Переконайтесь, що файл `api.php` доступний

## 📝 Ліцензія

MIT License - вільне використання для навчальних цілей

## 👨‍💻 Автор

Створено на основі Figma дизайну Barbershop Website Design