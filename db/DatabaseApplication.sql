-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: DatabaseApplication
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `postcode` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `telephoneNumber` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `role` enum('admin','customer','merchant') NOT NULL DEFAULT 'admin',
  `mobileNumber` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_3318408e01dae7dc9571e79216` (`code`),
  UNIQUE KEY `IDX_de87485f6489f5d0995f584195` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'A7-6','GabbageLovelace@gmail.com','Ada-Lovelace-Straße 17','63457','Hanau','06181261291','$2b$10$ysFMcKVBbnMFLsOpy3bbr.gdowuw6zlBBmAzyTD/ewGxqTZi5tQjy','2024-02-07 06:34:39','Ada-Charles','Gabbage-Lovelace','admin',NULL);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL DEFAULT '0',
  `totalPrice` decimal(10,2) NOT NULL DEFAULT '0.00',
  `pending` tinyint NOT NULL DEFAULT '1',
  `paid` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `customerId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_eac3d1f269ffeb0999fbde0185b` (`customerId`),
  CONSTRAINT `FK_eac3d1f269ffeb0999fbde0185b` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `postcode` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `telephoneNumber` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `role` enum('admin','customer','merchant') NOT NULL DEFAULT 'customer',
  `mobileNumber` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_68db634015cb7defd6b98f910f` (`code`),
  UNIQUE KEY `IDX_fdb2f3ad8115da4c7718109a6e` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Z610-FB-S3RP3','test1@gmail.com','TestStrasse 37','37073','Göttingen',NULL,'$2b$10$V0pgPdfZg61HW9NKdA4QNe6vtuuVOXT1vF3Y8qfXr9XmhyXIFZIe2','2024-02-15 12:44:43','Alan','Turing','customer','3141592');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merchant`
--

DROP TABLE IF EXISTS `merchant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `merchant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `postcode` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `telephoneNumber` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `role` enum('admin','customer','merchant') NOT NULL DEFAULT 'merchant',
  `mobileNumber` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_17ed216f767e8c37dd24f5c0b9` (`code`),
  UNIQUE KEY `IDX_546608b3c7bf7c175d3780c38f` (`email`),
  UNIQUE KEY `IDX_32f2d4bbe63e9626112c1ca2b9` (`companyName`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant`
--

LOCK TABLES `merchant` WRITE;
/*!40000 ALTER TABLE `merchant` DISABLE KEYS */;
INSERT INTO `merchant` VALUES (1,'CWF9-J5','testCompany37@gmail.com','Rubidiumstraße 37','85468','Sundsvall','1337314159265','$2b$10$JCarY8.IjV9WQAeI/WgfZOYGWD106kO9SWKNJCuPp5J4LV2V8W88i','2024-02-07 06:34:48','testCompany','Sweden','merchant',NULL),(2,'2-6OURR','testCompany73@gmail.com','Rubidiumstraße 37','85468','Sundsvall','1337314159265','$2b$10$lIQemxx96pAeI2ll2m7MVOmVArfzvgKxAjDpIzexaWE84lOdBSN4i','2024-02-15 12:26:07','TheCompany','Sweden','merchant','7331314159265');
/*!40000 ALTER TABLE `merchant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `object`
--

DROP TABLE IF EXISTS `object`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `object` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `object` varchar(255) NOT NULL,
  `objectNumber` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `color` varchar(255) NOT NULL,
  `amount` int NOT NULL,
  `available` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `merchantId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_751236bb9aa9795d6a592f2216` (`objectNumber`),
  KEY `FK_8532334fb9ccb65b11808de2dfd` (`merchantId`),
  CONSTRAINT `FK_8532334fb9ccb65b11808de2dfd` FOREIGN KEY (`merchantId`) REFERENCES `merchant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `object`
--

LOCK TABLES `object` WRITE;
/*!40000 ALTER TABLE `object` DISABLE KEYS */;
INSERT INTO `object` VALUES (1,'cookie','27',6.66,'kuro',13,1,'2024-02-15 12:28:35',2),(2,'cookie','271',13.37,'kuro',13,1,'2024-02-15 12:32:04',2),(3,'cookie','2718',13.37,'violett',13,1,'2024-02-15 12:32:38',2),(4,'cookie','31',11.11,'nero',13,1,'2024-02-15 12:33:47',1),(5,'cookie','314',73.31,'violett',7,1,'2024-02-15 12:34:39',1),(6,'cookie','3141',6.66,'black',7,1,'2024-02-15 12:34:56',1),(7,'cookie','31415',6.00,'black',7,1,'2024-02-15 12:37:17',1);
/*!40000 ALTER TABLE `object` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partial_cart`
--

DROP TABLE IF EXISTS `partial_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partial_cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `subPrice` decimal(10,2) NOT NULL,
  `cartId` bigint DEFAULT NULL,
  `objectId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4bb62ee791eaa6165295c2b0141` (`cartId`),
  KEY `FK_057c0697961aca856041e583fdb` (`objectId`),
  CONSTRAINT `FK_057c0697961aca856041e583fdb` FOREIGN KEY (`objectId`) REFERENCES `object` (`id`),
  CONSTRAINT `FK_4bb62ee791eaa6165295c2b0141` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partial_cart`
--

LOCK TABLES `partial_cart` WRITE;
/*!40000 ALTER TABLE `partial_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `partial_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `expiredAt` bigint NOT NULL,
  `id` varchar(255) NOT NULL,
  `json` text NOT NULL,
  `destroyedAt` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_28c5d1d16da7908c97c9bc2f74` (`expiredAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES (1708000981066,'165HolEufxOkbDQM5lWMylvvFeiYsZ88','{\"cookie\":{\"originalMaxAge\":300000,\"expires\":\"2024-02-15T12:38:10.355Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"id\":\"1\",\"code\":\"CWF9-J5\",\"email\":\"testCompany37@gmail.com\",\"address\":\"Rubidiumstraße 37\",\"postcode\":\"85468\",\"city\":\"Sundsvall\",\"mobileNumber\":null,\"password\":\"$2b$10$JCarY8.IjV9WQAeI/WgfZOYGWD106kO9SWKNJCuPp5J4LV2V8W88i\",\"createdAt\":\"2024-02-07T06:34:48.000Z\",\"companyName\":\"testCompany\",\"country\":\"Sweden\",\"telephoneNumber\":\"1337314159265\",\"role\":\"merchant\"}}}',NULL),(1710796415354,'2LkKBYWokcEyALLiu7u_sguzEmOvtss8','{\"cookie\":{\"originalMaxAge\":300000,\"expires\":\"2024-03-18T21:13:23.667Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"passport\":{\"user\":{\"id\":\"1\",\"code\":\"Z610-FB-S3RP3\",\"email\":\"test1@gmail.com\",\"address\":\"TestStrasse 37\",\"postcode\":\"37073\",\"city\":\"Göttingen\",\"mobileNumber\":\"3141592\",\"password\":\"$2b$10$V0pgPdfZg61HW9NKdA4QNe6vtuuVOXT1vF3Y8qfXr9XmhyXIFZIe2\",\"createdAt\":\"2024-02-15T12:44:43.000Z\",\"firstName\":\"Alan\",\"lastName\":\"Turing\",\"telephoneNumber\":null,\"role\":\"customer\"}}}',NULL),(1708003569095,'2wp747J-sTfu4kaj1yNtzHBWsH4SPYlP','{\"cookie\":{\"originalMaxAge\":300000,\"expires\":\"2024-02-15T13:25:28.326Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"id\":\"1\",\"code\":\"A7-6\",\"email\":\"GabbageLovelace@gmail.com\",\"address\":\"Ada-Lovelace-Straße 17\",\"postcode\":\"63457\",\"city\":\"Hanau\",\"mobileNumber\":null,\"password\":\"$2b$10$ysFMcKVBbnMFLsOpy3bbr.gdowuw6zlBBmAzyTD/ewGxqTZi5tQjy\",\"createdAt\":\"2024-02-07T06:34:39.000Z\",\"firstName\":\"Ada-Charles\",\"lastName\":\"Gabbage-Lovelace\",\"telephoneNumber\":\"06181261291\",\"role\":\"admin\"}}}','2024-02-15 13:22:36.000000'),(1708001536172,'5ycaA7j7XS3HfvkbyS0z_MIyW5soYsTF','{\"cookie\":{\"originalMaxAge\":300000,\"expires\":\"2024-02-15T12:51:32.399Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"id\":\"1\",\"code\":\"Z610-FB-S3RP3\",\"email\":\"test1@gmail.com\",\"address\":\"TestStrasse 37\",\"postcode\":\"37073\",\"city\":\"Göttingen\",\"mobileNumber\":\"3141592\",\"password\":\"$2b$10$V0pgPdfZg61HW9NKdA4QNe6vtuuVOXT1vF3Y8qfXr9XmhyXIFZIe2\",\"createdAt\":\"2024-02-15T12:44:43.000Z\",\"firstName\":\"Alan\",\"lastName\":\"Turing\",\"telephoneNumber\":null,\"role\":\"customer\"}}}',NULL),(1707985461842,'670IqzoNBuABT-3MuPH7oGJziycaqyL6','{\"cookie\":{\"originalMaxAge\":299999,\"expires\":\"2024-02-15T08:19:59.020Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"id\":\"1\",\"code\":\"CWF9-J5\",\"email\":\"testCompany37@gmail.com\",\"address\":\"Rubidiumstraße 37\",\"postcode\":\"85468\",\"city\":\"Sundsvall\",\"mobileNumber\":null,\"password\":\"$2b$10$JCarY8.IjV9WQAeI/WgfZOYGWD106kO9SWKNJCuPp5J4LV2V8W88i\",\"createdAt\":\"2024-02-07T06:34:48.000Z\",\"companyName\":\"testCompany\",\"country\":\"Sweden\",\"telephoneNumber\":\"1337314159265\",\"role\":\"merchant\"}}}','2024-02-15 08:19:33.000000'),(1708003218079,'AnQCVVPQ13PdeIs5rhEDm7LEwd5saVWl','{\"cookie\":{\"originalMaxAge\":300000,\"expires\":\"2024-02-15T13:18:07.022Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"id\":\"2\",\"code\":\"2-6OURR\",\"email\":\"testCompany73@gmail.com\",\"address\":\"Rubidiumstraße 37\",\"postcode\":\"85468\",\"city\":\"Sundsvall\",\"mobileNumber\":\"7331314159265\",\"password\":\"$2b$10$lIQemxx96pAeI2ll2m7MVOmVArfzvgKxAjDpIzexaWE84lOdBSN4i\",\"createdAt\":\"2024-02-15T12:26:07.000Z\",\"companyName\":\"TheCompany\",\"country\":\"Sweden\",\"telephoneNumber\":\"1337314159265\",\"role\":\"merchant\"}}}','2024-02-15 13:15:26.000000'),(1707467924980,'B5mM9e8PtGDplb_EsMeflNTiirnuQCkE','{\"cookie\":{\"originalMaxAge\":300000,\"expires\":\"2024-02-09T08:34:16.539Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"id\":\"1\",\"code\":\"CWF9-J5\",\"email\":\"testCompany37@gmail.com\",\"address\":\"Rubidiumstraße 37\",\"postcode\":\"85468\",\"city\":\"Sundsvall\",\"telephoneNumber\":\"1337314159265\",\"password\":\"$2b$10$JCarY8.IjV9WQAeI/WgfZOYGWD106kO9SWKNJCuPp5J4LV2V8W88i\",\"createdAt\":\"2024-02-07T06:34:48.000Z\",\"companyName\":\"testCompany\",\"country\":\"Sweden\",\"role\":\"merchant\"}}}',NULL),(1708003658572,'bgUOwoEJPz4_VGQvexN3Ygwf8tWZ900g','{\"cookie\":{\"originalMaxAge\":300000,\"expires\":\"2024-02-15T13:27:36.521Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"id\":\"2\",\"code\":\"2-6OURR\",\"email\":\"testCompany73@gmail.com\",\"address\":\"Rubidiumstraße 37\",\"postcode\":\"85468\",\"city\":\"Sundsvall\",\"mobileNumber\":\"7331314159265\",\"password\":\"$2b$10$lIQemxx96pAeI2ll2m7MVOmVArfzvgKxAjDpIzexaWE84lOdBSN4i\",\"createdAt\":\"2024-02-15T12:26:07.000Z\",\"companyName\":\"TheCompany\",\"country\":\"Sweden\",\"telephoneNumber\":\"1337314159265\",\"role\":\"merchant\"}}}',NULL),(1707985176857,'Bn8A6krwEOh44rVvuyopZdfjC8wJSoNN','{\"cookie\":{\"originalMaxAge\":300000,\"expires\":\"2024-02-15T08:19:26.701Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"id\":\"1\",\"code\":\"A7-6\",\"email\":\"GabbageLovelace@gmail.com\",\"address\":\"Ada-Lovelace-Straße 17\",\"postcode\":\"63457\",\"city\":\"Hanau\",\"mobileNumber\":null,\"password\":\"$2b$10$ysFMcKVBbnMFLsOpy3bbr.gdowuw6zlBBmAzyTD/ewGxqTZi5tQjy\",\"createdAt\":\"2024-02-07T06:34:39.000Z\",\"firstName\":\"Ada-Charles\",\"lastName\":\"Gabbage-Lovelace\",\"telephoneNumber\":\"06181261291\",\"role\":\"admin\"}}}','2024-02-15 08:14:59.000000'),(1708003480036,'By65jS1oxx7ktrxtvbPaPF3ig7Jslipt','{\"cookie\":{\"originalMaxAge\":300000,\"expires\":\"2024-02-15T13:20:26.772Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"id\":\"1\",\"code\":\"Z610-FB-S3RP3\",\"email\":\"test1@gmail.com\",\"address\":\"TestStrasse 37\",\"postcode\":\"37073\",\"city\":\"Göttingen\",\"mobileNumber\":\"3141592\",\"password\":\"$2b$10$V0pgPdfZg61HW9NKdA4QNe6vtuuVOXT1vF3Y8qfXr9XmhyXIFZIe2\",\"createdAt\":\"2024-02-15T12:44:43.000Z\",\"firstName\":\"Alan\",\"lastName\":\"Turing\",\"telephoneNumber\":null,\"role\":\"customer\"}}}',NULL),(1708002646035,'FQOxED-cx1qIY-IjBWs4JSBsBXsUO775','{\"cookie\":{\"originalMaxAge\":300000,\"expires\":\"2024-02-15T13:09:18.531Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"id\":\"1\",\"code\":\"Z610-FB-S3RP3\",\"email\":\"test1@gmail.com\",\"address\":\"TestStrasse 37\",\"postcode\":\"37073\",\"city\":\"Göttingen\",\"mobileNumber\":\"3141592\",\"password\":\"$2b$10$V0pgPdfZg61HW9NKdA4QNe6vtuuVOXT1vF3Y8qfXr9XmhyXIFZIe2\",\"createdAt\":\"2024-02-15T12:44:43.000Z\",\"firstName\":\"Alan\",\"lastName\":\"Turing\",\"telephoneNumber\":null,\"role\":\"customer\"}}}','2024-02-15 13:06:19.000000'),(1707985602784,'hxHe7kO8CN4GF-x9NgpWpI2J2mNKlN8I','{\"cookie\":{\"originalMaxAge\":300000,\"expires\":\"2024-02-15T08:24:33.654Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"id\":\"1\",\"code\":\"CWF9-J5\",\"email\":\"testCompany37@gmail.com\",\"address\":\"Rubidiumstraße 37\",\"postcode\":\"85468\",\"city\":\"Sundsvall\",\"mobileNumber\":null,\"password\":\"$2b$10$JCarY8.IjV9WQAeI/WgfZOYGWD106kO9SWKNJCuPp5J4LV2V8W88i\",\"createdAt\":\"2024-02-07T06:34:48.000Z\",\"companyName\":\"testCompany\",\"country\":\"Sweden\",\"telephoneNumber\":\"1337314159265\",\"role\":\"merchant\"}}}',NULL),(1708000658038,'MBuw6j2kiD9WviRLWUzNE6oaAYHqBHl8','{\"cookie\":{\"originalMaxAge\":300000,\"expires\":\"2024-02-15T12:32:51.634Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"id\":\"2\",\"code\":\"2-6OURR\",\"email\":\"testCompany73@gmail.com\",\"address\":\"Rubidiumstraße 37\",\"postcode\":\"85468\",\"city\":\"Sundsvall\",\"mobileNumber\":\"7331314159265\",\"password\":\"$2b$10$lIQemxx96pAeI2ll2m7MVOmVArfzvgKxAjDpIzexaWE84lOdBSN4i\",\"createdAt\":\"2024-02-15T12:26:07.000Z\",\"companyName\":\"TheCompany\",\"country\":\"Sweden\",\"telephoneNumber\":\"1337314159265\",\"role\":\"merchant\"}}}',NULL),(1708002749449,'rKjWL2ir6lqYGDBPjmXzuTqtN2fn2WaY','{\"cookie\":{\"originalMaxAge\":300000,\"expires\":\"2024-02-15T13:11:19.627Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"id\":\"2\",\"code\":\"2-6OURR\",\"email\":\"testCompany73@gmail.com\",\"address\":\"Rubidiumstraße 37\",\"postcode\":\"85468\",\"city\":\"Sundsvall\",\"mobileNumber\":\"7331314159265\",\"password\":\"$2b$10$lIQemxx96pAeI2ll2m7MVOmVArfzvgKxAjDpIzexaWE84lOdBSN4i\",\"createdAt\":\"2024-02-15T12:26:07.000Z\",\"companyName\":\"TheCompany\",\"country\":\"Sweden\",\"telephoneNumber\":\"1337314159265\",\"role\":\"merchant\"}}}',NULL),(1710745366774,'TJMKuX8yYYLEtEkhU-Wy5Tq-MgZZEvJv','{\"cookie\":{\"originalMaxAge\":300000,\"expires\":\"2024-03-18T07:01:08.406Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"none\"},\"passport\":{\"user\":{\"id\":\"1\",\"code\":\"Z610-FB-S3RP3\",\"email\":\"test1@gmail.com\",\"address\":\"TestStrasse 37\",\"postcode\":\"37073\",\"city\":\"Göttingen\",\"mobileNumber\":\"3141592\",\"password\":\"$2b$10$V0pgPdfZg61HW9NKdA4QNe6vtuuVOXT1vF3Y8qfXr9XmhyXIFZIe2\",\"createdAt\":\"2024-02-15T12:44:43.000Z\",\"firstName\":\"Alan\",\"lastName\":\"Turing\",\"telephoneNumber\":null,\"role\":\"customer\"}}}',NULL),(1708002553448,'xP5wetZCq1P1ZiywaptVQFCe3-hCOg6h','{\"cookie\":{\"originalMaxAge\":300000,\"expires\":\"2024-02-15T13:09:08.521Z\",\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"id\":\"1\",\"code\":\"A7-6\",\"email\":\"GabbageLovelace@gmail.com\",\"address\":\"Ada-Lovelace-Straße 17\",\"postcode\":\"63457\",\"city\":\"Hanau\",\"mobileNumber\":null,\"password\":\"$2b$10$ysFMcKVBbnMFLsOpy3bbr.gdowuw6zlBBmAzyTD/ewGxqTZi5tQjy\",\"createdAt\":\"2024-02-07T06:34:39.000Z\",\"firstName\":\"Ada-Charles\",\"lastName\":\"Gabbage-Lovelace\",\"telephoneNumber\":\"06181261291\",\"role\":\"admin\"}}}','2024-02-15 13:04:18.000000');
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-18 21:08:45
