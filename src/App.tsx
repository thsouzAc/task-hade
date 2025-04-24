import './index.css';
import { Plus, Trash } from 'lucide-react';
import { useTaskActions } from './hooks/useTaskActions';

function App() {
  
  const {
    lists,
    newTaskContent,
    setNewTaskContent,
    showModal,
    selectedListId,
    handleAddTask,
    handleRemoveTask,
    openModal,
    setShowModal,
  } = useTaskActions();

  return (
    <div className="container">
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
