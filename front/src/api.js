const BASE_URL = '/tarefas';

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (res.status === 204) return null;

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.erro || 'Erro na requisição');
  }
  return data;
}

export function listarTarefas() {
  return request(BASE_URL);
}

export function criarTarefa(tarefa) {
  return request(BASE_URL, { method: 'POST', body: JSON.stringify(tarefa) });
}

export function atualizarTarefa(id, dados) {
  return request(`${BASE_URL}/${id}`, { method: 'PUT', body: JSON.stringify(dados) });
}

export function removerTarefa(id) {
  return request(`${BASE_URL}/${id}`, { method: 'DELETE' });
}
