import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import ImageUpload from "@/components/ui/image-upload";
import { Plus, Edit, Trash2, Eye, EyeOff, User, Users, ArrowLeft } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { useNavigate } from "react-router-dom";
import { teamApi } from "../api";
import { TeamMember, CreateTeamMemberRequest, UpdateTeamMemberRequest } from "../types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdminTeamSkeleton } from "@/components/ui/admin-skeleton";

const AdminTeam = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { showSuccess, showError, showConfirm } = useModal();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<CreateTeamMemberRequest>({
    name: "",
    position: "",
    description: "",
    image: "",
    email: "",
    active: true
  });

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await teamApi.getAll();
      setTeamMembers(response.team);
    } catch (error) {
      showError("Erro ao carregar membros da equipe");
      console.error("Error loading team members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.position.trim() || !formData.description.trim()) {
      showError("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      if (editingMember) {
        const updateData: UpdateTeamMemberRequest = {
          name: formData.name,
          position: formData.position,
          description: formData.description,
          image: formData.image || undefined,
          email: formData.email || undefined,
          active: formData.active
        };
        await teamApi.update(editingMember.id, updateData);
        showSuccess("Membro da equipe atualizado com sucesso!");
      } else {
        await teamApi.create(formData);
        showSuccess("Membro da equipe criado com sucesso!");
      }
      
      resetForm();
      loadTeamMembers();
    } catch (error) {
      showError(editingMember ? "Erro ao atualizar membro da equipe" : "Erro ao criar membro da equipe");
      console.error("Error saving team member:", error);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      description: member.description,
      image: member.image || "",
      email: member.email || "",
      active: member.active
    });
    setShowForm(true);
  };

  const handleDelete = (member: TeamMember) => {
    showConfirm(
      `Tem certeza que deseja excluir "${member.name}" da equipe?`,
      async () => {
        try {
          await teamApi.delete(member.id);
          showSuccess("Membro da equipe excluído com sucesso!");
          loadTeamMembers();
        } catch (error) {
          showError("Erro ao excluir membro da equipe");
          console.error("Error deleting team member:", error);
        }
      },
      {
        title: "Excluir Membro da Equipe",
        confirmText: "Excluir",
        cancelText: "Cancelar"
      }
    );
  };

  const handleToggleActive = async (member: TeamMember) => {
    try {
      await teamApi.toggleActive(member.id);
      showSuccess(`Membro da equipe ${member.active ? 'desativado' : 'ativado'} com sucesso!`);
      loadTeamMembers();
    } catch (error) {
      showError("Erro ao alterar status do membro da equipe");
      console.error("Error toggling team member:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      description: "",
      image: "",
      email: "",
      active: true
    });
    setEditingMember(null);
    setShowForm(false);
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeMembers = teamMembers.filter(m => m.active).length;

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <AdminTeamSkeleton />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 mt-32">
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
              Gerenciar Equipe
            </h1>
            <p className="text-muted-foreground">
              {teamMembers.length} membros • {activeMembers} ativos
            </p>
          </div>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="mt-4 md:mt-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Membro
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Input
          placeholder="Buscar por nome, cargo ou descrição..."
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
              {editingMember ? "Editar Membro da Equipe" : "Novo Membro da Equipe"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ex: Dr. João Silva"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Cargo/Posição *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    placeholder="Ex: Advogado Sênior"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição Profissional *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Descreva a experiência e especialidades do profissional..."
                  rows={4}
                  required
                />
              </div>

              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({...formData, image: url})}
                onRemove={() => setFormData({...formData, image: ""})}
              />

              <div className="space-y-2">
                <Label htmlFor="email">Email (Opcional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="email@exemplo.com"
                />
                <p className="text-sm text-muted-foreground">
                  Email para contato interno (não será exibido publicamente)
                </p>
              </div>

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
                  {editingMember ? "Atualizar" : "Criar"} Membro
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Team Members Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="relative">
            <CardContent className="p-6">
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <Badge variant={member.active ? "default" : "secondary"}>
                  {member.active ? "Ativo" : "Inativo"}
                </Badge>
              </div>

              {/* Member Image */}
              <div className="flex justify-center mb-4">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-primary/20"
                  />
                ) : (
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                )}
              </div>

              {/* Member Info */}
              <div className="text-center mb-4">
                <h3 className="font-bold text-lg text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gold-accent font-medium mb-2">
                  {member.position}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {member.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(member)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleActive(member)}
                >
                  {member.active ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(member)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Nenhum membro encontrado
          </h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Tente ajustar sua busca" : "Comece adicionando o primeiro membro da equipe"}
          </p>
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminTeam;
