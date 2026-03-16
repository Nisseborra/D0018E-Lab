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
  KEY `fk_BASKET_user` (`USER_ID`),
  CONSTRAINT `fk_BASKET_user` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basket`
--

LOCK TABLES `basket` WRITE;
/*!40000 ALTER TABLE `basket` DISABLE KEYS */;
INSERT INTO `basket` VALUES (7,1,5),(8,1,4),(9,1,4),(10,1,5),(11,1,5),(12,1,4),(13,1,4);
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
  KEY `fk_bi_BASKET` (`BASKET_ID`),
  KEY `fk_bi_ITEM` (`ITEM_ID`),
  CONSTRAINT `fk_bi_BASKET` FOREIGN KEY (`BASKET_ID`) REFERENCES `basket` (`BASKET_ID`),
  CONSTRAINT `fk_bi_ITEM` FOREIGN KEY (`ITEM_ID`) REFERENCES `item` (`ITEM_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basket_item`
--

LOCK TABLES `basket_item` WRITE;
/*!40000 ALTER TABLE `basket_item` DISABLE KEYS */;
INSERT INTO `basket_item` VALUES (8,78),(8,77),(9,79),(10,81),(10,80),(11,82),(12,84),(13,83);
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
  KEY `fk_CATEGORY_ITEM` (`ITEM_ID`),
  CONSTRAINT `fk_CATEGORY_ITEM` FOREIGN KEY (`ITEM_ID`) REFERENCES `item` (`ITEM_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Music',NULL,NULL),(2,'Sport and Leisure',NULL,NULL),(3,'Books',NULL,NULL),(4,'Video games',NULL,NULL),(5,'Decoar',NULL,NULL),(6,'Clothes',NULL,NULL);
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
  `PRICE` decimal(10,2) NOT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `IMAGE_1` varchar(255) DEFAULT NULL,
  `IMAGE_2` varchar(255) DEFAULT NULL,
  `IMAGE_3` varchar(255) DEFAULT NULL,
  `CATEGORY_ID` int NOT NULL,
  `IS_SOLD` tinyint(1) NOT NULL DEFAULT '0',
  `CREATED_BY` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ITEM_ID`),
  KEY `USER_ID_idx` (`USER_ID`),
  KEY `CATEGORY_ID_idx` (`CATEGORY_ID`),
  CONSTRAINT `CATEGORY_ID` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `category` (`CATEGORY_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (70,4,'123',123.00,'123','1772781728295-pfp.jpg',NULL,NULL,1,1,'mudada-3'),(71,4,'1',11.00,'1','1772782763488-46614301cae3b1563294b4fcaabf501e.jpg',NULL,NULL,1,1,'mudada-3'),(72,4,'1',11.00,'1','1772782833741-46614301cae3b1563294b4fcaabf501e.jpg',NULL,NULL,1,1,'mudada-3'),(75,5,'music',12344.00,'music','1773582463709-46614301cae3b1563294b4fcaabf501e.jpg',NULL,NULL,1,0,'asd'),(76,5,'sport',333.00,'sport','1773582508372-75f9a66cd73418991b05137c62e328d5.jpg',NULL,NULL,2,0,'asd'),(77,6,'test',23.00,'tedt','1773650909835-pfp.jpg',NULL,NULL,1,1,'as'),(78,6,'spel',323.00,'er','1773650945012-f7b23640fc443d4c6c06ea1e8f304674.jpg',NULL,NULL,3,1,'as'),(79,6,'s',12.00,'s','1773651699852-pfp.jpg',NULL,NULL,1,1,'as'),(80,6,'s',21.00,'s','1773652083350-pfp.jpg',NULL,NULL,1,1,'as'),(81,6,'12',32.00,'12','1773652103870-75f9a66cd73418991b05137c62e328d5.jpg',NULL,NULL,6,1,'as'),(82,6,'as',12.00,'as','1773652692705-pfp.jpg',NULL,NULL,1,1,'as'),(83,6,'as',12.00,'as','1773652740513-pfp.jpg',NULL,NULL,1,1,'as'),(84,6,'ass',123.00,'ass','1773652786678-615256cf03c973ccc918c680ff1d79fb.jpg',NULL,NULL,1,1,'as');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `ORDER_ID` int NOT NULL AUTO_INCREMENT,
  `STATUS` tinyint NOT NULL,
  `BASKET_ID` int DEFAULT NULL,
  PRIMARY KEY (`ORDER_ID`),
  KEY `BASKET_ID_idx` (`BASKET_ID`),
  CONSTRAINT `fk_orders_basket` FOREIGN KEY (`BASKET_ID`) REFERENCES `basket` (`BASKET_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (5,0,7),(6,0,8),(7,0,9),(8,0,10),(9,0,11),(10,0,12),(11,0,13);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_item`
--

DROP TABLE IF EXISTS `orders_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders_item` (
  `PRICE_SUM` int NOT NULL,
  `QUANTITY` int NOT NULL,
  `ORDER_ID` int DEFAULT NULL,
  `ITEM_ID` int DEFAULT NULL,
  KEY `ORDERS_INT_idx` (`ORDER_ID`),
  KEY `ITEM_ID_idx` (`ITEM_ID`),
  CONSTRAINT `fk_orders_item_item` FOREIGN KEY (`ITEM_ID`) REFERENCES `item` (`ITEM_ID`),
  CONSTRAINT `fk_orders_item_order` FOREIGN KEY (`ORDER_ID`) REFERENCES `orders` (`ORDER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_item`
--

LOCK TABLES `orders_item` WRITE;
/*!40000 ALTER TABLE `orders_item` DISABLE KEYS */;
INSERT INTO `orders_item` VALUES (123,1,5,70),(11,1,5,71),(11,1,5,72),(323,1,6,78),(23,1,6,77),(12,1,7,79),(32,1,8,81),(21,1,8,80),(12,1,9,82),(123,1,10,84),(12,1,11,83);
/*!40000 ALTER TABLE `orders_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rate`
--

DROP TABLE IF EXISTS `rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rate` (
  `DESCRIPTION` varchar(150) DEFAULT NULL,
  `RATING` int NOT NULL,
  `ITEM_ID` int NOT NULL,
  `USER_ID` int NOT NULL,
  KEY `fk_review_userid_idx` (`USER_ID`),
  CONSTRAINT `fk_review_userid` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`USER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate`
--

LOCK TABLES `rate` WRITE;
/*!40000 ALTER TABLE `rate` DISABLE KEYS */;
INSERT INTO `rate` VALUES ('3',5,72,4),('3',5,70,4),('3',5,78,6),('3',5,77,6),('3',5,79,6),('test',1,81,6),('muda',3,80,6),('test',1,82,6),('43',1,84,6),('234',4,83,6);
/*!40000 ALTER TABLE `rate` ENABLE KEYS */;
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
  `IS_ADMIN` tinyint(1) DEFAULT '0',
  `AVG` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `USERNAME` (`USERNAME`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'admin','','','admin',1,NULL),(4,'mudada-3','Mudasir','Adan','root',0,NULL),(5,'asd','asd','asd','asd',0,NULL),(6,'as','Mudasir','Adan','as',0,3.13);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-16 10:24:55
