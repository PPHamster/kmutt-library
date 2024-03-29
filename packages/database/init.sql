-- Clear Table
DROP TABLE IF EXISTS `BlogTag`;
DROP TABLE IF EXISTS `EventEventCategory`;
DROP TABLE IF EXISTS `OrderItem`;
DROP TABLE IF EXISTS `BookingMember`;
DROP TABLE IF EXISTS `EventMember`;
DROP TABLE IF EXISTS `CartItem`;
DROP TABLE IF EXISTS `BookCategory`;
DROP TABLE IF EXISTS `Tag`;
DROP TABLE IF EXISTS `Blog`;
DROP TABLE IF EXISTS `EventCategory`;
DROP TABLE IF EXISTS `Event`;
DROP TABLE IF EXISTS `BookingRoom`;
DROP TABLE IF EXISTS `RoomTimePeriod`;
DROP TABLE IF EXISTS `TimePeriod`;
DROP TABLE IF EXISTS `Room`;
DROP TABLE IF EXISTS `Order`;
DROP TABLE IF EXISTS `Category`;
DROP TABLE IF EXISTS `Book`;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `Branch`;
DROP TABLE IF EXISTS `Role`;

-- Create Table User
CREATE TABLE `User` (
  `id` VARCHAR(20) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `tel` VARCHAR(10) NOT NULL,
  `firstname` VARCHAR(150) NOT NULL,
  `lastname` VARCHAR(150) NOT NULL,
  `image` VARCHAR(150),
  `isBlacklist` TINYINT DEFAULT 0 NOT NULL,
  `registYear` YEAR NOT NULL,
  `roleId` INT NOT NULL,
  `branchId` INT NOT NULL,

  UNIQUE INDEX `UserIdUnique`(`id`),
  UNIQUE INDEX `UserEmailUnique`(`email`),
  PRIMARY KEY (`id`)
);

-- Create Table Branch
CREATE TABLE `Branch` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,

  UNIQUE INDEX `BranchIdUnique`(`id`),
  UNIQUE INDEX `BranchNameUnique`(`name`),
  PRIMARY KEY (`id`)
);

-- Create Table Role
CREATE TABLE `Role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,

  UNIQUE INDEX `RoleIdUnique`(`id`),
  UNIQUE INDEX `RoleNameUnique`(`name`),
  PRIMARY KEY(`id`)
);

-- Create Table Book
CREATE TABLE `Book` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(150) NOT NULL,
  `author` VARCHAR(150) NOT NULL,
  `description` TEXT NOT NULL,
  `isbn` VARCHAR(13) NOT NULL,
  `publisher` VARCHAR(150) NOT NULL,
  `publishDate` DATE NOT NULL,
  `language` VARCHAR(20) NOT NULL,
  `image` VARCHAR(150) NOT NULL,
  `location` VARCHAR(10) NOT NULL,

  UNIQUE INDEX `BookIdUnique`(`id`),
  PRIMARY KEY(`id`)
);

-- Create Table Category
CREATE TABLE `Category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,

  UNIQUE INDEX `CategoryIdUnique`(`id`),
  UNIQUE INDEX `CategoryNameUnique`(`name`),
  PRIMARY KEY (`id`)
);

-- Create Table Order
CREATE TABLE `Order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `userId` VARCHAR(20) NOT NULL,

  UNIQUE INDEX `OrderIdUnique`(`id`),
  PRIMARY KEY (`id`)
);

-- Create Table Room
CREATE TABLE `Room` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `location` TEXT NOT NULL,
  `status` VARCHAR(150) DEFAULT 'Open' NOT NULL,
  `image` VARCHAR(150) NOT NULL,

  UNIQUE INDEX `RoomIdUnique`(`id`),
  UNIQUE INDEX `RoomNameUnique`(`name`),
  PRIMARY KEY(`id`)
);

-- Create Table TimePeriod
CREATE TABLE `TimePeriod` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `beginTime` TIME NOT NULL,
  `endTime` TIME NOT NULL,

  UNIQUE INDEX `TimePeriodIdUnique`(`id`),
  UNIQUE INDEX `TimePeriodValueUnique`(`beginTime`, `endTime`),
  PRIMARY KEY (`id`)
);

-- Create Table Link Room and TimePeriod
CREATE TABLE `RoomTimePeriod` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `roomId` INT NOT NULL,
  `timePeriodId` INT NOT NULL,

  UNIQUE INDEX `RoomTimePeriodIdUnique`(`id`),
  UNIQUE INDEX `RoomTimePeriodValueUnique`(`roomId`, `timePeriodId`),
  PRIMARY KEY (`id`)
);

-- Create Table BookingRoom
CREATE TABLE `BookingRoom` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `roomTimePeriodId` INT NOT NULL,

  UNIQUE INDEX `BookingRoomIdUnique`(`id`),
  UNIQUE INDEX `BookingRoomValueUnique`(`date`, `roomTimePeriodId`),
  PRIMARY KEY (`id`)
);

-- Create Table Event
CREATE TABLE `Event` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `location` TEXT NOT NULL,
  `meetingTime` DATETIME NOT NULL,
  `endTime` DATETIME NOT NULL,
  `image` VARCHAR(150) NOT NULL,
  `description` TEXT NOT NULL,

  UNIQUE INDEX `EventIdUnique`(`id`),
  PRIMARY KEY(`id`)
);

-- Create Table EventCategory
CREATE TABLE `EventCategory` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,

  UNIQUE INDEX `EventCategoryIdUnique`(`id`),
  UNIQUE INDEX `EventCategoryNameUnique`(`name`),
  PRIMARY KEY(`id`)
);

-- Create Table Blog
CREATE TABLE `Blog` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `topic` VARCHAR(150) NOT NULL,
  `article` TEXT NOT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  `userId` VARCHAR(20) NOT NULL,
  `bookId` INT NOT NULL,

  UNIQUE INDEX `BlogIdUnique`(`id`),
  PRIMARY KEY (`id`)
);

-- Create Table Tag
CREATE TABLE `Tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,

  UNIQUE INDEX `TagIdUnique`(`id`),
  UNIQUE INDEX `TagNameUnique`(`name`),
  PRIMARY KEY (`id`)
);

-- Create Table Link Book and Category
CREATE TABLE `BookCategory` (
  `bookId` INT NOT NULL,
  `categoryId` INT NOT NULL,

  PRIMARY KEY (`bookId`, `categoryId`)
);

-- Create Table Link User and Book
CREATE TABLE `CartItem` (
  `userId` VARCHAR(20) NOT NULL,
  `bookId` INT NOT NULL,

  PRIMARY KEY (`userId`, `bookId`)
);

-- Create Table Link Event and User
CREATE TABLE `EventMember` (
  `eventId` INT NOT NULL,
  `userId` VARCHAR(20) NOT NULL,

  PRIMARY KEY (`eventId`, `userId`)
);

-- Create Table Link BookingRoom and User
CREATE TABLE `BookingMember` (
  `bookingRoomId` INT NOT NULL,
  `userId` VARCHAR(20) NOT NULL,

  PRIMARY KEY (`bookingRoomId`, `userId`)
);

-- Create Table link Order and Book
CREATE TABLE `OrderItem` (
  `orderId` INT NOT NULL,
  `bookId` INT NOT NULL,
  `latestNotify` DATETIME,
  `receivedDate` DATETIME,
  `returnedDate` DATETIME,

  PRIMARY KEY (`orderId`,`bookId`)
);

-- Create Table Link Event and EventCategory
CREATE TABLE `EventEventCategory` (
  `eventId` INT NOT NULL,
  `eventCategoryId` INT NOT NULL,

  PRIMARY KEY (`eventId`, `eventCategoryId`)
);

-- Create Table Link Blog and Tag
CREATE TABLE `BlogTag` (
  `blogId` INT NOT NULL,
  `tagId` INT NOT NULL,

  PRIMARY KEY (`blogId`, `tagId`)
);

-- Add Foreign Key User - Role
ALTER TABLE `User` ADD CONSTRAINT `UserLinkRoleId` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- Add Foreign Key User - Branch
ALTER TABLE `User` ADD CONSTRAINT `UserLinkBranchId` FOREIGN KEY (`branchId`) REFERENCES `Branch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- Add Foreign Key Order - User
ALTER TABLE `Order` ADD CONSTRAINT `OrderLinkUserId` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key RoomTimePeriod - TimePeriod
ALTER TABLE `RoomTimePeriod` ADD CONSTRAINT `RoomTimePeriodLinkTimePeriodId` FOREIGN KEY (`timePeriodId`) REFERENCES `TimePeriod`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key RoomTimePeriod - Room
ALTER TABLE `RoomTimePeriod` ADD CONSTRAINT `RoomTimePeriodLinkRoomId` FOREIGN KEY (`roomId`) REFERENCES `Room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key BookingRoom - RoomTimePeriod
ALTER TABLE `BookingRoom` ADD CONSTRAINT `BookingRoomLinkRoomTimePeriodId` FOREIGN KEY (`roomTimePeriodId`) REFERENCES `RoomTimePeriod`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key Blog - User
ALTER TABLE `Blog` ADD CONSTRAINT `BlogLinkUserId` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key Blog - Book
ALTER TABLE `Blog` ADD CONSTRAINT `BlogLinkBookId` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key BookCategory - Book
ALTER TABLE `BookCategory` ADD CONSTRAINT `BookCategoryLinkBookId` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key BookCategory - Catagory
ALTER TABLE `BookCategory` ADD CONSTRAINT `BookCategoryLinkCategoryId` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key CartItem - User
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItemLinkUserId` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key CartItem - Book
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItemLinkBookId` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key EventMember - Event
ALTER TABLE `EventMember` ADD CONSTRAINT `EventMemberLinkEventId` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key EventMember - User
ALTER TABLE `EventMember` ADD CONSTRAINT `EventMemberLinkUserId` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key BookingMember - BookingRoom
ALTER TABLE `BookingMember` ADD CONSTRAINT `BookingMemberLinkBookingRoomId` FOREIGN KEY (`bookingRoomId`) REFERENCES `BookingRoom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key BookingMember - User
ALTER TABLE `BookingMember` ADD CONSTRAINT `BookingMemberLinkUserId` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key OrderItem - Order
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItemLinkOrderId` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key OrderItem - Book
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItemLinkBookId` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key EventEventCategory - Event
ALTER TABLE `EventEventCategory` ADD CONSTRAINT `EventEventCategoryLinkEventId` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key EventEventCategory - EventCategory
ALTER TABLE `EventEventCategory` ADD CONSTRAINT `EventEventCategoryLinkEventCategoryId` FOREIGN KEY (`eventCategoryId`) REFERENCES `EventCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key BlogTag - Blog
ALTER TABLE `BlogTag` ADD CONSTRAINT `BlogTagLinkBlogId` FOREIGN KEY (`blogId`) REFERENCES `Blog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Foreign Key BlogTag - Tag
ALTER TABLE `BlogTag` ADD CONSTRAINT `BlogTagLinkTagId` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Insert Admin
INSERT INTO `Role` (name) VALUES ('Admin');

INSERT INTO `Branch` (name) VALUES ('Admin');

INSERT INTO `User` VALUES (
  '00000000000',
  'admin.lib@kmutt.ac.th',
  '$2b$12$c7WoVTj4DdxXPAdlj2dVUuEgV3gIeImOqPlS/s2iIfoE3kE/hO8N6',
  '0812345678',
  'Admin',
  'Library',
  'https://www.kmutt.ac.th/wp-content/uploads/2020/09/KMUTT_CI_Semi_Logo-normal-full-1061x1200.png',
  0,
  2021,
  1,
  1
);
