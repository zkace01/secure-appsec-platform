import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import { z, ZodError } from 'zod';
import { severities, vulnerabilityStatuses } from './domain.js';
import { ConflictError, NotFoundError } from './errors.js';
import type { PlatformRepository } from './repository.js';
import { PlatformService } from './services.js';

const idSchema = z.object({ id: z.uuid() }).strict();
const assetInputSchema = z.object({
  name: z.string().trim().min(1).max(120), type: z.string().trim().min(1).max(80),
  hostname: z.string().trim().min(1).max(255), description: z.string().trim().max(1000).optional(),
}).strict();
const vulnerabilityInputSchema = z.object({
  title: z.string().trim().min(1).max(160), description: z.string().trim().min(1).max(2000),
  severity: z.enum(severities), status: z.enum(vulnerabilityStatuses).optional(), assetId: z.uuid(),
}).strict();

const asyncRoute = (handler: (request: Request, response: Response) => Promise<void>) =>
  (request: Request, response: Response, next: NextFunction) => { void handler(request, response).catch(next); };

export const createApp = (repository: PlatformRepository) => {
  const service = new PlatformService(repository);
  const app = express();
  const frontendOrigins = [
    process.env['FRONTEND_ORIGIN'] ?? 'http://localhost:5173',
    'http://127.0.0.1:5173',
  ];
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin: frontendOrigins, methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
  app.use(express.json({ limit: '10kb' }));
  app.get('/health', (_request, response) => { response.json({ status: 'ok' }); });
  app.get('/assets', asyncRoute(async (_request, response) => { response.json(await service.listAssets()); }));
  app.post('/assets', asyncRoute(async (request, response) => { response.status(201).json(await service.createAsset(assetInputSchema.parse(request.body))); }));
  app.get('/assets/:id', asyncRoute(async (request, response) => { response.json(await service.getAsset(idSchema.parse(request.params).id)); }));
  app.put('/assets/:id', asyncRoute(async (request, response) => { response.json(await service.updateAsset(idSchema.parse(request.params).id, assetInputSchema.parse(request.body))); }));
  app.delete('/assets/:id', asyncRoute(async (request, response) => { await service.deleteAsset(idSchema.parse(request.params).id); response.status(204).end(); }));
  app.get('/vulnerabilities', asyncRoute(async (_request, response) => { response.json(await service.listVulnerabilities()); }));
  app.post('/vulnerabilities', asyncRoute(async (request, response) => { response.status(201).json(await service.createVulnerability(vulnerabilityInputSchema.parse(request.body))); }));
  app.get('/vulnerabilities/:id', asyncRoute(async (request, response) => { response.json(await service.getVulnerability(idSchema.parse(request.params).id)); }));
  app.put('/vulnerabilities/:id', asyncRoute(async (request, response) => { response.json(await service.updateVulnerability(idSchema.parse(request.params).id, vulnerabilityInputSchema.parse(request.body))); }));
  app.delete('/vulnerabilities/:id', asyncRoute(async (request, response) => { await service.deleteVulnerability(idSchema.parse(request.params).id); response.status(204).end(); }));
  app.use((error: unknown, _request: Request, response: Response, next: NextFunction) => {
    void next;
    if (error instanceof ZodError) { response.status(400).json({ error: 'Invalid request input' }); return; }
    if (error instanceof NotFoundError) { response.status(404).json({ error: error.message }); return; }
    if (error instanceof ConflictError) { response.status(409).json({ error: error.message }); return; }
    response.status(500).json({ error: 'Internal server error' });
  });
  return app;
};
