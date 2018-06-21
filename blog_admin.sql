/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2017-10-18 12:24:22
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for blog_admin
-- ----------------------------
DROP TABLE IF EXISTS `blog_admin`;
CREATE TABLE `blog_admin` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog_admin
-- ----------------------------
INSERT INTO `blog_admin` VALUES ('1', 'admin', 'c86d56af89306e31a41e9ddd57d044f3');

-- ----------------------------
-- Table structure for blog_article
-- ----------------------------
DROP TABLE IF EXISTS `blog_article`;
CREATE TABLE `blog_article` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `pic_src` varchar(300) NOT NULL,
  `pic_path` varchar(300) NOT NULL,
  `description` varchar(500) NOT NULL,
  `content` text NOT NULL,
  `post_time` int(11) NOT NULL,
  `author` varchar(32) NOT NULL,
  `n_view` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog_article
-- ----------------------------
INSERT INTO `blog_article` VALUES ('4', 'node.js 初体验', '2dd65b34a089641a56318e692e9a3bc4.jpg', '', 'node.js 初体验', 'Node是个啥？\r\n\r\n　　写个东西还是尽量面面俱到吧，所以有关基本概念的东西我也从网上选择性的拿了些下来，有些地方针对自己的理解有所改动，对这些概念性的东西有过了解的可选择跳过这段。\r\n\r\n　　1.Node 是一个服务器端 JavaScript 解释器，可是真的以为JavaScript不错的同学学习Node就能轻松拿下，那么你就错了，总结：水深不深我还不知道，不过确实不浅。\r\n\r\n　　2.Node 的目标是帮助程序员构建高度可伸缩的应用程序，编写能够处理数万条同时连接到一个物理机的连接代码。处理高并发和异步I/O是Node受到开发人员的关注的原因之一。\r\n\r\n　　3.Node 本身运行Google V8 JavaScript引擎，所以速度和性能非常好，看chrome就知道，而且Node对其封装的同时还改进了其处理二进制数据的能力。因此，Node不仅仅简单的使用了V8，还对其进行了优化，使其在各种环境下更加给力。（什么是V8 JavaScript 引擎？请“百度知道”）\r\n\r\n　　4.第三方的扩展和模块在Node的使用中起到重要的作用。下面也会介绍下载npm，npm就是模块的管理工具，用它安装各种 Node 的软件包(如express，redis等)并发布自己为Node写的软件包 。', '1508156416', 'admin', '0');
INSERT INTO `blog_article` VALUES ('5', '使用下一代web开发框架koa2搭建自己的轻服务器', '1b4977ee4ae309804093b2e4a547c359.jpg', '', '使用下一代web开发框架koa2搭建自己的轻服务器', 'Koa 是由 Express 原班人马亲情打造的新一代web框架。既然已经有 Express 了，为什么又要搞一个Koa出来呢？因为 Koa 相比 Express 体积更小，代码更健壮，作用更纯粹。\r\n\r\nKoa2 使用最新的 ES6 语法和 aync 函数进行开发，因此 Koa2 要求 nodejs 的版本不低于 7.6.0。\r\n\r\n使用 Koa 创建一个服务器非常简单，新建文件 app.js，放置以下代码：', '1508241251', 'admin', '0');
