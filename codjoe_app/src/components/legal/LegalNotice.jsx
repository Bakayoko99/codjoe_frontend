import React, { useState, useEffect } from 'react';
import ScrollToTopButton from '../ScrollToTopButton';

const LegalNotice = () => {
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

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
        <div className="bg-gray-50 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto pb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-gray-800">Mentions Légales</h1>

                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 mb-6">
                    <p className="mb-4 sm:mb-6 text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                        Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., nous portons à la connaissance des utilisateurs et visiteurs du site les informations suivantes :
                    </p>

                    <section className="mb-6 sm:mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-codjoe-primary border-b border-gray-200 pb-2">1. Informations légales</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3 text-gray-700">Éditeur du site</h3>
                                <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                    <p className="mb-2 text-sm sm:text-base"><strong>Raison sociale :</strong> CODJOE SAS</p>
                                    <p className="mb-2 text-sm sm:text-base"><strong>Capital social :</strong> 50 000 €</p>
                                    <p className="mb-2 text-sm sm:text-base"><strong>RCS :</strong> Paris 850 123 456</p>
                                    <p className="mb-2 text-sm sm:text-base"><strong>SIRET :</strong> 850 123 456 00012</p>
                                    <p className="mb-2 text-sm sm:text-base"><strong>Code APE :</strong> 4791B (Vente à distance sur catalogue spécialisé)</p>
                                    <p className="mb-2 text-sm sm:text-base"><strong>N° TVA intracommunautaire :</strong> FR 89 850123456</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3 text-gray-700">Adresse du siège social</h3>
                                <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                    <p className="mb-2 text-sm sm:text-base">15 Avenue des Champs-Élysées</p>
                                    <p className="mb-2 text-sm sm:text-base">75008 Paris, France</p>
                                    <p className="mb-2 text-sm sm:text-base"><strong>Téléphone :</strong> +33 1 42 25 30 15</p>
                                    <p className="mb-2 text-sm sm:text-base"><strong>Email :</strong> contact@codjoe.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 sm:mt-6">
                            <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-3 text-gray-700">Directeur de la publication</h3>
                            <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                <p className="mb-2 text-sm sm:text-base"><strong>Nom :</strong> BAKAYOKO Bakagnan</p>
                                <p className="mb-2 text-sm sm:text-base"><strong>Qualité :</strong> Président Directeur Général</p>
                                <p className="mb-2 text-sm sm:text-base"><strong>Email :</strong> direction@codjoe.com</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-6 sm:mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-codjoe-primary border-b border-gray-200 pb-2">2. Hébergement</h2>
                        <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                            <p className="mb-2 text-sm sm:text-base"><strong>Nom :</strong> OVHcloud</p>
                            <p className="mb-2 text-sm sm:text-base"><strong>Adresse :</strong> 2 rue Kellermann, 59100 Roubaix, France</p>
                            <p className="mb-2 text-sm sm:text-base"><strong>Téléphone :</strong> +33 9 72 10 10 07</p>
                            <p className="mb-2 text-sm sm:text-base"><strong>Site web :</strong> <a href="https://www.ovhcloud.com" className="text-codjoe-primary hover:underline break-all">www.ovhcloud.com</a></p>
                        </div>
                    </section>

                    <section className="mb-6 sm:mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-codjoe-primary border-b border-gray-200 pb-2">3. Propriété intellectuelle</h2>
                        <div className="space-y-3 sm:space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                Les marques CODJOE ainsi que les logos figurant sur le site sont des marques déposées. Toute reproduction ou représentation totale ou partielle de ces marques ou de ces logos, effectuée à partir des éléments du site sans l'autorisation expresse du propriétaire de ce site est prohibée.
                            </p>
                        </div>
                    </section>

                    <section className="mb-6 sm:mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-codjoe-primary border-b border-gray-200 pb-2">4. Protection des données personnelles</h2>
                        <div className="space-y-3 sm:space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
                            </p>
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 sm:p-4">
                                <p className="text-blue-800 text-sm sm:text-base">
                                    <strong>Délégué à la Protection des Données (DPO) :</strong><br />
                                    Email : dpo@codjoe.com<br />
                                    Adresse : CODJOE - DPO, 15 Avenue des Champs-Élysées, 75008 Paris
                                </p>
                            </div>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                Pour plus d'informations sur le traitement de vos données, consultez notre <a href="/legal/privacy-policy" className="text-codjoe-primary hover:underline font-medium">Politique de Confidentialité</a>.
                            </p>
                        </div>
                    </section>

                    <section className="mb-6 sm:mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-codjoe-primary border-b border-gray-200 pb-2">5. Cookies</h2>
                        <div className="space-y-3 sm:space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                Le site www.codjoe.com utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de visites.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                Vous pouvez configurer vos préférences concernant les cookies via notre centre de préférences accessible depuis le pied de page ou dans les paramètres de votre navigateur.
                            </p>
                        </div>
                    </section>

                    <section className="mb-6 sm:mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-codjoe-primary border-b border-gray-200 pb-2">6. Limitations de responsabilité</h2>
                        <div className="space-y-3 sm:space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                CODJOE s'efforce de fournir sur le site www.codjoe.com des informations aussi précises que possible. Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                CODJOE ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site www.codjoe.com, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées, soit de l'apparition d'un bug ou d'une incompatibilité.
                            </p>
                        </div>
                    </section>

                    <section className="mb-6 sm:mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-codjoe-primary border-b border-gray-200 pb-2">7. Droit applicable et juridiction</h2>
                        <div className="space-y-3 sm:space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                Tout litige en relation avec l'utilisation du site www.codjoe.com est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.
                            </p>
                        </div>
                    </section>

                    <section className="mb-6 sm:mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-codjoe-primary border-b border-gray-200 pb-2">8. Médiation</h2>
                        <div className="space-y-3 sm:space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                Conformément aux dispositions du Code de la consommation concernant le règlement amiable des litiges, CODJOE adhère au Service du Médiateur du e-commerce de la FEVAD (Fédération du e-commerce et de la vente à distance) dont les coordonnées sont les suivantes :
                            </p>
                            <div className="bg-gray-50 p-3 sm:p-4 rounded-md">
                                <p className="mb-2 text-sm sm:text-base"><strong>Médiateur :</strong> Médiateur de la consommation FEVAD</p>
                                <p className="mb-2 text-sm sm:text-base"><strong>Adresse :</strong> 60 rue La Boétie, 75008 Paris</p>
                                <p className="mb-2 text-sm sm:text-base"><strong>Site web :</strong> <a href="http://www.mediateurfevad.fr" className="text-codjoe-primary hover:underline break-all">www.mediateurfevad.fr</a></p>
                            </div>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                Après démarche préalable écrite des consommateurs vis-à-vis de CODJOE, le Service du Médiateur peut être saisi pour tout litige de consommation dont le règlement n'aurait pas abouti.
                            </p>
                        </div>
                    </section>

                    <section className="mb-6 sm:mb-8">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-codjoe-primary border-b border-gray-200 pb-2">9. Contact</h2>
                        <div className="bg-codjoe-light p-4 sm:p-6 rounded-md">
                            <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">Pour toute question concernant ces mentions légales, vous pouvez nous contacter :</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <p className="mb-2 text-sm sm:text-base"><strong>Par email :</strong> <a href="mailto:legal@codjoe.com" className="text-codjoe-primary hover:underline break-all">legal@codjoe.com</a></p>
                                    <p className="mb-2 text-sm sm:text-base"><strong>Par téléphone :</strong> +33 1 42 25 30 15</p>
                                </div>
                                <div>
                                    <p className="mb-2 text-sm sm:text-base"><strong>Par courrier :</strong></p>
                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                        CODJOE SAS<br />
                                        Service Juridique<br />
                                        15 Avenue des Champs-Élysées<br />
                                        75008 Paris, France
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="text-center pt-4 sm:pt-6 border-t border-gray-200">
                        <p className="text-xs sm:text-sm text-gray-500">
                            Dernière mise à jour : 8 septembre 2025
                        </p>
                    </div>
                </div>
            </div>

            <ScrollToTopButton showScrollTop={showScrollTop} scrollToTop={scrollToTop} />
        </div>
    );
}

export default LegalNotice;
