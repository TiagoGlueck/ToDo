import { Router } from 'express';
import tarefasRoutes from './tarefas.routes.js';

const router = Router();

router.use('/tarefas', tarefasRoutes);

export default router;
