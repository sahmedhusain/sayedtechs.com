/**
 * Main Controller — sayedtechs.com Coming Soon Page
 */

// 1. Translation Configuration
const TRANSLATIONS = {
  en: {
    name: "Mr. Tech",
    bio: "ًThe website is under development and will be launched soon...",
    cta: "Contact Us",
    toggleBtn: "العربية"
  },
  ar: {
    name: "سيد التقنية",
    bio: "الموقع تحت التطوير وسينطلق قريباً...",
    cta: "تواصل معنا",
    toggleBtn: "English"
  }
};

const langToggleBtn = document.getElementById('lang-toggle-btn');
const langBtnText = document.getElementById('lang-btn-text');
const profileName = document.getElementById('profile-name');
const profileBio = document.getElementById('profile-bio');
const ctaText = document.getElementById('cta-text');

function getLocale() {
  return localStorage.getItem('sayedtechs-locale') || 'en';
}

function setLocale(locale) {
  localStorage.setItem('sayedtechs-locale', locale);
  document.documentElement.setAttribute('lang', locale);
  document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');

  // Translate DOM nodes
  const strings = TRANSLATIONS[locale];
  if (profileName) profileName.textContent = strings.name;
  if (profileBio) profileBio.textContent = strings.bio;
  if (ctaText) ctaText.textContent = strings.cta;
  if (langBtnText) langBtnText.textContent = strings.toggleBtn;
}

// Initial locale setup
setLocale(getLocale());

// Language Toggle click listener
if (langToggleBtn) {
  langToggleBtn.addEventListener('click', () => {
    const currentLocale = getLocale();
    const newLocale = currentLocale === 'en' ? 'ar' : 'en';
    setLocale(newLocale);
  });
}

// 2. Theme Configuration
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = document.getElementById('theme-icon');

function getTheme() {
  return localStorage.getItem('sayedtech-theme') || 'dark';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('sayedtech-theme', theme);
  
  if (themeIcon) {
    themeIcon.name = theme === 'dark' ? 'sunny-outline' : 'moon-outline';
  }

  // Update horizontal logo image source if present
  const footerLogo = document.querySelector('.footer-logo');
  if (footerLogo) {
    const filename = theme === 'dark' ? 'logo-horizontal-reversed.svg' : 'logo-horizontal-black.svg';
    footerLogo.src = `./SayedTech-Logo-System/SVG/${filename}`;
  }
}

// Set initial theme
setTheme(getTheme());

// Event listener for theme toggle
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
}

// 3. Render Current Copyright Year
const yearElement = document.getElementById('current-year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// 4. Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        console.log('ServiceWorker registered successfully:', reg.scope);
      })
      .catch(err => {
        console.error('ServiceWorker registration failed:', err);
      });
  });
}
