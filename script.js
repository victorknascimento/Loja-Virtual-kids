/**
 * WONDER KIDS - Integração com Firebase
 * O código agora conecta a um banco de dados real.
 */

// --- 1. CONFIGURAÇÃO DO FIREBASE (VOCÊ PRECISA COLAR SUAS CHAVES AQUI) ---
// Siga as instruções fornecidas no chat para pegar essas chaves no console.firebase.google.com
const firebaseConfig = {
    apiKey: "SUA_API_KEY_AQUI",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
};

// Inicializar Firebase (Verifica se já não foi inicializado para evitar erros)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // se já existe, usa o padrão
}

const db = firebase.firestore();

// --- CONSTANTES ---
const CONSTANTS = {
    STORE_PHONE: "5585999195930",
    OPERATING_HOURS: {
        morning: { start: 8, end: 12 },
        afternoon: { start: 14, end: 18 },
    }
};

// --- ESTADO DA APLICAÇÃO ---
const state = {
    currentUser: null,
    products: [],
    cart: [],
    users: [],
    orders: [],
    isStoreOpen: false
};

// --- SERVIÇOS LOCAL STORAGE (Apenas para Carrinho e Sessão local) ---
const Storage = {
    get: (key, def) => {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : def;
    },
    set: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
};

// --- UTILITÁRIOS ---
const Utils = {
    fileToBase64: (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
};

// --- LÓGICA PRINCIPAL ---
const app = {
    init: () => {
        // 1. Ouvinte em Tempo Real do Banco de Dados (Produtos)
        // Isso substitui o LocalStorage. Sempre que mudar no banco, muda aqui.
        db.collection("products").onSnapshot((querySnapshot) => {
            state.products = [];
            querySnapshot.forEach((doc) => {
                state.products.push({ id: doc.id, ...doc.data() });
            });
            
            // Remove loading e renderiza
            const loadingEl = document.getElementById('loading-products');
            if(loadingEl) loadingEl.style.display = 'none';
            
            app.renderHome();
            // Se estiver no admin, atualiza tabela também
            if(!document.getElementById('view-admin').classList.contains('hidden')) {
                app.renderAdminProducts();
            }
        }, (error) => {
            console.error("Erro ao conectar banco:", error);
            // Fallback se as chaves estiverem erradas
            alert("Atenção: Configure as chaves do Firebase no arquivo script.js para que o banco funcione.");
        });

        // 2. Ouvinte de Pedidos (Opcional - só para admin ver chegando)
        db.collection("orders").onSnapshot((querySnapshot) => {
            state.orders = [];
            querySnapshot.forEach((doc) => {
                state.orders.push({ id: doc.id, ...doc.data() });
            });
            if(!document.getElementById('view-admin').classList.contains('hidden')) {
                app.renderAdminOrders();
            }
        });

        // Carregar Usuários Locais (Ainda vamos usar LocalStorage para User Auth simplificado por enquanto)
        state.users = Storage.get('users', []);
        if (state.users.length === 0) {
            state.users.push({ id: 'admin001', name: 'Admin', phone: '5585999195930', role: 'ADMIN' });
            Storage.set('users', state.users);
        }

        // Recuperar Sessão e Carrinho local
        state.cart = Storage.get('cart', []);
        const sessionUser = sessionStorage.getItem('currentUser');
        if (sessionUser) {
            state.currentUser = JSON.parse(sessionUser);
        }

        // Verificar horário
        app.checkStoreStatus();
        setInterval(app.checkStoreStatus, 60000);

        // Renderizar inicial
        app.updateHeader();
        app.router('home');
    },

    // --- ROTEAMENTO ---
    router: (viewName) => {
        document.querySelectorAll('.view').forEach(el => el.classList.add('hidden'));
        
        if ((viewName === 'checkout' || viewName === 'admin') && !state.currentUser) {
            return app.router('login');
        }
        if (viewName === 'admin' && state.currentUser.role !== 'ADMIN') {
            return app.router('home');
        }

        const target = document.getElementById(`view-${viewName}`);
        if (target) {
            target.classList.remove('hidden');
            window.scrollTo(0, 0);
        }

        if (viewName === 'home') app.renderHome();
        if (viewName === 'cart') app.renderCart();
        if (viewName === 'checkout') app.renderCheckout();
        if (viewName === 'admin') {
            app.renderAdminProducts();
            app.switchAdminTab('products');
        }
    },

    checkStoreStatus: () => {
        const now = new Date();
        const hour = now.getHours();
        const { morning, afternoon } = CONSTANTS.OPERATING_HOURS;
        state.isStoreOpen = (hour >= morning.start && hour < morning.end) || 
                           (hour >= afternoon.start && hour < afternoon.end);
    },

    showToast: (message) => {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.innerText = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    },

    // --- AUTH (Mantido Local por simplicidade da migração) ---
    handleLogin: (e) => {
        e.preventDefault();
        const phone = document.getElementById('login-phone').value;
        const user = state.users.find(u => u.phone === phone);
        
        if (user) {
            state.currentUser = user;
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            app.updateHeader();
            app.router('home');
        } else {
            document.getElementById('login-error').innerText = 'Telefone não encontrado.';
            document.getElementById('login-error').classList.remove('hidden');
        }
    },

    handleRegister: (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value;
        const phone = document.getElementById('reg-phone').value;

        if (state.users.some(u => u.phone === phone)) {
            const err = document.getElementById('register-error');
            err.innerText = 'Telefone já cadastrado.';
            err.classList.remove('hidden');
            return;
        }

        const newUser = { id: Date.now().toString(), name, phone, role: 'CUSTOMER' };
        state.users.push(newUser);
        Storage.set('users', state.users);
        
        alert('Cadastro realizado! Faça login.');
        app.router('login');
    },

    logout: () => {
        state.currentUser = null;
        sessionStorage.removeItem('currentUser');
        app.updateHeader();
        app.router('home');
    },

    updateHeader: () => {
        const loginBtn = document.getElementById('btn-login-nav');
        const userArea = document.getElementById('user-logged-in');
        const userNameDisplay = document.getElementById('user-name-display');
        const navAdmin = document.getElementById('nav-admin');
        const cartCount = document.getElementById('cart-count');

        if (state.currentUser) {
            loginBtn.classList.add('hidden');
            userArea.classList.remove('hidden');
            userNameDisplay.innerText = state.currentUser.name.split(' ')[0];
            
            if (state.currentUser.role === 'ADMIN') {
                navAdmin.classList.remove('hidden');
            } else {
                navAdmin.classList.add('hidden');
            }
        } else {
            loginBtn.classList.remove('hidden');
            userArea.classList.add('hidden');
            navAdmin.classList.add('hidden');
        }

        const totalItems = state.cart.reduce((acc, item) => acc + item.quantity, 0);
        cartCount.innerText = totalItems;
        if (totalItems > 0) cartCount.classList.remove('hidden');
        else cartCount.classList.add('hidden');
    },

    // --- RENDERIZAÇÃO PRODUTOS ---
    renderHome: () => {
        const grid = document.getElementById('products-grid');
        
        if (state.products.length === 0) {
            // Se estiver vazio e não carregando, pode não ter produtos no banco ainda
            grid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Nenhum produto cadastrado ainda.</p>';
            return;
        }

        grid.innerHTML = state.products.map(p => `
            <div class="product-card">
                <img src="${p.imageUrl}" alt="${p.name}" loading="lazy">
                <div class="card-body">
                    <h3>${p.name}</h3>
                    <div class="card-footer">
                        <span class="price">R$ ${parseFloat(p.price).toFixed(2).replace('.', ',')}</span>
                        <button class="btn-primary" onclick="app.addToCart('${p.id}')">
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // --- CARRINHO ---
    addToCart: (id) => {
        if (!state.isStoreOpen) {
            const { morning, afternoon } = CONSTANTS.OPERATING_HOURS;
            alert(`A LOJA ESTÁ FECHADA AGORA!\n\nAtendimento:\n${morning.start}h às ${morning.end}h\n${afternoon.start}h às ${afternoon.end}h\n\nAguardamos você!`);
        }

        const product = state.products.find(p => p.id === id);
        if(!product) return;

        const existing = state.cart.find(item => item.id === id);
        
        if (existing) {
            existing.quantity++;
        } else {
            // Garante que o preço seja número
            state.cart.push({ ...product, price: parseFloat(product.price), quantity: 1 });
        }
        
        Storage.set('cart', state.cart);
        app.updateHeader();
        app.showToast('Produto adicionado ao carrinho!');
    },

    renderCart: () => {
        const container = document.getElementById('cart-items-container');
        const summary = document.getElementById('cart-summary');
        
        if (state.cart.length === 0) {
            container.innerHTML = '<p class="text-center">Seu carrinho está vazio.</p>';
            summary.classList.add('hidden');
            return;
        }

        summary.classList.remove('hidden');
        container.innerHTML = state.cart.map(item => `
            <div class="cart-item">
                <div style="display:flex; align-items:center;">
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <div class="cart-info">
                        <strong>${item.name}</strong><br>
                        <small>R$ ${item.price.toFixed(2).replace('.', ',')}</small>
                    </div>
                </div>
                <div class="cart-actions">
                    <input type="number" class="qty-input" min="1" value="${item.quantity}" 
                        onchange="app.updateCartQty('${item.id}', this.value)">
                    <span>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                    <button class="btn-remove" onclick="app.removeFromCart('${item.id}')">X</button>
                </div>
            </div>
        `).join('');

        const total = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        document.getElementById('cart-total').innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    },

    updateCartQty: (id, qty) => {
        const val = parseInt(qty);
        if (val < 1) return app.removeFromCart(id);
        const item = state.cart.find(i => i.id === id);
        if (item) item.quantity = val;
        Storage.set('cart', state.cart);
        app.renderCart();
        app.updateHeader();
    },

    removeFromCart: (id) => {
        state.cart = state.cart.filter(i => i.id !== id);
        Storage.set('cart', state.cart);
        app.renderCart();
        app.updateHeader();
    },

    // --- CHECKOUT ---
    renderCheckout: () => {
        const summaryDiv = document.getElementById('checkout-summary');
        const total = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        summaryDiv.innerHTML = state.cart.map(item => `
            <div class="flex-between" style="margin-bottom:0.5rem; font-size:0.9rem;">
                <span>${item.quantity}x ${item.name}</span>
                <span>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
            </div>
        `).join('') + `
        <div class="flex-between" style="border-top:1px solid #ccc; margin-top:1rem; padding-top:1rem; font-weight:bold;">
            <span>Total</span>
            <span>R$ ${total.toFixed(2).replace('.', ',')}</span>
        </div>`;
    },

    handleCheckout: async (e) => {
        e.preventDefault();
        const street = document.getElementById('addr-street').value;
        const city = document.getElementById('addr-city').value;
        const total = state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        const order = {
            userId: state.currentUser.id,
            customerName: state.currentUser.name,
            customerPhone: state.currentUser.phone,
            items: state.cart,
            total,
            address: { street, city },
            timestamp: new Date().toISOString()
        };

        // Salvar pedido no Banco de Dados
        try {
            await db.collection("orders").add(order);
        } catch(err) {
            console.error("Erro ao salvar pedido no banco", err);
        }

        // WhatsApp Link
        const itemsText = state.cart.map(i => `${i.quantity}x ${i.name}`).join('%0A');
        const msg = `Olá! Novo pedido:%0A%0A${itemsText}%0A%0ATotal: R$ ${total.toFixed(2)}%0A%0AEntregar em:%0A${street}, ${city}%0A%0ACliente: ${state.currentUser.name}`;
        window.open(`https://wa.me/${CONSTANTS.STORE_PHONE}?text=${msg}`, '_blank');

        state.cart = [];
        Storage.set('cart', []);
        app.updateHeader();
        app.router('confirmation');
    },

    // --- ADMIN ---
    switchAdminTab: (tab) => {
        document.querySelectorAll('.admin-section').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.btn-tab').forEach(el => el.classList.remove('active'));
        document.getElementById(`admin-tab-${tab}`).classList.remove('hidden');
        const buttons = document.querySelectorAll('.btn-tab');
        if(tab === 'products') buttons[0].classList.add('active');
        if(tab === 'orders') { buttons[1].classList.add('active'); app.renderAdminOrders(); }
        if(tab === 'users') { buttons[2].classList.add('active'); app.renderAdminUsers(); }
        if(tab === 'reports') buttons[3].classList.add('active');
    },

    renderAdminProducts: () => {
        const tbody = document.getElementById('admin-products-list');
        tbody.innerHTML = state.products.map(p => `
            <tr>
                <td><img src="${p.imageUrl}" alt="img"></td>
                <td>${p.name}</td>
                <td>R$ ${parseFloat(p.price).toFixed(2)}</td>
                <td>
                    <button class="btn-text-light" style="color:blue;" onclick="app.editProduct('${p.id}')">Editar</button>
                    <button class="btn-text-light" style="color:red;" onclick="app.deleteProduct('${p.id}')">Excluir</button>
                </td>
            </tr>
        `).join('');
    },

    openProductModal: (product = null) => {
        const modal = document.getElementById('modal-product');
        modal.classList.remove('hidden');
        const preview = document.getElementById('prod-image-preview');
        
        document.getElementById('prod-image-file').value = '';
        document.getElementById('prod-image-url').value = '';

        if (product) {
            document.getElementById('prod-id').value = product.id;
            document.getElementById('prod-name').value = product.name;
            document.getElementById('prod-category').value = product.category;
            document.getElementById('prod-price').value = product.price;
            document.getElementById('prod-desc').value = product.description;
            document.getElementById('prod-image-current').value = product.imageUrl;
            
            if (product.imageUrl.startsWith('http')) document.getElementById('prod-image-url').value = product.imageUrl;
            preview.src = product.imageUrl;
            preview.classList.add('visible');
        } else {
            document.getElementById('prod-id').value = '';
            document.getElementById('prod-name').value = '';
            document.getElementById('prod-category').value = 'Meninas';
            document.getElementById('prod-price').value = '';
            document.getElementById('prod-desc').value = '';
            document.getElementById('prod-image-current').value = '';
            preview.classList.remove('visible');
            preview.src = '';
        }
    },

    handleSaveProduct: async (e) => {
        e.preventDefault();
        const id = document.getElementById('prod-id').value;
        const fileInput = document.getElementById('prod-image-file');
        const urlInput = document.getElementById('prod-image-url');
        let finalImageUrl = document.getElementById('prod-image-current').value;

        if (urlInput.value && urlInput.value.trim() !== '') {
             finalImageUrl = urlInput.value.trim();
        } else if (fileInput.files && fileInput.files[0]) {
            try {
                finalImageUrl = await Utils.fileToBase64(fileInput.files[0]);
            } catch (err) {
                alert('Erro ao processar arquivo'); return;
            }
        } else if (!finalImageUrl) {
            finalImageUrl = 'https://via.placeholder.com/400';
        }

        const prodData = {
            name: document.getElementById('prod-name').value,
            category: document.getElementById('prod-category').value,
            price: parseFloat(document.getElementById('prod-price').value),
            imageUrl: finalImageUrl,
            description: document.getElementById('prod-desc').value,
        };

        // --- SALVAR NO FIREBASE ---
        try {
            if (id) {
                // Atualizar
                await db.collection("products").doc(id).update(prodData);
            } else {
                // Criar Novo
                await db.collection("products").add(prodData);
            }
            document.getElementById('modal-product').classList.add('hidden');
            app.showToast("Produto salvo no Banco de Dados!");
            // Não precisa chamar renderAdminProducts(), o "onSnapshot" fará isso automaticamente
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao salvar. Verifique se copiou as chaves do Firebase corretamente no script.js");
        }
    },

    editProduct: (id) => {
        const p = state.products.find(i => i.id === id);
        if(p) app.openProductModal(p);
    },

    deleteProduct: async (id) => {
        if(confirm('Excluir este produto?')) {
            try {
                await db.collection("products").doc(id).delete();
                app.showToast("Produto removido.");
            } catch (error) {
                console.error("Erro ao deletar:", error);
                alert("Erro ao deletar.");
            }
        }
    },

    renderAdminOrders: () => {
        const container = document.getElementById('admin-orders-list');
        if (state.orders.length === 0) {
            container.innerHTML = '<p>Sem pedidos.</p>';
            return;
        }
        // Ordenar por data
        const sorted = [...state.orders].sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        container.innerHTML = sorted.map(o => `
            <div class="card" style="margin-bottom:1rem;">
                <div class="flex-between">
                    <strong>Pedido via App</strong>
                    <strong>R$ ${o.total.toFixed(2)}</strong>
                </div>
                <small>${new Date(o.timestamp).toLocaleString()}</small>
                <p>Cliente: ${o.customerName} (${o.customerPhone})</p>
                <p>Endereço: ${o.address.street}, ${o.address.city}</p>
                <ul style="margin-top:0.5rem; padding-left:1rem;">
                    ${o.items.map(i => `<li>${i.quantity}x ${i.name}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    },

    renderAdminUsers: () => {
        const tbody = document.getElementById('admin-users-list');
        tbody.innerHTML = state.users.map(u => `
            <tr>
                <td>${u.name}</td>
                <td>${u.phone}</td>
                <td>${u.role}</td>
            </tr>
        `).join('');
    },

    exportUsersToExcel: () => {
        const headers = ['Nome', 'Telefone', 'Perfil', 'ID'];
        const rows = state.users.map(u => [u.name, u.phone, u.role, u.id]);
        let csvContent = '\uFEFF' + headers.join(';') + '\n';
        rows.forEach(row => { csvContent += row.join(';') + '\n'; });
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `clientes_jujukids.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

document.addEventListener('DOMContentLoaded', app.init);