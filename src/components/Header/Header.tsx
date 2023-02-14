import styles from './Header.module.css';

import todoLogo from '../../assets/todo-banner.svg';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={todoLogo} alt='Logotipo do ToDo' />
    </header>
  )
}
