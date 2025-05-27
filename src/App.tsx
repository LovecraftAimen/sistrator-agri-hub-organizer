import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RoleBasedRoute } from "@/components/RoleBasedRoute";
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
import RegistrarServicos from "./pages/RegistrarServicos";
import DiarioTrator from "./pages/DiarioTrator";

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
                <RoleBasedRoute allowedRoles={['admin']}>
                  <Index />
                </RoleBasedRoute>
              </ProtectedRoute>
            } />
            <Route path="/servicos" element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={['admin']}>
                  <Servicos />
                </RoleBasedRoute>
              </ProtectedRoute>
            } />
            <Route path="/beneficiarios" element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={['admin', 'prefeito', 'vereador', 'secretaria', 'tratorista']}>
                  <Beneficiarios />
                </RoleBasedRoute>
              </ProtectedRoute>
            } />
            <Route path="/tratoristas" element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={['admin']}>
                  <Tratoristas />
                </RoleBasedRoute>
              </ProtectedRoute>
            } />
            <Route path="/agendamentos" element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={['admin']}>
                  <Agendamentos />
                </RoleBasedRoute>
              </ProtectedRoute>
            } />
            <Route path="/relatorios" element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={['admin']}>
                  <Relatorios />
                </RoleBasedRoute>
              </ProtectedRoute>
            } />
            <Route path="/documentos" element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={['admin']}>
                  <Documentos />
                </RoleBasedRoute>
              </ProtectedRoute>
            } />
            <Route path="/registrar-servicos" element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={['tratorista']}>
                  <RegistrarServicos />
                </RoleBasedRoute>
              </ProtectedRoute>
            } />
            <Route path="/diario-trator" element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={['tratorista']}>
                  <DiarioTrator />
                </RoleBasedRoute>
              </ProtectedRoute>
            } />
            <Route path="/configuracoes" element={
              <ProtectedRoute>
                <RoleBasedRoute allowedRoles={['admin', 'prefeito', 'vereador', 'secretaria', 'tratorista']}>
                  <Configuracoes />
                </RoleBasedRoute>
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
