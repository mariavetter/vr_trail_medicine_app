-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema vr_trail_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `vr_trail_db` ;

-- -----------------------------------------------------
-- Schema vr_trail_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `vr_trail_db` DEFAULT CHARACTER SET utf8 ;
USE `vr_trail_db` ;

-- -----------------------------------------------------
-- Table `vr_trail_db`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vr_trail_db`.`user` ;

CREATE TABLE IF NOT EXISTS `vr_trail_db`.`user` (
  `iduser` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `age` INT NULL,
  PRIMARY KEY (`iduser`))
ENGINE = InnoDB;

--
-- Dumping data for table `user`
--

LOCK TABLES `vr_trail_db`.`user` WRITE;
/*!40000 ALTER TABLE `vr_trail_db`.`user` DISABLE KEYS */;
INSERT INTO `vr_trail_db`.`user` VALUES (1, 'Franz Astra', 46), (2, 'Herbert Denningen', 52), (3, 'Angelika Weißhut', 60);
/*!40000 ALTER TABLE `vr_trail_db`.`user` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `vr_trail_db`.`run`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vr_trail_db`.`run` ;

CREATE TABLE IF NOT EXISTS `vr_trail_db`.`run` (
  `idrun` INT NOT NULL,
  `date` VARCHAR(45) NULL,
  `user_iduser` INT NOT NULL,
  PRIMARY KEY (`idrun`, `user_iduser`),
  INDEX `fk_run_user1_idx` (`user_iduser` ASC) VISIBLE,
  CONSTRAINT `fk_run_user1`
    FOREIGN KEY (`user_iduser`)
    REFERENCES `vr_trail_db`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

--
-- Dumping data for table `run`
--

LOCK TABLES `vr_trail_db`.`run` WRITE;
/*!40000 ALTER TABLE `vr_trail_db`.`run` DISABLE KEYS */;
INSERT INTO `vr_trail_db`.`run` VALUES (1, '10.12.2022', 1);
/*!40000 ALTER TABLE `vr_trail_db`.`run` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `vr_trail_db`.`task1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vr_trail_db`.`task1` ;

CREATE TABLE IF NOT EXISTS `vr_trail_db`.`task1` (
  `idtask1` INT NOT NULL,
  `duration` FLOAT NULL,
  `run_idrun` INT NOT NULL,
  PRIMARY KEY (`idtask1`),
  INDEX `fk_task1_run_idx` (`run_idrun` ASC) VISIBLE,
  CONSTRAINT `fk_task1_run`
    FOREIGN KEY (`run_idrun`)
    REFERENCES `vr_trail_db`.`run` (`idrun`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

--
-- Dumping data for table `task1`
--

LOCK TABLES `vr_trail_db`.`task1` WRITE;
/*!40000 ALTER TABLE `vr_trail_db`.`task1` DISABLE KEYS */;
INSERT INTO `vr_trail_db`.`task1` VALUES (1, 1000, 1);
/*!40000 ALTER TABLE `vr_trail_db`.`task1` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `vr_trail_db`.`task2`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vr_trail_db`.`task2` ;

CREATE TABLE IF NOT EXISTS `vr_trail_db`.`task2` (
  `idtask2` INT NOT NULL,
  `duration` FLOAT NULL,
  `wrongtiles` INT NULL,
  `durationTiletoTile` FLOAT NULL,
  `run_idrun` INT NOT NULL,
  PRIMARY KEY (`idtask2`),
  INDEX `fk_task2_run1_idx` (`run_idrun` ASC) VISIBLE,
  CONSTRAINT `fk_task2_run1`
    FOREIGN KEY (`run_idrun`)
    REFERENCES `vr_trail_db`.`run` (`idrun`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

--
-- Dumping data for table `task2`
--

LOCK TABLES `vr_trail_db`.`task2` WRITE;
/*!40000 ALTER TABLE `vr_trail_db`.`task2` DISABLE KEYS */;
INSERT INTO `vr_trail_db`.`task2` VALUES (1, 1000, 4, 2, 1);
/*!40000 ALTER TABLE `vr_trail_db`.`task2` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `vr_trail_db`.`task3`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `vr_trail_db`.`task3` ;

CREATE TABLE IF NOT EXISTS `vr_trail_db`.`task3` (
  `idtask3` INT NOT NULL,
  `duration` FLOAT NULL,
  `wrongAssignment` INT NULL,
  `run_idrun` INT NOT NULL,
  PRIMARY KEY (`idtask3`),
  INDEX `fk_task3_run1_idx` (`run_idrun` ASC) VISIBLE,
  CONSTRAINT `fk_task3_run1`
    FOREIGN KEY (`run_idrun`)
    REFERENCES `vr_trail_db`.`run` (`idrun`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

--
-- Dumping data for table `task3`
--

LOCK TABLES `vr_trail_db`.`task3` WRITE;
/*!40000 ALTER TABLE `vr_trail_db`.`task3` DISABLE KEYS */;
INSERT INTO `vr_trail_db`.`task3` VALUES (1, 3000, 2, 1);
/*!40000 ALTER TABLE `vr_trail_db`.`task3` ENABLE KEYS */;
UNLOCK TABLES;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
