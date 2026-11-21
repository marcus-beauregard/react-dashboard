<div align="center">

<img src="assets/logo-512.png" width="96" alt="react-dashboard">

# react-dashboard

**A small React dashboard: live prices, local weather, dark mode.**

[![CI](https://github.com/marcus-beauregard/react-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/marcus-beauregard/react-dashboard/actions/workflows/ci.yml)
[![License: GPL-2.0-or-later](https://img.shields.io/badge/license-GPL--2.0--or--later-blue.svg)](LICENSE)

</div>

## Quick start

```bash
npm install
npm run dev      # Vite dev server
npm run build    # static build into dist/
```

## What it does

- Asset tiles with prices refreshed from CoinGecko every 60 seconds.
- A temperature for your approximate location, via the browser geolocation API.
- A dark/light toggle. It does not survive a reload yet (#3).

No API key needed — CoinGecko's public endpoints are used directly.

## Develop

```bash
npm run dev
```

There is no test setup yet (#4), and CI currently only prints the Node version (#5).

## Known gaps

Fallback prices are rendered as if they were live (#11), the toggle exposes no accessible state (#9), polling continues while the tab is hidden (#8), and a failed fetch retries forever every 60s (#7).

## Contributing

Humans and automated agents are both welcome. There is no CLA — every commit carries a [DCO](https://developercertificate.org/) sign-off (**git commit -s**).

Start with a [good first issue](https://github.com/marcus-beauregard/react-dashboard/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22), or read [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

GPL-2.0-or-later — see [LICENSE](LICENSE). Copyright (C) 2026 Marcus Beauregard.
