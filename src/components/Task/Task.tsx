import { CheckCircle, Circle, Trash } from 'phosphor-react';
import { useState } from 'react';
import styles from './Task.module.css';

export interface ITask {
  id: number;
  content: string;
  isActive: boolean;
}

interface TaskProps {
  content: string;
  id: number;
  isActive: boolean;
  onDeleteTask: (content: number) => void;
  onToggleActive: (id: number) => void;
}

export function Task({ content, id, isActive, onDeleteTask, onToggleActive }: TaskProps) {

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleToggleActive() {
    onToggleActive(id)
  }

  return (
    <div className={styles.taskWrapper}>
      <div className={styles.contentAndCheck}>
        <button onClick={handleToggleActive}>
          {isActive ? <Circle size={24} /> : <CheckCircle size={24} weight="fill" />}
        </button>
        <p className={isActive ? '' : styles.taskComplete }>
        {content}
        </p>
      </div>
      
      <button onClick={handleDeleteTask}>
        <Trash size={24} />
      </button>
    </div>
  )
}
