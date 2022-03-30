-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 30, 2022 at 08:56 AM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `LoungeMate`
--

-- --------------------------------------------------------

--
-- Table structure for table `blocks`
--

CREATE TABLE `blocks` (
  `id` bigint(4) NOT NULL,
  `user_id` bigint(4) NOT NULL,
  `block_type` varchar(6) NOT NULL,
  `block_value` varchar(6) NOT NULL,
  `block_value_type` varchar(6) NOT NULL,
  `block_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `unblock` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp(4) NOT NULL DEFAULT CURRENT_TIMESTAMP(4),
  `updated_at` timestamp(4) NOT NULL DEFAULT CURRENT_TIMESTAMP(4)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Chat`
--

CREATE TABLE `Chat` (
  `Id` bigint(4) NOT NULL,
  `sendUserId` bigint(4) NOT NULL,
  `receiveUserId` bigint(4) NOT NULL,
  `message` varchar(25) NOT NULL,
  `isReaded` int(1) NOT NULL DEFAULT '0',
  `created_at` timestamp(4) NOT NULL DEFAULT CURRENT_TIMESTAMP(4)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Chat`
--

INSERT INTO `Chat` (`Id`, `sendUserId`, `receiveUserId`, `message`, `isReaded`, `created_at`) VALUES
(1, 1, 2, 'hi', 0, '2022-03-30 07:56:38.0000'),
(2, 1, 2, 'hello', 0, '2022-03-30 08:36:51.5181'),
(3, 1, 2, 'hi', 0, '2022-03-30 08:38:28.8694');

-- --------------------------------------------------------

--
-- Table structure for table `devices`
--

CREATE TABLE `devices` (
  `id` bigint(4) NOT NULL,
  `users` varchar(15) NOT NULL,
  `device_id` varchar(15) NOT NULL,
  `push_token` text NOT NULL,
  `created_at` timestamp(4) NOT NULL DEFAULT CURRENT_TIMESTAMP(4),
  `updated_at` timestamp(4) NOT NULL DEFAULT CURRENT_TIMESTAMP(4)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(3) NOT NULL,
  `role` enum('host','guest','both') NOT NULL,
  `name` varchar(25) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `email_verified_at` timestamp(4) NOT NULL DEFAULT CURRENT_TIMESTAMP(4),
  `password` varchar(25) DEFAULT NULL,
  `thirdparty_name` enum('facebook','google') DEFAULT NULL,
  `thirdparty_token` text,
  `profile` varchar(15) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `remember_token` varchar(30) DEFAULT NULL,
  `created_at` timestamp(4) NOT NULL DEFAULT CURRENT_TIMESTAMP(4),
  `updated_at` timestamp(4) NOT NULL DEFAULT CURRENT_TIMESTAMP(4),
  `paid` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role`, `name`, `email`, `phone`, `email_verified_at`, `password`, `thirdparty_name`, `thirdparty_token`, `profile`, `active`, `remember_token`, `created_at`, `updated_at`, `paid`) VALUES
(1, 'host', 'jkk', 'jkjj', 'jk', '2022-03-30 07:38:31.0000', 'jkjkj', NULL, NULL, NULL, 1, NULL, '2022-03-30 07:38:31.0000', '2022-03-30 07:38:31.0000', 0),
(2, 'guest', 'ui', 'ui@gmail.com', '9876543210', '2022-03-24 07:46:26.0000', NULL, NULL, NULL, NULL, 1, NULL, '2022-03-23 07:46:26.0000', '2022-03-23 07:46:26.0000', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Chat`
--
ALTER TABLE `Chat`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Chat`
--
ALTER TABLE `Chat`
  MODIFY `Id` bigint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
