import './index.css'
import { Plus } from 'lucide-react' 


function App() {
  return (
    <div className="container">
      <h1 className="app-title">Task Hade</h1>

      <div className="board">
        <div className="column">
          <h2>A Fazer</h2>
          <div className="card">Tarefa 1</div>
          <div className="card">Tarefa 2</div>
          <button className='add-btn'>
            <Plus size = {20} /> Adicionar Tarefa
          </button>
        </div>

        <div className="column">
          <h2>Em Andamento</h2>
          <div className="card">Tarefa 3</div>
          <button className='add-btn'>
            <Plus size = {20} /> Adicionar Tarefa
          </button>
        </div>

        <div className="column">
          <h2>Concluído</h2>
          <div className="card">Tarefa 4</div>
          <button className='add-btn'>
            <Plus size = {20} /> Adicionar Tarefa
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
