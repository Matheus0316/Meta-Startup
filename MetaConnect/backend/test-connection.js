const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔄 Testando conexão com MongoDB...');
    
    // Tenta conectar
    await prisma.$connect();
    console.log('✅ Conexão com MongoDB estabelecida!');
    
    // Tenta fazer uma query simples
    const userCount = await prisma.user.count();
    console.log(`📊 Usuários no banco: ${userCount}`);
    
    const articleCount = await prisma.article.count();
    console.log(`📰 Artigos no banco: ${articleCount}`);
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error.message);
    console.error('❌ Tipo do erro:', error.constructor.name);
    
    if (error.code) {
      console.error('❌ Código do erro:', error.code);
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
