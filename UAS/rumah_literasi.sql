-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2025 at 08:21 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rumah_literasi`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `judul` varchar(150) NOT NULL,
  `pengarang` varchar(100) DEFAULT NULL,
  `penerbit` varchar(100) DEFAULT NULL,
  `tahun_terbit` int(11) DEFAULT NULL,
  `jumlah` int(11) DEFAULT 1,
  `lokasi_cabang_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `judul`, `pengarang`, `penerbit`, `tahun_terbit`, `jumlah`, `lokasi_cabang_id`) VALUES
(1, 'Layla Majnun', 'Nizami', 'Nizami', 2022, 10, 1),
(2, 'Bumi', 'Tere Liye', 'Gramedia', 2014, 5, 1),
(3, 'Hujan', 'Tere Liye', 'Gramedia', 2016, 7, 1),
(4, 'Negeri 5 Menara', 'Ahmad Fuadi', 'Gramedia', 2009, 6, 2),
(5, 'Laskar Pelangi', 'Andrea Hirata', 'Bentang Pustaka', 2005, 8, 2),
(6, 'Perahu Kertas', 'Dewi Lestari', 'Bentang', 2009, 5, 3),
(7, 'Dilan 1990', 'Pidi Baiq', 'Pastel Books', 2014, 4, 3),
(8, 'Sang Pemimpi', 'Andrea Hirata', 'Bentang Pustaka', 2006, 6, 2),
(9, 'Pulang', 'Leila S. Chudori', 'Kepustakaan Populer', 2012, 3, 1),
(10, 'Ronggeng Dukuh Paruk', 'Ahmad Tohari', 'Gramedia', 1982, 2, 2),
(11, 'Critical Eleven', 'Ika Natassa', 'Gramedia', 2015, 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` int(11) NOT NULL,
  `nama_cabang` varchar(100) NOT NULL,
  `alamat` text DEFAULT NULL,
  `penanggung_jawab` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `nama_cabang`, `alamat`, `penanggung_jawab`) VALUES
(1, 'Rumah Literasi Ketapang', 'Jln. Lingkar No.11', 'Lukman'),
(2, 'Rumah Literasi Pontianak', 'Jln. Merdeka No.23', 'Agus'),
(3, 'Rumah Literasi Sintang', 'Jln. Tanjungpura No.12', 'Dina'),
(4, 'Rumah Literasi Sanggau', 'Jln. Melati No.45', 'Rudi'),
(5, 'Rumah Literasi Sekadau', 'Jln. Mawar No.3', 'Ika'),
(6, 'Rumah Literasi Sambas', 'Jln. Mahakam No.9', 'Fikri'),
(7, 'Rumah Literasi Singkawang', 'Jln. Sutoyo No.21', 'Ayu'),
(8, 'Rumah Literasi Landak', 'Jln. Danau No.19', 'Joko'),
(9, 'Rumah Literasi Melawi', 'Jln. Pemuda No.5', 'Rina'),
(10, 'Rumah Literasi Bengkayang', 'Jln. Pahlawan No.8', 'Reza'),
(11, 'Rumah Literasi Kapuas Hulu', 'Jln. Diponegoro No.33', 'Tini');

-- --------------------------------------------------------

--
-- Table structure for table `loans`
--

CREATE TABLE `loans` (
  `id` int(11) NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `tanggal_pinjam` date DEFAULT NULL,
  `tanggal_kembali` date DEFAULT NULL,
  `status` enum('dipinjam','dikembalikan') DEFAULT 'dipinjam'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loans`
--

INSERT INTO `loans` (`id`, `member_id`, `book_id`, `tanggal_pinjam`, `tanggal_kembali`, `status`) VALUES
(1, 1, 1, '2025-11-11', '2025-11-12', 'dipinjam'),
(2, 2, 2, '2025-07-01', '2025-07-05', 'dikembalikan'),
(3, 3, 3, '2025-07-02', NULL, 'dipinjam'),
(4, 4, 4, '2025-07-03', NULL, 'dipinjam'),
(5, 5, 5, '2025-07-04', '2025-07-10', 'dikembalikan'),
(6, 6, 6, '2025-07-05', NULL, 'dipinjam'),
(7, 7, 7, '2025-07-06', '2025-07-09', 'dikembalikan'),
(8, 8, 8, '2025-07-07', NULL, 'dipinjam'),
(9, 9, 9, '2025-07-08', NULL, 'dipinjam'),
(10, 10, 10, '2025-07-09', '2025-07-13', 'dikembalikan'),
(11, 11, 11, '2025-07-10', NULL, 'dipinjam');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `no_hp` varchar(20) DEFAULT NULL,
  `alamat` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `nama`, `email`, `no_hp`, `alamat`) VALUES
(1, 'Favian', 'favian@gmail.com', '012345678', 'JL. Mawan No.17'),
(2, 'Dimas', 'dimas@mail.com', '0812345671', 'Jl. Tanjung Raya'),
(3, 'Sari', 'sari@mail.com', '0812345672', 'Jl. Sungai Raya'),
(4, 'Andi', 'andi@mail.com', '0812345673', 'Jl. Adi Sucipto'),
(5, 'Maya', 'maya@mail.com', '0812345674', 'Jl. Veteran'),
(6, 'Rio', 'rio@mail.com', '0812345675', 'Jl. Imam Bonjol'),
(7, 'Lia', 'lia@mail.com', '0812345676', 'Jl. H. Rais A. Rahman'),
(8, 'Budi', 'budi@mail.com', '0812345677', 'Jl. Sultan Abdurrahman'),
(9, 'Rina', 'rina@mail.com', '0812345678', 'Jl. Gusti Hamzah'),
(10, 'Yudi', 'yudi@mail.com', '0812345679', 'Jl. Teuku Umar'),
(11, 'Nina', 'nina@mail.com', '0812345680', 'Jl. Diponegoro');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','anggota') NOT NULL,
  `id_anggota` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `id_anggota`) VALUES
(13, 'admin', '$2b$10$YC/bN81DB/CrNsmjtPGzbOnL7ZpCqXo8Awbx333NsTJqT/iPLljVm', 'admin', NULL),
(14, 'user', '$2b$10$eZFykJhx5q8eO9w.HI9qTezMVOv9tPx3uxYZwTfmg020a6qt3EtaK', 'anggota', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lokasi_cabang_id` (`lokasi_cabang_id`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `loans`
--
ALTER TABLE `loans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`lokasi_cabang_id`) REFERENCES `branches` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `loans`
--
ALTER TABLE `loans`
  ADD CONSTRAINT `loans_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  ADD CONSTRAINT `loans_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
