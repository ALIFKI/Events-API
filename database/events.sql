-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Waktu pembuatan: 18 Sep 2020 pada 02.35
-- Versi server: 5.7.21
-- Versi PHP: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `events`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `participan` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `note` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `events`
--

INSERT INTO `events` (`id`, `title`, `location`, `participan`, `date`, `note`, `image`) VALUES
(9, 'events', 'West,london', 'one', '2020-09-08', 'note localhost', '6996796349357787_7f7d110d1eb1ec41f09a82c675c9dd24.png'),
(10, 'events', 'West,london', 'one', '2020-09-08', 'note localhost', '5881549572962144_7f7d110d1eb1ec41f09a82c675c9dd24.png'),
(11, 'events', 'West,london', 'one', '2020-09-08', 'note localhost', '6112504846299580_7f7d110d1eb1ec41f09a82c675c9dd24.png'),
(12, 'events', 'West,london', 'one', '2020-09-08', 'note localhost', '1979369987837060_7f7d110d1eb1ec41f09a82c675c9dd24.png'),
(13, 'events', 'West,london', 'one', '2020-09-08', 'note localhost', '1836651597571600_7f7d110d1eb1ec41f09a82c675c9dd24.png'),
(14, 'events', 'West,london', 'one', '2020-09-08', 'note localhost', '3375035547131707_7f7d110d1eb1ec41f09a82c675c9dd24.png'),
(16, 'new Events', 'dsad', 'dsada', '2020-09-18', 'Events from Localhost', '4133794550023938_7f7d110d1eb1ec41f09a82c675c9dd24.png'),
(17, 'dasd', 'dsad', 'dsad', '2020-09-02', 'Kandidat sebagai Fdadasd dsadjsdns aid sadosd adas', '6077587046543061_107339431_1520445101454908_7738041018727764551_n.jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
