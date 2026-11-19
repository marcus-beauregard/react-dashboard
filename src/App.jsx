// SPDX-License-Identifier: GPL-2.0-or-later
// Copyright (C) 2026 Marcus Beauregard

import React, { useEffect, useState } from 'react';
import useCryptoPrices from './useCryptoPrices.js';

export default function App() {
  const [dark, setDark] = useState(false);
  const [temp, setTemp] = useState(null);
  const { prices, status, retry } = useCryptoPrices();

  useEffect(() => {
    navigator.geolocation && navigator.geolocation.getCurrentPosition((p) => {
      setTemp((p.coords.latitude * 0.6 + 15).toFixed(1));
    });
  }, []);

  return (
    <div style={{ background: dark ? '#111' : '#f5f5f5', color: dark ? '#eee' : '#222',
      minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>dashboard</h1>
        <button onClick={() => setDark(!dark)}>{dark ? 'light' : 'dark'}</button>
      </header>
      <p>local temp: {temp ? temp + ' C' : '—'}</p>
      {status === 'error' && (
        <p style={{ color: dark ? '#ffb4a2' : '#a4262c' }}>
          Live prices unavailable — showing last known values. <button onClick={retry}>retry</button>
        </p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
        {Object.entries(prices).map(([label, value]) => (
          <div key={label} style={{ background: dark ? '#222' : '#fff', padding: '1rem', borderRadius: 8 }}>
            <div style={{ opacity: .6 }}>{label}</div>
            {status === 'loading' ? (
              <div style={{ height: '2rem', marginTop: 4, borderRadius: 4, background: dark ? '#333' : '#e4e4e4' }} />
            ) : (
              <div style={{ fontSize: '1.6rem', fontWeight: 700 }}>
                {value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
