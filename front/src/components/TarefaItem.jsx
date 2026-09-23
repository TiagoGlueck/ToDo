import { useState } from 'react';
import { STATUS } from '../status';

export default function TarefaItem({ tarefa, onAtualizar, onRemover }) {
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(tarefa.nome);
  const [descricao, setDescricao] = useState(tarefa.descricao);

  async function salvar(e) {
    e.preventDefault();
    try {
      await onAtualizar(tarefa.id, { nome, descricao });
      setEditando(false);
    } catch {
      // o erro já é exibido pelo App
    }
  }

  function cancelar() {
    setNome(tarefa.nome);
    setDescricao(tarefa.descricao);
    setEditando(false);
  }

  if (editando) {
    return (
      <li className="item">
        <form className="item-edicao" onSubmit={salvar}>
          <input value={nome} onChange={(e) => setNome(e.target.value)} required />
          <input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
          <div className="acoes">
            <button type="submit">Salvar</button>
            <button type="button" className="secundario" onClick={cancelar}>
              Cancelar
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="item">
      <div className="item-texto">
        <strong>{tarefa.nome}</strong>
        {tarefa.descricao && <p>{tarefa.descricao}</p>}
        <small>Criada em {new Date(tarefa.createdAt).toLocaleString('pt-BR')}</small>
      </div>
      <div className="acoes">
        <select
          value={tarefa.status}
          onChange={(e) => onAtualizar(tarefa.id, { status: e.target.value }).catch(() => {})}
        >
          {STATUS.map((s) => (
            <option key={s.valor} value={s.valor}>
              {s.rotulo}
            </option>
          ))}
        </select>
        <button type="button" className="secundario" onClick={() => setEditando(true)}>
          Editar
        </button>
        <button type="button" className="perigo" onClick={() => onRemover(tarefa.id).catch(() => {})}>
          Excluir
        </button>
      </div>
    </li>
  );
}
