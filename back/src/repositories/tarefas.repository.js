import { randomUUID } from 'node:crypto';
import { StatusTarefa } from '../enums/status-tarefa.js';

const tarefas = [];

const clone = (tarefa) => ({ ...tarefa });

export async function findAll() {
    return tarefas.map(clone);
}

export async function findById(id) {
    const tarefa = tarefas.find((t) => t.id === id);
    return tarefa ? clone(tarefa) : null;
}

export async function create({ nome, descricao }) {
    const tarefa = {
        id: randomUUID(), // trocar para sequencial
        nome,
        descricao,
        status: StatusTarefa.FAZER,
        createdAt: new Date().toISOString(),
    };
    tarefas.push(tarefa);
    return clone(tarefa);
}

export async function update(id, dados) {
    const index = tarefas.findIndex((t) => t.id === id);
    if (index === -1) return null;

    tarefas[index] = { ...tarefas[index], ...dados };
    return clone(tarefas[index]);
}

export async function remove(id) {
    const index = tarefas.findIndex((t) => t.id === id);
    if (index === -1) return false;

    tarefas.splice(index, 1);
    return true;
}
