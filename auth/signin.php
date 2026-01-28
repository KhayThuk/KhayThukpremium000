$next = (string)($_GET['next'] ?? url('/index.php#shop'));

<?php
require_once __DIR__ . '/../config/bootstrap.php';
require_once __DIR__ . '/../config/auth.php';

if (is_logged_in()) redirect(url('/admin/dashboard.php'));

$error = flash_get('error');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  csrf_verify();
  $username = trim((string)($_POST['username'] ?? ''));
  $password = (string)($_POST['password'] ?? '');

  $st = $pdo->prepare("SELECT id, username, password_hash FROM users WHERE username=? LIMIT 1");
  $st->execute([$username]);
  $u = $st->fetch();

  if (!$u || !password_verify($password, $u['password_hash'])) {
    $error = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
  } else {
    session_regenerate_id(true);
    $_SESSION['user_id'] = (int)$u['id'];
    redirect(url('/index.php#shop'));

  }
}
?>
<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>เข้าสู่ระบบ — Khay Thuk</title>
  <link rel="stylesheet" href="<?= e(url('/styles.css')) ?>">
</head>
<body>
<?php require_once __DIR__ . '/../partials/header.php'; ?>

<main class="container section" style="min-height:70vh; display:grid; place-items:center;">
  <div class="card" style="width:min(520px,100%);">
    <h2 style="margin-top:0;">เข้าสู่ระบบ</h2>
    <p class="muted">Signin เพื่อเข้าถึงระบบ</p>

    <?php if ($error): ?>
      <div class="note" style="background: rgba(255,180,162,.22);"><?= e($error) ?></div>
    <?php endif; ?>

    <form method="post" style="display:grid; gap:10px; margin-top:12px;">
      <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
      <label class="muted small">Username</label>
      <input class="input" name="username" autocomplete="username" required>

      <label class="muted small">Password</label>
      <input class="input" type="password" name="password" autocomplete="current-password" required>

      <button class="btn btn--primary" type="submit">เข้าสู่ระบบ</button>

      <p class="muted small" style="margin:6px 0 0;">
        ยังไม่มีบัญชี? <a href="<?= e(url('/auth/signup.php')) ?>" style="text-decoration:underline;">สมัครสมาชิก</a>
      </p>
    </form>
  </div>
</main>
</body>
</html>
