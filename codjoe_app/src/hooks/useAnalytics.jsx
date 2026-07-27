/**
 * useAnalytics — Hook de suivi des événements Google Analytics.
 * Vérifie le consentement cookies (localStorage "cookieConsent") avant d'envoyer des données.
 *
 * Usage :
 *   const { trackEvent, trackPageView } = useAnalytics();
 *   trackEvent('add_to_cart', { item_id: 'abc123', value: 29.99, currency: 'EUR' });
 */
const useAnalytics = () => {
    const hasConsent = () => localStorage.getItem('cookieConsent') === 'accepted';

    /**
     * Envoie un événement GA4 personnalisé.
     * @param {string} eventName - Nom de l'événement (ex: 'add_to_cart', 'purchase', 'begin_checkout')
     * @param {Object} params - Paramètres de l'événement (item_id, value, currency, etc.)
     */
    const trackEvent = (eventName, params = {}) => {
        if (!hasConsent()) return;
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', eventName, params);
        }
    };

    /**
     * Envoie une vue de page GA4 (utile pour les SPA React avec React Router).
     * @param {string} path - Chemin de la page (ex: '/product/abc123')
     * @param {string} title - Titre de la page
     */
    const trackPageView = (path, title) => {
        if (!hasConsent()) return;
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            window.gtag('event', 'page_view', {
                page_path: path,
                page_title: title,
            });
        }
    };

    /**
     * Envoie un événement de conversion achat.
     * @param {string} transactionId - ID de la commande
     * @param {number} value - Montant total (€)
     * @param {Array} items - Liste des produits
     */
    const trackPurchase = (transactionId, value, items = []) => {
        trackEvent('purchase', {
            transaction_id: transactionId,
            value,
            currency: 'EUR',
            items,
        });
    };

    return { trackEvent, trackPageView, trackPurchase };
};

export default useAnalytics;
