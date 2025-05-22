-- Auteur : Johan Jacquet
-- Date de MAJ : 22.06.2025
-- Création de la base
CREATE DATABASE IF NOT EXISTS server_ai_db;
USE server_ai_db;

-- Table utilisateur
CREATE TABLE utilisateur (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    mdp VARCHAR(255) NOT NULL
);

-- Table modele
CREATE TABLE modele (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    estActif BOOLEAN NOT NULL
);

-- Table chat
CREATE TABLE chat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_maj TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    utilisateur_id INT,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE SET NULL
);

-- Table message (lié à un seul chat)
CREATE TABLE message (
    id INT PRIMARY KEY AUTO_INCREMENT,
    contenu VARCHAR(1000) NOT NULL,
    role VARCHAR(100) NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    chat_id INT NOT NULL,
    FOREIGN KEY (chat_id) REFERENCES chat(id) ON DELETE CASCADE
);
