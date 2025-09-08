import React, { useState, useEffect } from 'react';
import ScrollToTopButton from '../ScrollToTopButton';

const PrivacyPolicy = () => {
    const [activeSection, setActiveSection] = useState('introduction');
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Scroll vers le haut au chargement du composant
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Gérer l'affichage du bouton retour en haut
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 100;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="bg-gray-50 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto pb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-gray-800">Politique de Confidentialité</h1>

                {/* Navigation rapide */}
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Navigation rapide</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                        {[
                            { id: 'introduction', label: 'Introduction' },
                            { id: 'data-collected', label: 'Données collectées' },
                            { id: 'purposes', label: 'Finalités' },
                            { id: 'legal-basis', label: 'Base légale' },
                            { id: 'data-sharing', label: 'Partage des données' },
                            { id: 'your-rights', label: 'Vos droits' },
                            { id: 'cookies', label: 'Cookies' },
                            { id: 'security', label: 'Sécurité' },
                            { id: 'contact', label: 'Contact' }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`text-left p-2 rounded transition-colors ${activeSection === item.id
                                    ? 'bg-codjoe-biscuit text-white'
                                    : 'text-codjoe-biscuit hover:bg-gray-100'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 mb-6">

                    {/* Introduction */}
                    <section id="introduction" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Introduction</h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                Chez CODJOE, nous nous engageons à protéger et respecter votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos données personnelles lorsque vous utilisez notre site web et nos services.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                Cette politique est conforme au Règlement Général sur la Protection des Données (RGPD) et à la loi française Informatique et Libertés. Elle s'applique à tous les utilisateurs de notre plateforme e-commerce.
                            </p>
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                                <p className="text-blue-800 text-sm sm:text-base">
                                    <strong>Dernière mise à jour :</strong> 8 septembre 2025<br />
                                    <strong>Responsable du traitement :</strong> CODJOE SAS
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Données collectées */}
                    <section id="data-collected" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Données personnelles collectées</h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Données d'identification</h3>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700">
                                        <li><strong>Nom et prénom</strong> - Obligatoire pour la création de compte</li>
                                        <li><strong>Adresse email</strong> - Obligatoire pour l'authentification et la communication</li>
                                        <li><strong>Numéro de téléphone</strong> - Optionnel, pour les notifications de livraison</li>
                                        <li><strong>Date de naissance</strong> - Optionnelle, pour les offres personnalisées</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Données de commande et livraison</h3>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700">
                                        <li><strong>Adresses de livraison</strong> - Nécessaires pour l'expédition</li>
                                        <li><strong>Adresses de facturation</strong> - Obligatoires pour la facturation</li>
                                        <li><strong>Historique des commandes</strong> - Produits achetés, dates, montants</li>
                                        <li><strong>Préférences de paiement</strong> - Informations de carte de crédit (cryptées)</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Données techniques et de navigation</h3>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700">
                                        <li><strong>Adresse IP</strong> - Pour la sécurité et la géolocalisation</li>
                                        <li><strong>Cookies et traceurs</strong> - Pour l'expérience utilisateur</li>
                                        <li><strong>Données de navigation</strong> - Pages visitées, temps passé</li>
                                        <li><strong>Informations sur l'appareil</strong> - Type de navigateur, système d'exploitation</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Finalités */}
                    <section id="purposes" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Finalités du traitement</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                {
                                    title: "Gestion des comptes",
                                    items: ["Création et gestion de votre compte", "Authentification et sécurité", "Support client personnalisé"]
                                },
                                {
                                    title: "Traitement des commandes",
                                    items: ["Traitement et validation des commandes", "Gestion des paiements", "Expédition et livraison"]
                                },
                                {
                                    title: "Communication",
                                    items: ["Confirmations de commande", "Notifications de livraison", "Support technique"]
                                },
                                {
                                    title: "Marketing (avec consentement)",
                                    items: ["Newsletters personnalisées", "Offres promotionnelles", "Recommandations produits"]
                                },
                                {
                                    title: "Amélioration des services",
                                    items: ["Analyse des performances", "Optimisation de l'expérience", "Développement de nouveaux produits"]
                                },
                                {
                                    title: "Conformité légale",
                                    items: ["Obligations comptables", "Prévention de la fraude", "Respect des réglementations"]
                                }
                            ].map((purpose, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-md">
                                    <h4 className="font-medium text-gray-800 mb-2">{purpose.title}</h4>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                        {purpose.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Base légale */}
                    <section id="legal-basis" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Base légale du traitement</h2>

                        <div className="space-y-4">
                            <div className="border-l-4 border-green-400 bg-green-50 p-4">
                                <h4 className="font-medium text-green-800 mb-2">Contrat (Article 6.1.b du RGPD)</h4>
                                <p className="text-green-700 text-sm">
                                    Pour la gestion de votre compte, le traitement des commandes, les paiements et les livraisons.
                                </p>
                            </div>

                            <div className="border-l-4 border-blue-400 bg-blue-50 p-4">
                                <h4 className="font-medium text-blue-800 mb-2">Consentement (Article 6.1.a du RGPD)</h4>
                                <p className="text-blue-700 text-sm">
                                    Pour le marketing par email, la personnalisation de l'expérience et les cookies non-essentiels.
                                </p>
                            </div>

                            <div className="border-l-4 border-orange-400 bg-orange-50 p-4">
                                <h4 className="font-medium text-orange-800 mb-2">Intérêt légitime (Article 6.1.f du RGPD)</h4>
                                <p className="text-orange-700 text-sm">
                                    Pour la sécurité du site, la prévention de la fraude et l'amélioration de nos services.
                                </p>
                            </div>

                            <div className="border-l-4 border-purple-400 bg-purple-50 p-4">
                                <h4 className="font-medium text-purple-800 mb-2">Obligation légale (Article 6.1.c du RGPD)</h4>
                                <p className="text-purple-700 text-sm">
                                    Pour la comptabilité, les obligations fiscales et les demandes des autorités.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Partage des données */}
                    <section id="data-sharing" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Partage et transfert des données</h2>

                        <div className="space-y-4">
                            <div className="bg-red-50 border border-red-200 p-4 rounded-md">
                                <h4 className="font-medium text-red-800 mb-2">🚫 Nous ne vendons jamais vos données personnelles</h4>
                                <p className="text-red-700 text-sm">
                                    CODJOE s'engage à ne jamais vendre, louer ou échanger vos données personnelles à des fins commerciales.
                                </p>
                            </div>

                            <h4 className="font-medium text-gray-800">Nous partageons vos données uniquement avec :</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h5 className="font-medium mb-2">Prestataires de services</h5>
                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                        <li>Transporteurs (pour la livraison)</li>
                                        <li>Processeurs de paiement (Stripe, PayPal)</li>
                                        <li>Services d'hébergement (OVHcloud)</li>
                                        <li>Services d'emailing (sous contrat DPA)</li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h5 className="font-medium mb-2">Autorités légales</h5>
                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                        <li>Sur demande judiciaire</li>
                                        <li>Pour enquêtes officielles</li>
                                        <li>Obligations réglementaires</li>
                                        <li>Prévention de fraude</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Droits des utilisateurs */}
                    <section id="your-rights" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Vos droits sur vos données</h2>

                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Conformément au RGPD, vous disposez des droits suivants que vous pouvez exercer à tout moment :
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    {
                                        icon: "👁️",
                                        title: "Droit d'accès",
                                        description: "Consulter toutes les données que nous détenons sur vous"
                                    },
                                    {
                                        icon: "✏️",
                                        title: "Droit de rectification",
                                        description: "Corriger ou mettre à jour vos informations personnelles"
                                    },
                                    {
                                        icon: "🗑️",
                                        title: "Droit à l'effacement",
                                        description: "Demander la suppression de vos données personnelles"
                                    },
                                    {
                                        icon: "⏸️",
                                        title: "Droit à la limitation",
                                        description: "Limiter le traitement de vos données dans certains cas"
                                    },
                                    {
                                        icon: "📦",
                                        title: "Droit à la portabilité",
                                        description: "Récupérer vos données dans un format structuré"
                                    },
                                    {
                                        icon: "🚫",
                                        title: "Droit d'opposition",
                                        description: "Vous opposer au traitement pour des raisons légitimes"
                                    }
                                ].map((right, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-md border">
                                        <div className="flex items-start space-x-3">
                                            <span className="text-2xl">{right.icon}</span>
                                            <div>
                                                <h4 className="font-medium text-gray-800">{right.title}</h4>
                                                <p className="text-sm text-gray-600 mt-1">{right.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-codjoe-light p-4 rounded-md border">
                                <h4 className="font-medium text-gray-800 mb-2">Comment exercer vos droits ?</h4>
                                <p className="text-sm text-gray-700 mb-3">
                                    Pour exercer l'un de ces droits, contactez notre Délégué à la Protection des Données :
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <strong>Email :</strong> <a href="mailto:dpo@codjoe.com" className="text-codjoe-primary hover:underline">dpo@codjoe.com</a>
                                    </div>
                                    <div>
                                        <strong>Délai de réponse :</strong> Maximum 1 mois
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Cookies */}
                    <section id="cookies" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Gestion des cookies</h2>

                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base">
                                Notre site utilise différents types de cookies pour améliorer votre expérience de navigation :
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-green-50 border border-green-200 p-4 rounded-md">
                                    <h4 className="font-medium text-green-800 mb-2">🔒 Cookies essentiels</h4>
                                    <p className="text-green-700 text-sm mb-2">Nécessaires au fonctionnement du site</p>
                                    <ul className="list-disc list-inside text-sm text-green-600 space-y-1">
                                        <li>Authentification utilisateur</li>
                                        <li>Panier d'achat</li>
                                        <li>Sécurité et prévention fraude</li>
                                    </ul>
                                    <p className="text-xs text-green-600 mt-2 italic">Ces cookies ne nécessitent pas votre consentement</p>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
                                    <h4 className="font-medium text-blue-800 mb-2">📊 Cookies analytiques</h4>
                                    <p className="text-blue-700 text-sm mb-2">Pour comprendre l'utilisation du site</p>
                                    <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
                                        <li>Google Analytics (anonymisé)</li>
                                        <li>Statistiques de performance</li>
                                        <li>Amélioration de l'expérience</li>
                                    </ul>
                                    <p className="text-xs text-blue-600 mt-2 italic">Nécessitent votre consentement</p>
                                </div>

                                <div className="bg-purple-50 border border-purple-200 p-4 rounded-md">
                                    <h4 className="font-medium text-purple-800 mb-2">🎯 Cookies de personnalisation</h4>
                                    <p className="text-purple-700 text-sm mb-2">Pour personnaliser votre expérience</p>
                                    <ul className="list-disc list-inside text-sm text-purple-600 space-y-1">
                                        <li>Préférences utilisateur</li>
                                        <li>Recommandations produits</li>
                                        <li>Contenu adapté</li>
                                    </ul>
                                    <p className="text-xs text-purple-600 mt-2 italic">Nécessitent votre consentement</p>
                                </div>

                                <div className="bg-orange-50 border border-orange-200 p-4 rounded-md">
                                    <h4 className="font-medium text-orange-800 mb-2">📢 Cookies marketing</h4>
                                    <p className="text-orange-700 text-sm mb-2">Pour la publicité ciblée</p>
                                    <ul className="list-disc list-inside text-sm text-orange-600 space-y-1">
                                        <li>Publicités personnalisées</li>
                                        <li>Réseaux sociaux</li>
                                        <li>Retargeting</li>
                                    </ul>
                                    <p className="text-xs text-orange-600 mt-2 italic">Nécessitent votre consentement</p>
                                </div>
                            </div>

                            <div className="bg-gray-100 p-4 rounded-md">
                                <h4 className="font-medium text-gray-800 mb-2">⚙️ Gérer vos préférences cookies</h4>
                                <p className="text-sm text-gray-700 mb-3">
                                    Vous pouvez modifier vos préférences de cookies à tout moment via :
                                </p>
                                <div className="space-y-2 text-sm">
                                    <div>• <button className="text-codjoe-primary hover:underline">Centre de préférences</button> (accessible en pied de page)</div>
                                    <div>• Paramètres de votre navigateur</div>
                                    <div>• Extensions de blocage des cookies</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sécurité */}
                    <section id="security" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Sécurité et conservation</h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">🔐 Mesures de sécurité</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <h4 className="font-medium mb-2">Chiffrement des données</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                            <li>SSL/TLS pour toutes les communications</li>
                                            <li>Chiffrement AES-256 pour les données sensibles</li>
                                            <li>Hashage sécurisé des mots de passe</li>
                                        </ul>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <h4 className="font-medium mb-2">Contrôles d'accès</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                            <li>Authentification multi-facteurs</li>
                                            <li>Principe du moindre privilège</li>
                                            <li>Audit des accès aux données</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">⏰ Durées de conservation</h3>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <h4 className="font-medium mb-2">Données de compte</h4>
                                            <ul className="space-y-1 text-gray-600">
                                                <li>• Compte actif : Durée illimitée</li>
                                                <li>• Compte inactif : 3 ans</li>
                                                <li>• Après suppression : 30 jours</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-2">Données de commande</h4>
                                            <ul className="space-y-1 text-gray-600">
                                                <li>• Données commerciales : 5 ans</li>
                                                <li>• Données comptables : 10 ans</li>
                                                <li>• Logs de sécurité : 12 mois</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact */}
                    <section id="contact" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Contact et réclamations</h2>

                        <div className="space-y-4">
                            <div className="bg-codjoe-light p-6 rounded-md">
                                <h3 className="font-medium text-gray-800 mb-4">📧 Délégué à la Protection des Données (DPO)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="mb-2 text-sm sm:text-base"><strong>Email :</strong> <a href="mailto:dpo@codjoe.com" className="text-codjoe-primary hover:underline">dpo@codjoe.com</a></p>
                                        <p className="mb-2 text-sm sm:text-base"><strong>Téléphone :</strong> +33 1 42 25 30 15</p>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-sm sm:text-base"><strong>Adresse postale :</strong></p>
                                        <p className="text-xs sm:text-sm text-gray-600">
                                            CODJOE - DPO<br />
                                            15 Avenue des Champs-Élysées<br />
                                            75008 Paris, France
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
                                <h4 className="font-medium text-blue-800 mb-2">🏛️ Autorité de contrôle</h4>
                                <p className="text-blue-700 text-sm mb-2">
                                    Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de :
                                </p>
                                <p className="text-blue-700 text-sm">
                                    <strong>CNIL</strong> - Commission Nationale de l'Informatique et des Libertés<br />
                                    <a href="https://www.cnil.fr" className="text-blue-600 hover:underline">www.cnil.fr</a>
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="text-center pt-6 border-t border-gray-200">
                        <p className="text-xs sm:text-sm text-gray-500">
                            Cette politique de confidentialité a été mise à jour pour la dernière fois le 8 septembre 2025.<br />
                            En cas de modification substantielle, vous serez informé par email et/ou via une notification sur notre site.
                        </p>
                    </div>
                </div>
            </div>

            <ScrollToTopButton showScrollTop={showScrollTop} scrollToTop={scrollToTop} />
        </div>
    );
}

export default PrivacyPolicy;
