import React from 'react';
import { useLoading } from '../hooks/useLoading';
import classes from '../css/components/loading.module.css';

export default function Loading() {
  const { isLoading } = useLoading();
  if (!isLoading) return;

  return (
    <div className={classes.container}>
      <div className={classes.items}>
        <img src="/loading.svg" alt="Loading!" />
        <h1>Loading...</h1>
      </div>
    </div>
  );
}
