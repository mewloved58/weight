import styles from './StageIndicator.module.css';

export function StageIndicator({ progression, currentPhase }) {
  return (
    <div className={styles.row}>
      {progression.map((step) => (
        <div key={step.id} className={step.id === currentPhase ? styles.active : styles.item}>
          {step.title}
        </div>
      ))}
    </div>
  );
}
