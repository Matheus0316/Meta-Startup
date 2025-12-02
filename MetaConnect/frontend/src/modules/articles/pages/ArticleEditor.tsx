import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Trash2,
  AlertCircle,
  Home,
  Upload,
  X,
  Image as ImageIcon
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useModal } from "@/hooks/useModal";
import { uploadApi } from "@/modules/upload/api";
import { articlesApi } from "../api";
import { Article, CreateArticleRequest, UpdateArticleRequest } from "../types";
import { ArticleEditorSkeleton } from "@/components/ui/admin-skeleton";

const ArticleEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const articleId = id || '';
  const { showError, showSuccess, showWarning, showConfirm } = useModal();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [article, setArticle] = useState<Partial<Article>>({
    title: '',
    subtitle: '',
    content: '',
    category: '',
    image: '',
    active: false
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [homepageCount, setHomepageCount] = useState(0);

  useEffect(() => {
    const initializePage = async () => {
      await loadCategories();
      await loadHomepageCount();
      
      if (isEditing) {
        await loadArticle();
      } else {
        setLoading(false);
      }
    };
    
    initializePage();
  }, [isEditing, articleId]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      const response = await articlesApi.getById(articleId);
      setArticle(response.article);
    } catch (error) {
      console.error('Erro ao carregar artigo:', error);
      showError('Erro ao carregar artigo. Verifique se o ID é válido.');
      navigate('/admin/artigos');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await articlesApi.getCategories();
      setCategories(response.categories);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const loadHomepageCount = async () => {
    try {
      const response = await articlesApi.getAll();
      const count = response.articles.filter(a => a.active).length;
      setHomepageCount(count);
    } catch (error) {
      console.error('Erro ao carregar contagem da homepage:', error);
    }
  };

  const handleInputChange = (field: keyof Article, value: string | boolean) => {
    setArticle(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      showWarning('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    // Validar tamanho (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      showWarning('A imagem deve ter no máximo 5MB.');
      return;
    }

    try {
      setUploading(true);
      const response = await uploadApi.uploadImage(file);
      handleInputChange('image', response.url);
      showSuccess('Imagem enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      showError('Erro ao enviar imagem. Tente novamente.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    handleInputChange('image', '');
  };

  const handleSave = async () => {
    try {
      // Validações básicas
      if (!article.title?.trim()) {
        showWarning('O título é obrigatório.');
        return;
      }
      
      if (article.title.trim().length < 5) {
        showWarning('O título deve ter pelo menos 5 caracteres.');
        return;
      }
      
      if (!article.content?.trim()) {
        showWarning('O conteúdo é obrigatório.');
        return;
      }
      
      if (article.content.trim().length < 50) {
        showWarning('O conteúdo deve ter pelo menos 50 caracteres.');
        return;
      }
      
      if (!article.category?.trim()) {
        showWarning('A categoria é obrigatória.');
        return;
      }

      // Verificar limite de homepage
      if (article.active && homepageCount >= 3) {
        // Se estiver editando, verificar se o artigo já estava ativo
        if (isEditing) {
          const response = await articlesApi.getById(articleId);
          const wasActive = response.article?.active || false;
          // Se não estava ativo antes e agora quer ativar, verificar limite
          if (!wasActive) {
            showWarning('Você só pode ter até 3 artigos na tela inicial.');
            return;
          }
        } else {
          // Se estiver criando novo artigo
          showWarning('Você só pode ter até 3 artigos na tela inicial.');
          return;
        }
      }

      setSaving(true);

      if (isEditing) {
        // Atualizar artigo existente
        const updateData: UpdateArticleRequest = {
          title: article.title?.trim(),
          subtitle: article.subtitle?.trim() || undefined,
          content: article.content?.trim(),
          category: article.category?.trim(),
          image: article.image?.trim() || undefined,
          active: article.active
        };
        
        await articlesApi.update(articleId, updateData);
        showSuccess('Artigo atualizado com sucesso!');
      } else {
        // Criar novo artigo
        const createData: CreateArticleRequest = {
          title: article.title?.trim() || '',
          subtitle: article.subtitle?.trim(),
          content: article.content?.trim() || '',
          category: article.category?.trim() || '',
          image: article.image?.trim(),
          active: article.active || false
        };
        
        await articlesApi.create(createData);
        showSuccess('Artigo criado com sucesso!');
      }

      navigate('/admin/artigos');
    } catch (error) {
      console.error('Erro ao salvar artigo:', error);
      showError('Erro ao salvar artigo. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!isEditing) return;

    showConfirm(
      'Tem certeza que deseja excluir este artigo? Esta ação não pode ser desfeita.',
      async () => {
        try {
          setSaving(true);
          await articlesApi.delete(articleId);
          showSuccess('Artigo excluído com sucesso!');
          navigate('/admin/artigos');
        } catch (error) {
          console.error('Erro ao excluir artigo:', error);
          showError('Erro ao excluir artigo. Tente novamente.');
        } finally {
          setSaving(false);
        }
      },
      {
        title: 'Excluir Artigo',
        confirmText: 'Excluir',
        cancelText: 'Cancelar'
      }
    );
  };

  const handlePreview = () => {
    if (isEditing) {
      navigate(`/artigo/${articleId}`);
    } else {
      showWarning('Salve o artigo primeiro para visualizá-lo.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <ArticleEditorSkeleton />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-32">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/admin/artigos')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-playfair font-bold text-primary">
                {isEditing ? 'Editar Artigo' : 'Novo Artigo'}
              </h1>
              <p className="text-muted-foreground">
                {isEditing ? 'Edite as informações do artigo' : 'Crie um novo artigo para o blog'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isEditing && (
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="w-4 h-4 mr-2" />
                Visualizar
              </Button>
            )}
            <Button 
              onClick={handleSave} 
              disabled={saving}
              className="bg-primary hover:bg-primary/90"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulário Principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Título * (mínimo 5 caracteres)</Label>
                  <Input
                    id="title"
                    value={article.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Digite o título do artigo"
                    className="mt-1"
                  />
                  {article.title && article.title.length > 0 && (
                    <p className={`text-xs mt-1 ${article.title.length >= 5 ? 'text-green-600' : 'text-red-600'}`}>
                      {article.title.length}/5 caracteres mínimos
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="subtitle">Subtítulo</Label>
                  <Input
                    id="subtitle"
                    value={article.subtitle || ''}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    placeholder="Digite um subtítulo (opcional)"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Categoria *</Label>
                  <div className="mt-1 space-y-2">
                    <Input
                      id="category"
                      value={article.category || ''}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      placeholder="Digite a categoria"
                    />
                    {categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-muted-foreground">Sugestões:</span>
                        {categories.map((cat) => (
                          <Badge
                            key={cat}
                            variant="outline"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                            onClick={() => handleInputChange('category', cat)}
                          >
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="image">Imagem do Artigo</Label>
                  <div className="mt-1 space-y-4">
                    {article.image ? (
                      <div className="relative">
                        <img 
                          src={article.image} 
                          alt="Preview" 
                          className="w-full h-48 object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={handleRemoveImage}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600 mb-4">
                          Adicione uma imagem para o artigo
                        </p>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            disabled={uploading}
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            disabled={uploading}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            {uploading ? 'Enviando...' : 'Selecionar Imagem'}
                          </Button>
                        </div>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conteúdo</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="content">Conteúdo do Artigo * (mínimo 50 caracteres)</Label>
                  <Textarea
                    id="content"
                    value={article.content || ''}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Digite o conteúdo completo do artigo..."
                    className="mt-1 min-h-[400px]"
                  />
                  {article.content && article.content.length > 0 && (
                    <p className={`text-xs mt-1 ${article.content.length >= 50 ? 'text-green-600' : 'text-red-600'}`}>
                      {article.content.length}/50 caracteres mínimos
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mt-2">
                    Você pode usar HTML básico para formatação.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Painel Lateral */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Home className="w-4 h-4" />
                  <span>Tela Inicial</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="homepage">Mostrar na tela inicial</Label>
                    <p className="text-sm text-muted-foreground">
                      Artigos em destaque ({homepageCount}/3)
                    </p>
                  </div>
                  <Switch
                    id="homepage"
                    checked={article.active || false}
                    onCheckedChange={(checked) => {
                      // Verificar limite antes de permitir ativar
                      if (checked && homepageCount >= 3 && !article.active) {
                        showWarning('Você só pode ter até 3 artigos na tela inicial.');
                        return;
                      }
                      handleInputChange('active', checked);
                    }}
                    disabled={!article.active && homepageCount >= 3}
                  />
                </div>
                
                {!article.active && homepageCount >= 3 && (
                  <div className="flex items-center space-x-2 mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-amber-800">
                      Limite de 3 artigos atingido
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {isEditing && (
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-black-600">Excluir Artigo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Atenção. Esta ação não pode ser desfeita.
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={handleDelete}
                    disabled={saving}
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir Artigo
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleEditor;
