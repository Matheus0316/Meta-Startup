import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiSecurity,
} from '@nestjs/swagger';
import { TeamService } from './team.service';
import { CreateTeamDto, UpdateTeamDto, TeamEntity } from './team.entity';
import { PublicRoute } from '../decorators/public.decorator';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @ApiSecurity('API_KEY')
  @ApiOperation({ 
    summary: 'Criar novo membro da equipe',
    description: 'Endpoint administrativo para adicionar um novo membro à equipe' 
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Membro da equipe criado com sucesso',
    type: TeamEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos',
  })
  @ApiBody({ type: CreateTeamDto })
  async create(@Body() createTeamDto: CreateTeamDto) {
    const team = await this.teamService.create(createTeamDto);
    
    return {
      success: true,
      message: 'Membro da equipe criado com sucesso',
      team,
    };
  }

  @Get()
  @ApiSecurity('API_KEY')
  @ApiOperation({ 
    summary: 'Listar todos os membros da equipe',
    description: 'Endpoint administrativo para listar todos os membros (ativos e inativos)' 
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de membros da equipe',
    type: [TeamEntity],
  })
  async findAll() {
    const team = await this.teamService.findAll();
    
    return {
      success: true,
      count: team.length,
      team,
    };
  }

  @Get('active')
  @PublicRoute()
  @ApiOperation({ 
    summary: 'Listar membros ativos da equipe',
    description: 'Endpoint público para listar apenas membros ativos da equipe' 
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de membros ativos da equipe',
    type: [TeamEntity],
  })
  async findAllActive() {
    const team = await this.teamService.findAllActive();
    
    return {
      success: true,
      count: team.length,
      team,
    };
  }

  @Get('statistics')
  @ApiSecurity('API_KEY')
  @ApiOperation({ 
    summary: 'Estatísticas da equipe',
    description: 'Endpoint administrativo para obter estatísticas da equipe' 
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Estatísticas da equipe',
  })
  async getStatistics() {
    const stats = await this.teamService.getStatistics();
    
    return {
      success: true,
      statistics: stats,
    };
  }

  @Get(':id')
  @ApiSecurity('API_KEY')
  @ApiOperation({ 
    summary: 'Buscar membro da equipe por ID',
    description: 'Endpoint administrativo para buscar um membro específico da equipe' 
  })
  @ApiParam({ name: 'id', description: 'ID do membro da equipe' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Membro da equipe encontrado',
    type: TeamEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Membro da equipe não encontrado',
  })
  async findById(@Param('id') id: string) {
    const team = await this.teamService.findById(id);
    
    return {
      success: true,
      team,
    };
  }

  @Put(':id')
  @ApiSecurity('API_KEY')
  @ApiOperation({ 
    summary: 'Atualizar membro da equipe',
    description: 'Endpoint administrativo para atualizar dados de um membro da equipe' 
  })
  @ApiParam({ name: 'id', description: 'ID do membro da equipe' })
  @ApiBody({ type: UpdateTeamDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Membro da equipe atualizado com sucesso',
    type: TeamEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Membro da equipe não encontrado',
  })
  async update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    const team = await this.teamService.update(id, updateTeamDto);
    
    return {
      success: true,
      message: 'Membro da equipe atualizado com sucesso',
      team,
    };
  }

  @Patch(':id/toggle-active')
  @ApiSecurity('API_KEY')
  @ApiOperation({ 
    summary: 'Alternar status ativo/inativo',
    description: 'Endpoint administrativo para ativar/desativar um membro da equipe' 
  })
  @ApiParam({ name: 'id', description: 'ID do membro da equipe' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Status do membro alterado com sucesso',
    type: TeamEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Membro da equipe não encontrado',
  })
  async toggleActive(@Param('id') id: string) {
    const team = await this.teamService.toggleActive(id);
    
    return {
      success: true,
      message: `Membro ${team.active ? 'ativado' : 'desativado'} com sucesso`,
      team,
    };
  }

  @Delete(':id')
  @ApiSecurity('API_KEY')
  @ApiOperation({ 
    summary: 'Deletar membro da equipe',
    description: 'Endpoint administrativo para deletar um membro da equipe' 
  })
  @ApiParam({ name: 'id', description: 'ID do membro da equipe' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Membro da equipe deletado com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Membro da equipe não encontrado',
  })
  async delete(@Param('id') id: string) {
    await this.teamService.delete(id);
    
    return {
      success: true,
      message: 'Membro da equipe deletado com sucesso',
    };
  }
}
