<!doctype html>
<html lang="th">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="theme-color" content="#ff7a00" />
    <meta name="description" content="Shop Master mobile-first commerce dashboard" />
    <title>Shop Master</title>
    <link rel="manifest" href="./manifest.webmanifest" />
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <section id="loginScreen" class="screen auth-screen active">
      <div class="card auth-card">
        <div class="brand">
          <b>SM</b>
          <div>
            <small>SHOP MASTER</small>
            <h1>เข้าสู่ระบบ</h1>
          </div>
        </div>

        <form id="loginForm" class="form">
          <label>
            อีเมล
            <input type="email" id="emailInput" value="demo@shopmaster.app" required />
          </label>
          <label>
            รหัสผ่าน
            <input type="password" id="passwordInput" value="123456" required />
          </label>
          <button class="primary" type="submit">เข้าสู่ระบบ</button>
          <button class="secondary" type="button" id="googleLoginBtn">ใช้บัญชี Google</button>
        </form>

        <p class="note">ยังไม่มีบัญชี? <a href="#">สร้างบัญชี</a></p>
      </div>
    </section>

    <section id="appScreen" class="screen app-screen">
      <header class="topbar">
        <div>
          <small>SHOP MASTER</small>
          <h1 id="welcomeText">สวัสดีครับ</h1>
        </div>
        <button id="logoutBtn" class="icon" type="button">⎋</button>
      </header>

      <main>
        <div class="section-head">
          <div>
            <small class="muted">ภาพรวมวันนี้</small>
            <h2>Dashboard</h2>
          </div>
          <button id="openAddBtn" class="primary compact" type="button">+ เพิ่มสินค้า</button>
        </div>

        <div class="stats">
          <article class="stat orange">
            <small>รายได้วันนี้</small>
            <strong id="revenueValue">฿0</strong>
          </article>
          <article class="stat">
            <small>คลิกลิงก์</small>
            <strong id="linkClicks">0</strong>
          </article>
          <article class="stat">
            <small>ออเดอร์</small>
            <strong id="orderValue">0</strong>
          </article>
          <article class="stat">
            <small>ต้องตอบ</small>
            <strong id="chatPending">0</strong>
          </article>
        </div>

        <div class="actions">
          <button class="action primary-action" data-view="products" type="button">🔗 เพิ่มสินค้า</button>
          <button class="action" data-view="products" type="button">📦 สินค้าของฉัน</button>
          <button class="action" data-view="chat" type="button">💬 แชต</button>
          <button class="action" data-view="ai" type="button">🤖 AI Assistant</button>
          <button class="action" data-view="analytics" type="button">📊 Analytics</button>
          <button class="action" data-view="automation" type="button">⚙️ Automation</button>
        </div>

        <section class="card panel">
          <div class="section-head">
            <h3>Marketplace</h3>
            <small class="muted">สถานะการเชื่อมต่อ</small>
          </div>
          <div class="store"><span><i class="dot shopee"></i>Shopee</span><em>ยังไม่เชื่อม</em></div>
          <div class="store"><span><i class="dot lazada"></i>Lazada</span><em>ยังไม่เชื่อม</em></div>
          <div class="store"><span><i class="dot tiktok"></i>TikTok Shop</span><em>เตรียมโครงไว้</em></div>
        </section>

        <section id="products" class="view card panel">
          <div class="section-head">
            <h3>สินค้าของฉัน</h3>
            <button id="openAddSecondaryBtn" class="primary compact" type="button">+ เพิ่ม</button>
          </div>
          <div id="productList"></div>
        </section>

        <section id="chat" class="view card panel">
          <h3>แชตลูกค้า</h3>
          <p class="empty">ยังไม่มีข้อความใหม่</p>
        </section>

        <section id="ai" class="view card panel">
          <h3>AI Assistant</h3>
          <p class="message">สวัสดีครับ ผมพร้อมช่วยตอบลูกค้าและวิเคราะห์สินค้า</p>
        </section>

        <section id="analytics" class="view card panel">
          <h3>Analytics</h3>
          <p class="empty">ข้อมูลจะแสดงเมื่อเริ่มเชื่อมต่อร้านค้า</p>
        </section>

        <section id="automation" class="view card panel">
          <h3>Automation</h3>
          <div class="store"><span>ตอบลูกค้าใหม่อัตโนมัติ</span><b class="on">ON</b></div>
          <div class="store"><span>แจ้งเตือนสต็อก</span><b class="on">ON</b></div>
        </section>
      </main>

      <nav>
        <button class="nav active" data-view="home" type="button">🏠<small>Home</small></button>
        <button class="nav" data-view="products" type="button">📦<small>สินค้า</small></button>
        <button class="nav" data-view="chat" type="button">💬<small>แชต</small></button>
        <button class="nav" data-view="ai" type="button">🤖<small>AI</small></button>
        <button class="nav" data-view="automation" type="button">⚙️<small>Auto</small></button>
      </nav>
    </section>

    <div id="modal" class="modal hidden">
      <div class="card modal-card">
        <div class="section-head">
          <h3>เพิ่มสินค้า</h3>
          <button id="closeModalBtn" class="icon" type="button">✕</button>
        </div>

        <form id="productForm" class="form">
          <label>
            ลิงก์สินค้า
            <input id="productUrl" type="url" placeholder="https://..." required />
          </label>
          <label>
            ชื่อสินค้า
            <input id="productName" placeholder="ใส่ชื่อสินค้า" required />
          </label>
          <label>
            ตลาด
            <select id="productStore">
              <option>Shopee</option>
              <option>Lazada</option>
              <option>TikTok Shop</option>
              <option>Facebook</option>
            </select>
          </label>
          <button class="primary" type="submit">บันทึกสินค้า</button>
        </form>
      </div>
    </div>

    <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"></script>
    <script src="./app.js"></script>
  </body>
</html>
