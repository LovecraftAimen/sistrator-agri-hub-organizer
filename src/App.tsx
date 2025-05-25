
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Servicos from "./pages/Servicos";
import Beneficiarios from "./pages/Beneficiarios";
import Tratoristas from "./pages/Tratoristas";
import Agendamentos from "./pages/Agendamentos";
import Relatorios from "./pages/Relatorios";
import Documentos from "./pages/Documentos";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/servicos" element={
              <ProtectedRoute>
                <Servicos />
              </ProtectedRoute>
            } />
            <Route path="/beneficiarios" element={
              <ProtectedRoute>
                <Beneficiarios />
              </ProtectedRoute>
            } />
            <Route path="/tratoristas" element={
              <ProtectedRoute>
                <Tratoristas />
              </ProtectedRoute>
            } />
            <Route path="/agendamentos" element={
              <ProtectedRoute>
                <Agendamentos />
              </ProtectedRoute>
            } />
            <Route path="/relatorios" element={
              <ProtectedRoute>
                <Relatorios />
              </ProtectedRoute>
            } />
            <Route path="/documentos" element={
              <ProtectedRoute>
                <Documentos />
              </ProtectedRoute>
            } />
            <Route path="/configuracoes" element={
              <ProtectedRoute>
                <Configuracoes />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
