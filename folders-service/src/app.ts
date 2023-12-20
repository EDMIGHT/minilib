import cors from 'cors';
import env from 'dotenv';
import express from 'express';

import prisma from '@/db/prisma';
import routes from '@/routes/folder.routes';

env.config();

const PORT = process.env.PORT || 3002;
const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN!;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_DOMAIN,
  })
);
app.use('/api', routes);

const main = async (): Promise<void> => {
  app.listen(PORT, () => {
    console.log(`[server] server has been start on port ${PORT}`);
  });
};

main()
  .catch((error) => {
    if (error instanceof Error) console.error(`[server] error: ${error.message}`);
    else console.error(`[server] error connection: ${error}`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default app;
