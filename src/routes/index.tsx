import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from '../App';
import PropertyListPage from './PropertyListPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page (client view) */}
        <Route path="/" element={<App />} />

        {/* Dedicated properties page (always publicly accessible) */}
        <Route path="/properties" element={<PropertyListPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}