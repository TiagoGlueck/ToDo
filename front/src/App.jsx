import { useEffect, useState } from 'react';
import * as api from './api.js';
import TarefaForm from './components/TarefaForm.jsx';
import TarefaItem from './components/TarefaItem.jsx';
import './App.css';

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api
      .listarTarefas()
      .then(setTarefas)
      .catch(() => setErro('Não foi possível conectar ao servidor. O back-end está rodando?'))
      .finally(() => setCarregando(false));
  }, []);

  async function executar(acao) {
    setErro('');
    try {
      await acao();
    } catch (e) {
      setErro(e.message);
      throw e;
    }
  }

  async function handleCriar(dados) {
    await executar(async () => {
      const nova = await api.criarTarefa(dados);
      setTarefas((atuais) => [...atuais, nova]);
    });
  }

  async function handleAtualizar(id, dados) {
    await executar(async () => {
      const atualizada = await api.atualizarTarefa(id, dados);
      setTarefas((atuais) => atuais.map((t) => (t.id === id ? atualizada : t)));
    });
  }

  async function handleRemover(id) {
    await executar(async () => {
      await api.removerTarefa(id);
      setTarefas((atuais) => atuais.filter((t) => t.id !== id));
    });
  }

  return (
    <main className="container">
      <h1>Minhas Tarefas</h1>

      <TarefaForm onSubmit={handleCriar} />

      {erro && <p className="erro">{erro}</p>}

      {carregando ? (
        <p className="info">Carregando...</p>
      ) : tarefas.length === 0 ? (
        <p className="info">Nenhuma tarefa ainda. Crie a primeira acima!</p>
      ) : (
        <ul className="lista">
          {tarefas.map((tarefa) => (
            <TarefaItem
              key={tarefa.id}
              tarefa={tarefa}
              onAtualizar={handleAtualizar}
              onRemover={handleRemover}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
