import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { PlusCircle } from 'phosphor-react';

import { Header } from './components/Header/Header'
import { ITask, Task } from './components/Task/Task';

import './global.css';
import styles from './App.module.css';

export default function App() {
  const [newTaskText, setNewTaskText] = useState('');

  const [tasks, setTasks] = useState<ITask[]>([]);

  const tasksCompleted = tasks.filter(task => task.isActive === false).length;

  function handleNewTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  function handleCreateTask(event: FormEvent) {
    event?.preventDefault();

    const taskTextWithoutExtraSpaces = newTaskText.trim();

    if (taskTextWithoutExtraSpaces.length >= 1) {
      setTasks([...tasks, { id: tasks.length+=1, isActive: true, content: newTaskText }]);
    }

    setNewTaskText('');
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Este campo é obrigatório!')
  }

  function handleDeleteTask(taskId: number) {
    const commentsWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskId
    });

    setTasks(commentsWithoutDeletedOne);
  }

  function handleToggleActive(id: number) {
    setTasks(tasks.map(task => task.id === id ? {...task, isActive: !task.isActive} : {...task}));
  }

  return (
    <>
      <Header />

      <main className={styles.wrapper}>
        <form onSubmit={handleCreateTask} className={styles.newTaskInput}>
        <input
          onChange={handleNewTaskTextChange}
          value={newTaskText}
          onInvalid={handleNewCommentInvalid}
          placeholder='Adicione uma nova tarefa'
          required
        />

        <button type='submit'>
          Criar
          <PlusCircle />
        </button>
      </form>

        <div className={styles.tasksWrapper}>
          <header className={styles.headerTask}>
            <strong>
              Tarefas criadas
              <span>{tasks.length}</span>
            </strong>

            <strong>
              Concluídas
              <span>{tasksCompleted}</span>
            </strong>
          </header>

          <div className={styles.listTasks}>
            {
              tasks.map(task => {
                if (task.content.length === 0) return
                else {
                  return (
                    <Task
                      key={task.id}
                      id={task.id}
                      content={task.content}
                      onDeleteTask={handleDeleteTask}
                      isActive={task.isActive}
                      onToggleActive={handleToggleActive}
                    />
                  )
                }
              })
            }
          </div>
        </div>
      </main>
    </>
  )
}
