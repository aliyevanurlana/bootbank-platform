# 🏦 BootBank — Enterprise Banking UI Ecosystem

## Bootcamp Final Layihə

> **Texnologiya:** React 18 + TypeScript + Ant Design 6 + Vite

### Quick Start

```bash
# 1. Dependencies qur
yarn install

# 2. Dev serveri işə sal
yarn run dev

# 3. Brauzerdə aç
# → http://localhost:5173
```

### Demo Giriş

```
Email: (hər hansı email)
Şifrə: (hər hansı)
OTP: (hər hansı 6 rəqəm)
```

### Layihə Strukturu

```
src/app/
├── AppAntD.tsx              ← Router (toxunmayın)
├── contexts/AuthContext.tsx  ← Auth state (toxunmayın)
├── theme/antd-config.ts     ← Dizayn tokenləri (toxunmayın)
├── components/layouts/      ← Layout (toxunmayın)
├── services/                ← API service layer
│   ├── api.ts               ← Axios instance
│   ├── cards/types.ts       ← Card type definitions
│   ├── deposits/types.ts    ← Deposit type definitions
│   └── credit/types.ts      ← Credit type definitions
└── pages/
    ├── cards/       ← 🟦 CardMasters qrupu
    ├── deposits/    ← 🟩 DepositGuardians qrupu
    └── credit/      ← 🟧 LoanArchitects qrupu
```

### Ətraflı Məlumat

**TEAM_GUIDE.md** faylını oxuyun — orada hər şey ətraflı izah olunub:
- Komanda strukturu və tapşırıqlar
- Dizayn sistemi və tokenlər
- API contracts
- Kod standartları
- Sprint planlaması

---

*BootBank Enterprise Banking UI Ecosystem — İyun 2026*
