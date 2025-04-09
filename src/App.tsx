import './index.css';
import { Plus, Trash } from 'lucide-react';
import { useState } from 'react';

type Task = {
  id: string;
  content: string;
};

type List = {
  id: string;
  title: string;
  tasks: Task[];
};

function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [newTaskContent, setNewTaskContent] = useState<string>('');

  const [lists, setLists] = useState<List[]>([
    {
      id: 'todo',
      title: 'A Fazer',
      tasks: [
        { id: '1', content: 'Estudar React' },
        { id: '2', content: 'Ler Documentação' }
      ],
    },
    {
      id: 'doing',
      title: 'Em Andamento',
      tasks: [
        { id: '3', content: 'Estudar Inglês' }
      ],
    },
    {
      id: 'done',
      title: 'Concluído',
      tasks: [
        { id: '4', content: 'Aprender Docker' },
        { id: '5', content: 'Aprender ExpressJs' }
      ],
    },
  ]);

  const handleAddTask = (listId: string) => {
    if (!newTaskContent.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      content: newTaskContent,
    };

    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? { ...list, tasks: [...list.tasks, newTask] }
          : list
      )
    );

    setNewTaskContent('');
    setShowModal(false);
    setSelectedListId(null);
  };

  const handleRemoveTask = (listId: string, taskId: string) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
          : list
      )
    );
  };

  const openModal = (listId: string) => {
    setSelectedListId(listId);
    setShowModal(true);
  };

  return (
    <div className="container">
      <h1 className="app-title">Task Hade</h1>

      <div className="board">
        {lists.map((list) => (
          <div className="column" key={list.id}>
            <h2>{list.title}</h2>

            {list.tasks.map((task) => (
              <div className="card" key={task.id}>
                <span>{task.content}</span>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveTask(list.id, task.id)}
                  aria-label="Remover tarefa"
                >
                  <Trash size={18} />
                </button>
              </div>
            ))}

            <button className="add-btn" onClick={() => openModal(list.id)}>
              <Plus size={20} /> Adicionar Tarefa
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Adicionar tarefa</h3>
            <input
              type="text"
              placeholder="Digite a nova tarefa"
              value={newTaskContent}
              onChange={(e) => setNewTaskContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddTask(selectedListId!);
                }
              }}
            />
            <div className="modal-actions">
              <button onClick={() => handleAddTask(selectedListId!)}>Adicionar</button>
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
