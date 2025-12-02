import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './auth/api-key.guard';
import { TestimonialModule } from './testimonial/testimonial.module';
import { ArticleModule } from './article/article.module';
import { UploadModule } from './upload/upload.module';
import { LeadModule } from './lead/lead.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
    UserModule,
    TestimonialModule,
    ArticleModule,
    AuthModule,
    UploadModule,
    LeadModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    { provide: APP_GUARD, useClass: ApiKeyGuard },
  ],
})
export class AppModule {}
