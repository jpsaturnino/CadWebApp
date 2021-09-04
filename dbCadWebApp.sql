-- MySQL dump 10.13  Distrib 8.0.26, for macos11 (x86_64)
--
-- Host: localhost    Database: webApp
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Cliente`
--

DROP TABLE IF EXISTS `Cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cliente` (
  `cli_id` int NOT NULL,
  `cli_nome` varchar(45) DEFAULT NULL,
  `cli_sobrenome` varchar(45) DEFAULT NULL,
  `cli_dataNasc` date DEFAULT NULL,
  `cli_facebook` varchar(100) DEFAULT NULL,
  `cli_instagram` varchar(100) DEFAULT NULL,
  `cli_linkedin` varchar(100) DEFAULT NULL,
  `cli_twitter` varchar(100) DEFAULT NULL,
  `cli_cpf` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `cli_rg` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`cli_id`),
  UNIQUE KEY `cli_cpf_UNIQUE` (`cli_cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cliente`
--

LOCK TABLES `Cliente` WRITE;
/*!40000 ALTER TABLE `Cliente` DISABLE KEYS */;
INSERT INTO `Cliente` VALUES (1000,'Antonio','Silva Santos','1987-03-02','facebook.com/antonio','@antonioSantos','','','366.419.102-10','48.398.522-3'),(1010,'Henrique','Souza','2000-01-02','','@nicolasOliver','linkedin.com/nicolasOliver','','216.202.861-14','43.239.741-3');
/*!40000 ALTER TABLE `Cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Endereco`
--

DROP TABLE IF EXISTS `Endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Endereco` (
  `end_id` int NOT NULL AUTO_INCREMENT,
  `end_rua` varchar(45) DEFAULT NULL,
  `end_cidade` varchar(45) DEFAULT NULL,
  `end_cep` varchar(9) DEFAULT NULL,
  `end_estado` varchar(45) DEFAULT NULL,
  `end_bairro` varchar(45) DEFAULT NULL,
  `end_numero` int DEFAULT NULL,
  `cli_id` int NOT NULL,
  PRIMARY KEY (`end_id`),
  KEY `fk_Endereco_Cliente` (`cli_id`),
  CONSTRAINT `fk_Endereco_Cliente` FOREIGN KEY (`cli_id`) REFERENCES `Cliente` (`cli_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Endereco`
--

LOCK TABLES `Endereco` WRITE;
/*!40000 ALTER TABLE `Endereco` DISABLE KEYS */;
INSERT INTO `Endereco` VALUES (31,'Rua José Gomes Peixoto','Maceió','57057-350','AL','Pinheiro',24,1000),(32,'Rua José Gomes Peixoto','Maceió','57057-350','AL','Pinheiro',33,1000),(34,'Rodovia Governador Mário Covas','Serra','29176-015','ES','Serra Centro',416,1010);
/*!40000 ALTER TABLE `Endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Telefone`
--

DROP TABLE IF EXISTS `Telefone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Telefone` (
  `tel_id` int NOT NULL AUTO_INCREMENT,
  `tel_tipo` varchar(45) DEFAULT NULL,
  `tel_numero` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `cli_id` int NOT NULL,
  PRIMARY KEY (`tel_id`),
  KEY `fk_Cliente` (`cli_id`),
  CONSTRAINT `fk_Cliente` FOREIGN KEY (`cli_id`) REFERENCES `Cliente` (`cli_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Telefone`
--

LOCK TABLES `Telefone` WRITE;
/*!40000 ALTER TABLE `Telefone` DISABLE KEYS */;
INSERT INTO `Telefone` VALUES (21,'Residencial','822903-1905',1000),(22,'Móvel','8299616-0397',1000),(24,'Móvel','2798533-6998',1010);
/*!40000 ALTER TABLE `Telefone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'webApp'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-03 23:50:48
