/**
 * Chargement conditionnel de Google Tag Manager / GA4 (RGPD — C27).
 * Le script gtag n'est injecté dans le DOM qu'après consentement
 * explicite de l'utilisateur, jamais au chargement initial de la page.
 */
const GTM_ID = 'GTM-W674L28P';
let analyticsLoaded = false;

export const hasAnalyticsConsent = () =>
    typeof window !== 'undefined' && localStorage.getItem('cookieConsent') === 'accepted';

export const loadAnalytics = () => {
    if (analyticsLoaded || typeof window === 'undefined' || !hasAnalyticsConsent()) return;
    analyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', GTM_ID, { anonymize_ip: true });
};
