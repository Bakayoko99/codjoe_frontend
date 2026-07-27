import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CookieBanner from '../components/CookieBanner';

/**
 * Tests unitaires — CookieBanner
 * Vérifie le recueil du consentement cookies conformément au RGPD Art. 7.
 */
describe('CookieBanner', () => {

    beforeEach(() => {
        localStorage.clear();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    const renderBanner = () =>
        render(
            <MemoryRouter>
                <CookieBanner />
            </MemoryRouter>
        );

    const showBanner = () => {
        renderBanner();
        act(() => { vi.advanceTimersByTime(800); });
    };

    it('ne s\'affiche pas si le consentement est déjà enregistré (accepted)', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        renderBanner();
        expect(screen.queryByRole('dialog')).toBeNull();
    });

    it('ne s\'affiche pas si le consentement est déjà enregistré (rejected)', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        renderBanner();
        expect(screen.queryByRole('dialog')).toBeNull();
    });

    it('s\'affiche après le délai si aucun consentement n\'est enregistré', () => {
        renderBanner();
        expect(screen.queryByRole('dialog')).toBeNull();
        act(() => { vi.advanceTimersByTime(800); });
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('affiche les boutons Accepter et Refuser', () => {
        showBanner();
        expect(screen.getByRole('button', { name: /accepter/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /refuser/i })).toBeInTheDocument();
    });

    it('enregistre "accepted" et se ferme quand on clique Accepter', () => {
        showBanner();
        fireEvent.click(screen.getByRole('button', { name: /accepter/i }));
        expect(localStorage.getItem('cookieConsent')).toBe('accepted');
        expect(screen.queryByRole('dialog')).toBeNull();
    });

    it('enregistre "rejected" et se ferme quand on clique Refuser', () => {
        showBanner();
        fireEvent.click(screen.getByRole('button', { name: /refuser/i }));
        expect(localStorage.getItem('cookieConsent')).toBe('rejected');
        expect(screen.queryByRole('dialog')).toBeNull();
    });

    it('contient un lien vers la politique de confidentialité', () => {
        showBanner();
        const link = screen.getByRole('link', { name: /politique de confidentialité/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/privacy-policy');
    });
});
