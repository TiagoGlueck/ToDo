import * as tarefasRepository from '../repositories/tarefas.repository.js';
import { STATUS_VALIDOS } from '../enums/status-tarefa.js';
import { BadRequestError, NotFoundError } from '../errors/http-errors.js';

function validarTarefa({ nome, descricao }) {
    if (typeof nome !== 'string' || nome.trim() === '') {
        throw new BadRequestError('O campo "nome" é obrigatório');
    }
    if (descricao !== undefined && typeof descricao !== 'string') {
        throw new BadRequestError('O campo "descricao" deve ser um texto');
    }
    return { nome: nome.trim(), descricao: descricao ?? '' };
}

function validarAtualizacao({ nome, descricao, status }) {
    if (nome === undefined && descricao === undefined && status === undefined) {
        throw new BadRequestError('Informe ao menos um campo: "nome", "descricao" ou "status"');
    }
    if (nome !== undefined && (typeof nome !== 'string' || nome.trim() === '')) {
        throw new BadRequestError('O campo "nome" não pode ser vazio');
    }
    if (descricao !== undefined && typeof descricao !== 'string') {
        throw new BadRequestError('O campo "descricao" deve ser um texto');
    }
    if (status !== undefined && !STATUS_VALIDOS.includes(status)) {
        throw new BadRequestError(`O campo "status" deve ser um de: ${STATUS_VALIDOS.join(', ')}`);
    }

    const dados = {};
    if (nome !== undefined) dados.nome = nome.trim();
    if (descricao !== undefined) dados.descricao = descricao;
    if (status !== undefined) dados.status = status;
    return dados;
}

export async function listTarefas() {
    return tarefasRepository.findAll();
}

export async function getTarefaById(id) {
    const tarefa = await tarefasRepository.findById(id);
    if (!tarefa) {
        throw new NotFoundError(`Tarefa ${id} não encontrada`);
    }
    return tarefa;
}

export async function createTarefa(dados) {
    return tarefasRepository.create(validarTarefa(dados));
}

export async function updateTarefa(id, dados) {
    const tarefa = await tarefasRepository.update(id, validarAtualizacao(dados));
    if (!tarefa) {
        throw new NotFoundError(`Tarefa ${id} não encontrada`);
    }
    return tarefa;
}

export async function deleteTarefa(id) {
    const removida = await tarefasRepository.remove(id);
    if (!removida) {
        throw new NotFoundError(`Tarefa ${id} não encontrada`);
    }
}
