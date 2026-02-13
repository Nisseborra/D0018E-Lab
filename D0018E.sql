-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: d0018e
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `basket`
--

DROP TABLE IF EXISTS `basket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basket` (
  `BASKET_ID` int NOT NULL AUTO_INCREMENT,
  `IS_ORDERD` tinyint(1) DEFAULT '0',
  `USER_ID` int DEFAULT NULL,
  PRIMARY KEY (`BASKET_ID`),
  KEY `fk_basket_user` (`USER_ID`),
  CONSTRAINT `fk_basket_user` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basket`
--

LOCK TABLES `basket` WRITE;
/*!40000 ALTER TABLE `basket` DISABLE KEYS */;
/*!40000 ALTER TABLE `basket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `basket_item`
--

DROP TABLE IF EXISTS `basket_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basket_item` (
  `BASKET_ID` int DEFAULT NULL,
  `ITEM_ID` int DEFAULT NULL,
  KEY `fk_bi_basket` (`BASKET_ID`),
  KEY `fk_bi_item` (`ITEM_ID`),
  CONSTRAINT `fk_bi_basket` FOREIGN KEY (`BASKET_ID`) REFERENCES `basket` (`BASKET_ID`),
  CONSTRAINT `fk_bi_item` FOREIGN KEY (`ITEM_ID`) REFERENCES `item` (`ITEM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basket_item`
--

LOCK TABLES `basket_item` WRITE;
/*!40000 ALTER TABLE `basket_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `basket_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `CATEGORY_ID` int NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(50) DEFAULT NULL,
  `ITEM_COUNT` int DEFAULT NULL,
  `ITEM_ID` int DEFAULT NULL,
  PRIMARY KEY (`CATEGORY_ID`),
  KEY `fk_category_item` (`ITEM_ID`),
  CONSTRAINT `fk_category_item` FOREIGN KEY (`ITEM_ID`) REFERENCES `item` (`ITEM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `ITEM_ID` int NOT NULL AUTO_INCREMENT,
  `USER_ID` int DEFAULT NULL,
  `TITLE` varchar(50) NOT NULL,
  `PRICE` double NOT NULL,
  `DESCRIPTION` varchar(150) DEFAULT NULL,
  `IMAGE_1` varchar(255) DEFAULT NULL,
  `IMAGE_2` varchar(255) DEFAULT NULL,
  `IMAGE_3` varchar(255) DEFAULT NULL,
  `CATEGORY` varchar(150) NOT NULL,
  `IS_SOLD` tinyint(1) NOT NULL DEFAULT '0',
  `CREATED_BY` int DEFAULT NULL,
  PRIMARY KEY (`ITEM_ID`),
  KEY `USER_ID_idx` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,1,'Laptop',7500,'Used laptop',NULL,NULL,NULL,'Electronics',0,NULL),(2,2,'Bike',1200,'Mountain bike',NULL,NULL,NULL,'Sports',0,NULL),(3,1,'Desk',500,'Wooden desk',NULL,NULL,NULL,'Furniture',1,NULL);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `ORDER_ID` int NOT NULL AUTO_INCREMENT,
  `STATUS` tinyint NOT NULL,
  `BASKET_ID` int DEFAULT NULL,
  PRIMARY KEY (`ORDER_ID`),
  KEY `BASKET_ID_idx` (`BASKET_ID`),
  CONSTRAINT `BASKET_ID` FOREIGN KEY (`BASKET_ID`) REFERENCES `basket` (`BASKET_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `PRICE_SUM` int NOT NULL,
  `QUANTITY` int NOT NULL,
  `ORDER_ID` int DEFAULT NULL,
  `ITEM_ID` int DEFAULT NULL,
  KEY `ORDER_INT_idx` (`ORDER_ID`),
  KEY `ITEM_ID_idx` (`ITEM_ID`),
  CONSTRAINT `ITEM_ID` FOREIGN KEY (`ITEM_ID`) REFERENCES `item` (`ITEM_ID`),
  CONSTRAINT `ORDER_INT` FOREIGN KEY (`ORDER_ID`) REFERENCES `order` (`ORDER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `USER_ID` int NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(15) NOT NULL,
  `FNAME` varchar(15) NOT NULL,
  `LNAME` varchar(15) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `USERNAME` (`USERNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Dumping data for table `users`
--

<<<<<<< HEAD
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
=======
LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;
/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
INSERT INTO `USERS` VALUES ('nils', 'Nils', 'Bohlin', '123');
>>>>>>> a9f07305165824c5c39000a7bac5f993723d061f
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-13 17:15:20
