<?php
declare(strict_types=1);

function is_logged_in(): bool {
  return !empty($_SESSION['user_id']);
}

function require_login(): void {
  if (!is_logged_in()) {
    $next = $_SERVER['REQUEST_URI'] ?? '/';
    flash_set('error', 'กรุณาเข้าสู่ระบบก่อน');
    redirect(url('/auth/signin.php?next=' . urlencode($next)));
  }
}


function current_user(PDO $pdo): ?array {
  if (!is_logged_in()) return null;
  $st = $pdo->prepare("SELECT id, username, email, role FROM users WHERE id = ? LIMIT 1");
  $st->execute([ (int)$_SESSION['user_id'] ]);
  return $st->fetch() ?: null;
}
