# Insignia Crypto Wallet - Frontend

A modern, responsive cryptocurrency wallet frontend application built with React, TypeScript, and Tailwind CSS.

## Project Overview

This is the frontend application for the Insignia Crypto Wallet system, providing users with an intuitive interface to manage their crypto wallet, perform transactions, and view analytics.

## Technology Stack

- **Framework**: React 18.3+
- **Build Tool**: Vite 5.4+
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3+
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Charts**: Recharts
- **State Management**: Zustand + React Context API
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast

## Features

- User authentication (login/register)
- Dashboard with balance overview
- Wallet top-up functionality
- Transfer funds between users
- Transaction history with filtering
- Top users leaderboard
- Data visualization with charts
- CSV export functionality
- Responsive design for all devices

## Prerequisites

- Node.js 18+ and npm
- Backend API running (see [backend repository](https://github.com/nerufuyo/insignia-crypto-backend))

## Installation

1. Clone the repository:
```bash
git clone https://github.com/nerufuyo/insignia-crypto-frontend.git
cd insignia-crypto-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set your backend API URL:
```env
VITE_API_BASE_URL=http://localhost:3001
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Loading.tsx
│   ├── dashboard/        # Dashboard-specific components
│   │   ├── TopupModal.tsx
│   │   ├── TransferModal.tsx
│   │   ├── RecentTransactions.tsx
│   │   └── StatsCards.tsx
│   └── layout/           # Layout components
│       ├── Header.tsx
│       ├── MainLayout.tsx
│       └── ProtectedRoute.tsx
├── contexts/             # React Context providers
│   └── AuthContext.tsx
├── pages/                # Page components
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── TransactionsPage.tsx
│   └── TopUsersPage.tsx
├── services/             # API service layer
│   ├── api.ts
│   ├── auth.service.ts
│   ├── balance.service.ts
│   ├── transfer.service.ts
│   └── transaction.service.ts
├── types/                # TypeScript type definitions
│   └── index.ts
├── utils/                # Utility functions
│   ├── format.ts
│   └── export.ts
├── App.tsx               # Main application component
└── main.tsx              # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The frontend communicates with the backend API for:

- **POST /register** - User registration/login
- **GET /balance** - Get user balance
- **POST /balance/topup** - Top up wallet balance
- **POST /transfer** - Transfer funds to another user
- **GET /transactions/user/top** - Get user's top transactions
- **GET /transactions/top-users** - Get top transacting users

All authenticated requests include the token in the `Authorization` header.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_BASE_URL | Backend API base URL | http://localhost:3001 |

## Architecture

The application follows clean architecture principles:

- **Separation of Concerns**: Components, services, and utilities are separated
- **Type Safety**: Full TypeScript implementation with strict mode
- **Reusability**: Common components and utilities
- **State Management**: Context API for auth, local state for components
- **Error Handling**: Centralized error handling with user feedback

## Development Guidelines

### Code Style

- Follow the existing code structure
- Use TypeScript for type safety
- Keep components focused and reusable
- Use Tailwind CSS utility classes

### Commit Messages

Follow conventional commit format:

```
feat: add user profile page
fix: resolve balance display issue
docs: update README installation steps
style: format code with prettier
refactor: simplify auth context
test: add login page tests
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with automatic builds on push

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables in Netlify dashboard

### Manual Deployment

1. Build: `npm run build`
2. Deploy the `dist` folder to any static hosting service

## Troubleshooting

### API Connection Issues

- Ensure backend is running
- Check VITE_API_BASE_URL in .env
- Verify CORS is enabled on backend

### Build Errors

- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `rm -rf dist`
- Check Node.js version: `node --version`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'feat: add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is part of the Insignia Crypto Wallet system.

## Contact

**Company**: Insignia  
**Address**: Kedoya Center D1, Jl. Raya Perjuangan 1, Kebon Jeruk, Jakarta Barat 11530  
**Website**: www.insignia.co.id

## Related Repositories

- Backend API: https://github.com/nerufuyo/insignia-crypto-backend
