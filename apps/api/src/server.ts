import { createApp } from './app.js';
import { PrismaRepository } from './prisma-repository.js';

const port = Number.parseInt(process.env['PORT'] ?? '3000', 10);
createApp(new PrismaRepository()).listen(port, () => { console.info(`API listening on port ${port}`); });
