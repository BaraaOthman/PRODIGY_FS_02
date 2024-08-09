CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profilepic VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE `grocerylist` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(55) DEFAULT NULL,
  `category` varchar(55) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `id` int DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `id_idx` (`id`),
  CONSTRAINT `id` FOREIGN KEY (`id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
