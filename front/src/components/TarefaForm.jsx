import { useState } from 'react';

export default function TarefaForm({ onSubmit }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await onSubmit({ nome, descricao });
      setNome('');
      setDescricao('');
    } catch {
      // o erro já é exibido pelo App; mantém o que foi digitado
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome da tarefa"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descrição (opcional)"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
