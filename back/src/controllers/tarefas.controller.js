import * as tarefasService from '../services/tarefas.service.js';

export async function list(req, res) {
    const tarefas = await tarefasService.listTarefas();
    res.status(200).json(tarefas);
}

export async function getById(req, res) {
    const tarefa = await tarefasService.getTarefaById(req.params.id);
    res.status(200).json(tarefa);
}

export async function create(req, res) {
    const { nome, descricao } = req.body ?? {};
    const tarefa = await tarefasService.createTarefa({ nome, descricao });
    res.status(201).location(`/tarefas/${tarefa.id}`).json(tarefa);
}

export async function update(req, res) {
    const { nome, descricao, status } = req.body ?? {};
    const tarefa = await tarefasService.updateTarefa(req.params.id, { nome, descricao, status });
    res.status(200).json(tarefa);
}

export async function remove(req, res) {
    await tarefasService.deleteTarefa(req.params.id);
    res.status(204).end();
}
