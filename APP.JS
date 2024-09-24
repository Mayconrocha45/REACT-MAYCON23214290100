import React, { useState } from 'react';
import './App.css';

function App() {
  const diasDaSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

  const [estudos, setEstudos] = useState({
    'Segunda-feira': { manha: [], tarde: [], noite: [] },
    'Terça-feira': { manha: [], tarde: [], noite: [] },
    'Quarta-feira': { manha: [], tarde: [], noite: [] },
    'Quinta-feira': { manha: [], tarde: [], noite: [] },
    'Sexta-feira': { manha: [], tarde: [], noite: [] },
    'Sábado': { manha: [], tarde: [], noite: [] },
    'Domingo': { manha: [], tarde: [], noite: [] },
  });

  const [atividade, setAtividade] = useState('');
  const [diaSelecionado, setDiaSelecionado] = useState('Segunda-feira');
  const [periodoSelecionado, setPeriodoSelecionado] = useState('manha');
  const [atividadeEditando, setAtividadeEditando] = useState(null);

  const adicionarAtividade = () => {
    if (!atividade) return;

    setEstudos((prevEstudos) => ({
      ...prevEstudos,
      [diaSelecionado]: {
        ...prevEstudos[diaSelecionado],
        [periodoSelecionado]: atividadeEditando
          ? prevEstudos[diaSelecionado][periodoSelecionado].map((item) => (item === atividadeEditando ? atividade : item))
          : [...prevEstudos[diaSelecionado][periodoSelecionado], atividade],
      },
    }));

    setAtividade('');
    setAtividadeEditando(null);
  };

  const iniciarEdicao = (atividade) => {
    setAtividade(atividade);
    setAtividadeEditando(atividade);
  };

  const removerAtividade = (atividade) => {
    setEstudos((prevEstudos) => ({
      ...prevEstudos,
      [diaSelecionado]: {
        ...prevEstudos[diaSelecionado],
        [periodoSelecionado]: prevEstudos[diaSelecionado][periodoSelecionado].filter(item => item !== atividade),
      },
    }));
  };

  return (
    <div className="app-container">
      <h1>Gerenciador de Estudos 2024</h1>

      <div className="input-container">
        <label>Dia:</label>
        <select value={diaSelecionado} onChange={(e) => setDiaSelecionado(e.target.value)}>
          {diasDaSemana.map(dia => (
            <option key={dia} value={dia}>{dia}</option>
          ))}
        </select>

        <label>Período:</label>
        <select value={periodoSelecionado} onChange={(e) => setPeriodoSelecionado(e.target.value)}>
          <option value="manha">Manhã</option>
          <option value="tarde">Tarde</option>
          <option value="noite">Noite</option>
        </select>

        <label>O que estudar:</label>
        <input
          type="text"
          value={atividade}
          onChange={(e) => setAtividade(e.target.value)}
          placeholder="Ex: Matemática"
        />
        <button onClick={adicionarAtividade}>{atividadeEditando ? 'Editar Estudo' : 'Adicionar Estudo'}</button>
      </div>

      {diasDaSemana.map(dia => (
        <div key={dia} className="dia-container">
          <h2>{dia}</h2>
          {['manha', 'tarde', 'noite'].map(periodo => (
            <div key={periodo} className="periodo-container">
              <strong>{periodo.charAt(0).toUpperCase() + periodo.slice(1)}:</strong>
              {estudos[dia][periodo].length > 0 ? (
                <ul>
                  {estudos[dia][periodo].map((item, index) => (
                    <li key={index}>
                      {item} 
                      <button onClick={() => iniciarEdicao(item)}>Editar</button>
                      <button onClick={() => removerAtividade(item)}>Remover</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <span>Nenhuma atividade adicionada.</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
