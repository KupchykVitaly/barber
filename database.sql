-- Створення бази даних
CREATE DATABASE IF NOT EXISTS barbershop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE barbershop;

-- Таблиця користувачів
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблиця послуг
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration INT NOT NULL COMMENT 'Тривалість у хвилинах'
);

-- Таблиця барберів
CREATE TABLE barbers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(200),
    bio TEXT,
    photo VARCHAR(255)
);

-- Таблиця галереї барберів
CREATE TABLE barber_gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    barber_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (barber_id) REFERENCES barbers(id) ON DELETE CASCADE
);

-- Таблиця бронювань
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    barber_id INT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    status ENUM('upcoming', 'completed', 'cancelled') DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (barber_id) REFERENCES barbers(id) ON DELETE CASCADE
);

-- Таблиця відгуків
CREATE TABLE testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    text TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблиця галереї
CREATE TABLE gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    barber_id INT,
    FOREIGN KEY (barber_id) REFERENCES barbers(id) ON DELETE SET NULL
);

-- Вставка тестових даних

-- Послуги
INSERT INTO services (name, description, price, duration) VALUES
('Стрижка', 'Класична чоловіча стрижка з укладанням', 350.00, 45),
('Гоління', 'Королівське гоління небезпечною бритвою', 250.00, 30),
('Догляд за бородою', 'Моделювання та догляд за бородою', 300.00, 40),
('Стрижка + Борода', 'Комплексний догляд: стрижка та борода', 600.00, 75),
('Дитяча стрижка', 'Стрижка для дітей до 12 років', 250.00, 30),
('Камуфляж сивини', 'Фарбування для маскування сивини', 400.00, 60);

-- Барбери
INSERT INTO barbers (name, specialization, bio, photo) VALUES
('Олексій Коваленко', 'Майстер класичних стрижок', 'Досвід роботи 8 років. Спеціалізуюсь на класичних чоловічих стрижках та догляді за бородою. Мій підхід - поєднання традицій барберингу та сучасних трендів.', 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=400'),
('Дмитро Петренко', 'Експерт сучасних стилів', 'Працюю барбером 5 років. Обожнюю створювати сучасні та стильні образи. Постійно слідкую за новими трендами та вдосконалюю свої навички.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'),
('Ігор Мельник', 'Майстер гоління та бороди', '10 років досвіду. Спеціалізуюсь на королівському голінні та моделюванні бороди. Використовую тільки професійні засоби преміум-класу.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop');

-- Галерея барберів
INSERT INTO barber_gallery (barber_id, image_url) VALUES
(1, 'https://images.unsplash.com/photo-1619216313450-866406ac6bb9?w=400'),
(1, 'https://images.unsplash.com/photo-1599447068894-089fabc9876c?w=400'),
(2, 'https://images.unsplash.com/photo-1710367847973-152d445b23a6?w=400'),
(3, 'https://images.unsplash.com/photo-1599447068894-089fabc9876c?w=400');

-- Відгуки
INSERT INTO testimonials (name, text, rating) VALUES
('Андрій К.', 'Найкраща барбершоп у місті! Олексій завжди розуміє, що мені потрібно. Відмінний сервіс!', 5),
('Максим С.', 'Ходжу сюди вже рік. Професіонали своєї справи. Атмосфера чудова, завжди приємно відвідувати.', 5),
('Володимир П.', 'Дмитро - чудовий майстер! Зробив мені саме ту стрижку, про яку я мріяв. Рекомендую всім!', 5),
('Сергій Л.', 'Королівське гоління у Ігоря - це щось неймовірне. Відчуваєш себе справжнім джентльменом!', 5);

-- Галерея
INSERT INTO gallery (image_url, category) VALUES
('https://images.unsplash.com/photo-1619216313450-866406ac6bb9?w=600', 'haircut'),
('https://images.unsplash.com/photo-1599447068894-089fabc9876c?w=600', 'beard'),
('https://images.unsplash.com/photo-1710367847973-152d445b23a6?w=600', 'haircut'),
('https://images.unsplash.com/photo-1629881544138-c45fc917eb81?w=600', 'interior'),
('https://images.unsplash.com/photo-1667539916671-b9e7039ccee5?w=600', 'interior'),
('https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=600', 'style');