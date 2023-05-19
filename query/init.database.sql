CREATE DATABASE IF NOT EXISTS confere
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE confere;

CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    sobrenome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    dataNascimento DATE NOT NULL,
    cep VARCHAR(10) NOT NULL,
    logradouro VARCHAR(255),
    numeroDaResidencia INT NOT NULL,
    complemento VARCHAR(255),
    bairro VARCHAR(255),
    cidade VARCHAR(255),
    estado VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS address (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    titulo VARCHAR(255) NOT NULL,
    cep VARCHAR(10) NOT NULL,
    logradouro VARCHAR(255) NOT NULL,
    numero INT NOT NULL,
    complemento VARCHAR(255),
    bairro VARCHAR(255),
    cidade VARCHAR(255),
    estado VARCHAR(255),
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE IF NOT EXISTS routes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    duracao VARCHAR(50) NOT NULL,
    ponto_inicial VARCHAR(255) NOT NULL
);

CREATE TABLE route_addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    route_id INT,
    address_id INT,
    FOREIGN KEY (route_id) REFERENCES routes(id),
    FOREIGN KEY (address_id) REFERENCES address(id)
    ON DELETE CASCADE
);