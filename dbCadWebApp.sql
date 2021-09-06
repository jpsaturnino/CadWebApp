-- MySQL dump 10.13  Distrib 8.0.26, for macos11 (x86_64)
--
-- Host: localhost    Database: webApp
-- ------------------------------------------------------
-- Server version	8.0.26

--
-- Table structure for table `Cliente`
--

DROP TABLE IF EXISTS `Cliente`;
CREATE TABLE `Cliente` (
  `cli_id` int NOT NULL,
  `cli_nome` varchar(45) DEFAULT NULL,
  `cli_sobrenome` varchar(45) DEFAULT NULL,
  `cli_dataNasc` date DEFAULT NULL,
  `cli_facebook` varchar(100) DEFAULT NULL,
  `cli_instagram` varchar(100) DEFAULT NULL,
  `cli_linkedin` varchar(100) DEFAULT NULL,
  `cli_twitter` varchar(100) DEFAULT NULL,
  `cli_cpf` varchar(14) DEFAULT NULL,
  `cli_rg` varchar(14) DEFAULT NULL,
  PRIMARY KEY (`cli_id`),
  UNIQUE KEY `cli_cpf_UNIQUE` (`cli_cpf`)
);

--
-- Dumping data for table `Cliente`
--

LOCK TABLES `Cliente` WRITE;
INSERT INTO `Cliente` VALUES (1000,'Antonio','Silva Santos','1987-03-02','facebook.com/antonio','@antonioSantos','','','366.419.102-10','48.398.522-3'),(1001,'Carlos','Bernardo Almada','1968-11-18','facebook.com/bernardoC','@bernCarlos',NULL,'bernCarlos','292.119.524-09','22.176.988-2'),(1010,'Henrique','Souza','2000-01-02','','@nicolasOliver','linkedin.com/nicolasOliver','','216.202.861-14','43.239.741-3'),(1020,'Joaquim Danilo','Luz','1951-04-19',NULL,'@daniloqui','linkedin.com/daniloqui',NULL,'044.251.911-70','27.943.731-6'),(1111,'Cauê Bernardo','Lorenzo Barros','1999-12-01',NULL,'@cauelorenzo','linkedin.com/cauelorenzo',NULL,'250.059.514-58','32.174.395-7'),(1332,'Gustavo','Levi Porto','2001-03-28',NULL,'@guporto',NULL,'guporto','512.910.009-33','43.912.134-6'),(1423,'Augusto','Diego da Mata','1978-02-13',NULL,'@gutodie',NULL,NULL,'530.927.205-47','32.878.707-3'),(1555,'Elaine ','Isis Moreira','2001-06-01','facebook.com/elainemoreira','@elamoreira',NULL,'elamoreira','911.990.140-28','28.731.048-6'),(1777,'Teresinha','Andreia Costa','1983-08-05','facebook.com/terecosta',NULL,'linkedin.com/terecosta',NULL,'809.099.987-52','18.872.777-2'),(1900,'Alice','Moraes','1996-08-19',NULL,'@alicegmoraes','linkedin.com/alimorares',NULL,'210.359.942-08','12.874.447-9'),(2000,'Laura','Fernanda Novaes','1982-05-10','facebook.com/claufer','@claufer',NULL,'claufer','565.365.419-10','42.056.658-2');
UNLOCK TABLES;

--
-- Table structure for table `Endereco`
--

DROP TABLE IF EXISTS `Endereco`;
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
);

--
-- Dumping data for table `Endereco`
--

LOCK TABLES `Endereco` WRITE;
INSERT INTO `Endereco` VALUES (31,'Rua José Gomes Peixoto','Maceió','57057-350','AL','Pinheiro',24,1000),(32,'Rua José Gomes Peixoto','Maceió','57057-350','AL','Pinheiro',33,1000),(34,'Rodovia Governador Mário Covas','Serra','29176-015','ES','Serra Centro',416,1010),(38,'Rua Carlo Bauducco','Guarulhos','59142-210','SP','Vila Paraíso',306,1001),(39,'Rua Barão do Rio Branco','Montes Claros','39400-075','MG','Centro',801,1001),(40,'Rua Porto Alegre','Rio Branco','69914-288','AC','Waldemar Maciel',661,1020),(41,'Rua Guilherme Xavier Almeida','Goiânia','74481-630','GO','Residencial Green Park',499,2000),(42,'Rua Dom Carlos Duarte Costa','Cascavel','85814-697','PR','Floresta',570,1900),(43,'Avenida Brigadeiro Gilberto Sampaio de Toledo','São José dos Campos','12228-831','SP','Vila Adriana',569,1900),(44,'Rua Veraneio','Teresina','64006-460','PI','Água Mineral',966,1332),(45,'Rua José Seabra Batista','Aracaju','49025-750','SE','Jardins',713,1777),(46,'Rua Santo Antonio','São Luís','65081-680','MA','Vila Embratel',164,1777),(47,'Estrada Arara','Rio de Janeiro','20970-710','RJ','Manguinhos',861,1423),(48,'Rua Rubi','Barueri','06410-160','SP','Jardim dos Camargos',153,1555),(49,'Rodovia Governador Mário Govas','Viana','29132-666','ES','Bom Pastor',227,1111);
UNLOCK TABLES;

--
-- Table structure for table `Telefone`
--

DROP TABLE IF EXISTS `Telefone`;
CREATE TABLE `Telefone` (
  `tel_id` int NOT NULL AUTO_INCREMENT,
  `tel_tipo` varchar(45) DEFAULT NULL,
  `tel_numero` varchar(14) DEFAULT NULL,
  `cli_id` int NOT NULL,
  PRIMARY KEY (`tel_id`),
  KEY `Telefone_FK` (`cli_id`),
  CONSTRAINT `Telefone_FK` FOREIGN KEY (`cli_id`) REFERENCES `Cliente` (`cli_id`)
);
--
-- Dumping data for table `Telefone`
--

LOCK TABLES `Telefone` WRITE;
INSERT INTO `Telefone` VALUES (21,'Residencial','822903-1905',1000),(22,'Móvel','8299616-0397',1000),(24,'Móvel','2798533-6998',1010),(28,'Residencial','982686-1537',1001),(29,'Móvel','9899616-8491',1020),(30,'Comercial','853623-4281',1020),(31,'Móvel','8599900-7193',1332),(32,'Residencial','693644-2642',1777),(33,'Comercial','423581-3915',1777),(34,'Móvel','6998101-3461',1900),(35,'Móvel','4298213-2118',2000),(36,'Móvel','2199237-5715',1423),(37,'Comercial','212657-8769',1423),(38,'Móvel','1199958-9470',1555),(39,'Móvel','273595-2819',1111),(40,'Residencial','2798205-8265',1111);
UNLOCK TABLES;

--
-- Dumping routines for database 'webApp'
--

-- Dump completed on 2021-09-06 15:35:04
