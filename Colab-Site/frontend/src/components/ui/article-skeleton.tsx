import { Skeleton } from "./skeleton";
import { Card, CardContent, CardHeader } from "./card";

// Skeleton para card de artigo individual
export const ArticleCardSkeleton = () => {
  return (
    <Card className="card-shadow border-0 overflow-hidden">
      {/* Imagem skeleton */}
      <Skeleton className="h-48 w-full rounded-none" />
      
      <CardHeader className="pb-3">
        {/* Categoria skeleton */}
        <Skeleton className="h-4 w-20 mb-2" />
        
        {/* Título skeleton */}
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Descrição skeleton */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        
        {/* Data e botão skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-28" />
        </div>
      </CardContent>
    </Card>
  );
};

// Skeleton para artigo grande (featured)
export const ArticleFeaturedSkeleton = () => {
  return (
    <Card className="card-shadow border-0 overflow-hidden lg:col-span-2">
      {/* Imagem skeleton */}
      <Skeleton className="h-64 lg:h-80 w-full rounded-none" />
      
      <CardHeader className="pb-3">
        {/* Categoria skeleton */}
        <Skeleton className="h-4 w-24 mb-3" />
        
        {/* Título skeleton */}
        <Skeleton className="h-8 w-full mb-2" />
        <Skeleton className="h-8 w-4/5 mb-2" />
        <Skeleton className="h-8 w-2/3" />
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Descrição skeleton */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-6" />
        
        {/* Data e botão skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-40" />
        </div>
      </CardContent>
    </Card>
  );
};

// Skeleton para artigo pequeno (sidebar)
export const ArticleSmallSkeleton = () => {
  return (
    <Card className="card-shadow border-0 overflow-hidden">
      {/* Imagem skeleton */}
      <Skeleton className="h-32 w-full rounded-none" />
      
      <CardHeader className="pb-2">
        {/* Categoria skeleton */}
        <Skeleton className="h-3 w-16 mb-2" />
        
        {/* Título skeleton */}
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-4/5" />
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Descrição skeleton */}
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-3/4 mb-3" />
        
        {/* Data e botão skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-7 w-20" />
        </div>
      </CardContent>
    </Card>
  );
};

// Skeleton para lista de artigos (grid)
export const ArticleGridSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  );
};

// Skeleton para seção de blog (homepage)
export const BlogSectionSkeleton = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Título da seção skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-80 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        {/* Layout desktop */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {/* Artigo principal */}
          <ArticleFeaturedSkeleton />
          
          {/* Artigos menores */}
          <div className="space-y-6">
            <ArticleSmallSkeleton />
            <ArticleSmallSkeleton />
            
            {/* Botão chamativo skeleton */}
            <Card className="card-shadow border-0 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <Skeleton className="h-6 w-48 mx-auto mb-2" />
                <Skeleton className="h-4 w-64 mx-auto mb-4" />
                <Skeleton className="h-10 w-40 mx-auto" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Layout mobile */}
        <div className="lg:hidden">
          <div className="flex gap-4 overflow-hidden">
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
          </div>
          
          {/* Botão admin skeleton */}
          <div className="mt-8 text-center">
            <Skeleton className="h-10 w-48 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Skeleton para visualização de artigo individual
// Hero Section Skeleton
export const HeroImageSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl elegant-shadow">
      <Skeleton className="w-full h-[600px]" />
    </div>
  );
};

// Mobile Lawyer Photo Skeleton
export const MobileLawyerPhotoSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-xl card-shadow">
      <Skeleton className="w-full h-48" />
    </div>
  );
};

// About Section Image Skeleton (Desktop)
export const AboutImageDesktopSkeleton = () => {
  return (
    <div className="overflow-hidden border-0 elegant-shadow rounded-lg">
      <div className="aspect-square">
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
};

// About Section Image Skeleton (Mobile)
export const AboutImageMobileSkeleton = () => {
  return (
    <div className="overflow-hidden border-0 elegant-shadow rounded-lg">
      <div className="aspect-square">
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
};

// Workers Rights Card Image Skeleton (Desktop)
export const WorkersCardImageDesktopSkeleton = () => {
  return (
    <div className="h-48 overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

// Workers Rights Card Image Skeleton (Mobile)
export const WorkersCardImageMobileSkeleton = () => {
  return (
    <div className="h-24 overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export const ArticleViewSkeleton = () => {
  return (
    <main className="container mx-auto px-4 py-8 mt-32">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-8">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Conteúdo principal */}
        <div className="lg:col-span-2">
          {/* Categoria e botões skeleton */}
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-24" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
            </div>
          </div>

          {/* Título skeleton */}
          <Skeleton className="h-12 w-full mb-2" />
          <Skeleton className="h-12 w-4/5 mb-6" />

          {/* Meta informações skeleton */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          {/* Imagem principal skeleton */}
          <Skeleton className="h-64 lg:h-96 w-full mb-8 rounded-lg" />

          {/* Conteúdo do artigo skeleton */}
          <div className="prose prose-lg max-w-none">
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-4/5 mb-6" />
            
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-3/4 mb-6" />
            
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-2/3 mb-6" />
            
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-4/5 mb-6" />
          </div>

          {/* Botões de navegação skeleton */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Artigos relacionados skeleton */}
          <Card className="card-shadow border-0">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex gap-3">
                  <Skeleton className="h-16 w-16 flex-shrink-0 rounded" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* CTA skeleton */}
          <Card className="card-shadow border-0 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6 text-center">
              <Skeleton className="h-6 w-48 mx-auto mb-3" />
              <Skeleton className="h-4 w-56 mx-auto mb-4" />
              <Skeleton className="h-10 w-40 mx-auto" />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};
