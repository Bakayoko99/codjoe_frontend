import React, { useState, useEffect } from 'react';
import ScrollToTopButton from '../ScrollToTopButton';

const Terms = () => {
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
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-gray-800">Conditions Générales de Vente</h1>

                {/* Navigation rapide */}
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">Navigation rapide</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
                        {[
                            { id: 'introduction', label: 'Préambule' },
                            { id: 'definitions', label: 'Définitions' },
                            { id: 'products', label: 'Produits' },
                            { id: 'orders', label: 'Commandes' },
                            { id: 'prices', label: 'Prix' },
                            { id: 'payment', label: 'Paiement' },
                            { id: 'delivery', label: 'Livraison' },
                            { id: 'returns', label: 'Retours' },
                            { id: 'warranty', label: 'Garanties' },
                            { id: 'liability', label: 'Responsabilité' },
                            { id: 'disputes', label: 'Litiges' },
                            { id: 'applicable-law', label: 'Droit applicable' }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`text-left p-2 rounded transition-colors ${activeSection === item.id
                                    ? 'bg-codjoe-biscuit text-white'
                                    : 'text-codjoe-bg-codjoe-biscuit hover:bg-gray-100'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 mb-6">

                    {/* Préambule */}
                    <section id="introduction" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Préambule</h2>
                        <div className="space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des relations contractuelles entre CODJOE SAS et ses clients dans le cadre de la vente en ligne de produits via le site web <strong>www.codjoe.com</strong>.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                En passant commande sur notre site, le client reconnaît avoir pris connaissance et accepté sans réserve les présentes conditions générales de vente, sauf conditions particulières convenues par écrit.
                            </p>
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                                <p className="text-blue-800 text-sm sm:text-base">
                                    <strong>Date d'entrée en vigueur :</strong> 8 septembre 2025<br />
                                    <strong>Version :</strong> 2.1<br />
                                    <strong>Société :</strong> CODJOE SAS - RCS Paris 850 123 456
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Définitions */}
                    <section id="definitions" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Définitions</h2>

                        <div className="bg-gray-50 p-4 rounded-md">
                            <dl className="space-y-3">
                                <div>
                                    <dt className="font-medium text-gray-800">« Vendeur » ou « CODJOE »</dt>
                                    <dd className="text-gray-600 text-sm mt-1">CODJOE SAS, société par actions simplifiée au capital de 50 000 €, immatriculée au RCS de Paris sous le numéro 850 123 456, dont le siège social est situé 15 Avenue des Champs-Élysées, 75008 Paris.</dd>
                                </div>

                                <div>
                                    <dt className="font-medium text-gray-800">« Client » ou « Acheteur »</dt>
                                    <dd className="text-gray-600 text-sm mt-1">Toute personne physique ou morale ayant la capacité juridique qui effectue un achat sur le site www.codjoe.com.</dd>
                                </div>

                                <div>
                                    <dt className="font-medium text-gray-800">« Produits »</dt>
                                    <dd className="text-gray-600 text-sm mt-1">Ensemble des biens proposés à la vente sur le site www.codjoe.com, notamment les vêtements, accessoires et articles de mode.</dd>
                                </div>

                                <div>
                                    <dt className="font-medium text-gray-800">« Commande »</dt>
                                    <dd className="text-gray-600 text-sm mt-1">Acte par lequel le Client demande l'achat d'un ou plusieurs Produits proposés par CODJOE.</dd>
                                </div>

                                <div>
                                    <dt className="font-medium text-gray-800">« Site »</dt>
                                    <dd className="text-gray-600 text-sm mt-1">Site internet accessible à l'adresse www.codjoe.com exploité par CODJOE.</dd>
                                </div>
                            </dl>
                        </div>
                    </section>

                    {/* Produits */}
                    <section id="products" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Produits et Services</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Description des produits</h3>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700">
                                        <li>CODJOE propose à la vente des vêtements et accessoires de mode</li>
                                        <li>Les produits sont présentés avec leurs caractéristiques essentielles (taille, couleur, matières, etc.)</li>
                                        <li>Les photos sont contractuelles mais peuvent présenter de légères variations selon l'écran utilisé</li>
                                        <li>Les descriptions détaillées sont disponibles sur chaque fiche produit</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Disponibilité</h3>
                                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                                    <p className="text-yellow-800 text-sm sm:text-base">
                                        <strong>⚠️ Important :</strong> Les produits sont proposés dans la limite des stocks disponibles.
                                        En cas d'indisponibilité après validation de la commande, le Client sera informé
                                        et pourra choisir un produit de substitution ou obtenir le remboursement.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Informations produits</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <h4 className="font-medium mb-2">Guide des tailles</h4>
                                        <p className="text-sm text-gray-600">
                                            Un guide des tailles détaillé est disponible pour chaque catégorie de produit.
                                            En cas de doute, notre service client est à votre disposition.
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <h4 className="font-medium mb-2">Entretien</h4>
                                        <p className="text-sm text-gray-600">
                                            Les instructions d'entretien sont indiquées sur l'étiquette de chaque produit
                                            et dans la description détaillée en ligne.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Commandes */}
                    <section id="orders" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Processus de commande</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Étapes de commande</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {[
                                        {
                                            step: "1",
                                            title: "Sélection",
                                            description: "Ajout des produits au panier"
                                        },
                                        {
                                            step: "2",
                                            title: "Identification",
                                            description: "Création de compte ou connexion"
                                        },
                                        {
                                            step: "3",
                                            title: "Adresses",
                                            description: "Saisie des adresses de livraison et facturation"
                                        },
                                        {
                                            step: "4",
                                            title: "Paiement",
                                            description: "Validation et paiement sécurisé"
                                        }
                                    ].map((item, index) => (
                                        <div key={index} className="bg-gray-50 p-4 rounded-md text-center">
                                            <div className="bg-codjoe-primary text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                                                {item.step}
                                            </div>
                                            <h4 className="font-medium text-gray-800 mb-1">{item.title}</h4>
                                            <p className="text-xs text-gray-600">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Validation de commande</h3>
                                <div className="bg-green-50 border border-green-200 p-4 rounded-md">
                                    <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                                        <li>Le contrat de vente est formé lors du clic sur "Valider la commande"</li>
                                        <li>Un email de confirmation est envoyé automatiquement</li>
                                        <li>Le Client dispose de 14 jours pour exercer son droit de rétractation</li>
                                        <li>CODJOE se réserve le droit d'annuler toute commande en cas de problème de paiement</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Modification et annulation</h3>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <p className="text-sm text-gray-700 mb-2">
                                        <strong>Avant expédition :</strong> Modification possible en contactant le service client dans les 2 heures suivant la validation.
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        <strong>Après expédition :</strong> Utilisation du droit de rétractation selon les conditions prévues.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Prix */}
                    <section id="prices" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Prix et Conditions financières</h2>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h3 className="font-medium text-gray-800 mb-2">💰 Tarification</h3>
                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                        <li>Prix affichés en Euros (€) TTC</li>
                                        <li>TVA française applicable (20%)</li>
                                        <li>Frais de livraison indiqués avant validation</li>
                                        <li>Aucun frais caché</li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h3 className="font-medium text-gray-800 mb-2">📊 Évolution des prix</h3>
                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                        <li>Prix en vigueur au jour de la commande</li>
                                        <li>Modifications possibles sans préavis</li>
                                        <li>Commandes validées non affectées</li>
                                        <li>Promotions dans la limite des stocks</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Frais de livraison</h3>
                                <div className="bg-white border border-gray-200 p-4 rounded-md">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div className="text-center">
                                            <div className="bg-green-100 text-green-800 p-2 rounded-md mb-2">
                                                <strong>Livraison Standard</strong>
                                            </div>
                                            <p>4,90 € - 3 à 5 jours ouvrés</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="bg-blue-100 text-blue-800 p-2 rounded-md mb-2">
                                                <strong>Livraison Express</strong>
                                            </div>
                                            <p>7,90 € - 24 à 48h ouvrées</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="bg-purple-100 text-purple-800 p-2 rounded-md mb-2">
                                                <strong>Livraison Gratuite</strong>
                                            </div>
                                            <p>Dès 75 € d'achat</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Paiement */}
                    <section id="payment" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Modalités de paiement</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Moyens de paiement acceptés</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { name: "Carte Bancaire", desc: "Visa, Mastercard, CB", icon: "💳" },
                                        { name: "PayPal", desc: "Compte PayPal", icon: "🔵" },
                                        { name: "Apple Pay", desc: "Paiement mobile", icon: "📱" },
                                        { name: "Google Pay", desc: "Paiement mobile", icon: "🟢" }
                                    ].map((payment, index) => (
                                        <div key={index} className="bg-gray-50 p-3 rounded-md text-center">
                                            <div className="text-2xl mb-2">{payment.icon}</div>
                                            <h4 className="font-medium text-sm">{payment.name}</h4>
                                            <p className="text-xs text-gray-600">{payment.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Sécurité des paiements</h3>
                                <div className="bg-green-50 border border-green-200 p-4 rounded-md">
                                    <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                                        <li><strong>Chiffrement SSL 256 bits</strong> pour toutes les transactions</li>
                                        <li><strong>3D Secure</strong> pour l'authentification bancaire</li>
                                        <li><strong>PCI DSS</strong> - Conformité aux standards de sécurité</li>
                                        <li><strong>Aucune donnée bancaire</strong> stockée sur nos serveurs</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Conditions de paiement</h3>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                        <li>Le paiement est exigible immédiatement lors de la commande</li>
                                        <li>En cas de refus de paiement, la commande sera automatiquement annulée</li>
                                        <li>Les remboursements s'effectuent sur le moyen de paiement d'origine</li>
                                        <li>Délai de remboursement : 14 jours maximum</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Livraison */}
                    <section id="delivery" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Livraison et Expédition</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Zones de livraison</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
                                        <h4 className="font-medium text-blue-800 mb-2">🇫🇷 France Métropolitaine</h4>
                                        <ul className="text-sm text-blue-700 space-y-1">
                                            <li>• Livraison standard : 3-5 jours ouvrés</li>
                                            <li>• Livraison express : 24-48h ouvrées</li>
                                            <li>• Points relais disponibles</li>
                                        </ul>
                                    </div>

                                    <div className="bg-purple-50 border border-purple-200 p-4 rounded-md">
                                        <h4 className="font-medium text-purple-800 mb-2">🇪🇺 Union Européenne</h4>
                                        <ul className="text-sm text-purple-700 space-y-1">
                                            <li>• Livraison : 5-7 jours ouvrés</li>
                                            <li>• Frais : 9,90 € (gratuit dès 100€)</li>
                                            <li>• Suivi de colis inclus</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Modalités de livraison</h3>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <h4 className="font-medium mb-2">📦 À domicile</h4>
                                            <ul className="text-gray-600 space-y-1">
                                                <li>• Livraison sur rendez-vous</li>
                                                <li>• Remise en main propre</li>
                                                <li>• Signature requise</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-2">🏪 Point relais</h4>
                                            <ul className="text-gray-600 space-y-1">
                                                <li>• + de 4000 points</li>
                                                <li>• Retrait sous 14 jours</li>
                                                <li>• Horaires étendus</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-2">🏢 Entreprise</h4>
                                            <ul className="text-gray-600 space-y-1">
                                                <li>• Livraison B2B</li>
                                                <li>• Accueil/réception</li>
                                                <li>• Factures séparées</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Suivi de commande</h3>
                                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                                    <p className="text-yellow-800 text-sm mb-2">
                                        <strong>📧 Notifications automatiques :</strong>
                                    </p>
                                    <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                                        <li>Confirmation de commande</li>
                                        <li>Préparation en cours</li>
                                        <li>Expédition avec numéro de suivi</li>
                                        <li>Livraison effectuée</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Retours */}
                    <section id="returns" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Droit de rétractation et Retours</h2>

                        <div className="space-y-4">
                            <div className="bg-green-50 border border-green-200 p-4 rounded-md">
                                <h3 className="font-medium text-green-800 mb-2">✅ Droit de rétractation légal</h3>
                                <p className="text-green-700 text-sm mb-2">
                                    Conformément à l'article L221-18 du Code de la consommation, vous disposez de <strong>14 jours</strong>
                                    à compter de la réception de votre commande pour exercer votre droit de rétractation.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Conditions de retour</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <h4 className="font-medium text-gray-800 mb-2">✅ Produits éligibles</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                            <li>Produits dans leur emballage d'origine</li>
                                            <li>Étiquettes non retirées</li>
                                            <li>État neuf, non portés</li>
                                            <li>Aucune odeur (parfum, tabac...)</li>
                                        </ul>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-md">
                                        <h4 className="font-medium text-gray-800 mb-2">❌ Exclusions</h4>
                                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                            <li>Sous-vêtements et maillots de bain</li>
                                            <li>Produits personnalisés</li>
                                            <li>Articles soldés (mention spéciale)</li>
                                            <li>Accessoires en contact direct</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Processus de retour</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    {[
                                        {
                                            step: "1",
                                            title: "Demande",
                                            description: "Via votre compte client ou par email"
                                        },
                                        {
                                            step: "2",
                                            title: "Étiquette",
                                            description: "Réception d'une étiquette de retour prépayée"
                                        },
                                        {
                                            step: "3",
                                            title: "Envoi",
                                            description: "Renvoi du colis dans les 14 jours"
                                        },
                                        {
                                            step: "4",
                                            title: "Remboursement",
                                            description: "Sous 14 jours après réception"
                                        }
                                    ].map((item, index) => (
                                        <div key={index} className="bg-gray-50 p-3 rounded-md text-center">
                                            <div className="bg-codjoe-primary text-white w-6 h-6 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                                                {item.step}
                                            </div>
                                            <h4 className="font-medium text-gray-800 text-sm mb-1">{item.title}</h4>
                                            <p className="text-xs text-gray-600">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">CODJOE Plus - Retours étendus</h3>
                                <div className="bg-purple-50 border border-purple-200 p-4 rounded-md">
                                    <p className="text-purple-800 text-sm mb-2">
                                        <strong>🎁 Avantage client :</strong> CODJOE vous offre <strong>30 jours</strong>
                                        pour retourner vos achats, soit 16 jours supplémentaires au-delà de l'obligation légale.
                                    </p>
                                    <p className="text-purple-700 text-xs">
                                        * Les mêmes conditions de retour s'appliquent pour la période étendue.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Garanties */}
                    <section id="warranty" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Garanties et Service après-vente</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Garantie légale de conformité</h3>
                                <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
                                    <p className="text-blue-800 text-sm mb-2">
                                        Conformément aux articles L217-4 à L217-12 du Code de la consommation,
                                        CODJOE garantit que les produits sont conformes au contrat de vente.
                                    </p>
                                    <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                                        <li><strong>Durée :</strong> 2 ans à compter de la livraison</li>
                                        <li><strong>Défauts présumés :</strong> 24 mois (6 mois pour les biens d'occasion)</li>
                                        <li><strong>Recours :</strong> Réparation, remplacement ou remboursement</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Garantie des vices cachés</h3>
                                <div className="bg-orange-50 border border-orange-200 p-4 rounded-md">
                                    <p className="text-orange-800 text-sm">
                                        Garantie légale contre les vices cachés (articles 1641 à 1648 du Code civil)
                                        permettant la résolution de la vente ou la réduction du prix selon les articles
                                        1644 et 1644 du Code civil.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Service client</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-md text-center">
                                        <div className="text-2xl mb-2">📞</div>
                                        <h4 className="font-medium mb-1">Téléphone</h4>
                                        <p className="text-sm text-gray-600">+33 1 42 25 30 15</p>
                                        <p className="text-xs text-gray-500">Lun-Ven 9h-18h</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-md text-center">
                                        <div className="text-2xl mb-2">📧</div>
                                        <h4 className="font-medium mb-1">Email</h4>
                                        <p className="text-sm text-gray-600">support@codjoe.com</p>
                                        <p className="text-xs text-gray-500">Réponse sous 24h</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-md text-center">
                                        <div className="text-2xl mb-2">💬</div>
                                        <h4 className="font-medium mb-1">Chat en ligne</h4>
                                        <p className="text-sm text-gray-600">Assistance immédiate</p>
                                        <p className="text-xs text-gray-500">Lun-Ven 9h-18h</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Responsabilité */}
                    <section id="liability" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Responsabilité</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Limitation de responsabilité</h3>
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                                        <li>CODJOE ne pourra être tenue responsable des dommages indirects, immatériels ou consécutifs</li>
                                        <li>La responsabilité de CODJOE est limitée au montant de la commande concernée</li>
                                        <li>CODJOE ne garantit pas l'accessibilité permanente du site (maintenance, problèmes techniques)</li>
                                        <li>La responsabilité du transporteur est engagée en cas de perte ou détérioration lors du transport</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Force majeure</h3>
                                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                                    <p className="text-yellow-800 text-sm">
                                        CODJOE ne pourra être tenue responsable de tout retard ou inexécution
                                        consécutif à la survenance d'un cas de force majeure habituellement
                                        reconnu par la jurisprudence française.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Propriété intellectuelle</h3>
                                <div className="bg-red-50 border border-red-200 p-4 rounded-md">
                                    <p className="text-red-800 text-sm mb-2">
                                        <strong>⚠️ Protection des droits :</strong>
                                    </p>
                                    <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                                        <li>Le contenu du site (textes, images, logos) est protégé par le droit d'auteur</li>
                                        <li>Toute reproduction non autorisée est interdite</li>
                                        <li>Les marques CODJOE sont déposées et protégées</li>
                                        <li>Usage strictement personnel autorisé pour les contenus consultés</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Litiges */}
                    <section id="disputes" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Résolution des litiges</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Médiation de consommation</h3>
                                <div className="bg-purple-50 border border-purple-200 p-4 rounded-md">
                                    <p className="text-purple-800 text-sm mb-3">
                                        Conformément à l'article L612-1 du Code de la consommation, CODJOE adhère au service de médiation FEVAD :
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm"><strong>Médiateur :</strong> Médiateur du e-commerce de la FEVAD</p>
                                            <p className="text-sm"><strong>Adresse :</strong> 60 rue La Boétie, 75008 Paris</p>
                                        </div>
                                        <div>
                                            <p className="text-sm"><strong>Site web :</strong> <a href="http://www.mediateurfevad.fr" className="text-purple-600 hover:underline">www.mediateurfevad.fr</a></p>
                                            <p className="text-sm"><strong>Email :</strong> mediateur@fevad.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Règlement amiable</h3>
                                <div className="bg-green-50 border border-green-200 p-4 rounded-md">
                                    <p className="text-green-800 text-sm mb-2">
                                        <strong>🤝 Démarche privilégiée :</strong>
                                    </p>
                                    <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                                        <li>Contact préalable obligatoire avec le service client CODJOE</li>
                                        <li>Recherche d'une solution amiable dans les meilleurs délais</li>
                                        <li>Recours au médiateur en cas d'échec du règlement amiable</li>
                                        <li>Procédure gratuite pour le consommateur</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-3 text-gray-700">Plateforme européenne</h3>
                                <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
                                    <p className="text-blue-800 text-sm">
                                        Pour les achats en ligne, la Commission européenne met à disposition une plateforme de résolution en ligne des litiges accessible à l'adresse :
                                        <a href="https://ec.europa.eu/consumers/odr/" className="text-blue-600 hover:underline ml-1">https://ec.europa.eu/consumers/odr/</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Droit applicable */}
                    <section id="applicable-law" className="mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 text-codjoe-primary border-b border-gray-200 pb-2">Droit applicable et juridiction</h2>

                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-md">
                                <h3 className="font-medium text-gray-800 mb-2">⚖️ Loi applicable</h3>
                                <p className="text-gray-700 text-sm mb-3">
                                    Les présentes conditions générales de vente sont soumises à la loi française.
                                    Tout litige relatif à leur interprétation et/ou à leur exécution relève des tribunaux français.
                                </p>

                                <h3 className="font-medium text-gray-800 mb-2">🏛️ Compétence juridictionnelle</h3>
                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                    <li><strong>Pour les professionnels :</strong> Tribunaux de Paris exclusivement compétents</li>
                                    <li><strong>Pour les consommateurs :</strong> Tribunaux du lieu de résidence du consommateur ou du siège de CODJOE</li>
                                    <li><strong>Prescription :</strong> Actions en responsabilité prescrites dans un délai de 2 ans</li>
                                </ul>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
                                <h3 className="font-medium text-blue-800 mb-2">📄 Modifications des CGV</h3>
                                <p className="text-blue-700 text-sm">
                                    CODJOE se réserve le droit de modifier les présentes conditions générales de vente.
                                    Les conditions applicables sont celles en vigueur à la date de la commande.
                                    Les modifications seront portées à la connaissance des clients par tout moyen approprié.
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="text-center pt-6 border-t border-gray-200">
                        <div className="bg-codjoe-light p-4 rounded-md">
                            <p className="text-sm text-gray-700 mb-2">
                                <strong>📞 Besoin d'aide ?</strong> Notre service client est à votre disposition
                            </p>
                            <div className="text-xs text-gray-600">
                                Email : <a href="mailto:support@codjoe.com" className="text-codjoe-primary hover:underline">support@codjoe.com</a> •
                                Téléphone : +33 1 42 25 30 15 •
                                Lundi au Vendredi de 9h à 18h
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-4">
                            Conditions Générales de Vente mises à jour le 8 septembre 2025 - Version 2.1<br />
                            CODJOE SAS - RCS Paris 850 123 456 - Capital 50 000 €
                        </p>
                    </div>
                </div>
            </div>

            <ScrollToTopButton showScrollTop={showScrollTop} scrollToTop={scrollToTop} />
        </div>
    );
}

export default Terms;
