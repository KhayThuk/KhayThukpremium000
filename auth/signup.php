<?php
require_once __DIR__ . '/../config/bootstrap.php';
require_once __DIR__ . '/../config/auth.php';

if (is_logged_in()) redirect(url('/admin/dashboard.php'));

$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  csrf_verify();

  $username = trim((string)($_POST['username'] ?? ''));
  $email = trim((string)($_POST['email'] ?? ''));
  $password = (string)($_POST['password'] ?? '');
  $password2 = (string)($_POST['password2'] ?? '');

  if (!preg_match('/^[a-zA-Z0-9_]{3,20}$/', $username)) {
    $error = 'Username ต้อง 3-20 ตัว (ตัวอักษร/ตัวเลข/_)';
  } elseif (strlen($password) < 6) {
    $error = 'รหัสผ่านต้องอย่างน้อย 6 ตัว';
  } elseif ($password !== $password2) {
    $error = 'รหัสผ่านไม่ตรงกัน';
  } else {
    $st = $pdo->prepare("SELECT id FROM users WHERE username=? LIMIT 1");
    $st->execute([$username]);
    if ($st->fetch()) {
      $error = 'Username นี้ถูกใช้แล้ว';
    } else {
      $hash = password_hash($password, PASSWORD_DEFAULT);
      $st2 = $pdo->prepare("INSERT INTO users(username,email,password_hash,role) VALUES(?,?,?, 'user')");
      $st2->execute([$username, $email ?: null, $hash]);

      flash_set('error', 'สมัครสำเร็จแล้ว โปรดเข้าสู่ระบบ');
      redirect(url('/auth/signin.php'));
    }
  }
}
?>
<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>สมัครสมาชิก — Khay Thuk</title>
  <link rel="stylesheet" href="<?= e(url('/styles.css')) ?>">
</head>
<body>
<?php require_once __DIR__ . '/../partials/header.php'; ?>

<main class="container section" style="min-height:70vh; display:grid; place-items:center;">
  <div class="card" style="width:min(560px,100%);">
    <h2 style="margin-top:0;">สมัครสมาชิก</h2>
    <p class="muted">สร้างบัญชีเพื่อเข้าถึงระบบ</p>

    <?php if ($error): ?>
      <div class="note" style="background: rgba(255,180,162,.22);"><?= e($error) ?></div>
    <?php endif; ?>

    <form method="post" style="display:grid; gap:10px; margin-top:12px;">
      <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">

      <label class="muted small">Username (3-20, a-z 0-9 _)</label>
      <input class="input" name="username" required>

      <label class="muted small">Email (ไม่บังคับ)</label>
      <input class="input" name="email">

      <label class="muted small">Password (>= 6)</label>
      <input class="input" type="password" name="password" required>

      <label class="muted small">ยืนยัน Password</label>
      <input class="input" type="password" name="password2" required>

      <button class="btn btn--primary" type="submit">สร้างบัญชี</button>

      <p class="muted small" style="margin:6px 0 0;">
        มีบัญชีแล้ว? <a href="<?= e(url('/auth/signin.php')) ?>" style="text-decoration:underline;">เข้าสู่ระบบ</a>
      </p>
    </form>
  </div>
</main>
</body>
</html>
