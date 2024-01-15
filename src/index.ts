/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { server } from './server/Server';
import dotenv from 'dotenv';
import { connectDatabase, closeDatabase } from './server/database/databaseConnector'; // Importa as funções de conexão e fechamento do banco de dados

dotenv.config();

const port = process.env.PORT;

// Inicia a conexão com o banco de dados antes de iniciar o servidor
connectDatabase()
  .then(() => {
    server.listen(port, () => {
      console.log(`Rodando na porta ${port}, acesse:\nhttp://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1); // Encerra o processo em caso de erro na conexão
  });

// Adiciona um manipulador de eventos para fechar a conexão quando o servidor for encerrado
process.on('SIGINT', async () => {
  try {
    await closeDatabase();
    console.log('Conexão com o banco de dados fechada. Encerrando o servidor.');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao fechar a conexão com o banco de dados:', error);
    process.exit(1);
  }
});