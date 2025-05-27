
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export const RoleBasedRoute = ({ children, allowedRoles }: RoleBasedRouteProps) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    // Redirecionar baseado no papel do usuário
    if (user?.role === 'prefeito' || user?.role === 'vereador' || user?.role === 'secretaria') {
      return <Navigate to="/beneficiarios" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
