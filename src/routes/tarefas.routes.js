import { Router } from 'express';
import * as tarefasController from '../controllers/tarefas.controller.js';

const router = Router();

router.get('/', tarefasController.list);
router.get('/:id', tarefasController.getById);
router.post('/', tarefasController.create);
router.put('/:id', tarefasController.update);
router.delete('/:id', tarefasController.remove);

export default router;
