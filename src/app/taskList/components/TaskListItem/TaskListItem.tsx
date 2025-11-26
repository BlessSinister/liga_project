import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TaskListItem.module.css';

export function TaskListItem({ name, info, id }: { name: string; info: string; id: number }) {
  return (
    <div className={styles.wrapper}>
      <Link to={`/edit/${id}`} className={styles.link}>
        <h5>{name}</h5>
      </Link>
      <p>{info}</p>
    </div>
  );
}
