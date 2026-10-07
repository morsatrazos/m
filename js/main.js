// ==================== SIMULADOR HERO ====================
const scenarios = {
  cita: [
    { sender: 'user', text: 'Buenas tardes, quisiera saber si tienen turno disponible para consulta odontológica esta semana.' },
    { sender: 'bot', text: '¡Buenas tardes! Sí, tenemos disponibilidad con el especialista el jueves a las 3:30 PM o el viernes a las 10:00 AM. ¿Cuál le conviene mejor?' },
    { sender: 'user', text: 'El jueves a las 3:30 PM me queda excelente.' },
    { sender: 'bot', text: 'Perfecto. Por favor indíqueme su Nombre completo y cédula para formalizar la reserva.' },
    { sender: 'user', text: 'Carlos Mendoza, C.I. 18.452.120.' },
    { sender: 'bot', text: '¡Listo, Carlos! Su cita quedó agendada para el Jueves a las 3:30 PM.' },
    { sender: 'user', text: 'Okay, muchísimas gracias.' },
    { sender: 'bot', text: '¡A usted! Estamos a la orden, que tenga un excelente día.' }
  ],
  stock: [
    { sender: 'user', text: 'Hola, ¿tienen disponible el calzado deportivo Runner Pro en talla 41?' },
    { sender: 'bot', text: '¡Hola! Nos quedan 2 pares en talla 41 en color negro y 1 par en blanco. Su precio es de $45.' },
    { sender: 'user', text: '¿Hacen entregas hoy mismo?' },
    { sender: 'bot', text: 'Sí, contamos con delivery express para entrega el mismo día si confirma antes de las 4:00 PM.' },
    { sender: 'user', text: 'Perfecto, me quedo con el par en color negro.' },
    { sender: 'bot', text: '¡Excelente elección! Ya le transfiero con el área de despacho.' },
    { sender: 'user', text: 'Listo, gracias por la rapidez.' },
    { sender: 'bot', text: '¡Con todo gusto! Para servirle.' }
  ],
  venta: [
    { sender: 'user', text: 'Hola, me interesa implementar el sistema de IA en mi clínica, ¿cómo se cobra?' },
    { sender: 'bot', text: '¡Hola! Para clínicas recomendamos el Plan Pro de $149/mes con sincronización de citas. ¿Desea una demo guiada de 10 minutos?' },
    { sender: 'user', text: 'Sí, me gustaría que me contacten hoy mismo.' },
    { sender: 'bot', text: 'Entendido. Ya notificamos a nuestro equipo comercial para coordinar.' },
    { sender: 'user', text: 'Excelente, muchas gracias.' },
    { sender: 'bot', text: '¡Estamos para servirle! En breve le contactamos.' }
  ],
  info: [
    { sender: 'user', text: 'Hola, ¿dónde están ubicados y cuál es el horario de atención?' },
    { sender: 'bot', text: '¡Hola! Estamos en el CC Servimás, Nivel 1. De lunes a sábado de 8:30 AM a 6:00 PM corrido.' },
    { sender: 'user', text: '¿Aceptan pagos por Pago Móvil a tasa oficial?' },
    { sender: 'bot', text: 'Sí, aceptamos Pago Móvil a tasa oficial, divisas en efectivo y Zelle.' },
    { sender: 'user', text: 'Buenísimo, paso por allá en un rato.' },
    { sender: 'bot', text: '¡Será un placer recibirle! Le esperamos.' }
  ]
};

let currentTimeout = null;

function updateBubble(targetBtn) {
  const bubble = document.getElementById('tab-bubble');
  if (!bubble || !targetBtn) return;
  bubble.style.width = `${targetBtn.offsetWidth}px`;
  bubble.style.left = `${targetBtn.offsetLeft}px`;
}

function renderScenario(key) {
  if (currentTimeout) clearTimeout(currentTimeout);
  const chatBox = document.getElementById('chat-box');
  const typingIndicator = document.getElementById('typing-indicator');
  if (!chatBox) return;

  chatBox.innerHTML = '';
  const messages = scenarios[key];
  let index = 0;

  function step() {
    if (index >= messages.length) return;
    const msg = messages[index];

    if (msg.sender === 'bot') {
      typingIndicator.classList.remove('hidden');
      typingIndicator.classList.add('flex');
      currentTimeout = setTimeout(() => {
        typingIndicator.classList.add('hidden');
        typingIndicator.classList.remove('flex');
        appendMsg(msg);
        index++;
        currentTimeout = setTimeout(step, 2200);
      }, 1600);
    } else {
      appendMsg(msg);
      index++;
      currentTimeout = setTimeout(step, 1400);
    }
  }

  step();
}

function appendMsg(msg) {
  const chatBox = document.getElementById('chat-box');
  const div = document.createElement('div');
  
  if (msg.sender === 'user') {
    div.className = 'ml-auto bg-[#d9fdd3] text-slate-800 p-2.5 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm text-xs border border-[#c4e8be]';
  } else {
    div.className = 'mr-auto bg-white text-slate-800 p-2.5 rounded-2xl rounded-tl-none max-w-[85%] shadow-sm text-xs border border-slate-200';
  }
  div.innerText = msg.text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function selectScenario(key, btn) {
  document.querySelectorAll('.pill-item').forEach(b => {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  updateBubble(btn);
  renderScenario(key);
}

// ==================== SIMULADOR INBOX ====================
const inboxChats = [
  {
    name: 'Carlos Mendoza',
    meta: 'Canal: WhatsApp • +58 414-1234567 • Atendido por IA',
    badge: '✓ Agendado en Calendar',
    messages: [
      { sender: 'user', text: 'Buenas tardes, quisiera turno para consulta esta semana.' },
      { sender: 'bot', text: '¡Buenas tardes! Tenemos jueves 3:30 PM o viernes 10:00 AM.' },
      { sender: 'user', text: 'El jueves a las 3:30 PM me queda excelente. C.I. 18.452.120.' },
      { sender: 'bot', text: '¡Listo, Carlos! Su cita quedó agendada y registrada en el sistema.' }
    ]
  },
  {
    name: 'María Valenzuela',
    meta: 'Canal: Instagram Direct • @maria.val • Atendido por IA',
    badge: '⚡ Listo para Cobro',
    messages: [
      { sender: 'user', text: 'Hola! Tienen disponible las Runner Pro en 38 negras?' },
      { sender: 'bot', text: '¡Hola María! Sí, nos queda 1 par disponible en tienda. Precio: $45 con delivery gratis hoy.' },
      { sender: 'user', text: 'Me las apartas por favor? Voy a pagar por Pago Móvil.' },
      { sender: 'bot', text: '¡Apartadas! Ya te paso los datos bancarios y transfiero con despacho para tu dirección.' }
    ]
  },
  {
    name: 'Dr. Roberto Sosa',
    meta: 'Canal: Web Widget • robertososa@gmail.com • Atendido por IA',
    badge: '📄 Cotización enviada',
    messages: [
      { sender: 'user', text: 'Quisiera saber el precio para 2 sucursales de mi clínica.' },
      { sender: 'bot', text: '¡Saludos Dr. Sosa! Para 2 sedes el Plan Pro multicanal incluye sincronización simultánea por $149/mes.' },
      { sender: 'user', text: 'Excelente, ¿cómo coordinamos la configuración?' }
    ]
  }
];

function loadInboxChat(index, element) {
  document.querySelectorAll('.inbox-card').forEach(c => c.classList.remove('active'));
  if (element) element.classList.add('active');

  const chat = inboxChats[index];
  document.getElementById('inbox-chat-name').innerText = chat.name;
  document.getElementById('inbox-chat-meta').innerText = chat.meta;
  document.getElementById('inbox-chat-badge').innerText = chat.badge;

  const container = document.getElementById('inbox-messages-container');
  container.innerHTML = '';

  chat.messages.forEach(m => {
    const row = document.createElement('div');
    if (m.sender === 'user') {
      row.className = 'ml-auto bg-slate-100 text-slate-800 p-2.5 rounded-2xl rounded-tr-none max-w-[80%]';
    } else {
      row.className = 'mr-auto bg-[#00e0ba]/15 text-[#021f1a] p-2.5 rounded-2xl rounded-tl-none max-w-[80%] border border-[#00e0ba]/30 font-medium';
    }
    row.innerText = m.text;
    container.appendChild(row);
  });
}

// ==================== ANIMACIÓN DE MÉTRICAS EN SCROLL ====================
let metricsAnimated = false;

function initMetricsAnimation() {
  const metricsSection = document.getElementById('metrics-grid');
  if (!metricsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !metricsAnimated) {
        metricsAnimated = true;
        
        // Revelar tarjetas
        document.querySelectorAll('.metric-card-animated').forEach(card => {
          card.classList.add('visible');
        });

        // Barra de progreso canal
        const progressBar = document.getElementById('channel-progress');
        if (progressBar) progressBar.style.width = '68%';

        // Contadores numéricos progresivos
        document.querySelectorAll('.counter-val').forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isDecimal = counter.getAttribute('data-decimal') === '1';
          const duration = 1200;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            const currentVal = ease * target;

            counter.innerText = isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal);

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = isDecimal ? target.toFixed(1) : target;
            }
          }
          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.25 });

  observer.observe(metricsSection);
}

// ==================== TOGGLE DE PRECIOS MENSUAL / ANUAL ====================
const pricingData = {
  monthly: {
    starter: { price: '$49', period: '/mes USD', note: '+ Setup inicial de $99 USD' },
    pro: { price: '$149', period: '/mes USD', note: '+ Setup inicial de $199 USD' },
    business: { price: '$299', period: '/mes USD', note: '+ Setup inicial de $599 USD' }
  },
  annual: {
    starter: { price: '$40', period: '/mes USD ($490 al año)', note: '2 meses gratis • Setup bonificado' },
    pro: { price: '$124', period: '/mes USD ($1.490 al año)', note: '2 meses gratis • Setup bonificado' },
    business: { price: '$249', period: '/mes USD ($2.990 al año)', note: '2 meses gratis • Setup bonificado' }
  }
};

function setBillingPeriod(period, btn) {
  document.querySelectorAll('.billing-toggle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const data = pricingData[period];
  document.getElementById('price-starter').innerText = data.starter.price;
  document.getElementById('period-starter').innerText = data.starter.period;
  document.getElementById('note-starter').innerText = data.starter.note;

  document.getElementById('price-pro').innerText = data.pro.price;
  document.getElementById('period-pro').innerText = data.pro.period;
  document.getElementById('note-pro').innerText = data.pro.note;

  document.getElementById('price-business').innerText = data.business.price;
  document.getElementById('period-business').innerText = data.business.period;
  document.getElementById('note-business').innerText = data.business.note;
}

// Control del botón flotante para volver arriba
window.addEventListener('scroll', () => {
  const btnScrollTop = document.getElementById('btn-scroll-top');
  if (!btnScrollTop) return;
  if (window.scrollY > 450) {
    btnScrollTop.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    btnScrollTop.classList.add('opacity-100', 'translate-y-0');
  } else {
    btnScrollTop.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
    btnScrollTop.classList.remove('opacity-100', 'translate-y-0');
  }
});

// ==================== INICIALIZACIÓN ====================
window.addEventListener('DOMContentLoaded', () => {
  const activeBtn = document.querySelector('.pill-item.active');
  updateBubble(activeBtn);
  renderScenario('cita');
  loadInboxChat(0);
  initMetricsAnimation();
});

window.addEventListener('resize', () => {
  const activeBtn = document.querySelector('.pill-item.active');
  updateBubble(activeBtn);
});

// Rotación automática entre los chats del inbox
let currentInboxIndex = 0;
let inboxAutoRotateTimer = null;
let inboxResumeTimeout = null;

function startInboxAutoRotate() {
  if (inboxAutoRotateTimer) clearInterval(inboxAutoRotateTimer);
  inboxAutoRotateTimer = setInterval(() => {
    currentInboxIndex = (currentInboxIndex + 1) % inboxChats.length;
    const targetCard = document.querySelectorAll('.inbox-card')[currentInboxIndex];
    loadInboxChat(currentInboxIndex, targetCard);
  }, 4500);
}

// Modificar loadInboxChat para actualizar el índice y pausar/reiniciar rotación al clic manual
const originalLoadInboxChat = loadInboxChat;
loadInboxChat = function(index, element) {
  currentInboxIndex = index;
  originalLoadInboxChat(index, element);
};

// Pausar rotación si el usuario interactúa manualmente
document.querySelectorAll('.inbox-card').forEach((card, idx) => {
  card.addEventListener('click', () => {
    clearInterval(inboxAutoRotateTimer);
    if (inboxResumeTimeout) clearTimeout(inboxResumeTimeout);
    // Reinicia el ciclo 8 segundos después del clic manual
    inboxResumeTimeout = setTimeout(startInboxAutoRotate, 8000);
  });
});

// Iniciar rotación en la carga
window.addEventListener('DOMContentLoaded', () => {
  startInboxAutoRotate();
});
