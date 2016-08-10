/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50514
Source Host           : localhost:3306
Source Database       : computercenter

Target Server Type    : MYSQL
Target Server Version : 50514
File Encoding         : 65001

Date: 2011-10-03 19:45:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `child_dev_center`
-- ----------------------------
DROP TABLE IF EXISTS `child_dev_center`;
CREATE TABLE `child_dev_center` (
  `child_dev_center_id` int(11) NOT NULL AUTO_INCREMENT,
  `child_dev_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`child_dev_center_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of child_dev_center
-- ----------------------------
INSERT INTO `child_dev_center` VALUES ('1', 'ศูนย์พัฒนาเด็กเล็ก ตากออก');
INSERT INTO `child_dev_center` VALUES ('2', 'ศูนย์พัฒนาเด็กเล็ก โรงพยาบาลบ้านตาก');
INSERT INTO `child_dev_center` VALUES ('3', 'ศูนย์พัฒนาเด็กเล็ก สมศรี');
INSERT INTO `child_dev_center` VALUES ('4', 'ศูนย์พัฒนาเด็กเล็ก อ.1 เรณู');
INSERT INTO `child_dev_center` VALUES ('5', 'ศูนย์พัฒนาเด็กเล็ก แม่สลิด');
INSERT INTO `child_dev_center` VALUES ('6', 'ศูนย์พัฒนาเด็กเล็ก ยางโองน้ำ');
INSERT INTO `child_dev_center` VALUES ('7', 'ศูนย์พัฒนาเด็กเล็ก ยางโองนอก');
INSERT INTO `child_dev_center` VALUES ('8', 'ศูนย์พัฒนาเด็กเล็ก เกาะลาน');
INSERT INTO `child_dev_center` VALUES ('9', 'ศูนย์พัฒนาเด็กเล็ก น้ำดิบ');
INSERT INTO `child_dev_center` VALUES ('10', 'ศูนย์พัฒนาเด็กเล็ก ทุ่งกระเชาะ');
INSERT INTO `child_dev_center` VALUES ('11', 'ศูนย์พัฒนาเด็กเล็ก ท้องฟ้า');
INSERT INTO `child_dev_center` VALUES ('12', 'ศูนย์พัฒนาเด็กเล็ก ม้งใหม่พัฒนา');
INSERT INTO `child_dev_center` VALUES ('13', 'ศูนย์พัฒนาเด็กเล็ก เกาะตะเภา');

-- ----------------------------
-- Table structure for `dental_child_dev_center_kpi`
-- ----------------------------
DROP TABLE IF EXISTS `dental_child_dev_center_kpi`;
CREATE TABLE `dental_child_dev_center_kpi` (
  `dental_child_dev_center_kpi_id` int(11) NOT NULL AUTO_INCREMENT,
  `detail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `range` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`dental_child_dev_center_kpi_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of dental_child_dev_center_kpi
-- ----------------------------
INSERT INTO `dental_child_dev_center_kpi` VALUES ('1', 'ร้อยละเด็กอายุ 3 ปีปราศจากโรคฟันผุ', null);
INSERT INTO `dental_child_dev_center_kpi` VALUES ('2', 'ค่าเฉลี่ย ฟันผุ ถอน อุด(DMFT)', null);

-- ----------------------------
-- Table structure for `dental_child_dev_center_service`
-- ----------------------------
DROP TABLE IF EXISTS `dental_child_dev_center_service`;
CREATE TABLE `dental_child_dev_center_service` (
  `dental_child_dev_center_service_id` int(11) NOT NULL AUTO_INCREMENT,
  `child_dev_center_id` int(11) NOT NULL,
  `dental_child_dev_center_kpi_id` int(11) NOT NULL,
  `fiscal_year` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `value` float(11,2) DEFAULT NULL,
  PRIMARY KEY (`dental_child_dev_center_service_id`),
  KEY `ix_dental_child_dev_center_service_child_dev_center_id` (`child_dev_center_id`) USING BTREE,
  KEY `ix_dental_child_dev_center_service_dental_child_dev_cent_ffe0` (`dental_child_dev_center_kpi_id`) USING BTREE,
  KEY `ix_dental_child_dev_center_service_fiscal_year` (`fiscal_year`) USING BTREE,
  CONSTRAINT `dental_child_dev_center_service_ibfk_1` FOREIGN KEY (`child_dev_center_id`) REFERENCES `child_dev_center` (`child_dev_center_id`),
  CONSTRAINT `dental_child_dev_center_service_ibfk_2` FOREIGN KEY (`dental_child_dev_center_kpi_id`) REFERENCES `dental_child_dev_center_kpi` (`dental_child_dev_center_kpi_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of dental_child_dev_center_service
-- ----------------------------
INSERT INTO `dental_child_dev_center_service` VALUES ('1', '1', '2', '2554', '4.10');
INSERT INTO `dental_child_dev_center_service` VALUES ('2', '2', '2', '2554', '3.00');
INSERT INTO `dental_child_dev_center_service` VALUES ('3', '3', '2', '2554', '2.80');
INSERT INTO `dental_child_dev_center_service` VALUES ('4', '4', '2', '2554', '4.60');
INSERT INTO `dental_child_dev_center_service` VALUES ('5', '5', '2', '2554', '2.30');
INSERT INTO `dental_child_dev_center_service` VALUES ('6', '6', '2', '2554', '2.40');
INSERT INTO `dental_child_dev_center_service` VALUES ('7', '7', '2', '2554', '1.90');
INSERT INTO `dental_child_dev_center_service` VALUES ('8', '8', '2', '2554', '4.10');
INSERT INTO `dental_child_dev_center_service` VALUES ('9', '9', '2', '2554', '5.50');
INSERT INTO `dental_child_dev_center_service` VALUES ('10', '10', '2', '2554', '4.90');
INSERT INTO `dental_child_dev_center_service` VALUES ('11', '11', '2', '2554', '6.50');
INSERT INTO `dental_child_dev_center_service` VALUES ('12', '12', '2', '2554', '5.40');
INSERT INTO `dental_child_dev_center_service` VALUES ('13', '13', '2', '2554', '3.60');
INSERT INTO `dental_child_dev_center_service` VALUES ('14', '1', '1', '2554', '27.27');
INSERT INTO `dental_child_dev_center_service` VALUES ('15', '2', '1', '2554', '42.86');
INSERT INTO `dental_child_dev_center_service` VALUES ('16', '3', '1', '2554', '50.00');
INSERT INTO `dental_child_dev_center_service` VALUES ('17', '4', '1', '2554', '23.81');
INSERT INTO `dental_child_dev_center_service` VALUES ('18', '5', '1', '2554', '31.25');
INSERT INTO `dental_child_dev_center_service` VALUES ('19', '6', '1', '2554', '53.33');
INSERT INTO `dental_child_dev_center_service` VALUES ('20', '7', '1', '2554', '46.67');
INSERT INTO `dental_child_dev_center_service` VALUES ('21', '8', '1', '2554', '16.00');
INSERT INTO `dental_child_dev_center_service` VALUES ('22', '9', '1', '2554', '26.19');
INSERT INTO `dental_child_dev_center_service` VALUES ('23', '10', '1', '2554', '26.66');
INSERT INTO `dental_child_dev_center_service` VALUES ('24', '11', '1', '2554', '18.75');
INSERT INTO `dental_child_dev_center_service` VALUES ('25', '12', '1', '2554', '21.74');
INSERT INTO `dental_child_dev_center_service` VALUES ('26', '13', '1', '2554', '51.72');

-- ----------------------------
-- Table structure for `dental_school_kpi`
-- ----------------------------
DROP TABLE IF EXISTS `dental_school_kpi`;
CREATE TABLE `dental_school_kpi` (
  `dental_school_kpi_id` int(11) NOT NULL AUTO_INCREMENT,
  `detail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `range` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `dental_school_kpi_group_id` int(11) NOT NULL,
  PRIMARY KEY (`dental_school_kpi_id`),
  KEY `fk_kip_group` (`dental_school_kpi_group_id`),
  KEY `detail` (`detail`) USING BTREE,
  KEY `range` (`range`) USING BTREE,
  CONSTRAINT `fk_kip_group` FOREIGN KEY (`dental_school_kpi_group_id`) REFERENCES `dental_school_kpi_group` (`dental_school_kpi_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of dental_school_kpi
-- ----------------------------
INSERT INTO `dental_school_kpi` VALUES ('2', 'ร้อยละของเด็กอายุ 12 ปีไม่มีเหงือกเลือดออก', '0', '2');
INSERT INTO `dental_school_kpi` VALUES ('3', 'ร้อยละของเด็กอายุ 12 ปีปราศจากโรคฟันผุ', '0', '2');
INSERT INTO `dental_school_kpi` VALUES ('4', 'ร้อยละของเด็กอายุ 12 ปี(ป.6) มีฟันตกกระ', '0', '2');
INSERT INTO `dental_school_kpi` VALUES ('9', 'ค่าเฉลี่ย ฟันผุ ถอน อุด(DMFT) ของเด็กอายุ 12 ปี', '0', '2');

-- ----------------------------
-- Table structure for `dental_school_kpi_group`
-- ----------------------------
DROP TABLE IF EXISTS `dental_school_kpi_group`;
CREATE TABLE `dental_school_kpi_group` (
  `dental_school_kpi_group_id` int(11) NOT NULL AUTO_INCREMENT,
  `detail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`dental_school_kpi_group_id`),
  UNIQUE KEY `detail` (`detail`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of dental_school_kpi_group
-- ----------------------------
INSERT INTO `dental_school_kpi_group` VALUES ('2', 'เด็กอายุ 12 ปี');
INSERT INTO `dental_school_kpi_group` VALUES ('1', 'เด็กอายุ 6 ปี');

-- ----------------------------
-- Table structure for `dental_school_service`
-- ----------------------------
DROP TABLE IF EXISTS `dental_school_service`;
CREATE TABLE `dental_school_service` (
  `dental_school_service_id` int(11) NOT NULL AUTO_INCREMENT,
  `school_id` int(11) NOT NULL,
  `dental_school_kpi_id` int(11) NOT NULL,
  `fiscal_year` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `value` float(11,2) DEFAULT NULL,
  `school_class_id` int(11) NOT NULL,
  PRIMARY KEY (`dental_school_service_id`),
  KEY `ix_dental_school_service_school_id` (`school_id`),
  KEY `ix_dental_school_service_dental_school_kpi_id` (`dental_school_kpi_id`),
  KEY `ix_dental_school_service_school_class_id` (`school_class_id`),
  KEY `ix_dental_school_service_fiscal_year` (`fiscal_year`),
  CONSTRAINT `dental_school_service_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`),
  CONSTRAINT `dental_school_service_ibfk_2` FOREIGN KEY (`dental_school_kpi_id`) REFERENCES `dental_school_kpi` (`dental_school_kpi_id`),
  CONSTRAINT `dental_school_service_ibfk_3` FOREIGN KEY (`school_class_id`) REFERENCES `school_class` (`school_class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of dental_school_service
-- ----------------------------
INSERT INTO `dental_school_service` VALUES ('17', '19', '2', '2554', '42.85', '6');
INSERT INTO `dental_school_service` VALUES ('18', '3', '2', '2554', '42.80', '6');
INSERT INTO `dental_school_service` VALUES ('19', '25', '2', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('20', '31', '2', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('21', '18', '2', '2554', '100.00', '6');
INSERT INTO `dental_school_service` VALUES ('22', '5', '2', '2554', '88.89', '6');
INSERT INTO `dental_school_service` VALUES ('23', '17', '2', '2554', '100.00', '6');
INSERT INTO `dental_school_service` VALUES ('24', '26', '2', '2554', '100.00', '6');
INSERT INTO `dental_school_service` VALUES ('25', '20', '2', '2554', '100.00', '6');
INSERT INTO `dental_school_service` VALUES ('26', '23', '2', '2554', '100.00', '6');
INSERT INTO `dental_school_service` VALUES ('27', '30', '2', '2554', '62.50', '6');
INSERT INTO `dental_school_service` VALUES ('28', '7', '2', '2554', '100.00', '6');
INSERT INTO `dental_school_service` VALUES ('29', '14', '2', '2554', '68.75', '6');
INSERT INTO `dental_school_service` VALUES ('30', '12', '2', '2554', '100.00', '6');
INSERT INTO `dental_school_service` VALUES ('31', '9', '2', '2554', '85.71', '6');
INSERT INTO `dental_school_service` VALUES ('32', '13', '2', '2554', '100.00', '6');
INSERT INTO `dental_school_service` VALUES ('33', '24', '2', '2554', '37.50', '6');
INSERT INTO `dental_school_service` VALUES ('34', '8', '2', '2554', '100.00', '6');
INSERT INTO `dental_school_service` VALUES ('35', '22', '2', '2554', '35.71', '6');
INSERT INTO `dental_school_service` VALUES ('36', '1', '2', '2554', '26.66', '6');
INSERT INTO `dental_school_service` VALUES ('37', '28', '2', '2554', '100.00', '6');
INSERT INTO `dental_school_service` VALUES ('38', '4', '2', '2554', '100.00', '6');
INSERT INTO `dental_school_service` VALUES ('39', '16', '2', '2554', '100.00', '6');
INSERT INTO `dental_school_service` VALUES ('40', '2', '2', '2554', '100.00', '6');
INSERT INTO `dental_school_service` VALUES ('41', '19', '3', '2554', '28.57', '6');
INSERT INTO `dental_school_service` VALUES ('42', '3', '3', '2554', '42.86', '6');
INSERT INTO `dental_school_service` VALUES ('43', '25', '3', '2554', '60.00', '6');
INSERT INTO `dental_school_service` VALUES ('44', '31', '3', '2554', '16.67', '6');
INSERT INTO `dental_school_service` VALUES ('45', '18', '3', '2554', '70.00', '6');
INSERT INTO `dental_school_service` VALUES ('46', '5', '3', '2554', '55.56', '6');
INSERT INTO `dental_school_service` VALUES ('47', '17', '3', '2554', '77.78', '6');
INSERT INTO `dental_school_service` VALUES ('48', '26', '3', '2554', '55.56', '6');
INSERT INTO `dental_school_service` VALUES ('49', '20', '3', '2554', '50.00', '6');
INSERT INTO `dental_school_service` VALUES ('50', '23', '3', '2554', '70.00', '6');
INSERT INTO `dental_school_service` VALUES ('51', '30', '3', '2554', '62.50', '6');
INSERT INTO `dental_school_service` VALUES ('52', '7', '3', '2554', '16.66', '6');
INSERT INTO `dental_school_service` VALUES ('53', '14', '3', '2554', '43.75', '6');
INSERT INTO `dental_school_service` VALUES ('54', '12', '3', '2554', '25.00', '6');
INSERT INTO `dental_school_service` VALUES ('55', '9', '3', '2554', '71.42', '6');
INSERT INTO `dental_school_service` VALUES ('56', '13', '3', '2554', '80.00', '6');
INSERT INTO `dental_school_service` VALUES ('57', '24', '3', '2554', '100.00', '6');
INSERT INTO `dental_school_service` VALUES ('58', '8', '3', '2554', '88.80', '6');
INSERT INTO `dental_school_service` VALUES ('59', '22', '3', '2554', '92.85', '6');
INSERT INTO `dental_school_service` VALUES ('60', '1', '3', '2554', '23.33', '6');
INSERT INTO `dental_school_service` VALUES ('61', '28', '3', '2554', '11.11', '6');
INSERT INTO `dental_school_service` VALUES ('62', '4', '3', '2554', '80.00', '6');
INSERT INTO `dental_school_service` VALUES ('63', '16', '3', '2554', '10.00', '6');
INSERT INTO `dental_school_service` VALUES ('64', '2', '3', '2554', '54.54', '6');
INSERT INTO `dental_school_service` VALUES ('65', '19', '4', '2554', '28.57', '6');
INSERT INTO `dental_school_service` VALUES ('66', '3', '4', '2554', '14.29', '6');
INSERT INTO `dental_school_service` VALUES ('67', '25', '4', '2554', '40.00', '6');
INSERT INTO `dental_school_service` VALUES ('68', '31', '4', '2554', '8.33', '6');
INSERT INTO `dental_school_service` VALUES ('69', '18', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('70', '5', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('71', '17', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('72', '26', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('73', '20', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('74', '23', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('75', '30', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('76', '7', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('77', '14', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('78', '12', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('79', '9', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('80', '13', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('81', '24', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('82', '8', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('83', '22', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('84', '1', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('85', '28', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('86', '4', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('87', '16', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('88', '2', '4', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('89', '19', '9', '2554', '1.80', '6');
INSERT INTO `dental_school_service` VALUES ('90', '3', '9', '2554', '2.60', '6');
INSERT INTO `dental_school_service` VALUES ('91', '25', '9', '2554', '1.60', '6');
INSERT INTO `dental_school_service` VALUES ('92', '31', '9', '2554', '2.25', '6');
INSERT INTO `dental_school_service` VALUES ('93', '18', '9', '2554', '0.60', '6');
INSERT INTO `dental_school_service` VALUES ('94', '5', '9', '2554', '0.67', '6');
INSERT INTO `dental_school_service` VALUES ('95', '17', '9', '2554', '0.22', '6');
INSERT INTO `dental_school_service` VALUES ('96', '26', '9', '2554', '0.56', '6');
INSERT INTO `dental_school_service` VALUES ('97', '20', '9', '2554', '0.50', '6');
INSERT INTO `dental_school_service` VALUES ('98', '23', '9', '2554', '0.40', '6');
INSERT INTO `dental_school_service` VALUES ('99', '30', '9', '2554', '0.80', '6');
INSERT INTO `dental_school_service` VALUES ('100', '7', '9', '2554', '2.83', '6');
INSERT INTO `dental_school_service` VALUES ('101', '14', '9', '2554', '1.12', '6');
INSERT INTO `dental_school_service` VALUES ('102', '12', '9', '2554', '0.75', '6');
INSERT INTO `dental_school_service` VALUES ('103', '9', '9', '2554', '0.42', '6');
INSERT INTO `dental_school_service` VALUES ('104', '13', '9', '2554', '0.33', '6');
INSERT INTO `dental_school_service` VALUES ('105', '24', '9', '2554', '0.00', '6');
INSERT INTO `dental_school_service` VALUES ('106', '8', '9', '2554', '0.22', '6');
INSERT INTO `dental_school_service` VALUES ('107', '22', '9', '2554', '0.14', '6');
INSERT INTO `dental_school_service` VALUES ('108', '1', '9', '2554', '2.53', '6');
INSERT INTO `dental_school_service` VALUES ('109', '28', '9', '2554', '3.77', '6');
INSERT INTO `dental_school_service` VALUES ('110', '4', '9', '2554', '0.30', '6');
INSERT INTO `dental_school_service` VALUES ('111', '16', '9', '2554', '3.60', '6');
INSERT INTO `dental_school_service` VALUES ('112', '2', '9', '2554', '0.91', '6');

-- ----------------------------
-- Table structure for `dental_senior_club_kpi`
-- ----------------------------
DROP TABLE IF EXISTS `dental_senior_club_kpi`;
CREATE TABLE `dental_senior_club_kpi` (
  `dental_senior_club_kpi_id` int(11) NOT NULL AUTO_INCREMENT,
  `detail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `range` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`dental_senior_club_kpi_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of dental_senior_club_kpi
-- ----------------------------
INSERT INTO `dental_senior_club_kpi` VALUES ('2', 'ผู้สูงอายุที่มีคู่สบฟันหลังเป็นฟันแท้กับฟันแท้ 4 คู่ขึ้นไป', null);
INSERT INTO `dental_senior_club_kpi` VALUES ('3', 'ผู้สูงอายุที่มีคู่สบฟันหลังเป็นฟันแท้กับฟันเทียมหรือฟันเทียมกับฟันเทียม 4 คู่ขึ้นไป', null);
INSERT INTO `dental_senior_club_kpi` VALUES ('4', 'ผู้สูงอายุมีฟันแท้ใช้งานได้ 20 ซี่', null);

-- ----------------------------
-- Table structure for `dental_senior_club_service`
-- ----------------------------
DROP TABLE IF EXISTS `dental_senior_club_service`;
CREATE TABLE `dental_senior_club_service` (
  `dental_senior_club_service_id` int(11) NOT NULL AUTO_INCREMENT,
  `senior_club_id` int(11) NOT NULL,
  `dental_senior_club_kpi_id` int(11) NOT NULL,
  `fiscal_year` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `value` float(11,2) DEFAULT NULL,
  PRIMARY KEY (`dental_senior_club_service_id`),
  KEY `ix_dental_senior_club_service_senior_club_id` (`senior_club_id`) USING BTREE,
  KEY `ix_dental_senior_club_service_dental_senior_club_kpi_id` (`dental_senior_club_kpi_id`) USING BTREE,
  KEY `ix_dental_senior_club_service_fiscal_year` (`fiscal_year`) USING BTREE,
  CONSTRAINT `dental_senior_club_service_ibfk_1` FOREIGN KEY (`senior_club_id`) REFERENCES `senior_club` (`senior_club_id`),
  CONSTRAINT `dental_senior_club_service_ibfk_2` FOREIGN KEY (`dental_senior_club_kpi_id`) REFERENCES `dental_senior_club_kpi` (`dental_senior_club_kpi_id`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of dental_senior_club_service
-- ----------------------------
INSERT INTO `dental_senior_club_service` VALUES ('6', '1', '2', '2554', '3.00');
INSERT INTO `dental_senior_club_service` VALUES ('7', '2', '2', '2554', '1.00');
INSERT INTO `dental_senior_club_service` VALUES ('8', '3', '2', '2554', '4.00');
INSERT INTO `dental_senior_club_service` VALUES ('9', '4', '2', '2554', '5.00');
INSERT INTO `dental_senior_club_service` VALUES ('10', '5', '2', '2554', '4.00');
INSERT INTO `dental_senior_club_service` VALUES ('11', '6', '2', '2554', '4.00');
INSERT INTO `dental_senior_club_service` VALUES ('12', '7', '2', '2554', '5.00');
INSERT INTO `dental_senior_club_service` VALUES ('13', '8', '2', '2554', '5.00');
INSERT INTO `dental_senior_club_service` VALUES ('14', '9', '2', '2554', '4.00');
INSERT INTO `dental_senior_club_service` VALUES ('15', '10', '2', '2554', '2.00');
INSERT INTO `dental_senior_club_service` VALUES ('16', '11', '2', '2554', '2.00');
INSERT INTO `dental_senior_club_service` VALUES ('17', '12', '2', '2554', '4.00');
INSERT INTO `dental_senior_club_service` VALUES ('18', '13', '2', '2554', '2.00');
INSERT INTO `dental_senior_club_service` VALUES ('19', '14', '2', '2554', '4.00');
INSERT INTO `dental_senior_club_service` VALUES ('20', '15', '2', '2554', '1.00');
INSERT INTO `dental_senior_club_service` VALUES ('21', '16', '2', '2554', '5.00');
INSERT INTO `dental_senior_club_service` VALUES ('22', '17', '2', '2554', '6.00');
INSERT INTO `dental_senior_club_service` VALUES ('23', '18', '2', '2554', '4.00');
INSERT INTO `dental_senior_club_service` VALUES ('24', '19', '2', '2554', '8.00');
INSERT INTO `dental_senior_club_service` VALUES ('25', '20', '2', '2554', '16.00');
INSERT INTO `dental_senior_club_service` VALUES ('26', '21', '2', '2554', '5.00');
INSERT INTO `dental_senior_club_service` VALUES ('27', '22', '2', '2554', '6.00');
INSERT INTO `dental_senior_club_service` VALUES ('28', '23', '2', '2554', '3.00');
INSERT INTO `dental_senior_club_service` VALUES ('29', '24', '2', '2554', '8.00');
INSERT INTO `dental_senior_club_service` VALUES ('30', '25', '2', '2554', '13.00');
INSERT INTO `dental_senior_club_service` VALUES ('31', '26', '2', '2554', '0.00');
INSERT INTO `dental_senior_club_service` VALUES ('32', '27', '2', '2554', '4.00');
INSERT INTO `dental_senior_club_service` VALUES ('33', '28', '2', '2554', '10.00');
INSERT INTO `dental_senior_club_service` VALUES ('34', '29', '2', '2554', '15.00');
INSERT INTO `dental_senior_club_service` VALUES ('35', '30', '2', '2554', '16.00');
INSERT INTO `dental_senior_club_service` VALUES ('36', '31', '2', '2554', '16.00');
INSERT INTO `dental_senior_club_service` VALUES ('37', '32', '2', '2554', '13.00');
INSERT INTO `dental_senior_club_service` VALUES ('38', '33', '2', '2554', '22.00');
INSERT INTO `dental_senior_club_service` VALUES ('39', '34', '2', '2554', '20.00');
INSERT INTO `dental_senior_club_service` VALUES ('40', '35', '2', '2554', '9.00');
INSERT INTO `dental_senior_club_service` VALUES ('41', '36', '2', '2554', '8.00');
INSERT INTO `dental_senior_club_service` VALUES ('42', '1', '3', '2554', '0.00');
INSERT INTO `dental_senior_club_service` VALUES ('43', '2', '3', '2554', '2.00');
INSERT INTO `dental_senior_club_service` VALUES ('44', '3', '3', '2554', '0.00');
INSERT INTO `dental_senior_club_service` VALUES ('45', '4', '3', '2554', '2.00');
INSERT INTO `dental_senior_club_service` VALUES ('46', '5', '3', '2554', '5.00');
INSERT INTO `dental_senior_club_service` VALUES ('47', '6', '3', '2554', '0.00');
INSERT INTO `dental_senior_club_service` VALUES ('48', '7', '3', '2554', '0.00');
INSERT INTO `dental_senior_club_service` VALUES ('49', '8', '3', '2554', '1.00');
INSERT INTO `dental_senior_club_service` VALUES ('50', '9', '3', '2554', '1.00');
INSERT INTO `dental_senior_club_service` VALUES ('51', '10', '3', '2554', '3.00');
INSERT INTO `dental_senior_club_service` VALUES ('52', '11', '3', '2554', '0.00');
INSERT INTO `dental_senior_club_service` VALUES ('53', '12', '3', '2554', '0.00');
INSERT INTO `dental_senior_club_service` VALUES ('54', '13', '3', '2554', '1.00');
INSERT INTO `dental_senior_club_service` VALUES ('55', '14', '3', '2554', '1.00');
INSERT INTO `dental_senior_club_service` VALUES ('56', '15', '3', '2554', '0.00');
INSERT INTO `dental_senior_club_service` VALUES ('57', '16', '3', '2554', '1.00');
INSERT INTO `dental_senior_club_service` VALUES ('58', '17', '3', '2554', '0.00');
INSERT INTO `dental_senior_club_service` VALUES ('59', '18', '3', '2554', '3.00');
INSERT INTO `dental_senior_club_service` VALUES ('60', '19', '3', '2554', '3.00');
INSERT INTO `dental_senior_club_service` VALUES ('61', '20', '3', '2554', '1.00');
INSERT INTO `dental_senior_club_service` VALUES ('62', '21', '3', '2554', '5.00');
INSERT INTO `dental_senior_club_service` VALUES ('63', '22', '3', '2554', '1.00');
INSERT INTO `dental_senior_club_service` VALUES ('64', '23', '3', '2554', '1.00');
INSERT INTO `dental_senior_club_service` VALUES ('65', '24', '3', '2554', '2.00');
INSERT INTO `dental_senior_club_service` VALUES ('66', '25', '3', '2554', '4.00');
INSERT INTO `dental_senior_club_service` VALUES ('67', '26', '3', '2554', '1.00');
INSERT INTO `dental_senior_club_service` VALUES ('68', '27', '3', '2554', '2.00');
INSERT INTO `dental_senior_club_service` VALUES ('69', '28', '3', '2554', '1.00');
INSERT INTO `dental_senior_club_service` VALUES ('70', '29', '3', '2554', '1.00');
INSERT INTO `dental_senior_club_service` VALUES ('71', '30', '3', '2554', '0.00');
INSERT INTO `dental_senior_club_service` VALUES ('72', '31', '3', '2554', '3.00');
INSERT INTO `dental_senior_club_service` VALUES ('73', '32', '3', '2554', '2.00');
INSERT INTO `dental_senior_club_service` VALUES ('74', '33', '3', '2554', '0.00');
INSERT INTO `dental_senior_club_service` VALUES ('75', '34', '3', '2554', '1.00');
INSERT INTO `dental_senior_club_service` VALUES ('76', '35', '3', '2554', '1.00');
INSERT INTO `dental_senior_club_service` VALUES ('77', '36', '3', '2554', '0.00');
INSERT INTO `dental_senior_club_service` VALUES ('78', '1', '4', '2554', '3.00');
INSERT INTO `dental_senior_club_service` VALUES ('79', '2', '4', '2554', '3.00');
INSERT INTO `dental_senior_club_service` VALUES ('80', '3', '4', '2554', '6.00');
INSERT INTO `dental_senior_club_service` VALUES ('81', '4', '4', '2554', '5.00');
INSERT INTO `dental_senior_club_service` VALUES ('82', '5', '4', '2554', '4.00');
INSERT INTO `dental_senior_club_service` VALUES ('83', '6', '4', '2554', '4.00');
INSERT INTO `dental_senior_club_service` VALUES ('84', '7', '4', '2554', '6.00');
INSERT INTO `dental_senior_club_service` VALUES ('85', '8', '4', '2554', '5.00');
INSERT INTO `dental_senior_club_service` VALUES ('86', '9', '4', '2554', '4.00');
INSERT INTO `dental_senior_club_service` VALUES ('87', '10', '4', '2554', '2.00');
INSERT INTO `dental_senior_club_service` VALUES ('88', '11', '4', '2554', '2.00');
INSERT INTO `dental_senior_club_service` VALUES ('89', '12', '4', '2554', '4.00');
INSERT INTO `dental_senior_club_service` VALUES ('90', '13', '4', '2554', '3.00');
INSERT INTO `dental_senior_club_service` VALUES ('91', '14', '4', '2554', '7.00');
INSERT INTO `dental_senior_club_service` VALUES ('92', '15', '4', '2554', '16.00');
INSERT INTO `dental_senior_club_service` VALUES ('93', '16', '4', '2554', '11.00');
INSERT INTO `dental_senior_club_service` VALUES ('94', '17', '4', '2554', '10.00');
INSERT INTO `dental_senior_club_service` VALUES ('95', '18', '4', '2554', '15.00');
INSERT INTO `dental_senior_club_service` VALUES ('96', '19', '4', '2554', '16.00');
INSERT INTO `dental_senior_club_service` VALUES ('97', '20', '4', '2554', '21.00');
INSERT INTO `dental_senior_club_service` VALUES ('98', '21', '4', '2554', '8.00');
INSERT INTO `dental_senior_club_service` VALUES ('99', '22', '4', '2554', '8.00');
INSERT INTO `dental_senior_club_service` VALUES ('100', '23', '4', '2554', '4.00');
INSERT INTO `dental_senior_club_service` VALUES ('101', '24', '4', '2554', '10.00');
INSERT INTO `dental_senior_club_service` VALUES ('102', '25', '4', '2554', '13.00');
INSERT INTO `dental_senior_club_service` VALUES ('103', '26', '4', '2554', '0.00');
INSERT INTO `dental_senior_club_service` VALUES ('104', '27', '4', '2554', '8.00');
INSERT INTO `dental_senior_club_service` VALUES ('105', '28', '4', '2554', '9.00');
INSERT INTO `dental_senior_club_service` VALUES ('106', '29', '4', '2554', '16.00');
INSERT INTO `dental_senior_club_service` VALUES ('107', '30', '4', '2554', '17.00');
INSERT INTO `dental_senior_club_service` VALUES ('108', '31', '4', '2554', '14.00');
INSERT INTO `dental_senior_club_service` VALUES ('109', '32', '4', '2554', '16.00');
INSERT INTO `dental_senior_club_service` VALUES ('110', '33', '4', '2554', '22.00');
INSERT INTO `dental_senior_club_service` VALUES ('111', '34', '4', '2554', '21.00');
INSERT INTO `dental_senior_club_service` VALUES ('112', '35', '4', '2554', '14.00');
INSERT INTO `dental_senior_club_service` VALUES ('113', '36', '4', '2554', '11.00');

-- ----------------------------
-- Table structure for `department`
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `department_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`department_id`),
  UNIQUE KEY `description` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES ('1', 'โรงพยาบาลบ้านตาก');

-- ----------------------------
-- Table structure for `division`
-- ----------------------------
DROP TABLE IF EXISTS `division`;
CREATE TABLE `division` (
  `division_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`division_id`),
  UNIQUE KEY `description` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of division
-- ----------------------------
INSERT INTO `division` VALUES ('1', 'กลุ่มงานการพยาบาล');
INSERT INTO `division` VALUES ('4', 'กลุ่มงานบริการทางการแพทย์');
INSERT INTO `division` VALUES ('2', 'กลุ่มงานบริหารทั่วไป');
INSERT INTO `division` VALUES ('5', 'กลุ่มงานยุทธศาสตร์และการพัฒนา');
INSERT INTO `division` VALUES ('3', 'กลุ่มงานเทคนิคบริการ');
INSERT INTO `division` VALUES ('6', 'กลุ่มงานเวชปฎิบัติครอบครัวและชุมชน');
INSERT INTO `division` VALUES ('7', 'ทีมคร่อมกลุ่มงาน');

-- ----------------------------
-- Table structure for `maintenance`
-- ----------------------------
DROP TABLE IF EXISTS `maintenance`;
CREATE TABLE `maintenance` (
  `maintenance_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `mtn_type_id` int(11) NOT NULL,
  `division_id` int(11) NOT NULL,
  `detail` text COLLATE utf8_unicode_ci NOT NULL,
  `mtn_status_id` int(11) NOT NULL,
  `result_detail` text COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime DEFAULT NULL,
  `receipt_date` datetime DEFAULT NULL,
  PRIMARY KEY (`maintenance_id`),
  KEY `mtn_type_id` (`mtn_type_id`),
  KEY `mtn_status_id` (`mtn_status_id`),
  KEY `division_id` (`division_id`),
  KEY `ix_maintenance_user_id` (`user_id`),
  CONSTRAINT `maintenance_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tg_user` (`user_id`),
  CONSTRAINT `maintenance_ibfk_2` FOREIGN KEY (`mtn_type_id`) REFERENCES `maintenance_type` (`mtn_type_id`),
  CONSTRAINT `maintenance_ibfk_3` FOREIGN KEY (`mtn_status_id`) REFERENCES `maintenance_status` (`mtn_status_id`),
  CONSTRAINT `maintenance_ibfk_4` FOREIGN KEY (`division_id`) REFERENCES `division` (`division_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of maintenance
-- ----------------------------

-- ----------------------------
-- Table structure for `maintenance_status`
-- ----------------------------
DROP TABLE IF EXISTS `maintenance_status`;
CREATE TABLE `maintenance_status` (
  `mtn_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`mtn_status_id`),
  UNIQUE KEY `description` (`description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of maintenance_status
-- ----------------------------

-- ----------------------------
-- Table structure for `maintenance_type`
-- ----------------------------
DROP TABLE IF EXISTS `maintenance_type`;
CREATE TABLE `maintenance_type` (
  `mtn_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`mtn_type_id`),
  UNIQUE KEY `description` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of maintenance_type
-- ----------------------------
INSERT INTO `maintenance_type` VALUES ('3', 'ข้อมูล');
INSERT INTO `maintenance_type` VALUES ('1', 'คอมพิวเตอร์');
INSERT INTO `maintenance_type` VALUES ('4', 'เครือข่าย');
INSERT INTO `maintenance_type` VALUES ('6', 'โทรทัศน์');
INSERT INTO `maintenance_type` VALUES ('5', 'โทรศัพท์');
INSERT INTO `maintenance_type` VALUES ('2', 'โปรแกรม');

-- ----------------------------
-- Table structure for `maintenance_user_status`
-- ----------------------------
DROP TABLE IF EXISTS `maintenance_user_status`;
CREATE TABLE `maintenance_user_status` (
  `mtnuser_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `maintenance_id` int(11) NOT NULL,
  `mtn_status_id` int(11) NOT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`mtnuser_status_id`),
  KEY `maintenance_id` (`maintenance_id`),
  KEY `mtn_status_id` (`mtn_status_id`),
  KEY `ix_maintenance_user_status_user_id` (`user_id`),
  CONSTRAINT `maintenance_user_status_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tg_user` (`user_id`),
  CONSTRAINT `maintenance_user_status_ibfk_2` FOREIGN KEY (`maintenance_id`) REFERENCES `maintenance` (`maintenance_id`),
  CONSTRAINT `maintenance_user_status_ibfk_3` FOREIGN KEY (`mtn_status_id`) REFERENCES `maintenance_status` (`mtn_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of maintenance_user_status
-- ----------------------------

-- ----------------------------
-- Table structure for `plantype`
-- ----------------------------
DROP TABLE IF EXISTS `plantype`;
CREATE TABLE `plantype` (
  `plantype_id` int(11) NOT NULL AUTO_INCREMENT,
  `plantype_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`plantype_id`),
  UNIQUE KEY `plantype_name` (`plantype_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of plantype
-- ----------------------------
INSERT INTO `plantype` VALUES ('2', 'นอกแผน');
INSERT INTO `plantype` VALUES ('1', 'ในแผน');

-- ----------------------------
-- Table structure for `project`
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `detail` text COLLATE utf8_unicode_ci NOT NULL,
  `budget` int(11) DEFAULT NULL,
  `maintenance_funds_budget` int(11) DEFAULT NULL,
  `budget_other` int(11) DEFAULT NULL,
  `budget_other_from` text COLLATE utf8_unicode_ci,
  `start_date` datetime NOT NULL,
  `stop_date` datetime DEFAULT NULL,
  `actual_start_date` datetime DEFAULT NULL,
  `actual_stop_date` datetime DEFAULT NULL,
  `fiscal_year` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `create_date` datetime NOT NULL,
  `project_status_id` int(11) NOT NULL,
  `project_type_id` int(11) NOT NULL,
  `division_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  `plantype_id` int(11) NOT NULL,
  PRIMARY KEY (`project_id`),
  KEY `ix_project_department_id` (`department_id`),
  KEY `ix_project_plantype_id` (`plantype_id`),
  KEY `ix_project_fiscal_year` (`fiscal_year`),
  KEY `ix_project_project_status_id` (`project_status_id`),
  KEY `ix_project_project_type_id` (`project_type_id`),
  KEY `ix_project_division_id` (`division_id`),
  KEY `ix_project_project_name` (`project_name`),
  KEY `ix_project_section_id` (`section_id`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`project_status_id`) REFERENCES `project_status` (`project_status_id`),
  CONSTRAINT `project_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
  CONSTRAINT `project_ibfk_3` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`),
  CONSTRAINT `project_ibfk_4` FOREIGN KEY (`division_id`) REFERENCES `division` (`division_id`),
  CONSTRAINT `project_ibfk_5` FOREIGN KEY (`plantype_id`) REFERENCES `plantype` (`plantype_id`),
  CONSTRAINT `project_ibfk_6` FOREIGN KEY (`project_type_id`) REFERENCES `project_type` (`project_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('19', 'โครงการสุขศึกษารายกลุ่มโรคที่สำคัญ', '', '15000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ประชาสัมพันธ์', '2011-08-27 16:45:43', '2', '1', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('20', 'โครงการ Radio &NEWS', '', '36000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ประชาสัมพันธ์', '2011-08-27 16:47:42', '2', '1', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('21', 'โครงการพัฒนามาตรฐานงานสุขศึกษา', '', '5000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ประชาสัมพันธ์', '2011-08-27 16:49:33', '2', '1', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('23', 'โครงการผลิตสื่อเสริมสร้างความรู้และการปฏิบัติตน', '', '10000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ประชาสัมพันธ์', '2011-08-27 16:56:22', '2', '1', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('25', 'โครงการผลิตถุงใส่สมุนไพร', '', '20000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ประชาสัมพันธ์', '2011-08-27 17:03:04', '2', '1', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('26', 'โครงการพัฒนาสื่อบุคคลนำชุมชนสร้างสุขภาพ', '', '5000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ประชาสัมพันธ์', '2011-08-27 17:04:38', '2', '1', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('27', 'โครงการเทิดพระเกียรติสมเด็จพระเจ้าอยู่หััว พระนางเจ้าพระบรมราชินีนาถลงหนังสือพิมพ์', '', '8000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ประชาสัมพันธ์', '2011-08-27 17:06:40', '2', '1', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('28', 'โครงการให้บริการเชิงรุกและตั้งรับบริจาคโลหิต', 'ไม่ใช้งบประมาณ', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ประชาสัมพันธ์', '2011-08-27 17:08:19', '2', '1', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('29', 'โครงการคุณคือคนสำคัญ  (สคส ปีใหม่)', '', '5000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ประชาสัมพันธ์', '2011-08-27 17:10:21', '2', '1', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('30', 'โครงการราษฎร์ร่วมพัฒนา', '', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ประชาสัมพันธ์', '2011-08-27 17:12:14', '2', '1', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('31', 'โครงการรวมใจสามัคคีพัฒนาด้วยกีฬาสี', '', '5000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ชมรมสร้างสุขภาพ', '2011-08-27 17:14:41', '2', '2', '7', '1', '54', '1');
INSERT INTO `project` VALUES ('32', 'โครงการส่งเสริมการออกกำลังกายและกีฬาสีเพื่อสุขภาพ \"เครือข่ายฝั่งตะวันออก\"', '', '20000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ประชาสัมพันธ์', '2011-08-27 17:17:03', '2', '2', '7', '1', '54', '1');
INSERT INTO `project` VALUES ('33', 'โครงการกีฬาสาธารณสุขตากสัมพันธ์ปี 2555', '', '20000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ชมรมสร้างสุขภาพ', '2011-08-27 17:18:58', '2', '2', '7', '1', '54', '1');
INSERT INTO `project` VALUES ('34', 'โครงการรำลึกวันขึ้นครองราชสมเด็จพระเจ้าตากสิน', '', '0', '0', '15000', 'เงินบริจาค', '2011-10-01 00:00:00', null, null, null, '2553', 'ประชาสัมพันธ์', '2011-08-27 17:20:29', '1', '1', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('35', 'โครงการรำลึกวันคลายราชสมภพสรงน้ำ', '', '0', '0', '1000', 'เงินบริจาค', '2011-10-01 00:00:00', null, null, null, '2555', 'ประชาสัมพันธ์', '2011-08-27 17:22:54', '1', '1', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('36', 'โครงการซ้อมแผนรับอุบัติเหตุหมู่', '', '10000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'อุบัติเหตุฉุกเฉิน', '2011-08-27 17:24:36', '2', '1', '1', '1', '1', '1');
INSERT INTO `project` VALUES ('37', 'โครงการอบรมช่วยฟื้นคืนชีพสำหรับพยาบาล', '', '8000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'อุบัติเหตุฉุกเฉิน', '2011-08-27 17:26:30', '2', '1', '1', '1', '1', '1');
INSERT INTO `project` VALUES ('38', 'โครงการอบรมช่วยฟื้นคืนชีพสำหรับเจ้าหน้าที่ทั่วไป', '', '3000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'อุบัติเหตุฉุกเฉิน', '2011-08-27 17:27:52', '2', '1', '1', '1', '1', '1');
INSERT INTO `project` VALUES ('39', 'โครงการฟ้าใสในวัยรุ่นชีวิตอบอุ่นในวัยเรียน', '', '15000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'สุขภาพจิต', '2011-08-27 17:29:54', '2', '1', '4', '1', '36', '1');
INSERT INTO `project` VALUES ('40', 'โครงการป้องกันภาวะซึมเศร้าเฝ้าระวังการฆ่าตัวตาย', '', '0', '0', '4500', 'งบจาก PP Area Base', '2011-10-01 00:00:00', null, null, null, '2555', 'สุขภาพจิต', '2011-08-27 17:31:36', '2', '1', '4', '1', '36', '1');
INSERT INTO `project` VALUES ('41', 'โครงการประเมินสภาวะสุขภาพจิตผู้ประสพภัยภิบัติน้ำท่วม PTSD', '', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'สุขภาพจิต', '2011-08-27 17:33:17', '2', '1', '4', '1', '36', '1');
INSERT INTO `project` VALUES ('42', 'โครงการพัฒนฟ้นฟูศักยภาพเจ้าหน้าที่ในการดูแลรักษาผู้ป่วยเอดส์และโรคติดต่อทางเพศสัมพันธ์', '', '4000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'สุขภาพจิต', '2011-08-27 17:34:51', '2', '1', '4', '1', '36', '1');
INSERT INTO `project` VALUES ('43', 'อบรมมาตรฐานการพยาบาลและการประเมิน', '', '20000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'การพยาบาล', '2011-08-27 17:38:44', '2', '2', '7', '1', '48', '1');
INSERT INTO `project` VALUES ('44', 'โครงการอบรมฟื้นฟูความรู้ผู้ช่วยเหลือคนไข้', '', '1000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'การพยาบาล', '2011-08-27 17:40:25', '2', '2', '7', '1', '48', '1');
INSERT INTO `project` VALUES ('45', 'โครงการสร้างเครือข่ายการดูแลสุขภาพผู้ป่วยที่บ้าน', '', '0', '0', '10000', 'กองทุนพระเทพ', '2011-10-01 00:00:00', null, null, null, '2555', 'Home Health Care', '2011-08-27 17:42:43', '2', '2', '7', '1', '55', '1');
INSERT INTO `project` VALUES ('46', 'วันรักโรงพยาบาล', '', '15000', '0', '0', null, '2012-02-12 00:00:00', null, null, null, '2555', '5 ส', '2011-08-27 17:44:18', '2', '2', '7', '1', '52', '1');
INSERT INTO `project` VALUES ('47', 'พัฒนามาตรฐานงาน 5ส', '', '10000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', '5 ส', '2011-08-27 17:47:49', '2', '2', '7', '1', '52', '1');
INSERT INTO `project` VALUES ('48', 'ทบทวนและพัฒนาองค์ความรู้ IC', '', '6000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'IC', '2011-08-27 17:58:55', '2', '2', '7', '1', '45', '1');
INSERT INTO `project` VALUES ('49', 'พัฒนางาน IC ในเครือข่าย', '', '5000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'IC', '2011-08-27 18:01:34', '2', '2', '7', '1', '45', '1');
INSERT INTO `project` VALUES ('50', 'มหกรรมความดี', '', '20000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ศูนย์คุณภาพ', '2011-08-27 18:02:41', '2', '2', '5', '1', '26', '1');
INSERT INTO `project` VALUES ('51', 'ร่วมรับรางวัล HA Foram 12', '', '37000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ศูนย์คุณภาพ', '2011-08-27 18:04:16', '2', '2', '5', '1', '26', '1');
INSERT INTO `project` VALUES ('52', 'ประชุมทีมคร่อมระดับ CUP', '', '3000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ศูนย์คุณภาพ', '2011-08-27 18:05:34', '2', '2', '5', '1', '26', '1');
INSERT INTO `project` VALUES ('53', 'โครงการผลิตสมุดบันทึกสุขภาพ และแผ่นพับโปรแกรมตรวจสุขภาพ', '', '5000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ศูนย์ตรวจสุขภาพ', '2011-08-27 18:08:46', '2', '1', '1', '1', '7', '1');
INSERT INTO `project` VALUES ('54', 'อบรมให้ความรู้จากบุคคลภายนอก', '', '20000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ศูนย์คุณภาพ', '2011-08-27 18:15:56', '1', '2', '5', '1', '26', '1');
INSERT INTO `project` VALUES ('55', 'โครงการคัดกรองสุขภาพตามความเสี่ยง', '', '7000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'งานตรวจสุขภาพ', '2011-08-27 18:17:21', '1', '1', '1', '1', '7', '1');
INSERT INTO `project` VALUES ('56', 'โครงการปรับเปลี่ยนพฤติกรรมสุขภาพเจ้าหน้าที่ โรงพยาบาล (คนไทยไร้พุง รุ่น 3)', '', '0', '0', '20000', 'งบจากมูลนิธิโรงพยาบาล', '2011-10-01 00:00:00', null, null, null, '2555', 'งานตรวจสุขภาพ', '2011-08-27 18:19:12', '1', '1', '1', '1', '7', '1');
INSERT INTO `project` VALUES ('57', 'สถานที่ทำงานน่าอยู่ น่ทำงาน', '', '4000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'งานรังสี', '2011-08-27 18:20:34', '1', '1', '3', '1', '18', '1');
INSERT INTO `project` VALUES ('58', 'ตรวจประเมินรังสีประจำบุคคล', '', '7000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'รังสีวิทยา', '2011-08-27 18:21:30', '1', '1', '3', '1', '18', '1');
INSERT INTO `project` VALUES ('59', 'บำรุงรักษาเครื่องฉายรังสีเชิงป้องกัน', '', '50000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'รังสีวิทยา', '2011-08-27 18:23:09', '1', '1', '3', '1', '18', '1');
INSERT INTO `project` VALUES ('60', 'ตรวจวัดคุณภาพมาตรฐานความปลอดภัยจากศูนย์วิทยาศาสตร์การแพทย์', '', '4000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'รังสีวิทยา', '2011-08-27 18:25:20', '1', '1', '3', '1', '18', '1');
INSERT INTO `project` VALUES ('61', 'โครงการสร้างสุขด้วยสวนสุขภาพ', '', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ชมรมสร้างสุขภาพ', '2011-08-27 18:33:20', '1', '2', '7', '1', '54', '1');
INSERT INTO `project` VALUES ('62', 'โครงการพัฒนา/ปรับปรุงศูนย์ออกกำลังกาย', '', '30000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ชมรมสร้างสุขภาพ', '2011-08-27 18:34:41', '1', '2', '7', '1', '54', '1');
INSERT INTO `project` VALUES ('63', 'โครงการเยี่ยมผู้มีอุปการคุณ', '', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ประชาสัมพันธ์', '2011-08-27 18:36:15', '1', '1', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('64', 'โครงการเลี้ยงรังส่งเจ้าหน้าที่ และปฐมนิเทศเจ้าหน้าที่ใหม่', '', '50000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'HRM', '2011-08-27 18:37:57', '2', '2', '7', '1', '44', '1');
INSERT INTO `project` VALUES ('65', 'จัดงานเลี้ยงส่งท้ายปีเก่าต้อนรับปีใหม่ โรงพยาบาล', '', '40000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'HRM', '2011-08-27 18:39:10', '2', '2', '7', '1', '44', '1');
INSERT INTO `project` VALUES ('66', 'จัดซื้อตลับใส่ฟิลม์ (cassette)พร้อมแผ่นเรืองแสง ขนาด 14*17 จำนวน 2 แผ่น ขนาด 12*16 จำนวน 1 แผ่น 7*17 จำนวน 1 แผ่น', '', '60800', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'รังสีวิทยา', '2011-08-27 18:43:04', '2', '3', '3', '1', '18', '1');
INSERT INTO `project` VALUES ('67', 'แผ่นเรืองแสง Screen ขนาด 12*16 จำนวน 2 คู่', '', '21600', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'รังสีวิทยา', '2011-08-27 18:44:44', '2', '3', '3', '1', '18', '1');
INSERT INTO `project` VALUES ('68', 'ไส้กรองน้ำสำหรับเครื่องล้างฟิล์ม', '', '2800', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'รังสีวิทยา', '2011-08-27 18:46:06', '2', '3', '3', '1', '18', '1');
INSERT INTO `project` VALUES ('69', 'ไส้กรองน้ำยาสร้างภาพล้างฟิล์ม', '', '2800', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'รังสีวิทยา', '2011-08-27 18:47:12', '2', '3', '3', '1', '18', '1');
INSERT INTO `project` VALUES ('70', 'อุปกรณ์เครื่องช่วยเดิน', 'ไม้คำ้ยัน 10 คู่   3000 บาท\nWalker  10 อัน  6000 บาท\nTripod cane 10 อัน  4000 บาท', '13000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'เวชกรรมฟื้นฟู', '2011-08-27 18:49:46', '2', '3', '3', '1', '20', '1');
INSERT INTO `project` VALUES ('71', 'เครื่อง Infusion pump (แบบให้เลือดได้)', 'หอผู้ป่วยในชาย หญิง จำนวน 2 เครื่อง', '130000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'หอผู้ป่วย', '2011-08-27 18:51:47', '2', '3', '1', '1', '3', '1');
INSERT INTO `project` VALUES ('72', 'เครื่องวัด O2 Sat สำหรับ NB-เด็กเล็ก', '', '35000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'หอผู้ป่วยในหญิง', '2011-08-27 18:54:22', '2', '3', '1', '1', '4', '1');
INSERT INTO `project` VALUES ('73', 'โต๊ Over Bed', '', '10000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ห้องคลอด', '2011-08-27 18:55:48', '2', '3', '1', '1', '5', '1');
INSERT INTO `project` VALUES ('74', 'ปรอทวัดทางหู', 'จำนวน 2 อัน ๆ ละ 1200 บาท', '2400', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'OPD', '2011-08-27 18:57:18', '2', '3', '1', '1', '2', '1');
INSERT INTO `project` VALUES ('75', 'Cuff BP 3 ขนาด (เล็ก กลาง ใหญ่)', 'จำนวน 6 ตัว ๆ ละ 1200 บาท', '7200', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'OPD', '2011-08-27 18:59:26', '2', '3', '1', '1', '2', '1');
INSERT INTO `project` VALUES ('76', 'เครื่องปั่น Hct', '', '75000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ชันสูตร', '2011-08-27 19:00:41', '2', '3', '3', '1', '16', '1');
INSERT INTO `project` VALUES ('77', 'เครื่องนับเม็ดเลือด', '', '12000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ห้องชันสูตร', '2011-08-27 19:01:45', '2', '3', '3', '1', '16', '1');
INSERT INTO `project` VALUES ('78', 'เครื่องชั่งน้ำหนักชนิดวัดส่วนสูง', '', '12000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ประชาสัมพันธ์', '2011-08-27 19:03:17', '2', '3', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('79', 'Set ทำแผล', '', '30000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'หน่วยจ่ายกลาง', '2011-08-27 19:08:52', '2', '3', '1', '1', '6', '1');
INSERT INTO `project` VALUES ('80', 'Raidian warmer', '', '0', '0', '420000', 'งบอื่น', '2011-10-01 00:00:00', null, null, null, '2555', 'หอผู้ป่วยหญิง', '2011-08-28 10:18:08', '1', '3', '1', '1', '4', '1');
INSERT INTO `project` VALUES ('81', 'เครื่องฟังเสียงหัวใจเด็ก', '', '50000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ห้องคลอด', '2011-08-28 10:19:13', '1', '3', '1', '1', '5', '1');
INSERT INTO `project` VALUES ('82', 'ชุดวัด IQ', '', '10000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'สุขภาพจิต', '2011-08-28 16:47:37', '1', '3', '4', '1', '36', '1');
INSERT INTO `project` VALUES ('83', 'Chart เหล็ก', 'จำนวน 30 อัน ๆ ละ 2,000 บาท', '60000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'หอผู้ป่วยหญิง', '2011-08-28 16:49:26', '1', '3', '1', '1', '4', '1');
INSERT INTO `project` VALUES ('84', 'เครื่อง seal', '', '30000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'หน่วยจ่ายกลาง', '2011-08-28 16:50:51', '1', '3', '1', '1', '6', '1');
INSERT INTO `project` VALUES ('85', 'เครื่องอุ่นเชื้อ', '', '80000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'หน่วยจ่ายกลาง', '2011-08-28 16:52:07', '1', '3', '1', '1', '6', '1');
INSERT INTO `project` VALUES ('86', 'เครื่องอบไอน้ำฆ่าเชื้อ(เครื่องนึ่ง)', 'รองบประมาณจากแหล่งอื่น', '0', '0', '300000', 'งบประมาณอื่น', '2011-10-01 00:00:00', null, null, null, '2555', 'หน่วยจ่ายกลาง', '2011-08-28 16:54:08', '1', '3', '1', '1', '6', '1');
INSERT INTO `project` VALUES ('87', 'เครื่องครัวพร้อมอ่างล้างจาน (ขนาดพิเศษ)', '', '90000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'หน่วยจ่ายกลาง', '2011-08-28 16:55:49', '1', '3', '1', '1', '6', '1');
INSERT INTO `project` VALUES ('88', 'กระดาษ EKG NST Ultrasound', 'ให้จัดซื้อรวม', '25000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'เภสัชกรรม', '2011-08-28 17:15:29', '2', '5', '3', '1', '15', '1');
INSERT INTO `project` VALUES ('89', 'Set Spore test', '', '5700', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'IC', '2011-08-28 17:17:12', '2', '5', '1', '1', '2', '1');
INSERT INTO `project` VALUES ('90', 'ทรายอะเบท', '', '45000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'สุขาภิบาลและสิ่งแวดล้อม', '2011-08-28 17:18:31', '2', '5', '6', '1', '30', '1');
INSERT INTO `project` VALUES ('91', 'น้ำยาพ่นยุง', '', '12000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'สุขาภิบาลและสิ่งแวดล้อม', '2011-08-28 17:20:04', '2', '5', '6', '1', '30', '1');
INSERT INTO `project` VALUES ('92', 'ปรอทตู้เย็น (วัดอุณหภูมิ)', 'จำนวน 20 อัน ๆ ละ 1200 บาท', '24000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'เวชปฏิบัติ', '2011-08-28 17:21:51', '2', '5', '6', '1', '27', '1');
INSERT INTO `project` VALUES ('93', 'ตู้โชว์โล่รางวัลและเกียรติบัตร', '', '30000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ประชาสัมพันธ์', '2011-08-28 17:23:38', '1', '4', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('94', 'เครื่องปรับอากาศ 12000 Btu. (ห้องบริหาร)', '', '16700', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'บริหาร', '2011-08-28 17:25:21', '1', '4', '2', '1', '28', '1');
INSERT INTO `project` VALUES ('95', 'โต๊ะทำงานพร้อมเก้าอี้', '', '10900', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'บริหาร', '2011-08-28 17:26:23', '2', '4', '2', '1', '28', '1');
INSERT INTO `project` VALUES ('96', 'กล่องพลาสติกเก็บเอกสาร ', 'จำนวน 10 กล่อง', '2000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'บริหาร', '2011-08-28 17:28:14', '2', '4', '2', '1', '12', '1');
INSERT INTO `project` VALUES ('97', 'ปรับปรุงห้องพิเศษ 5 ห้อง', 'เปลี่ยนหน้าต่างจากบานเกร็ด เป็นกระจกบานเลื่อนและมุ้งลวด', '41000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'หอผู้ป่วยหญิง', '2011-08-28 17:30:36', '2', '4', '1', '1', '4', '1');
INSERT INTO `project` VALUES ('98', 'เก้าอี้สำนักงาน', 'จำนวน 2 ตัว ๆ ละ 2500 บาท', '5000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ผู้ป่วยนอก', '2011-08-28 17:34:10', '2', '4', '1', '1', '2', '1');
INSERT INTO `project` VALUES ('99', 'เครื่องปั๊มน้ำ (ไดโว่ สูปทรายบอน้ำดิบ ปะปา)', '', '5000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'สุขาภิบาลและส่งแวดล้อม', '2011-08-28 17:36:08', '2', '4', '6', '1', '30', '1');
INSERT INTO `project` VALUES ('100', 'เก้าอี้เตี้ย สำหรับนั่งพับผ้า (ไม้)', 'จำนวน 2 ตัว', '800', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ซักฟอก', '2011-08-28 17:38:06', '2', '4', '1', '1', '6', '1');
INSERT INTO `project` VALUES ('101', 'พัดลมเพดาน (โคจร)', '', '1500', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ซักฟอก', '2011-08-28 17:39:37', '2', '4', '1', '1', '6', '1');
INSERT INTO `project` VALUES ('102', 'โต๊หมู่บูชา 9', 'ห้องประชุมสุนทรทัศนีย์ ', '8000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'บริหาร', '2011-08-28 17:41:14', '2', '4', '2', '1', '12', '1');
INSERT INTO `project` VALUES ('103', 'ที่แขวนทีวี  29 นิ้ว', 'ติดต้องห้องเวชปฏิบัติ', '2800', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'สารสนเทศ', '2011-08-28 17:44:05', '2', '4', '5', '1', '42', '1');
INSERT INTO `project` VALUES ('104', 'ที่แขวนทีวี 14 นิ้ว', 'ติดตั้งที่ห้องแยกโรค', '1500', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'สารสนเทศ', '2011-08-28 17:46:02', '2', '4', '5', '1', '42', '1');
INSERT INTO `project` VALUES ('105', 'เครื่องทำลายเอกสาร', '', '40000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ENV', '2011-08-28 17:47:33', '1', '2', '7', '1', '43', '1');
INSERT INTO `project` VALUES ('106', 'แก้วน้ำพลากสติก', 'จำนวน 2000 ใบ', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'หอผู้ป่วยในชาย', '2011-08-28 17:49:04', '1', '4', '1', '1', '3', '1');
INSERT INTO `project` VALUES ('107', 'ผ้าถุงผู้ป่วยสามัญ', 'จำนวน 200 ผืน', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'หอผู้ป่วยหญิง', '2011-08-28 17:50:22', '1', '4', '1', '1', '4', '1');
INSERT INTO `project` VALUES ('108', 'ผ้าปูเตียงสามัญ 100 ผืน', 'จำนวน 100 ผืน', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'หอผู้ป่วยหญิง', '2011-08-28 17:51:31', '1', '4', '1', '1', '4', '1');
INSERT INTO `project` VALUES ('109', 'ผ้าห่มห้องสามัญ', 'จำนวน 50ผืน', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'หอผู้ป่วยหญิง', '2011-08-28 17:52:32', '1', '4', '1', '1', '4', '1');
INSERT INTO `project` VALUES ('110', 'ผ้าขวางเตียงห้องสามัญ  สีฟ้า', 'จำนวน 50 ผืน', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'หอผู้ป่วยชาย', '2011-08-28 17:53:50', '1', '4', '1', '1', '3', '1');
INSERT INTO `project` VALUES ('111', 'ผ้าขวางเตียง ห้องสามัญ สีเขียว', 'จำนวน 50 ผืน', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'หอผู้ป่วยชาย', '2011-08-28 17:55:02', '1', '4', '1', '1', '3', '1');
INSERT INTO `project` VALUES ('112', 'โครงการพัฒนาทักษะในการดูแลผู้ป่วยระยะสุดท้ายให้ตายอย่างสงบ', '', '7000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'PCT', '2011-08-29 10:57:55', '2', '2', '7', '1', '50', '1');
INSERT INTO `project` VALUES ('113', 'โครงการแลกเปลี่ยนเรียนรู้ทีมดูแลผู้ป่วย', '', '4000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'หอผู้ป่วยชาย', '2011-08-29 10:59:33', '1', '2', '1', '1', '3', '1');
INSERT INTO `project` VALUES ('114', 'โครงการอบรมมาตรฐานการพยาบาลและการประเมิน', '', '12000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'กลุ่มการพยาบาล', '2011-08-29 11:04:20', '1', '2', '1', '1', '38', '1');
INSERT INTO `project` VALUES ('115', 'เครื่องคอมพิวเตอร์แบบตั้งโต๊ะ', '', '25000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'งานรังสีวิทยา', '2011-08-29 17:53:26', '2', '4', '3', '1', '18', '1');
INSERT INTO `project` VALUES ('116', 'เครื่องคอมพวิเตอร์แบบตั้งโต๊ะ', 'จำนวน 2 เครื่อง ๆ  ละ 25000 บาท', '50000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'งานเวชระเบียน', '2011-08-29 17:56:18', '2', '4', '5', '1', '23', '1');
INSERT INTO `project` VALUES ('117', 'เครื่องสำรองไฟ UPS Server 2200 VA Rack', '', '35000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'สารสนเทศ', '2011-08-29 17:58:07', '2', '4', '5', '1', '42', '1');
INSERT INTO `project` VALUES ('118', 'เครื่องสำรองไฟลูกข่าย 500 VA', 'เครื่องละ 2400 บาท จำนวน 10 เครื่อง', '24000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'สารสนเทศ', '2011-08-29 18:00:10', '2', '4', '5', '1', '42', '1');
INSERT INTO `project` VALUES ('119', 'เครื่องพิมพ์ LaserJect ', '', '4500', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'งานผู้ป่วยนอก', '2011-08-29 18:01:45', '2', '4', '1', '1', '2', '1');
INSERT INTO `project` VALUES ('120', 'เครื่องพิมพ์ชนิดถ่ายเอกสารได้', '', '4800', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'เวชระเบียน', '2011-08-29 18:03:17', '1', '4', '5', '1', '23', '1');
INSERT INTO `project` VALUES ('121', 'กล้องถ่ารูป DSLR', '', '18900', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'สารสนเทศ', '2011-08-29 18:04:45', '2', '4', '5', '1', '42', '1');
INSERT INTO `project` VALUES ('122', 'ไมค์ตั้งโต๊ะ 2 ตัว ', 'ไมค์ชนิดคอยาวสำหรับใช้ห้องประชุม', '6500', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'สารสนเทศ', '2011-08-29 18:07:03', '2', '4', '5', '1', '42', '1');
INSERT INTO `project` VALUES ('123', 'ชั้นเหล็กสำหรับจัดเก็บอุปกรณ์คอมพิวเตอร์ที่ชำรุด', 'จัดทำเอง', '4500', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'สารสนเทศ', '2011-08-29 18:08:36', '2', '4', '5', '1', '42', '1');
INSERT INTO `project` VALUES ('124', 'ชุดเครื่องมือช่างสำหรับซ่อมบำรุงอุปกรณ์', 'สำหรับซ่อมเครื่องคอมพิวเตอร์  โทรศัพท์  เคเบิ้ลทีวีั  ', '15000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'สารสนเทศ', '2011-08-29 18:10:52', '1', '4', '5', '1', '42', '1');
INSERT INTO `project` VALUES ('125', 'เครื่อง Wriless LinkSyS สำหรับบ้านพัก', 'ติดตั้งบ้านพักที่สัญญาณไม่มี', '3000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'สารสนเืทศ', '2011-08-29 18:13:24', '1', '4', '5', '1', '42', '1');
INSERT INTO `project` VALUES ('126', 'อบรมการดูแลแก้ไขการใช้งานคอมพิวเตอร์และเครือข่าย', '', '1000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'IM', '2011-08-29 18:15:13', '2', '2', '7', '1', '46', '1');
INSERT INTO `project` VALUES ('127', 'อบรมการบันทึกข้อมูล 18 แฟ้ม และ ตรวจสอบข้อมูล HosXP', '', '1000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'IM', '2011-08-29 18:17:23', '2', '2', '7', '1', '45', '1');
INSERT INTO `project` VALUES ('128', 'จัดทำระบบ Software E-Office', 'ไม่ใช้งบประมาณ', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'IM', '2011-08-29 18:19:36', '1', '2', '7', '1', '46', '1');
INSERT INTO `project` VALUES ('129', 'ReupGrade Database', 'ตรวจสอบฐานขอมูลทั้งระบบ', '25000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'IM', '2011-08-29 18:26:03', '1', '2', '7', '1', '46', '1');
INSERT INTO `project` VALUES ('130', 'จัดทำระบบเชื่อมโยงเครือข่าย CUP บ้านตาก HosXP_PCU', 'ค่าลิขสิทธิ์ Software 13 สอ. ค่าติดตั้งระบบทุก รพ.สต. และจัดอบรม\n2 ครั้ง 1.ขึ้นระบบใช้งาน  2. ทบทวนติดตามแก้ไขปัญหาการบันทึกข้อมูล', '180000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'IM', '2011-08-29 18:32:16', '1', '2', '7', '1', '46', '1');
INSERT INTO `project` VALUES ('131', 'โครงการพัฒนาศักยภาพอนามัยแม่และเด็ก', '', '0', '0', '6400', 'งบ พัฒนา รพ.สต', '2011-10-01 00:00:00', null, null, null, '2555', 'เวชปฏิบัติครอบครัว', '2011-08-29 18:37:01', '2', '1', '6', '1', '27', '1');
INSERT INTO `project` VALUES ('132', 'โครงการกิจกรรมวันแม่ ปี 55', '', '10000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'เวชปฏิบัติครอบครัว', '2011-08-29 18:39:02', '1', '1', '6', '1', '27', '1');
INSERT INTO `project` VALUES ('133', 'โครงการโรงพยาบาลสายใยรัก', '', '8500', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'เวชปฏิบัติครอบครัว', '2011-08-29 18:40:07', '1', '1', '6', '1', '27', '1');
INSERT INTO `project` VALUES ('134', 'โครงการสร้างเสริมภูมิคุมกันโรคในประชาชน', '', '0', '0', '10500', 'งบ  PP Express', '2011-08-29 00:00:00', null, null, null, '2555', 'เวชปฏิบัติครอบครัว(พิมพ์ษินี)', '2011-08-29 18:43:44', '2', '1', '6', '1', '27', '1');
INSERT INTO `project` VALUES ('135', 'โครงการอบรมผู้นำนักเรียนส่งเสริมสุขภาพ ยสร.', '', '10000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'เวชปฏิบัติครอบครัว', '2011-08-29 18:45:54', '2', '1', '6', '1', '27', '1');
INSERT INTO `project` VALUES ('136', 'โครงการรณรงค์ตรวจคัดกรองมะเร็งเต้านม', '', '20000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'เวชปฏิบัติครอบครัว', '2011-08-29 18:47:49', '2', '1', '6', '1', '27', '1');
INSERT INTO `project` VALUES ('137', 'โครงการชุมชนร่วมใจพัฒนาวัดส่งเสริมสุขภาพ', '', '5000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'เวชปฏิบัติครอบครัว', '2011-08-29 18:49:11', '2', '1', '6', '1', '27', '1');
INSERT INTO `project` VALUES ('138', 'โครงการนิเทศ ติดตามประเมินผลการปฏิบัติงานสร้างเสริมภูมิคุ้มกันโรค อ.บ้านตาก', '', '3000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'เวชปฏิบัติครอบครัว', '2011-08-29 18:51:06', '2', '1', '6', '1', '27', '1');
INSERT INTO `project` VALUES ('139', 'โครงการอบรมฟื้นฟูความรู้ อสม.', '', '20000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'เวชปฏิบัติครอบครัว', '2011-08-29 18:52:57', '2', '1', '6', '1', '27', '1');
INSERT INTO `project` VALUES ('140', 'พัฒนาการให้บริการเภสัชกรรม', '', '26000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ภก.วรุฒม์', '2011-08-30 15:48:04', '1', '1', '3', '1', '15', '1');
INSERT INTO `project` VALUES ('141', 'พัฒนารูปแบบผลิตภัณฑ์สมุนไพรโรงพยาบาล', '', '46250', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ภญ.ปริญดา', '2011-08-30 15:49:51', '1', '1', '3', '1', '15', '1');
INSERT INTO `project` VALUES ('142', 'บริหารจัดการเวชภัณฑ์อย่างมีคุณภาพ', 'เวชภัณฑ์(จัดซื้อยา)', '9200000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ภก.วรุตม์', '2011-08-31 14:14:53', '2', '5', '3', '1', '15', '1');
INSERT INTO `project` VALUES ('143', 'บริหารจัดการเวชภัณฑ์อย่างมีคุณภาพ', 'จัดซื้อเวชภัณฑ์ที่ไม่ใช่ยา  รวมทุกอย่าง', '2380000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ภก.วรุตม์', '2011-08-31 14:17:26', '2', '5', '3', '1', '15', '1');
INSERT INTO `project` VALUES ('144', 'วัตถุดิบคุณภาพ', 'จัดหาวัตถุดิบสมุนไพร 45 ', '200000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ภญ.ปริญดา', '2011-08-31 14:21:34', '2', '5', '3', '1', '15', '1');
INSERT INTO `project` VALUES ('145', 'การประกันคุณภาพการผลิต', 'จัดซื้อวัสดุผลิต', '600000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ภญ.ปริญดา', '2011-08-31 16:08:56', '2', '5', '3', '1', '15', '1');
INSERT INTO `project` VALUES ('146', 'การประกันคุณภาพการผลิต', 'เคมีภัณฑ์', '280000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ภญ.ปริญดา', '2011-08-31 16:10:38', '2', '5', '3', '1', '15', '1');
INSERT INTO `project` VALUES ('147', 'ประกันคุณภาพผลิตภัณฑ์สมุนไพร', 'ค่าส่งตรวจ LAB', '18900', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ภญ.ปริญดา', '2011-08-31 16:12:40', '2', '5', '3', '1', '15', '1');
INSERT INTO `project` VALUES ('148', 'ผู้สนับสนุนคุณภาพ', 'ค่าไส้กรองน้ำ', '2782', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ภญ.ปริญดา', '2011-08-31 16:15:48', '2', '5', '3', '1', '15', '1');
INSERT INTO `project` VALUES ('149', 'โครงการแลกเปลี่ยนเรียนรู้ทีมดูแลผู้ป่วย', '', '4000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'PCT', '2011-08-31 16:43:21', '2', '2', '7', '1', '50', '1');
INSERT INTO `project` VALUES ('150', 'โครงการธรรสัญจร', '', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ชมรมจริยธรรม', '2011-08-31 16:54:42', '1', '2', '7', '1', '53', '1');
INSERT INTO `project` VALUES ('151', 'โครงการเข้าพรรษาพาใจผ่องแผ้ว 4', '', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ชมรมจริยธรรม', '2011-08-31 16:56:09', '1', '2', '7', '1', '53', '1');
INSERT INTO `project` VALUES ('152', 'ถวายเทียนจำนำพรรษา ตักบาตรฟังเทศน์', '', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ชมรมจริยธรรม', '2011-08-31 16:57:10', '1', '2', '7', '1', '53', '1');
INSERT INTO `project` VALUES ('153', 'โครงการ ปีใหม่เมือง กตัญญูผู้มีพระคุณ', '', '5000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ชมรมจริยธรรม', '2011-08-31 17:02:05', '2', '2', '7', '1', '53', '1');
INSERT INTO `project` VALUES ('154', 'โครงการห่วงใยใส่ใจผู้ยากไร้', '', '0', '0', '10000', 'กองทุนพระเทพ', '2011-10-01 00:00:00', null, null, null, '2555', 'ชมรมจริยธรรม', '2011-08-31 17:03:54', '1', '2', '7', '1', '53', '1');
INSERT INTO `project` VALUES ('155', 'โครงการห่วงน้องผู้ด้วยโอกาส', '', '0', '0', '10000', 'มูลนิธิโรงพยาบาลบ้านตาก', '2011-10-01 00:00:00', null, null, null, '2555', 'ชมรมจริยธรรม', '2011-08-31 17:05:07', '1', '2', '7', '1', '53', '1');
INSERT INTO `project` VALUES ('156', 'โครงการ ESB', '', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ชมรมจริยธรรม', '2011-08-31 17:06:01', '1', '2', '7', '1', '53', '1');
INSERT INTO `project` VALUES ('157', 'โครงการขึ้นธาตุเดือนเก้า', '', '5000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ชมรมจริยธรรม', '2011-08-31 17:06:57', '2', '2', '7', '1', '53', '1');
INSERT INTO `project` VALUES ('158', 'โครงการรวมใจเทิดไท้พระราชบิดา', '', '10000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ชมรมจริยธรรม', '2011-08-31 17:08:22', '2', '2', '7', '1', '53', '1');
INSERT INTO `project` VALUES ('159', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '49520', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'บริหาร', '2011-08-31 17:41:44', '1', '9', '2', '1', '28', '1');
INSERT INTO `project` VALUES ('160', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '240000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'งานยานพาหนะ', '2011-08-31 17:44:21', '1', '9', '2', '1', '13', '1');
INSERT INTO `project` VALUES ('161', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '168000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'งานรักษาความปลอดภัย', '2011-08-31 17:45:50', '1', '9', '2', '1', '14', '1');
INSERT INTO `project` VALUES ('162', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'งานสุขาภิบาลและสิ่งแวดล้อม', '2011-08-31 17:47:36', '1', '9', '6', '1', '22', '1');
INSERT INTO `project` VALUES ('163', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '700000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'หอผู้ป่วยหญิง', '2011-08-31 17:49:18', '1', '9', '1', '1', '4', '1');
INSERT INTO `project` VALUES ('164', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '671200', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'หอผู้ป่วยชาย', '2011-08-31 17:52:32', '1', '9', '1', '1', '3', '1');
INSERT INTO `project` VALUES ('165', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '100000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'หน่วยจ่ายกลางและซักฟอก', '2011-08-31 17:53:47', '1', '9', '1', '1', '6', '1');
INSERT INTO `project` VALUES ('166', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '135000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'โรงครัว', '2011-08-31 17:55:03', '1', '9', '1', '1', '39', '1');
INSERT INTO `project` VALUES ('167', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '179400', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ชันสูตร', '2011-08-31 17:56:13', '1', '9', '3', '1', '16', '1');
INSERT INTO `project` VALUES ('168', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '1100000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'เภสัชกรรม', '2011-08-31 17:57:27', '1', '9', '3', '1', '15', '1');
INSERT INTO `project` VALUES ('169', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '169600', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ผู้ป่วยนอก', '2011-08-31 17:58:33', '1', '9', '1', '1', '2', '1');
INSERT INTO `project` VALUES ('170', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '31000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'เวชกรรมฟื้นฟู', '2011-08-31 17:59:28', '1', '9', '3', '1', '20', '1');
INSERT INTO `project` VALUES ('171', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '236000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'งานรังสีวิทยา', '2011-08-31 18:01:01', '1', '9', '3', '1', '18', '1');
INSERT INTO `project` VALUES ('172', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '500000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ทันตกรรม', '2011-08-31 18:02:12', '1', '9', '4', '1', '21', '1');
INSERT INTO `project` VALUES ('173', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '898000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'อุบัติเหตุฉุกเฉิน', '2011-08-31 18:04:00', '1', '9', '1', '1', '1', '1');
INSERT INTO `project` VALUES ('174', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '43000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'แพทย์แผนไทย', '2011-08-31 18:05:13', '1', '9', '4', '1', '35', '1');
INSERT INTO `project` VALUES ('175', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '52000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ประชาสัมพันธ์', '2011-08-31 18:06:45', '1', '9', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('176', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '108360', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'สารสนเทศ', '2011-08-31 18:09:15', '1', '9', '5', '1', '42', '1');
INSERT INTO `project` VALUES ('177', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '2000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ประกันสุขภาพ', '2011-08-31 18:10:11', '1', '9', '5', '1', '24', '1');
INSERT INTO `project` VALUES ('178', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '38000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'เวชระเบียน', '2011-08-31 18:11:02', '1', '9', '5', '1', '23', '1');
INSERT INTO `project` VALUES ('179', 'ค่าตอบแทนปฏิบัติงานนอกเวลาราชการ', '', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'เวชกรรม', '2011-08-31 18:12:47', '1', '9', '4', '1', '34', '1');
INSERT INTO `project` VALUES ('180', 'เครื่องวัด O2 Sat สำหรับ NB-เด็กเล็ก', '', '35000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ห้องคลอด', '2011-09-01 14:06:42', '2', '3', '1', '1', '5', '1');
INSERT INTO `project` VALUES ('181', 'เก้าอี้สำนักงาน', 'จำนวน 2 ตัว ๆ ละ 2500 บาท', '5000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'เวชปฏิบัติครอบครัว', '2011-09-01 15:47:02', '2', '4', '6', '1', '27', '1');
INSERT INTO `project` VALUES ('182', 'เก้าอี้สำนักงาน', 'จำนวน 2 ตัว ๆ ละ 2500 บาท', '5000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'เวชระเบียน', '2011-09-01 15:48:15', '2', '4', '5', '1', '23', '1');
INSERT INTO `project` VALUES ('183', 'จัดทำกริ่งห้องน้ำ 30 จุดบริการ', 'จัดทำหอผู้ป่วยชาย หญิง ห้องพิเศษ ห้องรอคลอด', '14000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ENV', '2011-09-01 15:59:34', '2', '7', '7', '1', '43', '1');
INSERT INTO `project` VALUES ('184', 'ปรับปรุงขอบบ่อบำบัดน้ำเสีย', 'เทคอนกรีตบริเวณขอบบ่อป้องกันตัดหญ้าตกลงไป  ดำเนินการเอง', '10000', '0', '0', null, '2011-09-01 00:00:00', null, null, null, '2555', 'ENV', '2011-09-01 16:01:40', '2', '7', '7', '1', '43', '1');
INSERT INTO `project` VALUES ('185', 'ปรับปรุงบันไดขึ้นบ่อกรองปะปา', 'จัดทำบันไดเพื่อใช้ขึ้นลงง่ายขึ้น  ดำเนินการเอง', '12000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ENV', '2011-09-01 16:03:48', '2', '7', '7', '1', '43', '1');
INSERT INTO `project` VALUES ('186', 'ทาสีรั้วด้านหลังโรงพยาบาล  พร้อมเขียนป้ายชื่อผู้บริจาค', 'ทาสีน้ำอะคลิลิคที่เป็นพื้นคอนกรีต และน้ำมันตาขายรั้ว พร้อมเขียนป้าชื่อ\nหรือจัดทำเป็นแผ่นสติกเกอร์ติดแผ่นพลาสติก', '25000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ENV', '2011-09-01 16:07:57', '1', '7', '7', '1', '43', '1');
INSERT INTO `project` VALUES ('187', 'จัดทำป้ายชื่อด้านหน้าโรงพยาบาล', 'ดำเนินการต่อจากปีงบที่ผ่านมา ยังไม่ได้ดำเนินการ', '0', '0', '200000', 'งบค่าเสื่อม', '2011-09-01 00:00:00', null, null, null, '2555', 'ENV', '2011-09-01 16:10:30', '1', '7', '7', '1', '43', '1');
INSERT INTO `project` VALUES ('188', 'ปรับปรุงป้ายไฟด้านหลังโรงพยาบาล', 'จัดทำป้ายชื่อ โรงพยาบาล บริเวณทางเข้าด้านหลัง เป็นตู้กล่องไฟ แบบใช้แผ่นพลาสติด', '7000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ENV', '2011-09-01 16:13:25', '2', '7', '7', '1', '43', '1');
INSERT INTO `project` VALUES ('189', 'ปรับปรุงทาสี กำหนดพื้นที่จราจร', '', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ENV', '2011-09-01 16:16:06', '1', '7', '7', '1', '43', '1');
INSERT INTO `project` VALUES ('190', 'ปรับปรุงหลังคาหอผู้ป่วยชาย', 'เปลี่ยนกระเบื้องใหม่เป็น ยาว 1.50 เมตร ทั้งสองด้าน', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ENV', '2011-09-01 16:18:06', '1', '7', '7', '1', '43', '1');
INSERT INTO `project` VALUES ('191', 'จัดสร้างอาคารห้องพัก  พขร.และป้อมยาม', '', '200000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ENV', '2011-09-01 16:19:36', '1', '7', '7', '1', '43', '1');
INSERT INTO `project` VALUES ('192', 'ปรับปรุงฝ้าเพดาน ', 'อาคารยุทธหัตถี  ห้องรอคลอด หอผู้ป่วยชาย สำรวจทุกอาคารก่อนดำเนินการปรับปรุง', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ENV', '2011-09-01 16:22:50', '1', '7', '7', '1', '43', '1');
INSERT INTO `project` VALUES ('193', 'ปูกระเบื้องผนังห้อง PV', 'ดำเนินการจัดทำเอง', '7000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ENV', '2011-09-01 16:29:16', '2', '7', '7', '1', '43', '1');
INSERT INTO `project` VALUES ('194', 'ปรับปรุงชั้นวางเคาท์เตอร์', 'จัทำที่เก็บเอกสารแฟ้ม', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'เวชปฏิบัติครอบครัว', '2011-09-01 16:31:24', '1', '7', '6', '1', '27', '1');
INSERT INTO `project` VALUES ('195', 'ทาสีหอผู้ป่วยชาย', 'ทาสีภายนอก', '50000', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ENV', '2011-09-01 16:33:45', '1', '7', '7', '1', '43', '1');
INSERT INTO `project` VALUES ('196', 'ใส่ม่านบังแสงห้องพิเศษ', 'ใส่ม่านบังแสงบานเกร็ดข้างประตูทางเข้าห้องพิเศษ ทุกห้อง', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'หอผู้ป่วยชาย', '2011-09-01 16:36:50', '1', '7', '1', '1', '3', '1');
INSERT INTO `project` VALUES ('197', 'ปรับปรุงพื้นที่ด้านนอกรั้วด้านหลัง', 'ปรับดินบริเวณด้านนอกรั้วด้านหลัง หรือจัดสวนตกแต่ง', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ENV', '2011-09-01 16:38:56', '1', '7', '7', '1', '43', '1');
INSERT INTO `project` VALUES ('198', 'จัดทำประตูปิด-เปิดทางเข้าด้านหน้า ทิศใต้', 'ทำประตูปิด-เปิด ทางเข้าด้านหน้า', '0', '0', '0', null, '2011-10-01 00:00:00', null, null, null, '2555', 'ENV', '2011-09-01 16:40:46', '1', '7', '7', '1', '43', '1');
INSERT INTO `project` VALUES ('199', 'โครงการ Radio&New', '', '36000', '0', '0', null, '2010-10-01 00:00:00', '2012-09-30 00:00:00', null, null, '2554', 'ประชาสัมพันธ์', '2011-09-01 17:17:06', '5', '1', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('200', 'โครงการรณรง วันลอยกระทง', '', '10000', '0', '0', null, '2010-10-01 00:00:00', '2011-10-30 00:00:00', null, null, '2554', 'ประชาสัมพันธ์', '2011-09-01 17:19:41', '4', '1', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('201', 'โครงการส่งเสริมออกกำลังกายและกีฬาเพื่อสุขภาพ ฝั่งตะวันตก', '', '20000', '0', '0', null, '2010-10-01 00:00:00', '2011-10-30 00:00:00', null, null, '2554', 'ประชาสัมพันธ์', '2011-09-01 17:23:42', '5', '1', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('202', 'โครงการกีฬาสาธารณสุขสัมพันธ์ปี 2554', '', '30000', '0', '0', null, '2010-10-01 00:00:00', '2011-10-30 00:00:00', null, null, '2554', 'ประชาสัมพันธ์', '2011-09-01 17:30:11', '5', '1', '5', '1', '25', '1');
INSERT INTO `project` VALUES ('203', 'งานเลี้ยงเกษียณอายะราชการ', '', '50000', '0', '0', null, '2011-09-02 00:00:00', null, null, null, '2555', 'HRM', '2011-09-02 17:47:09', '2', '2', '7', '1', '44', '1');

-- ----------------------------
-- Table structure for `project_status`
-- ----------------------------
DROP TABLE IF EXISTS `project_status`;
CREATE TABLE `project_status` (
  `project_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_status_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`project_status_id`),
  UNIQUE KEY `project_status_name` (`project_status_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of project_status
-- ----------------------------
INSERT INTO `project_status` VALUES ('4', 'กำลังดำเนินการ');
INSERT INTO `project_status` VALUES ('2', 'พิจารณาผ่าน');
INSERT INTO `project_status` VALUES ('3', 'พิจารณาไม่ผ่าน');
INSERT INTO `project_status` VALUES ('1', 'รอพิจารณา');
INSERT INTO `project_status` VALUES ('5', 'สิ้นสุดการดำเนินการ');

-- ----------------------------
-- Table structure for `project_type`
-- ----------------------------
DROP TABLE IF EXISTS `project_type`;
CREATE TABLE `project_type` (
  `project_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_type_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`project_type_id`),
  UNIQUE KEY `project_type_name` (`project_type_name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of project_type
-- ----------------------------
INSERT INTO `project_type` VALUES ('4', 'ครุภัณฑ์lนสำนักงาน');
INSERT INTO `project_type` VALUES ('3', 'ครุภัณฑ์ทางการแพทย์');
INSERT INTO `project_type` VALUES ('9', 'ค่าตอบแทนปฏิบัติงานนอกเวลา');
INSERT INTO `project_type` VALUES ('8', 'ดูแลรักษาบำรุง');
INSERT INTO `project_type` VALUES ('5', 'วัสดุทางการแพทย์');
INSERT INTO `project_type` VALUES ('6', 'วัสดุสำนักงาน');
INSERT INTO `project_type` VALUES ('7', 'อาคาร สิ่งก่อสร้าง');
INSERT INTO `project_type` VALUES ('1', 'แผนงานโครงการ');
INSERT INTO `project_type` VALUES ('2', 'แผนงานโครงการทีมคร่อม');

-- ----------------------------
-- Table structure for `reservation`
-- ----------------------------
DROP TABLE IF EXISTS `reservation`;
CREATE TABLE `reservation` (
  `reservation_id` int(11) NOT NULL AUTO_INCREMENT,
  `reservation_room_id` int(11) NOT NULL,
  `book_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `detail` text COLLATE utf8_unicode_ci NOT NULL,
  `division_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  `start_date_time` datetime NOT NULL,
  `stop_date_time` datetime DEFAULT NULL,
  `create_date` datetime NOT NULL,
  `active` int(11) DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `ix_reservation_reservation_room_id` (`reservation_room_id`),
  KEY `ix_reservation_division_id` (`division_id`),
  KEY `ix_reservation_section_id` (`section_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of reservation
-- ----------------------------

-- ----------------------------
-- Table structure for `reservation_room`
-- ----------------------------
DROP TABLE IF EXISTS `reservation_room`;
CREATE TABLE `reservation_room` (
  `reservation_room_id` int(11) NOT NULL AUTO_INCREMENT,
  `room_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`reservation_room_id`),
  UNIQUE KEY `room_name` (`room_name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of reservation_room
-- ----------------------------

-- ----------------------------
-- Table structure for `revenue`
-- ----------------------------
DROP TABLE IF EXISTS `revenue`;
CREATE TABLE `revenue` (
  `revenue_id` int(11) NOT NULL AUTO_INCREMENT,
  `revenue_list_id` int(11) NOT NULL,
  `revenue_sub_list_id` int(11) NOT NULL,
  `fiscal_year` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `estimate` int(11) DEFAULT NULL,
  `detail` text COLLATE utf8_unicode_ci,
  `income_other` text COLLATE utf8_unicode_ci,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`revenue_id`),
  KEY `ix_revenue_revenue_list_id` (`revenue_list_id`),
  KEY `ix_revenue_revenue_sub_list_id` (`revenue_sub_list_id`),
  KEY `ix_revenue_fiscal_year` (`fiscal_year`),
  CONSTRAINT `revenue_ibfk_1` FOREIGN KEY (`revenue_list_id`) REFERENCES `revenue_list` (`revenue_list_id`),
  CONSTRAINT `revenue_ibfk_2` FOREIGN KEY (`revenue_sub_list_id`) REFERENCES `revenue_sub_list` (`revenue_sub_list_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of revenue
-- ----------------------------
INSERT INTO `revenue` VALUES ('1', '1', '1', '2555', '7000000', 'ยังขาดตั้งเบิกอีก 1.5 ล้าน', null, '2011-09-01 11:42:14');
INSERT INTO `revenue` VALUES ('2', '1', '2', '2555', '3000000', null, null, '2011-09-01 11:43:17');
INSERT INTO `revenue` VALUES ('3', '1', '3', '2555', '2000000', 'รวม UC แล้ว', null, '2011-09-01 11:44:08');
INSERT INTO `revenue` VALUES ('4', '1', '4', '2555', '1500000', null, null, '2011-09-01 11:44:59');
INSERT INTO `revenue` VALUES ('5', '1', '5', '2555', '1000000', null, null, '2011-09-01 11:45:24');
INSERT INTO `revenue` VALUES ('6', '1', '6', '2555', '1000000', null, null, '2011-09-01 11:45:51');
INSERT INTO `revenue` VALUES ('7', '2', '7', '2555', '300000', null, null, '2011-09-01 11:46:37');
INSERT INTO `revenue` VALUES ('8', '2', '8', '2555', '1200000', null, null, '2011-09-01 11:47:09');
INSERT INTO `revenue` VALUES ('9', '3', '9', '2555', '50000', null, null, '2011-09-01 11:47:41');
INSERT INTO `revenue` VALUES ('10', '6', '12', '2555', '234567', 'wwww', null, '2011-09-01 18:10:10');
INSERT INTO `revenue` VALUES ('11', '13', '28', '2555', '2000000', '', null, '2011-09-02 18:48:28');
INSERT INTO `revenue` VALUES ('12', '8', '14', '2555', '300000', '', null, '2011-09-02 18:49:07');
INSERT INTO `revenue` VALUES ('13', '9', '15', '2555', '10000', '', null, '2011-09-02 18:49:33');
INSERT INTO `revenue` VALUES ('14', '4', '10', '2555', '600000', '', null, '2011-09-02 18:50:28');
INSERT INTO `revenue` VALUES ('15', '7', '13', '2555', '1200000', 'ยังไม่ได้รับเงินปัน 2 ปี', null, '2011-09-02 18:51:05');
INSERT INTO `revenue` VALUES ('16', '10', '16', '2555', '300000', '', null, '2011-09-02 18:51:26');
INSERT INTO `revenue` VALUES ('17', '5', '11', '2555', '150000', '', null, '2011-09-02 18:54:05');

-- ----------------------------
-- Table structure for `revenue_list`
-- ----------------------------
DROP TABLE IF EXISTS `revenue_list`;
CREATE TABLE `revenue_list` (
  `revenue_list_id` int(11) NOT NULL AUTO_INCREMENT,
  `revenue_list_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`revenue_list_id`),
  UNIQUE KEY `revenue_list_name` (`revenue_list_name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of revenue_list
-- ----------------------------
INSERT INTO `revenue_list` VALUES ('8', 'ค่าตรวจสุขภาพประจำปี');
INSERT INTO `revenue_list` VALUES ('1', 'ค่ายาประจำวัน');
INSERT INTO `revenue_list` VALUES ('2', 'ค่ารักษาผู้มีสิทธิเบิกได้(ผู้ป่วยใน)');
INSERT INTO `revenue_list` VALUES ('9', 'ดอกเบี้ยเงินฝาก');
INSERT INTO `revenue_list` VALUES ('12', 'รายรับจาก สป สช.');
INSERT INTO `revenue_list` VALUES ('4', 'รายรับจากค่าใช้จ่ายสูง');
INSERT INTO `revenue_list` VALUES ('3', 'รายรับจากสถานพยาบาลอื่น');
INSERT INTO `revenue_list` VALUES ('13', 'รายรับอื่นๆ');
INSERT INTO `revenue_list` VALUES ('14', 'อื่นๆ');
INSERT INTO `revenue_list` VALUES ('7', 'เงินกองทุนประกันสังคม');
INSERT INTO `revenue_list` VALUES ('10', 'เงินบริจาค');
INSERT INTO `revenue_list` VALUES ('6', 'เงินผู้ประสบภัยจากรถ');
INSERT INTO `revenue_list` VALUES ('11', 'เงินอุดหนุนจากท้องถิ่น');
INSERT INTO `revenue_list` VALUES ('5', 'แรงงานต่างด้าวที่ขึ้นทะเบียน');

-- ----------------------------
-- Table structure for `revenue_sub_list`
-- ----------------------------
DROP TABLE IF EXISTS `revenue_sub_list`;
CREATE TABLE `revenue_sub_list` (
  `revenue_sub_list_id` int(11) NOT NULL AUTO_INCREMENT,
  `revenue_list_id` int(11) NOT NULL,
  `revenue_sub_list_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `revenue_sub_list_other` varchar(2) COLLATE utf8_unicode_ci DEFAULT '0',
  PRIMARY KEY (`revenue_sub_list_id`),
  KEY `ix_revenue_sub_list_revenue_list_id` (`revenue_list_id`),
  CONSTRAINT `revenue_sub_list_ibfk_1` FOREIGN KEY (`revenue_list_id`) REFERENCES `revenue_list` (`revenue_list_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of revenue_sub_list
-- ----------------------------
INSERT INTO `revenue_sub_list` VALUES ('1', '1', 'ผู้ป่วยเบิกได้', '0');
INSERT INTO `revenue_sub_list` VALUES ('2', '1', 'ผู้ป่วยจ่ายเงินเอง/ค่าธรรมเนียม 30 บาท', '0');
INSERT INTO `revenue_sub_list` VALUES ('3', '1', 'การแพทย์แผนไทย', '0');
INSERT INTO `revenue_sub_list` VALUES ('4', '1', 'ขายสมุนไพร', '0');
INSERT INTO `revenue_sub_list` VALUES ('5', '1', 'ทันตกรรมในเวลา', '0');
INSERT INTO `revenue_sub_list` VALUES ('6', '1', 'ทันตกรรมนอกเวลา', '0');
INSERT INTO `revenue_sub_list` VALUES ('7', '2', 'ผู้ป่วยในรัฐวิสาหกิจ/หน่วยงาน', '0');
INSERT INTO `revenue_sub_list` VALUES ('8', '2', 'ผู้ป่วยในเบิกคลัง', '0');
INSERT INTO `revenue_sub_list` VALUES ('9', '3', 'รายรับจากสถานพยาบาลอื่น', '0');
INSERT INTO `revenue_sub_list` VALUES ('10', '4', 'UC AE(อุบัติเหตุฉุกเฉิน)', '0');
INSERT INTO `revenue_sub_list` VALUES ('11', '5', 'แรงงานต่างด้าวที่ขึ้นทะเบียน', '0');
INSERT INTO `revenue_sub_list` VALUES ('12', '6', 'เงินผู้ประสบภัยจากรถ', '0');
INSERT INTO `revenue_sub_list` VALUES ('13', '7', 'เงินกองทุนประกันสังคม', '0');
INSERT INTO `revenue_sub_list` VALUES ('14', '8', 'ค่าตรวจสุขภาพประจำปี', '0');
INSERT INTO `revenue_sub_list` VALUES ('15', '9', 'ดอกเบี้ยเงินฝาก', '0');
INSERT INTO `revenue_sub_list` VALUES ('16', '10', 'เงินบริจาค', '0');
INSERT INTO `revenue_sub_list` VALUES ('17', '11', 'เงินอุดหนุนจากท้องถิ่น', '0');
INSERT INTO `revenue_sub_list` VALUES ('18', '12', 'เหมาจ่ายรายหัวผู้ป่วยนอก', '0');
INSERT INTO `revenue_sub_list` VALUES ('19', '12', 'IP', '0');
INSERT INTO `revenue_sub_list` VALUES ('20', '12', 'PP+วัคซีนตามฤดูกาล+ชดเชยเบาหวาน', '0');
INSERT INTO `revenue_sub_list` VALUES ('21', '12', 'งบคุณภาพผลงานบริการ', '0');
INSERT INTO `revenue_sub_list` VALUES ('22', '12', 'งบพื้นที่เฉพาะ', '0');
INSERT INTO `revenue_sub_list` VALUES ('23', '12', 'สนับสนุนงบพัฒนาข้อมูล', '0');
INSERT INTO `revenue_sub_list` VALUES ('24', '12', 'ค่าเสื่อม 40%', '0');
INSERT INTO `revenue_sub_list` VALUES ('25', '12', ' ฟื้นฟูผู้พิการ', '0');
INSERT INTO `revenue_sub_list` VALUES ('26', '12', 'CF', '0');
INSERT INTO `revenue_sub_list` VALUES ('27', '12', 'ON  TOP PAYMENT', '0');
INSERT INTO `revenue_sub_list` VALUES ('28', '13', 'รายรับอื่นๆ', '0');
INSERT INTO `revenue_sub_list` VALUES ('29', '1', 'อื่นๆ', '1');
INSERT INTO `revenue_sub_list` VALUES ('31', '2', 'อื่นๆ', '1');
INSERT INTO `revenue_sub_list` VALUES ('32', '3', 'อื่นๆ', '1');
INSERT INTO `revenue_sub_list` VALUES ('33', '4', 'อื่นๆ', '1');
INSERT INTO `revenue_sub_list` VALUES ('34', '5', 'อื่นๆ', '1');
INSERT INTO `revenue_sub_list` VALUES ('35', '6', 'อื่นๆ', '1');
INSERT INTO `revenue_sub_list` VALUES ('36', '7', 'อื่นๆ', '1');
INSERT INTO `revenue_sub_list` VALUES ('37', '8', 'อื่นๆ', '1');
INSERT INTO `revenue_sub_list` VALUES ('38', '9', 'อื่นๆ', '1');
INSERT INTO `revenue_sub_list` VALUES ('39', '10', 'อื่นๆ', '1');
INSERT INTO `revenue_sub_list` VALUES ('40', '11', 'อื่นๆ', '1');
INSERT INTO `revenue_sub_list` VALUES ('41', '12', 'อื่นๆ', '1');
INSERT INTO `revenue_sub_list` VALUES ('42', '13', 'อื่นๆ', '1');

-- ----------------------------
-- Table structure for `school`
-- ----------------------------
DROP TABLE IF EXISTS `school`;
CREATE TABLE `school` (
  `school_id` int(11) NOT NULL AUTO_INCREMENT,
  `school_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `school_address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `high_school` varchar(1) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`school_id`),
  UNIQUE KEY `school_name` (`school_name`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of school
-- ----------------------------
INSERT INTO `school` VALUES ('1', 'โรงเรียน ขุนห้วยตากพัฒนาศึกษา', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('2', 'โรงเรียน ชุมชนบ้านแม่ยะ', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('3', 'โรงเรียน ชุมชนวัดสันป่าลาน', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('4', 'โรงเรียน ชูวิชาราษฎร์', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('5', 'โรงเรียน เด่นไม้ซุงวิทยาคม', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('6', 'โรงเรียน ทุ่งฟ้าวิทยาคม', '0', '0', '0', '1');
INSERT INTO `school` VALUES ('7', 'โรงเรียน บ้านเกาะลาน', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('8', 'โรงเรียน บ้านฉลอม', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('9', 'โรงเรียน บ้านดงยาง', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('10', 'โรงเรียน บ้านตาก(ประชาวิทยาคาร) ', '0', '0', '0', '1');
INSERT INTO `school` VALUES ('11', 'โรงเรียน บ้านตากประถมวิทยา', '0', '0', '0', '1');
INSERT INTO `school` VALUES ('12', 'โรงเรียน บ้านท้องฟ้า ', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('13', 'โรงเรียน บ้านทุ่งกระเชาะ ', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('14', 'โรงเรียน บ้านน้ำดิบ', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('15', 'โรงเรียน บ้านปากวัง', '0', '0', '0', '1');
INSERT INTO `school` VALUES ('16', 'โรงเรียน บ้านแม่พะยวบ', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('17', 'โรงเรียน บ้านแม่สลิด', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('18', 'โรงเรียน บ้านยางโองนอก', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('19', 'โรงเรียน บ้านวังไม้ส้าน', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('20', 'โรงเรียน บ้านสันกลาง', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('21', 'โรงเรียน บ้านหนองชะลาบ', '0', '0', '0', '1');
INSERT INTO `school` VALUES ('22', 'โรงเรียน บ้านห้วยพลู', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('23', 'โรงเรียน บ้านห้วยแม่บอน', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('24', 'โรงเรียน บ้านใหม่ ', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('25', 'โรงเรียน ประชาพัฒนา', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('26', 'โรงเรียน ยางโองน้ำวิทยาคม', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('27', 'โรงเรียน วัดพระธาตุน้อย', '0', '0', '0', '1');
INSERT INTO `school` VALUES ('28', 'โรงเรียน ศรีวิทยา', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('29', 'โรงเรียน สว่างวิทยา', '0', '0', '0', '1');
INSERT INTO `school` VALUES ('30', 'โรงเรียน เสริมปัญญา', '0', '0', '0', '0');
INSERT INTO `school` VALUES ('31', 'โรงเรียน อนุบาลรอดบำรุง', '0', '0', '0', '0');

-- ----------------------------
-- Table structure for `school_class`
-- ----------------------------
DROP TABLE IF EXISTS `school_class`;
CREATE TABLE `school_class` (
  `school_class_id` int(11) NOT NULL AUTO_INCREMENT,
  `school_class_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`school_class_id`),
  UNIQUE KEY `school_class_name` (`school_class_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of school_class
-- ----------------------------
INSERT INTO `school_class` VALUES ('1', 'ประถมศึกษาปีที่ 1');
INSERT INTO `school_class` VALUES ('2', 'ประถมศึกษาปีที่ 2');
INSERT INTO `school_class` VALUES ('3', 'ประถมศึกษาปีที่ 3');
INSERT INTO `school_class` VALUES ('4', 'ประถมศึกษาปีที่ 4');
INSERT INTO `school_class` VALUES ('5', 'ประถมศึกษาปีที่ 5');
INSERT INTO `school_class` VALUES ('6', 'ประถมศึกษาปีที่ 6');

-- ----------------------------
-- Table structure for `section`
-- ----------------------------
DROP TABLE IF EXISTS `section`;
CREATE TABLE `section` (
  `section_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `division_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`section_id`),
  UNIQUE KEY `description` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of section
-- ----------------------------
INSERT INTO `section` VALUES ('1', 'งานอุบัติเหตุฉุกเฉิน', '1');
INSERT INTO `section` VALUES ('2', 'งานผู้ป่วยนอก', '1');
INSERT INTO `section` VALUES ('3', 'งานผู้ป่วยใน(ชาย)', '1');
INSERT INTO `section` VALUES ('4', 'งานผู้ป่วยใน(หญิง)', '1');
INSERT INTO `section` VALUES ('5', 'งานห้องคลอด', '1');
INSERT INTO `section` VALUES ('6', 'งานหน่วยจ่ายกลางและซักฟอก', '1');
INSERT INTO `section` VALUES ('7', 'งานตรวจสุขภาพ', '1');
INSERT INTO `section` VALUES ('8', 'งานการพยาบาลเด็ก', '1');
INSERT INTO `section` VALUES ('9', 'งานธุรการ', '2');
INSERT INTO `section` VALUES ('10', 'งานการเจ้าหน้าที่', '2');
INSERT INTO `section` VALUES ('11', 'งานการเงินและบัญชี', '2');
INSERT INTO `section` VALUES ('12', 'งานพัสดุ', '2');
INSERT INTO `section` VALUES ('13', 'งานยานพาหนะ', '2');
INSERT INTO `section` VALUES ('14', 'งานรักษาความปลอดภัย', '2');
INSERT INTO `section` VALUES ('15', 'งานเภสัชกรรม', '3');
INSERT INTO `section` VALUES ('16', 'งานชันสูตร', '3');
INSERT INTO `section` VALUES ('17', 'งานโรงผลิต', '3');
INSERT INTO `section` VALUES ('18', 'งานรังสีวิทยา', '3');
INSERT INTO `section` VALUES ('20', 'งานเวชกรรมฟื้นฟู', '3');
INSERT INTO `section` VALUES ('21', 'งานทันตกรรม', '4');
INSERT INTO `section` VALUES ('22', 'งานควบคุมป้องกันโรค', '6');
INSERT INTO `section` VALUES ('23', 'งานเวชระเบียนและสถิติ', '5');
INSERT INTO `section` VALUES ('24', 'งานประกันสุขภาพ', '5');
INSERT INTO `section` VALUES ('25', 'งานสุขศึกษาและประชาสัมพันธ์', '5');
INSERT INTO `section` VALUES ('26', 'ส่งเสริมการเรียนรู้', '5');
INSERT INTO `section` VALUES ('27', 'งานเวชปฏิบัติครอบครัว', '6');
INSERT INTO `section` VALUES ('28', 'งานบริหารทั่วไป', '2');
INSERT INTO `section` VALUES ('29', 'งานบริการสุขภาพชุมชน', '6');
INSERT INTO `section` VALUES ('30', 'งานสุขาภิบาลและสิ่งแวดล้อม', '6');
INSERT INTO `section` VALUES ('31', 'งานระบบบำบัดน้ำเสีย', '6');
INSERT INTO `section` VALUES ('32', 'งานประปาและขยะ', '6');
INSERT INTO `section` VALUES ('33', 'ศูนย์ซ่อมบำรุง', '6');
INSERT INTO `section` VALUES ('34', 'งานเวชกรรมทั่วไป', '4');
INSERT INTO `section` VALUES ('35', 'งานการแพทย์แผนไทย', '4');
INSERT INTO `section` VALUES ('36', 'งานบริการสุขภาพจิต', '4');
INSERT INTO `section` VALUES ('37', 'งานห้องผ่าตัด', '1');
INSERT INTO `section` VALUES ('38', 'งานวิสัญญี', '1');
INSERT INTO `section` VALUES ('39', 'งานบริการอาหาร', '1');
INSERT INTO `section` VALUES ('40', 'งานการพยาบาลพิเศษ', '1');
INSERT INTO `section` VALUES ('41', 'งานการพยาบาลผู้สูงอายุ', '1');
INSERT INTO `section` VALUES ('42', 'งานเทคโนโลยีสารสนเทศ', '5');
INSERT INTO `section` VALUES ('43', 'ENV', '7');
INSERT INTO `section` VALUES ('44', 'HRM', '7');
INSERT INTO `section` VALUES ('45', 'IC', '7');
INSERT INTO `section` VALUES ('46', 'IM', '7');
INSERT INTO `section` VALUES ('47', 'MED', '7');
INSERT INTO `section` VALUES ('48', 'NUR', '7');
INSERT INTO `section` VALUES ('49', 'RM', '7');
INSERT INTO `section` VALUES ('50', 'PCT', '7');
INSERT INTO `section` VALUES ('51', 'PTC ยา', '7');
INSERT INTO `section` VALUES ('52', '5 ส', '7');
INSERT INTO `section` VALUES ('53', 'ชมรมจริยธรรม', '7');
INSERT INTO `section` VALUES ('54', 'ชมรมสร้างสุขภาพ', '7');
INSERT INTO `section` VALUES ('55', 'Home Health Care', '7');

-- ----------------------------
-- Table structure for `senior_club`
-- ----------------------------
DROP TABLE IF EXISTS `senior_club`;
CREATE TABLE `senior_club` (
  `senior_club_id` int(11) NOT NULL AUTO_INCREMENT,
  `senior_club_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`senior_club_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of senior_club
-- ----------------------------
INSERT INTO `senior_club` VALUES ('1', 'ชมรมผู้สูงอายุ ม.1');
INSERT INTO `senior_club` VALUES ('2', 'ชมรมผู้สูงอายุ ม.2');
INSERT INTO `senior_club` VALUES ('3', 'ชมรมผู้สูงอายุ ม.3');
INSERT INTO `senior_club` VALUES ('4', 'ชมรมผู้สูงอายุ ม.4');
INSERT INTO `senior_club` VALUES ('5', 'ชมรมผู้สูงอายุ ม.5');
INSERT INTO `senior_club` VALUES ('6', 'ชมรมผู้สูงอายุ ม.6');
INSERT INTO `senior_club` VALUES ('7', 'ชมรมผู้สูงอายุ ม.7');
INSERT INTO `senior_club` VALUES ('8', 'ชมรมผู้สูงอายุ ม.8');
INSERT INTO `senior_club` VALUES ('9', 'ชมรมผู้สูงอายุ ม.9');
INSERT INTO `senior_club` VALUES ('10', 'ชมรมผู้สูงอายุ ม.11');
INSERT INTO `senior_club` VALUES ('11', 'ชมรมผู้สูงอายุ ม.13');
INSERT INTO `senior_club` VALUES ('12', 'ชมรมผู้สูงอายุ ม.14');
INSERT INTO `senior_club` VALUES ('13', 'ชมรมผู้สูงอายุ ม.15');
INSERT INTO `senior_club` VALUES ('14', 'ชมรมผู้สูงอายุ บ้านแม่สลิด1');
INSERT INTO `senior_club` VALUES ('15', 'ชมรมผู้สูงอายุ บ้านแม่สลิด2');
INSERT INTO `senior_club` VALUES ('16', 'ชมรมผู้สูงอายุ บ้านแม่สลิด3');
INSERT INTO `senior_club` VALUES ('17', 'ชมรมผู้สูงอายุ บ้านยางโองน้ำ');
INSERT INTO `senior_club` VALUES ('18', 'ชมรมผู้สูงอายุ บ้านยางโองนอก');
INSERT INTO `senior_club` VALUES ('19', 'ชมรมผู้สูงอายุ บ้านเกาะลาน');
INSERT INTO `senior_club` VALUES ('20', 'ชมรมผู้สูงอายุ สมอโคน');
INSERT INTO `senior_club` VALUES ('21', 'ชมรมผู้สูงอายุ ทุ่งกระเชาะ1');
INSERT INTO `senior_club` VALUES ('22', 'ชมรมผู้สูงอายุ ทุ่งกระเชาะ2');
INSERT INTO `senior_club` VALUES ('23', 'ชมรมผู้สูงอายุ ทุ่งกระเชาะ3');
INSERT INTO `senior_club` VALUES ('24', 'ชมรมผู้สูงอายุ ท้องฟ้า1');
INSERT INTO `senior_club` VALUES ('25', 'ชมรมผู้สูงอายุ ท้องฟ้า2');
INSERT INTO `senior_club` VALUES ('26', 'ชมรมผู้สูงอายุ ท้องฟ้า3');
INSERT INTO `senior_club` VALUES ('27', 'ชมรมผู้สูงอายุ เกาะตะเภา1');
INSERT INTO `senior_club` VALUES ('28', 'ชมรมผู้สูงอายุ เกาะตะเภา2');
INSERT INTO `senior_club` VALUES ('29', 'ชมรมผู้สูงอายุ เกาะตะเภา3');
INSERT INTO `senior_club` VALUES ('30', 'ชมรมผู้สูงอายุ เกาะตะเภา4');
INSERT INTO `senior_club` VALUES ('31', 'ชมรมผู้สูงอายุ เกาะตะเภา5');
INSERT INTO `senior_club` VALUES ('32', 'ชมรมผู้สูงอายุ เกาะตะเภา6');
INSERT INTO `senior_club` VALUES ('33', 'ชมรมผู้สูงอายุ เกาะตะเภา7');
INSERT INTO `senior_club` VALUES ('34', 'ชมรมผู้สูงอายุ เกาะตะเภา8');
INSERT INTO `senior_club` VALUES ('35', 'ชมรมผู้สูงอายุ เกาะตะเภา9');
INSERT INTO `senior_club` VALUES ('36', 'ชมรมผู้สูงอายุ เกาะตะเภา10');

-- ----------------------------
-- Table structure for `tg_group`
-- ----------------------------
DROP TABLE IF EXISTS `tg_group`;
CREATE TABLE `tg_group` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`group_id`),
  UNIQUE KEY `group_name` (`group_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tg_group
-- ----------------------------
INSERT INTO `tg_group` VALUES ('1', 'managers', 'Managers Group', '2011-08-30 13:18:59');

-- ----------------------------
-- Table structure for `tg_group_permission`
-- ----------------------------
DROP TABLE IF EXISTS `tg_group_permission`;
CREATE TABLE `tg_group_permission` (
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`group_id`,`permission_id`),
  KEY `permission_id` (`permission_id`),
  CONSTRAINT `tg_group_permission_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `tg_group` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tg_group_permission_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `tg_permission` (`permission_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tg_group_permission
-- ----------------------------
INSERT INTO `tg_group_permission` VALUES ('1', '1');

-- ----------------------------
-- Table structure for `tg_permission`
-- ----------------------------
DROP TABLE IF EXISTS `tg_permission`;
CREATE TABLE `tg_permission` (
  `permission_id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(63) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`permission_id`),
  UNIQUE KEY `permission_name` (`permission_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tg_permission
-- ----------------------------
INSERT INTO `tg_permission` VALUES ('1', 'manage', 'This permission give an administrative right to the bearer');

-- ----------------------------
-- Table structure for `tg_user`
-- ----------------------------
DROP TABLE IF EXISTS `tg_user`;
CREATE TABLE `tg_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `email_address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(80) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `email_address` (`email_address`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tg_user
-- ----------------------------
INSERT INTO `tg_user` VALUES ('2', 'manager', 'manager@somedomain.com', 'Example manager', '78fa1fa47ea6ead50c52b3e6d32495a73dac068c40ba112aa14d25ad0ec528a0d6579c618960290f', '2011-08-30 13:18:59');
INSERT INTO `tg_user` VALUES ('3', 'editor', 'editor@somedomain.com', 'Example editor', '0825a6cc5a3043a4843cf86efd161295b13022f9cb0c996de47419f13b70edb814e14fe08ddc4c03', '2011-08-30 13:18:59');
INSERT INTO `tg_user` VALUES ('4', 'apicharti', 'apicharti@somedomain.com', 'Example manager', '331e332f579ae0d90b8d1112297e85d22d9981616ddc60ca3d86f481e299ac57d194ca04ae015197', '2011-08-30 13:26:05');

-- ----------------------------
-- Table structure for `tg_user_group`
-- ----------------------------
DROP TABLE IF EXISTS `tg_user_group`;
CREATE TABLE `tg_user_group` (
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`group_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `tg_user_group_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tg_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tg_user_group_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `tg_group` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of tg_user_group
-- ----------------------------
INSERT INTO `tg_user_group` VALUES ('2', '1');
