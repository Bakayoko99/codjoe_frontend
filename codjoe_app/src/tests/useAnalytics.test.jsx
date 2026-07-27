import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useAnalytics from '../hooks/useAnalytics';

/**
 * Tests unitaires — hook useAnalytics
 * Vérifie que le tracking GA4 respecte le consentement RGPD.
 */
describe('useAnalytics', () => {

    beforeEach(() => {
        localStorage.clear();
        window.gtag = vi.fn();
    });

    it('ne trace pas les événements sans consentement', () => {
        localStorage.removeItem('cookieConsent');
        const { result } = renderHook(() => useAnalytics());
        act(() => {
            result.current.trackEvent('test_event', { value: 1 });
        });
        expect(window.gtag).not.toHaveBeenCalled();
    });

    it('ne trace pas les événements avec consentement refusé', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        const { result } = renderHook(() => useAnalytics());
        act(() => {
            result.current.trackEvent('test_event');
        });
        expect(window.gtag).not.toHaveBeenCalled();
    });

    it('trace les événements avec consentement accepté', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        const { result } = renderHook(() => useAnalytics());
        act(() => {
            result.current.trackEvent('add_to_cart', { item_id: 'prod-1', value: 29.99 });
        });
        expect(window.gtag).toHaveBeenCalledWith('event', 'add_to_cart', { item_id: 'prod-1', value: 29.99 });
    });

    it('trace les vues de page avec consentement accepté', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        const { result } = renderHook(() => useAnalytics());
        act(() => {
            result.current.trackPageView('/product/abc', 'Mon Produit - CODJOE');
        });
        expect(window.gtag).toHaveBeenCalledWith('event', 'page_view', {
            page_path: '/product/abc',
            page_title: 'Mon Produit - CODJOE',
        });
    });

    it('trace un achat avec les bons paramètres', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        const { result } = renderHook(() => useAnalytics());
        act(() => {
            result.current.trackPurchase('ORDER-001', 59.98, [{ item_id: 'prod-1', quantity: 2 }]);
        });
        expect(window.gtag).toHaveBeenCalledWith('event', 'purchase', {
            transaction_id: 'ORDER-001',
            value: 59.98,
            currency: 'EUR',
            items: [{ item_id: 'prod-1', quantity: 2 }],
        });
    });
});
