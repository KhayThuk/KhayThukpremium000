<?php
require_once __DIR__ . '/../config/bootstrap.php';
require_once __DIR__ . '/../config/auth.php';

require_login();
$u = current_user($pdo);
?>
<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Dashboard — Khay Thuk</title>
  <link rel="stylesheet" href="<?= e(url('/styles.css')) ?>">
</head>
<body>
<?php require_once __DIR__ . '/../partials/header.php'; ?>

<main class="container section">
  <div class="card">
    <h2 style="margin-top:0;">Dashboard</h2>
    <p class="muted">ยินดีต้อนรับ <b><?= e($u['username']) ?></b> (role: <?= e($u['role']) ?>)</p>
    <div class="note">หน้านี้เปิดได้เฉพาะคนที่ล็อกอินแล้ว ✅</div>
  </div>
</main>
</body>
</html>
