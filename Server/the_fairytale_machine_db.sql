CREATE DATABASE  IF NOT EXISTS `the_fairytale_machine` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `the_fairytale_machine`;
-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: the_fairytale_machine
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `chapters` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `setting` varchar(5000) NOT NULL,
  `record_path` varchar(200) NOT NULL,
  `cover_path` varchar(200) NOT NULL,
  `story_id` int(11) unsigned NOT NULL,
  `character_path` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
INSERT INTO `chapters` VALUES (1,'You are a traveller, living your life for adventure and mystery. Your travells have taken you to the furthest reaches of the continent, and some of your exploits are even sung about in taverns.\nAfter hearing stories of the mysterious happenings in Falnieth, you decide you want to see the city for yourself.\nAfter days of travel, you finally reach the city gates, where you are stopped by a guard.\n\'You there! Identify yourself! What is your name?\'\n','/audio/','/images/',1,'/images/'),(2,'You are a traveller, living your life for adventure and mystery. Your travells have taken you to the furthest reaches of the continent, and some of your exploits are even sung about in taverns.\n After hearing stories of the mysterious happenings in Falnieth, you decide you want to see the city for yourself.\n\r\nAfter days of travel, you finally reach the city gates, where you are stopped by a guard.\n\r\n\'You there! Identify yourself! What is your name?\'\n','/audio/','/images/',1,'/images/'),(3,'After providing the guard with your name, you proceed inside the city. Although the city seems pretty normal on the surface, your experience tells you that nothing is ever quite what it seems.\n\r\nIn order to get a better lay of the land, you decide to ask a nearby beggar for some information. As you approach the beggar, you quickly notice that there is something wrong with him.\n\r\n\'Hello stranger, please, spare some time and listen to my story. As you can see, life has not been kind to me; I used to be a solider. In order to win the war, we were tasked with creating unpredictable strategies, so we could confuse the enemy. To achieve our objective, we had to ingest dreamer stones, so we could alter the way we think about our world. What we did not know, is that these stoneswere highly addictive. If you can bring me one of these stones, I would be forever grateful. This city does not allow the proliferation of these stones freely, but I know of some places where you might find some. There is a slavegirl named Kitty in the market who sells them, but her supply comes from somewhere in a local tunnel. Please stranger, even one is more than enough.\'\n\r\n\n\r\nAfter hearing the beggar\'s story, you wonder whether you should explore the locations he mentioned, learn more about the city at the local library or try to hassle the beggar for some more information. ','/audio/','/images/',1,'/images/'),(4,'The guard takes you the Hall of the Necromantic Order. There are several acolytes practicing some sort of ritual. One of the more official looking members approaches you. His robes are clearly\r\nof a different cut from the others, and he walks towards you with the confidence of a person who is used to ordering other around.\n\r\n\n\r\n\'Greetings stranger, I am Zavier, high priest of the Order. I have heard of your exploits in other lands and wish to make you an offer. Some say that our Order is evil, but in this twisted world,\r\nmorality is a luxury only the overly powerful can afford. Join us, traveller, and gain power beyond your wildest dreams... or else...\'\n\r\n\n\r\nHaving heard the Zavier\'s offer, you ponder whether you should choose a life of evil and put your travelling behind you. On the other hand, you could try to steal his eye and selling it later; it seems to be exactly whatthe beggar was looking for, so maybe others would pay a hefty price for it. Of course, you can try telling him about Kitty and how you want to release her as an act of mercy, which would be profitable for the city.','/audio/','/images/',1,'/images/'),(5,'After wondering about for a time, you come upon a slave market. There are several slaves in cages and people are going about their daily tasks. One of the slaves tries to grab your attention.\r\n\'Stranger! Stranger! Come closer!\'\n\r\nAs you approach the slave, you notice she looks somewhat different from the others.\n\r\n\'Word around the city is that you\'re looking for something... I could help you... but is it really want you want? We can flee... right now... \'\n\r\nYou consider the slave\'s words. There is clearly something off about this city, and rescuing her might not be a bad way to escape this place. Of course, you could take her up on her offer\r\nand find one of those stones you were looking for. She seems eager to tell you about the tunnel the Order uses for smuggling in the stones. Kitty seems a bit desperate, maybe you could convince her\r\nto go with you to a different district and make a different sort of \'deal\'.\n','/audio/','/images/',1,'/images/'),(6,'After a bit of searching, you find the entrance to the tunnels where you were told you could reach Cindy. After walking for a bit, you are ambushed by a suspicious looking young woman, who you can\r\nonly assume is Cindy.\n\r\n\'Greetings stranger, world travels fast around this city. I hear you\'ve been looking for me. I admire your dedication, not many strangers make it this far. Have you come to buy some merchandise, or\r\nare you interested in my little business here. If you want the merch, all you need to do is give me half your posessions and grant me a small wish. Otherwise, we can go further down the tunnel, have \r\nsome coffee, and I can tell you all about the order. I hope you\'re not thinking about something stupid, like calling a guard\'\n','/audio/','/images/',1,'/images/'),(7,'You died!','/audio/','/images/',1,'/images/'),(8,'You\'ve managed to escape the city!','/audio/','/images/',1,'/images/'),(9,'You have joined the Order of Necromancy!','/audio/','/images/',1,'/images/');
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapters_linkings`
--

DROP TABLE IF EXISTS `chapters_linkings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `chapters_linkings` (
  `start_chapter_id` int(11) unsigned NOT NULL,
  `end_chapter_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`start_chapter_id`,`end_chapter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters_linkings`
--

LOCK TABLES `chapters_linkings` WRITE;
/*!40000 ALTER TABLE `chapters_linkings` DISABLE KEYS */;
INSERT INTO `chapters_linkings` VALUES (1,2),(2,3),(2,5),(2,6),(3,4),(3,5),(3,7),(4,5),(4,7),(4,9),(5,6),(5,7),(5,8),(6,7),(6,8),(6,9);
/*!40000 ALTER TABLE `chapters_linkings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms_biases`
--

DROP TABLE IF EXISTS `rooms_biases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rooms_biases` (
  `room_id` int(11) unsigned NOT NULL,
  `bias` varchar(45) NOT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms_biases`
--

LOCK TABLES `rooms_biases` WRITE;
/*!40000 ALTER TABLE `rooms_biases` DISABLE KEYS */;
INSERT INTO `rooms_biases` VALUES (1,''),(2,''),(3,''),(4,''),(5,''),(6,''),(7,''),(8,''),(9,'');
/*!40000 ALTER TABLE `rooms_biases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms_transitions`
--

DROP TABLE IF EXISTS `rooms_transitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rooms_transitions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `start_room_id` int(11) unsigned NOT NULL,
  `end_room_id` int(11) unsigned NOT NULL,
  `label` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms_transitions`
--

LOCK TABLES `rooms_transitions` WRITE;
/*!40000 ALTER TABLE `rooms_transitions` DISABLE KEYS */;
INSERT INTO `rooms_transitions` VALUES (91,2,5,6),(92,2,3,0),(93,2,6,3),(94,3,4,2),(95,3,7,1),(96,3,5,6),(97,4,9,5),(98,4,7,8),(99,4,5,6),(100,5,8,6),(101,5,6,3),(102,5,7,7),(103,6,8,9),(104,6,9,3),(105,6,7,2);
/*!40000 ALTER TABLE `rooms_transitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stories`
--

DROP TABLE IF EXISTS `stories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `stories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `cover_path` varchar(200) NOT NULL,
  `start_chapter_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title_UNIQUE` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stories`
--

LOCK TABLES `stories` WRITE;
/*!40000 ALTER TABLE `stories` DISABLE KEYS */;
INSERT INTO `stories` VALUES (1,'Beggars Can\'t Be Choosers','images/beggarsNoChoosers.jpg',1);
/*!40000 ALTER TABLE `stories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(150) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (14,'tfm_content_admin','998ed4d621742d0c2d85ed84173db569afa194d4597686cae947324aa58ab4bb',1),(18,'stefan','52518386cc33022de894fa0af047bd62666a63c2a6a6e86650e26955058c5acf',0),(19,'tap','729cd87c6329408e2bbfea0e2055404969539832af12773b558aca625ccc9041',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'the_fairytale_machine'
--

--
-- Dumping routines for database 'the_fairytale_machine'
--
/*!50003 DROP PROCEDURE IF EXISTS `test` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `test`()
BEGIN
     DECLARE param BOOL DEFAULT FALSE;
     SET param = NULL;
    
    IF param IS NULL OR NOT param THEN
		INSERT INTO debug(data) VALUES("DA");
    ELSE
		INSERT INTO debug(data) VALUES("NU");
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-23  0:07:20
