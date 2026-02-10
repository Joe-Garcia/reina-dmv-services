'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Navigation ---
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  function openMenu() {
    navToggle.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
      navToggle.focus();
    }
  });

  // --- Sticky Header & Mobile CTA ---
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');
  const mobileCTA = document.querySelector('.mobile-cta');

  if (hero) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          header.classList.toggle('scrolled', !entry.isIntersecting);
          if (mobileCTA) {
            mobileCTA.classList.toggle('visible', !entry.isIntersecting);
          }
        });
      },
      { threshold: 0.1 }
    );
    heroObserver.observe(hero);
  }

  // --- Active Section Highlighting ---
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          allNavLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    {
      rootMargin: '-80px 0px -60% 0px',
    }
  );

  sections.forEach(section => sectionObserver.observe(section));

  // --- FAQ Accordion (single-open behavior) ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(other => {
          if (other !== item && other.open) {
            other.open = false;
          }
        });
      }
    });
  });

  // --- Scroll-Triggered Animations ---
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    animatedElements.forEach(el => el.classList.add('visible'));
  } else {
    const animObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    animatedElements.forEach(el => animObserver.observe(el));
  }

  // --- Dynamic Copyright Year ---
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- Language Translation (English / Spanish) ---
  const translations = {
    es: {
      // Navigation
      'nav.services': 'Servicios',
      'nav.areas': '\u00C1reas',
      'nav.how': 'C\u00F3mo Funciona',
      'nav.about': 'Nosotros',
      'nav.faq': 'Preguntas',
      'nav.call': '<i class="fa-solid fa-phone" aria-hidden="true"></i> Ll\u00E1menos',

      // Hero
      'hero.subtitle': 'Servicios de DMV con Licencia en 4 Estados',
      'hero.title': 'Evite las Filas.<br>Nosotros Nos Encargamos del DMV.',
      'hero.desc': 'Desde registros de veh\u00EDculos hasta transferencias de t\u00EDtulos, Reina DMV Services se encarga de todo \u2014 para que usted no tenga que hacerlo. Sirviendo en Nueva York, Florida, Nueva Jersey y Virginia.',
      'hero.cta': '<i class="fa-solid fa-phone" aria-hidden="true"></i> Llame para Programar: (516) 554-1144',
      'hero.cta2': 'Ver Nuestros Servicios',
      'hero.badge1': 'Licenciado y Asegurado',
      'hero.badge2': 'Servicio el Mismo D\u00EDa',
      'hero.badge3': '4 Estados Cubiertos',

      // Services
      'services.title': 'Nuestros Servicios',
      'services.subtitle': 'Ofrecemos una gama completa de servicios de DMV para ahorrarle tiempo y molestias.',
      'svc.1.title': 'Registros Originales',
      'svc.1.desc': '\u00BFRegistrando un veh\u00EDculo por primera vez? Nos encargamos de todo el papeleo y obtenemos sus placas r\u00E1pidamente.',
      'svc.2.title': 'Re-Registros',
      'svc.2.desc': '\u00BFRegistro vencido? Lo re-registraremos y lo pondremos legal en la carretera nuevamente.',
      'svc.3.title': 'Registros Duplicados',
      'svc.3.desc': '\u00BFNecesita un documento de registro de reemplazo? Procesamos duplicados r\u00E1pida y precisamente.',
      'svc.4.title': 'T\u00EDtulos Duplicados',
      'svc.4.desc': '\u00BFT\u00EDtulo perdido o da\u00F1ado? Le aseguraremos un t\u00EDtulo duplicado como prueba de propiedad.',
      'svc.5.title': 'Entrega de Placas',
      'svc.5.desc': '\u00BFDevolviendo placas al DMV? Manejamos el proceso de entrega y proporcionamos confirmaci\u00F3n.',
      'svc.6.title': 'Reemplazo de Placas Robadas o Perdidas',
      'svc.6.desc': '\u00BFPlacas robadas o extraviadas? Agilizamos las placas de reemplazo para que vuelva a la carretera r\u00E1pidamente.',
      'svc.7.title': 'Solo T\u00EDtulos',
      'svc.7.desc': '\u00BFNecesita un t\u00EDtulo sin registro? Procesamos transacciones de solo t\u00EDtulo para todo tipo de veh\u00EDculos.',
      'svc.8.title': 'Registros de Camiones 18 Ruedas',
      'svc.8.desc': '\u00BFNecesita registrar un cami\u00F3n o trailer de 18 ruedas? Manejamos registros de veh\u00EDculos comerciales en los cuatro estados.',
      'svc.9.title': 'Renovaci\u00F3n de Registros',
      'svc.9.desc': 'Evite multas y etiquetas vencidas. Procesamos la renovaci\u00F3n de su registro antes de que expire.',
      'svc.10.title': 'Transacciones de Embarcaciones',
      'svc.10.desc': '\u00BFRegistrando o titulando un bote? Manejamos transacciones de embarcaciones en los cuatro estados.',
      'svc.11.title': 'Registros Enmendados',
      'svc.11.desc': '\u00BFCambio de nombre, actualizaci\u00F3n de direcci\u00F3n o correcci\u00F3n necesaria? Presentamos registros enmendados r\u00E1pidamente.',

      // Service Areas
      'areas.title': 'D\u00F3nde Servimos',
      'areas.subtitle': 'Servicios profesionales de DMV disponibles en cuatro estados.',
      'areas.served': 'Todos los condados',
      'areas.callout': '\u00BFNo ve su estado? <a href="tel:+15165541144">Ll\u00E1menos</a> \u2014 \u00A1a\u00FAn podr\u00EDamos ayudarle!',

      // How It Works
      'how.title': 'C\u00F3mo Funciona',
      'how.subtitle': 'Resolver sus necesidades del DMV es tan f\u00E1cil como 1-2-3.',
      'how.s1.title': 'Llame o Env\u00EDe un Texto',
      'how.s1.desc': 'Comun\u00EDquese al (516) 554-1144 y d\u00EDganos qu\u00E9 servicio de DMV necesita. Lo guiaremos a trav\u00E9s del proceso.',
      'how.s2.title': 'Env\u00EDe Sus Documentos',
      'how.s2.desc': 'Proporcione la documentaci\u00F3n requerida. Le diremos exactamente lo que se necesita \u2014 sin adivinar, sin confusi\u00F3n.',
      'how.s3.title': 'Nosotros Hacemos el Resto',
      'how.s3.desc': 'Rel\u00E1jese mientras nos encargamos de todo en el DMV. Recibir\u00E1 sus documentos r\u00E1pidamente.',
      'how.cta': '<i class="fa-solid fa-phone" aria-hidden="true"></i> Comience Ahora',

      // About
      'about.title': 'Sobre Reina DMV Services',
      'about.p1': 'Reina DMV Services fue fundada con una misi\u00F3n simple: ahorrarle el tiempo, el estr\u00E9s y la frustraci\u00F3n de lidiar con el DMV usted mismo.',
      'about.p2': 'Somos un proveedor de servicios de DMV m\u00F3vil y con licencia que opera en Nueva York, Florida, Nueva Jersey y Virginia. Ya sea que necesite un nuevo registro, un t\u00EDtulo duplicado o una entrega de placas, manejamos todo de forma remota \u2014 para que nunca tenga que pisar una oficina del DMV.',
      'about.p3': 'Con más de 10 a\u00F1os de experiencia navegando los procesos del DMV, sabemos exactamente lo que se necesita para procesar su papeleo r\u00E1pida y correctamente. Sin viajes innecesarios, sin largas filas, sin dolores de cabeza.',
      'about.f1': 'Licenciado y asegurado',
      'about.f2': 'Más de 10 a\u00F1os de experiencia en la industria del DMV',
      'about.f3': 'Sirviendo 4 estados',
      'about.f4': 'Cientos de clientes satisfechos',

      // FAQ
      'faq.title': 'Preguntas Frecuentes',
      'faq.subtitle': 'Respuestas r\u00E1pidas a preguntas comunes sobre nuestros servicios de DMV.',
      'faq.q1': '\u00BFQu\u00E9 servicios de DMV ofrecen?',
      'faq.a1': 'Ofrecemos una gama completa de servicios de DMV incluyendo registros originales, re-registros, registros duplicados, t\u00EDtulos duplicados, entrega de placas, reemplazo de placas robadas o perdidas, transacciones de solo t\u00EDtulo, registros de camiones 18 ruedas, renovaci\u00F3n de registros, transacciones de embarcaciones y registros enmendados.',
      'faq.q2': '\u00BFEn qu\u00E9 estados operan?',
      'faq.a2': 'Actualmente servimos en Nueva York, Florida, Nueva Jersey y Virginia. Si est\u00E1 en otro estado, ll\u00E1menos \u2014 podr\u00EDamos ayudarle o indicarle la direcci\u00F3n correcta.',
      'faq.q3': '\u00BFNecesito ir al DMV personalmente?',
      'faq.a3': 'No. Ese es el prop\u00F3sito de nuestro servicio. Nos encargamos de todas las visitas al DMV y el papeleo en su nombre para que nunca tenga que esperar en fila.',
      'faq.q4': '\u00BFCu\u00E1nto tiempo toma el proceso?',
      'faq.a4': 'Los tiempos var\u00EDan seg\u00FAn el servicio y el estado, pero la mayor\u00EDa de las transacciones se completan en unos pocos d\u00EDas h\u00E1biles. Algunos servicios como renovaciones de registro pueden manejarse el mismo d\u00EDa. Ll\u00E1menos para un estimado espec\u00EDfico.',
      'faq.q5': '\u00BFQu\u00E9 documentos necesito proporcionar?',
      'faq.a5': 'Los documentos requeridos dependen del servicio espec\u00EDfico. Cuando nos llame, le proporcionaremos una lista clara de exactamente lo que se necesita \u2014 sin adivinar.',
      'faq.q6': '\u00BFCu\u00E1nto cuestan sus servicios?',
      'faq.a6': 'Nuestras tarifas var\u00EDan seg\u00FAn el tipo de servicio y los requisitos del estado. Ll\u00E1menos al <a href="tel:+15165541144">(516) 554-1144</a> para una cotizaci\u00F3n gratuita y sin cargos ocultos.',
      'faq.q7': '\u00BFManejan registros y t\u00EDtulos de embarcaciones?',
      'faq.a7': 'S\u00ED. Procesamos transacciones de embarcaciones y veh\u00EDculos marinos incluyendo registros, t\u00EDtulos y renovaciones en los cuatro estados que servimos.',
      'faq.q8': '\u00BFCu\u00E1l es su horario de atenci\u00F3n?',
      'faq.a8': 'Estamos disponibles de lunes a s\u00E1bado, de 9:00 AM a 6:00 PM hora del Este. Ll\u00E1menos o env\u00EDe un texto en cualquier momento durante el horario de atenci\u00F3n.',
      'faq.q9': '\u00BFPueden ayudarme con un veh\u00EDculo que compr\u00E9 de un vendedor privado?',
      'faq.a9': 'Por supuesto. Podemos manejar la transferencia de t\u00EDtulo y el nuevo registro para veh\u00EDculos comprados en ventas privadas. Solo ll\u00E1menos y le explicaremos los documentos que necesitar\u00E1.',
      'faq.q10': '\u00BFQu\u00E9 pasa si mi registro o placas est\u00E1n vencidos?',
      'faq.a10': 'Podemos ayudarle con eso. Ya sea que su registro haya vencido recientemente o hace tiempo, procesaremos el re-registro y lo pondremos en cumplimiento nuevamente.',

      // Footer
      'footer.tagline': 'Servicios Profesionales de DMV, Sin la Espera.',
      'footer.links': 'Enlaces R\u00E1pidos',
      'footer.hours': 'Horario de Atenci\u00F3n',
      'footer.days': 'Lunes \u2013 S\u00E1bado',
      'footer.closed': 'Domingo: Cerrado',
      'footer.cta': '<i class="fa-solid fa-phone" aria-hidden="true"></i> Ll\u00E1menos',

      // Mobile CTA
      'mobile.cta': '<i class="fa-solid fa-phone" aria-hidden="true"></i> Llame (516) 554-1144',

      // DMV Notice
      'notice': 'AVISO: ESTA TRANSACCI\u00D3N O SERVICIO TAMBI\u00C9N EST\u00C1 DISPONIBLE, SIN CARGO ADICIONAL, DIRECTAMENTE DESDE EL SITIO WEB OFICIAL DEL DEPARTAMENTO DE VEH\u00CDCULOS MOTORIZADOS EN <a href="https://www.dmv.ny.gov" target="_blank" rel="noopener noreferrer">WWW.DMV.NY.GOV</a>',
    }
  };

  // Store original English content
  const englishContent = {};
  document.querySelectorAll('[data-i18n]').forEach(el => {
    englishContent[el.getAttribute('data-i18n')] = el.innerHTML;
  });

  let currentLang = 'en';
  const langToggle = document.getElementById('langToggle');
  const langLabel = langToggle.querySelector('.lang-label');

  langToggle.addEventListener('click', () => {
    if (currentLang === 'en') {
      // Switch to Spanish
      currentLang = 'es';
      document.documentElement.lang = 'es';
      langLabel.textContent = 'English';
      langToggle.setAttribute('aria-label', 'Switch to English');

      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations.es[key]) {
          el.innerHTML = translations.es[key];
        }
      });
    } else {
      // Switch to English
      currentLang = 'en';
      document.documentElement.lang = 'en';
      langLabel.textContent = 'Espa\u00F1ol';
      langToggle.setAttribute('aria-label', 'Traducir al Espa\u00F1ol');

      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (englishContent[key]) {
          el.innerHTML = englishContent[key];
        }
      });
    }
  });
});
