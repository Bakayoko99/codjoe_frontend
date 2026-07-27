import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadAnalytics } from '../utils/analytics';

const CookieBanner = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Délai pour ne pas bloquer le rendu initial
            const timer = setTimeout(() => setVisible(true), 800);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        loadAnalytics();
        setVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookieConsent', 'rejected');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            role="dialog"
            aria-live="polite"
            aria-label="Bandeau de consentement aux cookies"
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6"
        >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
                <div className="flex-1">
                    <p className="text-sm text-gray-700">
                        🍪 Nous utilisons des cookies pour améliorer votre expérience de navigation,
                        analyser notre trafic et personnaliser le contenu. En cliquant sur{' '}
                        <strong>Accepter</strong>, vous consentez à notre utilisation des cookies.{' '}
                        <Link
                            to="/privacy-policy"
                            className="text-[#C29F75] underline hover:text-[#a07d50] focus:outline-none focus:ring-2 focus:ring-[#C29F75]"
                            aria-label="Lire la politique de confidentialité"
                        >
                            Politique de confidentialité
                        </Link>
                    </p>
                </div>
                <div className="flex gap-3 shrink-0">
                    <button
                        onClick={handleReject}
                        aria-label="Refuser les cookies non essentiels"
                        className="px-4 py-2 text-sm border border-gray-300 rounded text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                    >
                        Refuser
                    </button>
                    <button
                        onClick={handleAccept}
                        aria-label="Accepter tous les cookies"
                        className="px-4 py-2 text-sm bg-[#C29F75] text-white rounded hover:bg-[#a07d50] focus:outline-none focus:ring-2 focus:ring-[#C29F75] transition-colors"
                    >
                        Accepter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
