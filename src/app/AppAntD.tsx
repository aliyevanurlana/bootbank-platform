import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppLayoutAntD } from "./components/layouts/AppLayoutAntD";
import { LoginPageAntD } from "./pages/auth/LoginPageAntD";
import { OTPPageAntD } from "./pages/auth/OTPPageAntD";
import { ForgotPasswordPageAntD } from "./pages/auth/ForgotPasswordPageAntD";
import { WelcomePageAntD } from "./pages/WelcomePageAntD";
// TODO: Import your module pages here
// import { CardsDashboardAntD } from "./pages/cards/CardsDashboardAntD";
import { MyLoans } from "./pages/credit/MyLoans";
import { antdTheme } from './theme/antd-config';

// Placeholder component for pages not yet built
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>{title}</h2>
      <p style={{ color: 'rgba(0,0,0,0.45)' }}>Bu səhifə hələ yaradılmayıb. Siz bunu yaradacaqsınız!</p>
    </div>
  );
}

function AuthRedirect() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/welcome" replace /> : <Navigate to="/auth/login" replace />;
}

export default function AppAntD() {
  return (
    <ConfigProvider theme={antdTheme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthRedirect />} />

            <Route path="/auth/login" element={<LoginPageAntD />} />
            <Route path="/auth/otp" element={<OTPPageAntD />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPageAntD />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayoutAntD />
                </ProtectedRoute>
              }
            >
              <Route path="welcome" element={<WelcomePageAntD />} />

              {/* === CARDS MODULE === */}
              {/* TODO: CardMasters — bu route-ları öz komponentlərinizlə əvəz edin */}
              <Route path="cards" element={<PlaceholderPage title="Cards Dashboard" />} />
              <Route path="cards/my-cards" element={<PlaceholderPage title="My Cards" />} />
              <Route path="cards/transactions" element={<PlaceholderPage title="Transactions" />} />

              {/* === DEPOSITS MODULE === */}
              {/* TODO: DepositGuardians — bu route-ları öz komponentlərinizlə əvəz edin */}
              <Route path="deposits" element={<PlaceholderPage title="Deposits Dashboard" />} />
              <Route path="deposits/my-deposits" element={<PlaceholderPage title="My Deposits" />} />
              <Route path="deposits/open" element={<PlaceholderPage title="Open Deposit" />} />

              {/* === CREDIT MODULE === */}
              {/* TODO: LoanArchitects — bu route-ları öz komponentlərinizlə əvəz edin */}
              <Route path="credit" element={<PlaceholderPage title="Credit Dashboard" />} />
              <Route path="credit/apply" element={<PlaceholderPage title="Loan Application" />} />
<Route path="credit/my-loans" element={<MyLoans />} />
              <Route path="credit/calculator" element={<PlaceholderPage title="Loan Calculator" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ConfigProvider>
  );
}
