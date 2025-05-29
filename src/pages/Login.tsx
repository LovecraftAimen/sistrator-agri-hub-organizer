
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tractor, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Login realizado",
        description: "Bem-vindo ao Sistema Sistrator!",
      });
    } else {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 ${isMobile ? 'p-3' : 'p-4'}`}>
      <Card className={`w-full ${isMobile ? 'max-w-sm' : 'max-w-md'} shadow-xl`}>
        <CardHeader className="text-center">
          <div className={`mx-auto ${isMobile ? 'w-12 h-12' : 'w-16 h-16'} bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mb-4`}>
            <Tractor className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-white`} />
          </div>
          <CardTitle className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>Sistrator</CardTitle>
          {!isMobile && (
            <CardDescription>
              Sistema de Gestão de Mecanização Agrícola
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="secagri@sistrator.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" text="" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          {!isMobile && (
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Credenciais de demonstração:</p>
              <div className="space-y-1 mt-2">
                <p className="font-mono text-xs">
                  secagri@sistrator.com | senha: sistrator123
                </p>
                <p className="font-mono text-xs">
                  prefeito@sistrator.com | senha: sistrator123
                </p>
                <p className="font-mono text-xs">
                  vereador@sistrator.com | senha: sistrator123
                </p>
                <p className="font-mono text-xs">
                  secretaria@sistrator.com | senha: sistrator123
                </p>
                <p className="font-mono text-xs">
                  tratorista@sistrator.com | senha: sistrator123
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
