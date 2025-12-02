import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SubmitProject from "./pages/SubmitProject";
import { AdminArticles, AllArticles, ArticleView, ArticleEditor } from "@/modules/articles";
import AdminLeads from "@/modules/leads/pages/AdminLeads";
import AdminTestimonials from "@/modules/testimonials/pages/AdminTestimonials";
import TestimonialsDemo from "@/modules/testimonials/pages/TestimonialsDemo";
import AdminTeam from "@/modules/team/pages/AdminTeam";
import TeamDemo from "@/modules/team/pages/TeamDemo";
import ProtectedRoute from "./components/ProtectedRoute";
import { ModalProvider } from "./hooks/useModal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ModalProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/submeter-projeto" element={<SubmitProject />} />
          
          {/* Rotas públicas de artigos */}
          <Route path="/artigos" element={<AllArticles />} />
          <Route path="/artigo/:id" element={<ArticleView />} />
          
          {/* Rotas administrativas */}
          <Route path="/admin/artigos" element={
            <ProtectedRoute>
              <AdminArticles />
            </ProtectedRoute>
          } />
          <Route path="/admin/artigos/novo" element={
            <ProtectedRoute>
              <ArticleEditor />
            </ProtectedRoute>
          } />
          <Route path="/admin/artigos/editar/:id" element={
            <ProtectedRoute>
              <ArticleEditor />
            </ProtectedRoute>
          } />
          <Route path="/admin/leads" element={
            <ProtectedRoute>
              <AdminLeads />
            </ProtectedRoute>
          } />
          <Route path="/admin/depoimentos" element={
            <ProtectedRoute>
              <AdminTestimonials />
            </ProtectedRoute>
          } />
          <Route path="/admin/equipe" element={
            <ProtectedRoute>
              <AdminTeam />
            </ProtectedRoute>
          } />
          <Route path="/demo/depoimentos" element={<TestimonialsDemo />} />
          <Route path="/demo/equipe" element={<TeamDemo />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </ModalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
