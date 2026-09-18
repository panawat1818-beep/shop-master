const state = {
  products: [],
  currentUser: null,
  firebaseReady: false,
  auth: null,
  db: null,
};

const firebaseConfig = {
  apiKey: "AIzaSyCBcupiyWFDNnMjYol48QnweG5xLWO_z8A",
  authDomain: "shop-master-f3e94.firebaseapp.com",
  databaseURL: "https://shop-master-f3e94-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shop-master-f3e94",
  storageBucket: "shop-master-f3e94.firebasestorage.app",
  messagingSenderId: "211475508789",
  appId: "1:211475508789:web:13f8ebad95b30bf33ccb7c",
};

const STORAGE_KEY = 'shop-master-products';
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const loginScreen = $('#loginScreen');
const appScreen = $('#appScreen');
const modal = $('#modal');
const productList = $('#productList');

function setupFirebase() {
  if (!window.firebase) {
    console.warn('Firebase SDK is not loaded. Running in local demo mode.');
    return;
  }

  try {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    state.auth = firebase.auth();
    state.db = firebase.firestore();
    state.firebaseReady = true;
  } catch (error) {
    console.warn('Firebase initialization failed. Running in local demo mode.', error);
  }
}

function renderProducts() {
  if (!state.products.length) {
    productList.innerHTML = '<p class="empty">ยังไม่มีสินค้า เพิ่มสินค้าด้วย URL ได้เลย</p>';
    return;
  }

  productList.innerHTML = state.products.map((product) => `
    <article class="product">
      <b>${escapeHtml(product.name)}</b>
      <small>${escapeHtml(product.store)} · ${escapeHtml(product.url)}</small>
    </article>
  `).join('');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#039;',
    '"': '&quot;',
  }[character]));
}

function loadLocalProducts() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    state.products = Array.isArray(saved) ? saved : [];
  } catch {
    state.products = [];
  }
  renderProducts();
}

async function loadProducts() {
  if (!state.firebaseReady || !state.currentUser || state.currentUser.isDemo) {
    loadLocalProducts();
    return;
  }

  try {
    const snapshot = await state.db.collection('products')
      .where('uid', '==', state.currentUser.uid)
      .orderBy('createdAt', 'desc')
      .get();
    state.products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    renderProducts();
  } catch (error) {
    console.warn('Could not load Firestore products. Using local storage.', error);
    loadLocalProducts();
  }
}

async function createProduct(product) {
  const data = {
    ...product,
    uid: state.currentUser?.uid || 'demo-user',
    createdAt: firebase?.firestore?.FieldValue?.serverTimestamp?.() || Date.now(),
  };

  if (state.firebaseReady && state.currentUser && !state.currentUser.isDemo) {
    try {
      const reference = await state.db.collection('products').add(data);
      state.products.unshift({ id: reference.id, ...product });
      renderProducts();
      return;
    } catch (error) {
      console.warn('Could not save to Firestore. Saving locally.', error);
    }
  }

  state.products.unshift({ ...product, createdAt: Date.now() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.products));
  renderProducts();
}

function showApp(user) {
  state.currentUser = user;
  $('#welcomeText').textContent = user.displayName || user.email || 'สวัสดีครับ';
  loginScreen.classList.remove('active');
  appScreen.classList.add('active');
  loadProducts();
}

function showLogin() {
  appScreen.classList.remove('active');
  loginScreen.classList.add('active');
}

async function loginWithEmail(event) {
  event.preventDefault();
  const email = $('#emailInput').value.trim();
  const password = $('#passwordInput').value;

  if (!state.firebaseReady) {
    showApp({ email, displayName: email.split('@')[0], uid: 'demo-user', isDemo: true });
    return;
  }

  try {
    const result = await state.auth.signInWithEmailAndPassword(email, password);
    showApp(result.user);
  } catch (error) {
    alert(`เข้าสู่ระบบไม่สำเร็จ: ${error.message}`);
  }
}

async function loginWithGoogle() {
  if (!state.firebaseReady) {
    showApp({ email: 'demo@shopmaster.app', displayName: 'Demo User', uid: 'demo-user', isDemo: true });
    return;
  }

  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await state.auth.signInWithPopup(provider);
    showApp(result.user);
  } catch (error) {
    alert(`เข้าสู่ระบบ Google ไม่สำเร็จ: ${error.message}`);
  }
}

async function logout() {
  if (state.firebaseReady && state.currentUser && !state.currentUser.isDemo) {
    await state.auth.signOut().catch(() => {});
  }
  state.currentUser = null;
  showLogin();
}

function showView(viewName) {
  $$('.view').forEach((view) => view.classList.toggle('active', view.id === viewName));
  $$('.nav').forEach((button) => button.classList.toggle('active', button.dataset.view === viewName));
}

function openModal() { modal.classList.remove('hidden'); }
function closeModal() { modal.classList.add('hidden'); $('#productForm').reset(); }

function bindEvents() {
  $('#loginForm').addEventListener('submit', loginWithEmail);
  $('#googleLoginBtn').addEventListener('click', loginWithGoogle);
  $('#logoutBtn').addEventListener('click', logout);
  $('#openAddBtn').addEventListener('click', openModal);
  $('#openAddSecondaryBtn').addEventListener('click', openModal);
  $('#closeModalBtn').addEventListener('click', closeModal);

  $('#productForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = $('#productName').value.trim();
    const url = $('#productUrl').value.trim();
    const store = $('#productStore').value;
    if (!name || !url) return;
    await createProduct({ name, url, store });
    closeModal();
    showView('products');
  });

  $$('[data-view]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.view;
      if (target === 'home') {
        $$('.view').forEach((view) => view.classList.remove('active'));
        $$('.nav').forEach((item) => item.classList.toggle('active', item.dataset.view === 'home'));
      } else {
        showView(target);
      }
    });
  });
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
}

setupFirebase();
bindEvents();
loadLocalProducts();
registerServiceWorker();
