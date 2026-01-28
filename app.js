/* Khay Thuk — minimal & warm shop (vanilla JS) */

const $ = (q, el = document) => el.querySelector(q);
const $$ = (q, el = document) => [...el.querySelectorAll(q)];

const fmtTHB = (n) => new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(n);

const PRODUCTS = [
  {
    id: "p1",
    title: "Netflix 30 วัน (โปรไฟล์)",
    category: "Subscription",
    price: 89,
    stock: 8,
    emoji: "🍿",
    desc: "รับโค้ด/บัญชีตามรูปแบบร้าน (ตัวอย่างหน้า UI) เหมาะสำหรับใช้งานส่วนตัว"
  },
  {
    id: "p2",
    title: "YouTube Premium 30 วัน",
    category: "Subscription",
    price: 39,
    stock: 20,
    emoji: "🎬",
    desc: "ดูแบบไม่มีโฆษณา + เล่นเบื้องหลัง (ตัวอย่างสินค้าในเดโม)"
  },
  {
    id: "p3",
    title: "WeTV VIP 30 วัน",
    category: "Subscription",
    price: 15,
    stock: 79,
    emoji: "📺",
    desc: "ซีรีส์แบบเต็มอิ่ม (ปรับข้อความ/เงื่อนไขได้ใน app.js)"
  },
  {
    id: "p4",
    title: "เติมเงินเกม (Top up)",
    category: "Top up",
    price: 59,
    stock: 12,
    emoji: "🎮",
    desc: "แจ้งไอดี/เซิร์ฟเวอร์ตามร้านกำหนด ระบบเดโมยังไม่เชื่อมหลังบ้าน"
  },
  {
    id: "p5",
    title: "บัตรของขวัญ (Gift Card)",
    category: "Gift Card",
    price: 199,
    stock: 5,
    emoji: "🎁",
    desc: "เหมาะสำหรับให้เพื่อน/คนพิเศษ ใช้เป็นโค้ดได้ (ตัวอย่างสินค้า)"
  },
  {
    id: "p6",
    title: "ไอเท็มเสริมรายเดือน",
    category: "Service",
    price: 29,
    stock: 0,
    emoji: "🧸",
    desc: "ตัวอย่างสินค้าหมดสต๊อก เพื่อโชว์ badge Out of stock"
  },
  {
    id: "p7",
    title: "IQIYI VIP 30 วัน",
    category: "Subscription",
    price: 19,
    stock: 109,
    emoji: "💖",
    desc: "ดูได้แบบฟิน ๆ พร้อมโทนร้านน่ารัก"
  },
  {
    id: "p8",
    title: "แพ็กเกจช่วยตั้งค่าร้าน",
    category: "Service",
    price: 299,
    stock: 3,
    emoji: "🛠️",
    desc: "บริการเสริม: ช่วยจัดหน้าเพจ/ตั้งค่าร้าน (ตัวอย่างรายการบริการ)"
  }
];

// state
let state = {
  category: "All",
  search: "",
  sort: "recommended",
  selectedProductId: null,
  cart: loadCart()
};

// elements
const productGrid = $("#productGrid");
const emptyState = $("#emptyState");
const categoryChips = $("#categoryChips");
const searchInput = $("#searchInput");
const clearSearchBtn = $("#clearSearchBtn");
const sortSelect = $("#sortSelect");

const productModal = $("#productModal");
const modalArt = $("#modalArt");
const modalCategory = $("#modalCategory");
const modalStock = $("#modalStock");
const modalTitle = $("#modalTitle");
const modalDesc = $("#modalDesc");
const modalPrice = $("#modalPrice");
const modalMeta = $("#modalMeta");
const modalAddBtn = $("#modalAddBtn");

const overlay = $("#overlay");
const cartDrawer = $("#cartDrawer");
const openCartBtn = $("#openCartBtn");
const openCartBtnMobile = $("#openCartBtnMobile");
const closeCartBtn = $("#closeCartBtn");
const cartList = $("#cartList");
const cartEmpty = $("#cartEmpty");
const cartTotal = $("#cartTotal");
const cartCount = $("#cartCount");
const cartCountMobile = $("#cartCountMobile");
const clearCartBtn = $("#clearCartBtn");
const goShopBtn = $("#goShopBtn");
const checkoutBtn = $("#checkoutBtn");

const toast = $("#toast");
const toastText = $("#toastText");
const yearEl = $("#year");
const statProducts = $("#statProducts");

const burgerBtn = $("#burgerBtn");
const mobileNav = $("#mobileNav");
const themeToggleBtn = $("#themeToggleBtn");
const resetFiltersBtn = $("#resetFiltersBtn");

// FAQ
const faqList = $("#faqList");
const FAQS = [
  { q: "สั่งซื้อยังไง?", a: "เลือกสินค้า → กดใส่ตะกร้า → กด “สรุปออเดอร์” แล้วนำข้อความไปใช้ต่อกับระบบร้าน/แชท (เดโมนี้ยังไม่เชื่อมหลังบ้าน)" },
  { q: "ถ้าสินค้าหมดสต๊อกทำไง?", a: "สินค้าแสดงป้าย Out of stock และปุ่มใส่ตะกร้าจะถูกปิดอัตโนมัติ" },
  { q: "อยากเพิ่มสินค้าเองต้องแก้ตรงไหน?", a: "แก้ที่ตัวแปร PRODUCTS ในไฟล์ app.js เพิ่ม/ลบ/แก้ราคา/สต๊อก/หมวดได้เลย" },
  { q: "อยากเชื่อมระบบหลังบ้าน?", a: "สามารถเปลี่ยนปุ่ม “สรุปออเดอร์” ให้ยิง API หรือเปิดหน้า checkout จริงได้ (เช่น PHP/Node/Firebase)" }
];

// -------- init ----------
function init() {
  yearEl.textContent = new Date().getFullYear();
  statProducts.textContent = PRODUCTS.length;

  renderCategories();
  bindEvents();
  renderAll();

  renderFAQ();
  updateCartUI();

  // restore theme
  const savedTheme = localStorage.getItem("kt_theme");
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
}
init();

// -------- render ----------
function renderAll(){
  const items = getFilteredProducts();
  renderProducts(items);
  emptyState.hidden = items.length !== 0;
}

function renderCategories(){
  const cats = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  categoryChips.innerHTML = cats.map(cat => `
    <button class="catChip ${cat === state.category ? "isActive" : ""}" data-cat="${escapeHtml(cat)}" type="button">
      ${cat === "All" ? "ทั้งหมด" : escapeHtml(cat)}
    </button>
  `).join("");
}

function renderProducts(items){
  productGrid.innerHTML = items.map(p => {
    const stockLabel = p.stock <= 0 ? "Out of stock" : p.stock <= 5 ? `เหลือน้อย (${p.stock})` : `พร้อมขาย (${p.stock})`;
    const stockClass = p.stock <= 0 ? "isOut" : p.stock <= 5 ? "isLow" : "";
    const disabled = p.stock <= 0 ? "disabled" : "";

    return `
      <article class="card product" data-id="${p.id}" tabindex="0" role="button" aria-label="ดูรายละเอียด ${escapeHtml(p.title)}">
        <div class="product__art" style="${artStyle(p.id)}">
          <div class="emoji" aria-hidden="true">${p.emoji}</div>
        </div>

        <div class="product__row">
          <span class="tag">${escapeHtml(p.category)}</span>
          <span class="stock ${stockClass}">${stockLabel}</span>
        </div>

        <h3>${escapeHtml(p.title)}</h3>
        <p class="muted small">${escapeHtml(shorten(p.desc, 78))}</p>

        <div class="priceRow">
          <div class="price">${fmtTHB(p.price)}</div>
          <div class="muted small">อัปเดตล่าสุด</div>
        </div>

        <div class="product__btns">
          <button class="btn btn--primary addBtn" data-add="${p.id}" type="button" ${disabled}>ใส่ตะกร้า</button>
          <button class="btn btn--ghost detailBtn" data-detail="${p.id}" type="button">ดูรายละเอียด</button>
        </div>
      </article>
    `;
  }).join("");

  // card click + keyboard open
  $$(".product").forEach(card => {
    card.addEventListener("click", (e) => {
      const id = card.getAttribute("data-id");
      // prevent double handling when clicking buttons
      if (e.target.closest("button")) return;
      openProductModal(id);
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProductModal(card.getAttribute("data-id"));
      }
    });
  });

  // buttons
  $$(".addBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(btn.dataset.add, 1);
    });
  });
  $$(".detailBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openProductModal(btn.dataset.detail);
    });
  });
}

function renderFAQ(){
  faqList.innerHTML = FAQS.map((f, idx) => `
    <div class="faqItem">
      <button class="faqBtn" type="button" aria-expanded="false" aria-controls="faq_${idx}">
        ${escapeHtml(f.q)}
        <span aria-hidden="true">+</span>
      </button>
      <div class="faqPanel" id="faq_${idx}" hidden>
        ${escapeHtml(f.a)}
      </div>
    </div>
  `).join("");

  $$(".faqBtn", faqList).forEach(btn => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      btn.querySelector("span").textContent = expanded ? "+" : "–";
      const panel = $("#" + btn.getAttribute("aria-controls"));
      panel.hidden = expanded;
    });
  });
}

// -------- filters ----------
function getFilteredProducts(){
  let items = [...PRODUCTS];

  if (state.category !== "All") items = items.filter(p => p.category === state.category);

  const s = state.search.trim().toLowerCase();
  if (s) {
    items = items.filter(p =>
      p.title.toLowerCase().includes(s) ||
      p.category.toLowerCase().includes(s) ||
      p.desc.toLowerCase().includes(s)
    );
  }

  items = sortProducts(items, state.sort);

  return items;
}

function sortProducts(items, mode){
  const withIndex = items.map((p, i) => ({...p, _i:i}));

  if (mode === "priceAsc") return withIndex.sort((a,b) => a.price - b.price).map(stripI);
  if (mode === "priceDesc") return withIndex.sort((a,b) => b.price - a.price).map(stripI);
  if (mode === "newest") {
    // demo: reverse order as "newest"
    return withIndex.sort((a,b) => b._i - a._i).map(stripI);
  }

  // recommended (demo rule): in-stock first, then lower price slightly, then original
  return withIndex.sort((a,b) => {
    const aStock = a.stock > 0 ? 0 : 1;
    const bStock = b.stock > 0 ? 0 : 1;
    if (aStock !== bStock) return aStock - bStock;
    if (a.price !== b.price) return a.price - b.price;
    return a._i - b._i;
  }).map(stripI);
}
function stripI(p){ const { _i, ...rest } = p; return rest; }

// -------- modal ----------
function openProductModal(id){
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  state.selectedProductId = id;

  modalArt.style.cssText = artStyle(p.id);
  modalArt.textContent = p.emoji;

  modalCategory.textContent = p.category;

  const stockLabel = p.stock <= 0 ? "Out of stock" : p.stock <= 5 ? `เหลือน้อย (${p.stock})` : `พร้อมขาย (${p.stock})`;
  modalStock.textContent = stockLabel;
  modalStock.classList.toggle("isOut", p.stock <= 0);
  modalStock.classList.toggle("isLow", p.stock > 0 && p.stock <= 5);

  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc;
  modalPrice.textContent = fmtTHB(p.price);
  modalMeta.textContent = `รหัสสินค้า: ${p.id}`;

  modalAddBtn.disabled = p.stock <= 0;
  modalAddBtn.textContent = p.stock <= 0 ? "สินค้าหมด" : "ใส่ตะกร้า";

  productModal.showModal();
}

modalAddBtn?.addEventListener("click", () => {
  if (!state.selectedProductId) return;
  addToCart(state.selectedProductId, 1);
  productModal.close();
});

// -------- cart ----------
function loadCart(){
  try{
    const raw = localStorage.getItem("kt_cart");
    return raw ? JSON.parse(raw) : {};
  }catch{
    return {};
  }
}
function saveCart(){
  localStorage.setItem("kt_cart", JSON.stringify(state.cart));
}

function addToCart(productId, qty){
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;

  if (p.stock <= 0) {
    showToast("สินค้าหมดสต๊อก");
    return;
  }

  const current = state.cart[productId]?.qty ?? 0;
  const next = Math.min(current + qty, p.stock); // clamp to stock
  state.cart[productId] = { qty: next };

  saveCart();
  updateCartUI();
  showToast(`เพิ่ม “${p.title}” แล้ว`);
}

function setQty(productId, qty){
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;

  const next = Math.max(0, Math.min(qty, p.stock));
  if (next === 0) delete state.cart[productId];
  else state.cart[productId] = { qty: next };

  saveCart();
  updateCartUI();
}

function clearCart(){
  state.cart = {};
  saveCart();
  updateCartUI();
  showToast("ล้างตะกร้าแล้ว");
}

function cartItems(){
  return Object.entries(state.cart).map(([id, v]) => {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return null;
    return { ...p, qty: v.qty };
  }).filter(Boolean);
}

function cartSummary(){
  const items = cartItems();
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const count = items.reduce((sum, it) => sum + it.qty, 0);
  return { items, total, count };
}

function updateCartUI(){
  const { items, total, count } = cartSummary();
  cartCount.textContent = String(count);
  cartCountMobile.textContent = String(count);
  cartTotal.textContent = fmtTHB(total);

  // drawer list
  if (items.length === 0){
    cartList.innerHTML = "";
    cartEmpty.hidden = false;
    checkoutBtn.disabled = true;
    clearCartBtn.disabled = true;
  } else {
    cartEmpty.hidden = true;
    checkoutBtn.disabled = false;
    clearCartBtn.disabled = false;

    cartList.innerHTML = items.map(it => `
      <div class="cartItem">
        <div class="cartArt" style="${artStyle(it.id)}" aria-hidden="true">${it.emoji}</div>
        <div>
          <div class="cartTitle">${escapeHtml(it.title)}</div>
          <div class="cartMeta">${escapeHtml(it.category)} • ${fmtTHB(it.price)} / ชิ้น</div>

          <div class="cartControls">
            <div class="qty" aria-label="ปรับจำนวน">
              <button type="button" data-dec="${it.id}" aria-label="ลดจำนวน">−</button>
              <b>${it.qty}</b>
              <button type="button" data-inc="${it.id}" aria-label="เพิ่มจำนวน">+</button>
            </div>
            <div class="muted small">${fmtTHB(it.price * it.qty)}</div>
            <button class="iconBtn" type="button" data-rm="${it.id}" aria-label="ลบสินค้า">🗑️</button>
          </div>
        </div>
      </div>
    `).join("");

    // bind cart controls
    $$("[data-inc]").forEach(b => b.addEventListener("click", () => setQty(b.dataset.inc, (state.cart[b.dataset.inc]?.qty ?? 0) + 1)));
    $$("[data-dec]").forEach(b => b.addEventListener("click", () => setQty(b.dataset.dec, (state.cart[b.dataset.dec]?.qty ?? 0) - 1)));
    $$("[data-rm]").forEach(b => b.addEventListener("click", () => setQty(b.dataset.rm, 0)));
  }
}

// -------- drawer open/close ----------
function openDrawer(){
  overlay.hidden = false;
  cartDrawer.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeDrawer(){
  overlay.hidden = true;
  cartDrawer.hidden = true;
  document.body.style.overflow = "";
}

openCartBtn?.addEventListener("click", openDrawer);
openCartBtnMobile?.addEventListener("click", () => { mobileNav.hidden = true; openDrawer(); });
closeCartBtn?.addEventListener("click", closeDrawer);
overlay?.addEventListener("click", closeDrawer);

goShopBtn?.addEventListener("click", () => {
  closeDrawer();
  location.hash = "#shop";
});

clearCartBtn?.addEventListener("click", clearCart);

checkoutBtn?.addEventListener("click", () => {
  const { items, total } = cartSummary();
  if (!items.length) return;

  const lines = items.map(it => `• ${it.title} x${it.qty} = ${fmtTHB(it.price * it.qty)}`).join("\n");
  const msg =
`สรุปออเดอร์ (เดโม)
${lines}

รวมทั้งหมด: ${fmtTHB(total)}

นำข้อความนี้ไปใช้ต่อกับระบบร้าน/แชทได้เลย`;
  alert(msg);
});

// -------- events ----------
function bindEvents(){
  // category
  categoryChips.addEventListener("click", (e) => {
    const btn = e.target.closest(".catChip");
    if (!btn) return;
    state.category = btn.dataset.cat;
    $$(".catChip").forEach(x => x.classList.toggle("isActive", x.dataset.cat === state.category));
    renderAll();
  });

  // search
  searchInput.addEventListener("input", () => {
    state.search = searchInput.value;
    renderAll();
  });
  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    state.search = "";
    searchInput.focus();
    renderAll();
  });

  // sort
  sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value;
    renderAll();
  });

  // reset filters
  resetFiltersBtn.addEventListener("click", () => {
    state.category = "All";
    state.search = "";
    state.sort = "recommended";
    searchInput.value = "";
    sortSelect.value = "recommended";
    renderCategories();
    renderAll();
  });

  // burger
  burgerBtn.addEventListener("click", () => {
    mobileNav.hidden = !mobileNav.hidden;
  });

  // theme toggle
  themeToggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "peach";
    const next = current === "mint" ? "peach" : "mint";
    if (next === "peach") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", "mint");
    localStorage.setItem("kt_theme", next === "peach" ? "" : "mint");
    showToast("เปลี่ยนโทนแล้ว 🎨");
  });

  // close modal on ESC: browser handles
}

// -------- utils ----------
function showToast(text){
  toastText.textContent = text;
  toast.hidden = false;
  toast.animate([{ opacity: 0, transform: "translateX(-50%) translateY(10px)" }, { opacity: 1, transform: "translateX(-50%) translateY(0)" }], { duration: 180, easing: "ease-out" });
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { toast.hidden = true; }, 1600);
}

function shorten(s, n){
  if (!s) return "";
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

// simple deterministic gradient per product id
function artStyle(seed){
  const hash = [...seed].reduce((a,c)=>a + c.charCodeAt(0), 0);
  const a = (hash * 17) % 360;
  const b = (a + 70) % 360;

  return `
    background:
      radial-gradient(120px 90px at 20% 20%, hsla(${a}, 90%, 85%, .75), transparent 60%),
      radial-gradient(120px 90px at 80% 30%, hsla(${b}, 90%, 88%, .70), transparent 55%),
      radial-gradient(160px 120px at 50% 90%, hsla(${(a+150)%360}, 80%, 88%, .60), transparent 60%),
      rgba(255,255,255,.55);
  `;
}
