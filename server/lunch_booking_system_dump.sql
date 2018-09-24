# ************************************************************
# Sequel Pro SQL dump
# Version 4499
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.38)
# Database: lunch_booking_system
# Generation Time: 2017-05-25 16:47:43 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table chef_selected_meals
# ------------------------------------------------------------

DROP TABLE IF EXISTS `chef_selected_meals`;

CREATE TABLE `chef_selected_meals` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `meal_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `meal_id` (`meal_id`),
  CONSTRAINT `chef_selected_meals_ibfk_1` FOREIGN KEY (`meal_id`) REFERENCES `meals` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table food_categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `food_categories`;

CREATE TABLE `food_categories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

LOCK TABLES `food_categories` WRITE;
/*!40000 ALTER TABLE `food_categories` DISABLE KEYS */;

INSERT INTO `food_categories` (`id`, `name`)
VALUES
	(1,'Vegetarian'),
	(2,'Gluten Free'),
	(3,'Vegan'),
	(4,'Nut Free'),
	(5,'Diary Free'),
	(6,'Eggs Free');

/*!40000 ALTER TABLE `food_categories` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table meal_categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `meal_categories`;

CREATE TABLE `meal_categories` (
  `meal_id` int(11) unsigned NOT NULL,
  `food_category_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`meal_id`,`food_category_id`),
  KEY `food_category_id` (`food_category_id`),
  CONSTRAINT `meal_categories_ibfk_1` FOREIGN KEY (`meal_id`) REFERENCES `meals` (`id`),
  CONSTRAINT `meal_categories_ibfk_2` FOREIGN KEY (`food_category_id`) REFERENCES `food_categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `meal_categories` WRITE;
/*!40000 ALTER TABLE `meal_categories` DISABLE KEYS */;

INSERT INTO `meal_categories` (`meal_id`, `food_category_id`)
VALUES
	(1,1),
	(3,1),
	(5,1),
	(7,1),
	(9,1),
	(3,3),
	(3,4),
	(4,4),
	(8,4),
	(9,4),
	(1,5),
	(2,5),
	(5,5),
	(6,5),
	(2,6),
	(8,6),
	(9,6);

/*!40000 ALTER TABLE `meal_categories` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table meals
# ------------------------------------------------------------

DROP TABLE IF EXISTS `meals`;

CREATE TABLE `meals` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

LOCK TABLES `meals` WRITE;
/*!40000 ALTER TABLE `meals` DISABLE KEYS */;

INSERT INTO `meals` (`id`, `name`)
VALUES
	(1,'Sweetcorn Chilli and Chowder, Homous, Feta and Roast Vegetable Wrap'),
	(2,'Tandoori Salmon with Bharji Crust'),
	(3,'Chickpea Pancake with Cream Cheese Roast Tomatoes, and Asparagus'),
	(4,'Lamb Kofta with Garlic Yogurt'),
	(5,'Roast Aubergines with Harissa Spiced Chipeas'),
	(6,'Orange and Hazel Glazed Nut Cornfed Chicken Supreme'),
	(7,'Roast Peppers with Grilled Halloumi, Olives and Capers'),
	(8,'Blue Cheese Beef Burger	Blackbean'),
	(9,'Sweet Potato Burger with Blue Cheese');

/*!40000 ALTER TABLE `meals` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_food_preferences
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_food_preferences`;

CREATE TABLE `user_food_preferences` (
  `user_id` int(11) unsigned NOT NULL,
  `food_category_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`food_category_id`),
  KEY `food_category_id` (`food_category_id`),
  CONSTRAINT `user_food_preferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_food_preferences_ibfk_2` FOREIGN KEY (`food_category_id`) REFERENCES `food_categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_selections
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_selections`;

CREATE TABLE `user_selections` (
  `chef_selected_meal_id` int(11) unsigned NOT NULL,
  `user_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`chef_selected_meal_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_selections_ibfk_1` FOREIGN KEY (`chef_selected_meal_id`) REFERENCES `chef_selected_meals` (`id`),
  CONSTRAINT `user_selections_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `type`, `fullname`)
VALUES
	(1,'CHEF','Alena Stout'),
	(2,'USER','Sam Davies'),
	(3,'USER','Esther Sanchez'),
	(4,'USER','Corey Hopkins'),
	(5,'USER','Jamie Hamilton'),
	(6,'USER','Zak Butler'),
	(7,'USER','Louie Hart'),
	(8,'USER','Sophie Saunders'),
	(9,'USER','Amiyah Franco'),
	(10,'USER','Kylan Floyd'),
	(11,'USER','Brenton Marquez'),
	(12,'USER','Frank Butler'),
	(13,'USER','Rosie Lawson'),
	(14,'USER','Ava Thomson'),
	(15,'USER','Catalina Park');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
