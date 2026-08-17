/**
 * ==========================================================================
 * MOOFIN - LÓGICA DE INTERACCIÓN Y NAVEGACIÓN
 * ==========================================================================
 */

let currentSlide = 0;
const totalSlides = 6;
let currentBilling = 'monthly';

/**
 * Navega a una diapositiva específica por índice (0-5)
 * @param {number} index - Índice de la diapositiva
 */
function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    currentSlide = index;

    const slideElement = document.getElementById(`slide-${index + 1}`);
    if (slideElement) {
        slideElement.scrollIntoView({ behavior: 'smooth' });
    }

    const currentSlideNum = document.getElementById('current-slide-num');
    if (currentSlideNum) {
        currentSlideNum.innerText = currentSlide + 1;
    }

    updatePillNav();
}

/**
 * Avanza a la siguiente diapositiva
 */
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    }
}

/**
 * Retrocede a la diapositiva anterior
 */
function prevSlide() {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
}

/**
 * Actualiza el estado visual activo de las píldoras de navegación
 */
function updatePillNav() {
    const pills = document.querySelectorAll('.nav-pill');
    pills.forEach((pill, idx) => {
        if (idx === currentSlide) {
            pill.classList.add('bg-teal-500', 'text-slate-950', 'font-bold');
            pill.classList.remove('text-slate-300', 'hover:bg-slate-800');
            pill.setAttribute('aria-current', 'page');
        } else {
            pill.classList.remove('bg-teal-500', 'text-slate-950', 'font-bold');
            pill.classList.add('text-slate-300', 'hover:bg-slate-800');
            pill.removeAttribute('aria-current');
        }
    });
}

/**
 * Cambia el tipo de facturación (mensual vs anual)
 * @param {'monthly' | 'annual'} mode - Modalidad de facturación seleccionada
 */
function setBilling(mode) {
    currentBilling = mode;
    const btnMonthly = document.getElementById('btn-monthly');
    const btnAnnual = document.getElementById('btn-annual');
    const setupProPrice = document.getElementById('setup-pro-price');
    const setupBusPrice = document.getElementById('setup-business-price');

    if (!btnMonthly || !btnAnnual || !setupProPrice || !setupBusPrice) return;

    if (mode === 'annual') {
        btnAnnual.className = 'px-4 py-2 rounded-full text-xs font-bold transition-all bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 shadow-md';
        btnMonthly.className = 'px-4 py-2 rounded-full text-xs font-bold transition-all text-slate-400 hover:text-white';
        
        setupProPrice.innerHTML = '<span class="line-through text-slate-500 mr-1.5">$299</span> <strong class="text-teal-300">¡$0 GRATIS!</strong>';
        setupBusPrice.innerHTML = '<strong class="text-teal-300">¡GRATIS en Pago Anual!</strong>';
    } else {
        btnMonthly.className = 'px-4 py-2 rounded-full text-xs font-bold transition-all bg-slate-800 text-white';
        btnAnnual.className = 'px-4 py-2 rounded-full text-xs font-bold transition-all text-slate-400 hover:text-white';

        setupProPrice.innerText = '$299 USD';
        setupBusPrice.innerText = 'A Consultar';
    }
}

/**
 * Alterna la apertura/cierre de una pregunta frecuente (acordeón)
 * @param {HTMLElement} button - Botón que activó el acordeón
 */
function toggleFaq(button) {
    const faqItem = button.parentElement;
    if (!faqItem) return;

    const answer = faqItem.querySelector('.faq-answer');
    const icon = button.querySelector('i');
    if (!answer || !icon) return;

    const isExpanded = !answer.classList.contains('hidden');

    if (isExpanded) {
        answer.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
        button.setAttribute('aria-expanded', 'false');
    } else {
        answer.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
        button.setAttribute('aria-expanded', 'true');
    }
}

// Event Listeners y configuración inicial
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar píldoras activas
    updatePillNav();

    // Atajos de teclado para controlar diapositivas
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
            nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            prevSlide();
        }
    });

    // Observer para actualizar el número de slide al hacer scroll manual
    const slides = document.querySelectorAll('section[id^="slide-"]');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const slideId = entry.target.id;
                    const index = parseInt(slideId.replace('slide-', ''), 10) - 1;
                    if (!isNaN(index) && index !== currentSlide) {
                        currentSlide = index;
                        const currentSlideNum = document.getElementById('current-slide-num');
                        if (currentSlideNum) {
                            currentSlideNum.innerText = currentSlide + 1;
                        }
                        updatePillNav();
                    }
                }
            });
        }, { threshold: 0.5 });

        slides.forEach(slide => observer.observe(slide));
    }
});
