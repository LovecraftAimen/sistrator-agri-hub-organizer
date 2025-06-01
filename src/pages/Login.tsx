
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
import { authService } from '@/services/authService';
import { Tractor, Eye, EyeOff, UserPlus } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isCreatingUsers, setIsCreatingUsers] = useState(false);
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

    console.log('Login attempt with:', email, 'Password length:', password.length);
    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Login realizado",
        description: "Bem-vindo ao Sistema Sistrator!",
      });
    } else {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos. Verifique suas credenciais.",
        variant: "destructive"
      });
    }
  };

  const handleQuickLogin = (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
  };

  const handleCreateDemoUsers = async () => {
    setIsCreatingUsers(true);
    try {
      console.log('Creating demo users...');
      const result = await authService.createDemoUsers();
      console.log('Demo users result:', result);
      
      toast({
        title: "Usuários criados",
        description: "Usuários de demonstração criados com sucesso!",
      });
      
      // Verificar usuários após criação
      setTimeout(async () => {
        const users = await authService.checkUsersExist();
        console.log('Users verified:', users);
      }, 1000);
      
    } catch (error) {
      console.error('Error creating demo users:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar usuários de demonstração.",
        variant: "destructive"
      });
    } finally {
      setIsCreatingUsers(false);
    }
  };

  // Credenciais específicas para cada função
  const loginCredentials = [
    { 
      email: 'secagri@sistrator.com', 
      password: 'Admin@2024!', 
      label: 'Secretário Agricultura (Admin)' 
    },
    { 
      email: 'prefeito@sistrator.com', 
      password: 'Prefeito#2024', 
      label: 'Prefeito Municipal' 
    },
    { 
      email: 'vereador@sistrator.com', 
      password: 'Vereador$2024', 
      label: 'Vereador' 
    },
    { 
      email: 'secretaria@sistrator.com', 
      password: 'Secretaria&2024', 
      label: 'Secretária' 
    },
    { 
      email: 'tratorista@sistrator.com', 
      password: 'Tratorista%2024', 
      label: 'Tratorista' 
    }
  ];

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

          <div className="mt-4">
            <Button
              onClick={handleCreateDemoUsers}
              disabled={isCreatingUsers}
              variant="outline"
              className="w-full"
            >
              {isCreatingUsers ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" text="" />
                  Criando usuários...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Criar Usuários Demo
                </>
              )}
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p className="mb-2">Credenciais de demonstração:</p>
            <div className="space-y-2">
              {loginCredentials.map((credential, index) => (
                <div key={index} className="bg-gray-50 p-2 rounded">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs mb-1"
                    onClick={() => handleQuickLogin(credential.email, credential.password)}
                    disabled={isLoading}
                  >
                    {credential.label}
                  </Button>
                  <div className="text-xs text-gray-600">
                    <div>Email: {credential.email}</div>
                    <div>Senha: {credential.password}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
