import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Alert from '../components/Alert';

/**
 * Tests unitaires — Composant Alert
 * Vérifie l'affichage conditionnel et les variantes du composant.
 */
describe('Alert', () => {

    it('ne s\'affiche pas quand show=false', () => {
        render(<Alert show={false} message="message caché" type="error" onClose={() => {}} />);
        expect(screen.queryByText('message caché')).not.toBeInTheDocument();
    });

    it('affiche le message quand show=true', () => {
        render(<Alert show={true} message="Produit ajouté !" type="success" onClose={() => {}} />);
        expect(screen.getByText('Produit ajouté !')).toBeInTheDocument();
    });

    it('affiche l\'icône "success" ✅ pour le type success', () => {
        render(<Alert show={true} message="OK" type="success" onClose={() => {}} />);
        expect(screen.getByText('✅')).toBeInTheDocument();
    });

    it('affiche l\'icône "error" ❌ pour le type error', () => {
        render(<Alert show={true} message="Erreur" type="error" onClose={() => {}} />);
        expect(screen.getByText('❌')).toBeInTheDocument();
    });

    it('appelle onClose quand on clique sur le bouton de fermeture', () => {
        const onClose = vi.fn();
        render(<Alert show={true} message="Test" type="info" onClose={onClose} />);
        const closeBtn = screen.getByRole('button');
        fireEvent.click(closeBtn);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('utilise le type "error" par défaut si aucun type n\'est spécifié', () => {
        render(<Alert show={true} message="Défaut" onClose={() => {}} />);
        expect(screen.getByText('❌')).toBeInTheDocument();
    });
});
