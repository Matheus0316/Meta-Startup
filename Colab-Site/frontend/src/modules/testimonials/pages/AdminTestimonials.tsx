import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ImageUpload from "@/components/ui/image-upload";
import { Plus, Edit, Trash2, Eye, EyeOff, User, Quote, Star, ArrowLeft } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { useNavigate } from "react-router-dom";
import { testimonialsApi } from "../api";
import { Testimonial, CreateTestimonialRequest, UpdateTestimonialRequest } from "../types";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { showSuccess, showError, showConfirm } = useModal();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<CreateTestimonialRequest>({
    content: "",
    author: "",
    position: "",
    image: "",
    active: true
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const data = await testimonialsApi.getAll();
      setTestimonials(data);
    } catch (error) {
      showError("Erro ao carregar depoimentos");
      console.error("Error loading testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.content.trim() || !formData.author.trim() || !formData.position.trim()) {
      showError("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      if (editingTestimonial) {
        const updateData: UpdateTestimonialRequest = {
          content: formData.content,
          author: formData.author,
          position: formData.position,
          image: formData.image || undefined,
          active: formData.active
        };
        await testimonialsApi.update(editingTestimonial.id, updateData);
        showSuccess("Depoimento atualizado com sucesso!");
      } else {
        await testimonialsApi.create(formData);
        showSuccess("Depoimento criado com sucesso!");
      }
      
      resetForm();
      loadTestimonials();
    } catch (error) {
      showError(editingTestimonial ? "Erro ao atualizar depoimento" : "Erro ao criar depoimento");
      console.error("Error saving testimonial:", error);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      content: testimonial.content,
      author: testimonial.author,
      position: testimonial.position,
      image: testimonial.image || "",
      active: testimonial.active
    });
    setShowForm(true);
  };

  const handleDelete = (testimonial: Testimonial) => {
    showConfirm(
      `Tem certeza que deseja excluir o depoimento de "${testimonial.author}"?`,
      async () => {
        try {
          await testimonialsApi.delete(testimonial.id);
          showSuccess("Depoimento excluído com sucesso!");
          loadTestimonials();
        } catch (error) {
          showError("Erro ao excluir depoimento");
          console.error("Error deleting testimonial:", error);
        }
      },
      {
        title: "Excluir Depoimento",
        confirmText: "Excluir",
        cancelText: "Cancelar"
      }
    );
  };

  const handleToggleActive = async (testimonial: Testimonial) => {
    try {
      await testimonialsApi.toggleActive(testimonial.id);
      showSuccess(`Depoimento ${testimonial.active ? 'desativado' : 'ativado'} com sucesso!`);
      loadTestimonials();
    } catch (error) {
      showError("Erro ao alterar status do depoimento");
      console.error("Error toggling testimonial:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      content: "",
      author: "",
      position: "",
      image: "",
      active: true
    });
    setEditingTestimonial(null);
    setShowForm(false);
  };

  const filteredTestimonials = testimonials.filter(testimonial =>
    testimonial.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeTestimonials = testimonials.filter(t => t.active).length;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-muted-foreground">Carregando depoimentos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/')}
            className="flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-playfair font-bold text-primary mb-2">
              Gerenciar Depoimentos
            </h1>
            <p className="text-muted-foreground">
              {testimonials.length} depoimentos • {activeTestimonials} ativos
            </p>
          </div>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="mt-4 md:mt-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Depoimento
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Buscar por autor, conteúdo ou cargo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Form Modal */}
      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {editingTestimonial ? "Editar Depoimento" : "Novo Depoimento"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="author">Nome do Cliente *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    placeholder="Ex: João Silva"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Cargo/Descrição *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    placeholder="Ex: Trabalhador, Empresário"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Depoimento *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Digite o depoimento do cliente..."
                  rows={4}
                  required
                />
              </div>

              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({...formData, image: url})}
                onRemove={() => setFormData({...formData, image: ""})}
              />

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({...formData, active: checked})}
                />
                <Label htmlFor="active">Ativo na homepage</Label>
              </div>

              <div className="flex space-x-4">
                <Button type="submit">
                  {editingTestimonial ? "Atualizar" : "Criar"} Depoimento
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="relative">
            <CardContent className="p-6">
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <Badge variant={testimonial.active ? "default" : "secondary"}>
                  {testimonial.active ? "Ativo" : "Inativo"}
                </Badge>
              </div>

              {/* Quote Icon */}
              <div className="flex justify-start mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold-accent fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-muted-foreground mb-4 italic line-clamp-3">
                "{testimonial.content}"
              </p>

              {/* Author Info */}
              <div className="flex items-center space-x-3 mb-4">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.position}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(testimonial)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleActive(testimonial)}
                >
                  {testimonial.active ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(testimonial)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTestimonials.length === 0 && (
        <div className="text-center py-12">
          <Quote className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Nenhum depoimento encontrado
          </h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Tente ajustar sua busca" : "Comece criando seu primeiro depoimento"}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
