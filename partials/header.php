<?php
// $showCart ถูกส่งมาจาก index.php
$showCart = $showCart ?? false;
?>
<header class="topbar">
  <div class="container topbar__inner">
    <a class="brand" href="<?= e(url('/')) ?>" aria-label="ไปหน้าแรก">
      <span class="brand__mark">KT</span>
      <span class="brand__text">
        <strong>Khay Thuk</strong>
        <small>minimal & warm shop</small>
      </span>
    </a>

    <nav class="nav">
      <a href="<?= e(url('/#shop')) ?>">สินค้า</a>
      <a href="<?= e(url('/#about')) ?>">เกี่ยวกับ</a>
      <a href="<?= e(url('/#faq')) ?>">คำถาม</a>

      <?php if (function_exists('isLoggedIn') && isLoggedIn()): ?>
        <a class="btn btn--ghost" href="<?= e(url('/admin/dashboard.php')) ?>">แดชบอร์ด</a>
        <a class="btn btn--ghost" href="<?= e(url('/auth/logout.php')) ?>">ออกจากระบบ</a>
      <?php else: ?>
        <a class="btn btn--ghost" href="<?= e(url('/auth/signin.php')) ?>">เข้าสู่ระบบ</a>
        <a class="btn btn--primary" href="<?= e(url('/auth/signup.php')) ?>">สมัครสมาชิก</a>
      <?php endif; ?>

      <?php if ($showCart): ?>
      <button class="btn btn--ghost nav__cart" id="openCartBtn" type="button" aria-haspopup="dialog" aria-controls="cartDrawer">
        <span class="nav__cartIcon" aria-hidden="true">🧺</span>
        <span>ตะกร้า</span>
        <span class="pill" id="cartCount">0</span>
      </button>
      <?php endif; ?>
    </nav>

    <button class="iconBtn burger" id="burgerBtn" type="button" aria-label="เมนู">
      <span></span><span></span><span></span>
    </button>
  </div>

  <div class="container mobileNav" id="mobileNav" hidden>
    <a href="<?= e(url('/#shop')) ?>">สินค้า</a>
    <a href="<?= e(url('/#about')) ?>">เกี่ยวกับ</a>
    <a href="<?= e(url('/#faq')) ?>">คำถาม</a>

    <?php if (function_exists('isLoggedIn') && isLoggedIn()): ?>
      <a class="btn btn--ghost w-full" href="<?= e(url('/admin/dashboard.php')) ?>">แดชบอร์ด</a>
      <a class="btn btn--ghost w-full" href="<?= e(url('/auth/logout.php')) ?>">ออกจากระบบ</a>
    <?php else: ?>
      <a class="btn btn--ghost w-full" href="<?= e(url('/auth/signin.php')) ?>">เข้าสู่ระบบ</a>
      <a class="btn btn--primary w-full" href="<?= e(url('/auth/signup.php')) ?>">สมัครสมาชิก</a>
    <?php endif; ?>

    <?php if ($showCart): ?>
      <button class="btn btn--soft w-full" id="openCartBtnMobile" type="button">
        🧺 เปิดตะกร้า <span class="pill" id="cartCountMobile">0</span>
      </button>
    <?php endif; ?>
  </div>
</header>
