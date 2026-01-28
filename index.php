<?php
require_once __DIR__ . '/config/bootstrap.php';
$showCart = true; // ให้ header แสดงปุ่มตะกร้าเฉพาะหน้าที่ต้องใช้
?>
<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="theme-color" content="#fff7ef" />
  <title>Khay Thuk</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="<?= e(url('/styles.css')) ?>">
</head>
<body>

  <?php require_once __DIR__ . '/partials/header.php'; ?>

  <?php require __DIR__ . '/home.html'; ?>

  <?php require_once __DIR__ . '/partials/footer.php'; ?>

  <script src="<?= e(url('/app.js')) ?>"></script>
</body>
</html>
