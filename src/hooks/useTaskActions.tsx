import { useState } from 'react';
import { Task, List } from '../types/types';

export const useTaskActions = () => {
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

  const [newTaskContent, setNewTaskContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);

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

  return {
    lists,
    setLists,
    newTaskContent,
    setNewTaskContent,
    showModal,
    selectedListId,
    handleAddTask,
    handleRemoveTask,
    openModal,
    setShowModal,
  };
};
