import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Menu, Phone, Mail, X, Eye, EyeOff, LogOut, Shield, ChevronDown, FileText, MessageSquare, Quote, Users, Linkedin, Instagram } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { config } from "@/config/env";
import { authApi } from "@/modules/auth/api";
import { useAuth } from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";

// Ícone do Discord (customizado)
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
  </svg>
);

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, isAuthenticated, user, loginAsAdmin, logout } = useAuth();
  const { showError } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Verificar se o usuário está logado ao carregar o componente
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      setIsLoggedIn(true);
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navItems = [
    // { name: "Serviços", href: "#trabalhadores" },
    { name: "Sobre Nós", href: "#sobre" },
    { name: "Blog", href: "#blog" },
    { name: "Submeter Projeto", href: "/submeter-projeto", isRoute: true },
  ];

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      // Usar a API de auth real
      const response = await authApi.login({
        email: adminCredentials.email,
        password: adminCredentials.password
      });
      
      // Salvar token no localStorage
      localStorage.setItem('authToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // Atualizar estado de login
      setIsLoggedIn(true);
      
      // Fechar modal e limpar campos
      setShowAdminModal(false);
      setAdminCredentials({ email: '', password: '' });
      
      // Disparar evento para outros componentes
      window.dispatchEvent(new CustomEvent('authChange'));
      
    } catch (error) {
      console.error('Erro no login:', error);
      showError('Credenciais inválidas. Verifique email e senha.');
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    // Limpar tokens do localStorage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('user');
    
    // Atualizar estado
    setIsAdminLoggedIn(false);
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    navigate('/');
    // Disparar evento para outros componentes
    window.dispatchEvent(new CustomEvent('authChange'));
  };

  const navigateToAdmin = (path: string) => {
    navigate(path);
    // Scroll para o topo da página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminClick = () => {
    if (isLoggedIn) {
      setShowLogoutModal(true);
    } else {
      setShowAdminModal(true);
    }
  };

  const handleNavClick = (href: string, isRoute?: boolean) => {
    // Se é uma rota interna (não âncora)
    if (isRoute) {
      navigate(href);
      setIsMenuOpen(false);
      return;
    }
    
    // Se estamos na página inicial, usar scroll suave para âncoras
    if (location.pathname === '/') {
      const element = document.querySelector(href) as HTMLElement;
      if (element) {
        const headerHeight = 80; // Altura reduzida do header
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Se estamos em outra página, navegar para a home com a âncora
      navigate(`/${href}`);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
    <header className="fixed top-0 w-full backdrop-blur-sm border-b border-border z-50" style={{ backgroundColor: '#F9F7F3' }}>
      {/* Top contact bar - Hidden on mobile */}
      <div className="bg-primary text-primary-foreground py-1.5 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          {/* Admin Login/Status - Discreto no canto esquerdo */}
          <div className="flex items-center space-x-2">
            <button 
              className="opacity-50 hover:opacity-100 text-xs transition-opacity"
              onClick={handleAdminClick}
              title={isLoggedIn ? "Admin Logado - Clique para sair" : "Admin Access"}
            >
              🔑
            </button>
            {isLoggedIn && (
              <span className="text-xs opacity-75">
                Modo administrador
              </span>
            )}
          </div>
          
          {/* Contact Info */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>{config.contact.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2 md:py-3">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              className="cursor-pointer"
              onClick={() => navigate('/')}
            >
              <img 
                src="/colab name.png" 
                alt="Núcleo Colab" 
                className="h-12 md:h-16 w-auto"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href, item.isRoute)}
                className="text-gray-800 hover:text-primary smooth-transition font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Admin Menu or Social Icons */}
          <div className="hidden lg:block">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline"
                    className="border-secondary text-secondary hover:text-white"
                    style={{ borderColor: '#01304A', color: '#01304A' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#01304A';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#01304A';
                    }}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Área Admin
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigateToAdmin('/admin/artigos')}>
                    <FileText className="w-4 h-4 mr-2" />
                    Gerenciar Artigos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigateToAdmin('/admin/artigos/novo')}>
                    <FileText className="w-4 h-4 mr-2" />
                    Novo Artigo
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigateToAdmin('/admin/leads')}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Gerenciar Respostas
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem onClick={() => navigate('/admin/depoimentos')}>
                    <Quote className="w-4 h-4 mr-2" />
                    Gerenciar Depoimentos
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigateToAdmin('/admin/equipe')}>
                    <Users className="w-4 h-4 mr-2" />
                    Gerenciar Equipe
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <a
                  href="https://discord.gg/colab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: 'rgba(1,48,74,0.1)', color: '#01304A' }}
                  title="Discord"
                >
                  <DiscordIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/colab_ufpb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: 'rgba(1,48,74,0.1)', color: '#01304A' }}
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/colab-ufpb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: 'rgba(1,48,74,0.1)', color: '#01304A' }}
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 animate-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.isRoute)}
                  className="text-gray-800 hover:text-primary smooth-transition font-medium text-left"
                >
                  {item.name}
                </button>
              ))}
              
              {/* Contact info for mobile */}
              <div className="border-t pt-4 mt-4 md:hidden">
                <div className="flex flex-col space-y-3 text-sm text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{config.contact.email}</span>
                  </div>
                </div>
              </div>
              
              {/* Admin section for mobile */}
              <div className="border-t pt-4 mt-4">
                {isLoggedIn ? (
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-muted-foreground">Área Administrativa</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="text-xs"
                      >
                        <LogOut className="w-3 h-3 mr-1" />
                        Sair
                      </Button>
                    </div>
                    <Button 
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full"
                      onClick={() => {
                        navigate('/admin/artigos');
                        setIsMenuOpen(false);
                      }}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Gerenciar Artigos
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full"
                      onClick={() => {
                        navigate('/admin/artigos/novo');
                        setIsMenuOpen(false);
                      }}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Novo Artigo
                    </Button>
                    <Button 
                      variant="default"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
                      onClick={() => {
                        navigate('/admin/leads');
                        setIsMenuOpen(false);
                      }}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Gerenciar Respostas
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant="ghost"
                      className="w-full justify-start text-muted-foreground"
                      onClick={() => {
                        setShowAdminModal(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Login Administrativo
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
    
    {/* Admin Login Modal - Fora do header para cobrir toda a tela */}
    {showAdminModal && (
      <div 
        className="fixed inset-0 z-[100]"
        onClick={() => setShowAdminModal(false)}
      >
        {/* Modal - Posicionado próximo à chave */}
        <Card 
          className="absolute top-12 left-4 w-64 shadow-xl border bg-background"
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-primary">
                Admin
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0"
                onClick={() => setShowAdminModal(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <form onSubmit={handleAdminLogin} className="space-y-3">
              <div className="space-y-1">
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="Email"
                  value={adminCredentials.email}
                  onChange={(e) => setAdminCredentials(prev => ({
                    ...prev,
                    email: e.target.value
                  }))}
                  className="h-8 text-sm"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Senha"
                    value={adminCredentials.password}
                    onChange={(e) => setAdminCredentials(prev => ({
                      ...prev,
                      password: e.target.value
                    }))}
                    className="h-8 text-sm pr-8"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-8 w-8 px-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-3 w-3" />
                    ) : (
                      <Eye className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoggingIn}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-8 text-sm disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary-foreground"></div>
                    Entrando...
                  </div>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )}

    {/* Admin Logout Modal */}
    {showLogoutModal && (
      <div 
        className="fixed inset-0 z-[100]"
        onClick={() => setShowLogoutModal(false)}
      >
        {/* Modal - Posicionado próximo à chave */}
        <Card 
          className="absolute top-12 left-4 w-64 shadow-xl border bg-background"
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-primary">
                Modo Administrador
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0"
                onClick={() => setShowLogoutModal(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Você está conectado como administrador.
              </p>
              
              <Button 
                onClick={handleLogout}
                variant="destructive"
                className="w-full h-8 text-sm flex items-center justify-center space-x-2"
              >
                <LogOut className="h-3 w-3" />
                <span>Desconectar</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )}
    </>
  );
};

export default Header;