<?php
declare(strict_types=1);

session_start();

require_once __DIR__ . '/db.php';

function e(string $v): string { return htmlspecialchars($v, ENT_QUOTES, 'UTF-8'); }

function url(string $path = '/'): string {
  $base = '/KhayThuk';
  if ($path === '/' || $path === '') return $base . '/';
  return $base . $path;
}

function redirect(string $to): void {
  header('Location: ' . $to);
  exit;
}

function flash_set(string $key, string $val): void { $_SESSION['_flash'][$key] = $val; }
function flash_get(string $key): ?string {
  $v = $_SESSION['_flash'][$key] ?? null;
  unset($_SESSION['_flash'][$key]);
  return $v;
}

function csrf_token(): string {
  if (empty($_SESSION['_csrf'])) $_SESSION['_csrf'] = bin2hex(random_bytes(16));
  return $_SESSION['_csrf'];
}
function csrf_verify(): void {
  $t = (string)($_POST['csrf'] ?? '');
  if (!$t || !hash_equals((string)($_SESSION['_csrf'] ?? ''), $t)) {
    http_response_code(403);
    exit('CSRF invalid');
  }
}
