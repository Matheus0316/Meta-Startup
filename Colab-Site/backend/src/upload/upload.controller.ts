import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { UploadService } from './upload.service';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @ApiOperation({ summary: 'Upload de imagem para o Cloudinary' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Imagem enviada com sucesso',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        url: { type: 'string' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Nenhum arquivo foi enviado',
  })
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File | undefined) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    // Validar tipo de arquivo
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Tipo de arquivo não permitido. Use apenas JPEG, PNG, GIF ou WebP.');
    }

    // Validar tamanho do arquivo (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException('Arquivo muito grande. Tamanho máximo: 5MB');
    }

    try {
      const imageUrl = await this.uploadService.uploadImage(file);
      
      return {
        success: true,
        url: imageUrl,
        message: 'Imagem enviada com sucesso',
      };
    } catch (error) {
      throw new BadRequestException(`Erro ao fazer upload da imagem: ${error.message}`);
    }
  }

  @Post('document')
  @ApiOperation({ summary: 'Upload de documento para o Cloudinary' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Documento enviado com sucesso',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        url: { type: 'string' },
        message: { type: 'string' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('document'))
  async uploadDocument(@UploadedFile() file: Express.Multer.File | undefined) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    // Validar tipo de arquivo para documentos
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Tipo de arquivo não permitido. Use apenas PDF, DOC, DOCX ou TXT.');
    }

    // Validar tamanho do arquivo (10MB max para documentos)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new BadRequestException('Arquivo muito grande. Tamanho máximo: 10MB');
    }

    try {
      const documentUrl = await this.uploadService.uploadImage(file, 'maia-advocacia/documentos');
      
      return {
        success: true,
        url: documentUrl,
        message: 'Documento enviado com sucesso',
      };
    } catch (error) {
      throw new BadRequestException(`Erro ao fazer upload do documento: ${error.message}`);
    }
  }
}
