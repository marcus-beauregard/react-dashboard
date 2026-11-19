// SPDX-License-Identifier: GPL-2.0-or-later
// Copyright (C) 2026 Marcus Beauregard

import { useCallback, useEffect, useState } from 'react';

// CoinGecko ids plus the hardcoded values we fall back to when the API is
// unreachable, so the tiles keep rendering offline.
export const COINS = [
  { id: 'bitcoin', label: 'BTC', fallback: 41230.5 },
  { id: 'ethereum', label: 'ETH', fallback: 2875.2 },
  { id: 'solana', label: 'SOL', fallback: 142.8 },
];

const ENDPOINT = 'https://api.coingecko.com/api/v3/simple/price';
const REFRESH_MS = 60_000;

const fallbackPrices = () =>
  COINS.reduce((acc, coin) => ({ ...acc, [coin.label]: coin.fallback }), {});

/**
 * Live USD prices for the dashboard tiles.
 *
 * Returns { prices, status, retry } where status is 'loading' | 'ready' |
 * 'error'. Prices start at the hardcoded fallbacks and are replaced as soon as
 * the first fetch succeeds; a failed fetch leaves the last good (or fallback)
 * values on screen and flips status to 'error'.
 */
export default function useCryptoPrices() {
  const [prices, setPrices] = useState(fallbackPrices);
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setStatus('loading');
    setAttempt((n) => n + 1);
  }, []);

  useEffect(() => {
    const ids = COINS.map((coin) => coin.id).join(',');
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(ENDPOINT + '?ids=' + ids + '&vs_currencies=usd');
        if (!res.ok) throw new Error('CoinGecko responded ' + res.status);

        const data = await res.json();
        const next = {};
        for (const coin of COINS) {
          const usd = data && data[coin.id] && data[coin.id].usd;
          if (typeof usd === 'number') next[coin.label] = usd;
        }
        if (Object.keys(next).length === 0) {
          throw new Error('CoinGecko returned no prices');
        }
        if (cancelled) return;

        setPrices((prev) => ({ ...prev, ...next }));
        setStatus('ready');
      } catch (err) {
        if (cancelled) return;
        console.warn('price refresh failed:', err);
        setStatus('error');
      }
    }

    load();
    const timer = setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [attempt]);

  return { prices, status, retry };
}
