import styles from './ScaleView.module.css';

export function ScaleView({ left, right, resolved, correctId }) {
  const tilt = !resolved ? '' : correctId === left.id ? styles.leftHeavy : styles.rightHeavy;
  return (
    <div className={styles.wrap} aria-live="polite">
      <div className={`${styles.board} ${tilt}`}>
        <div className={styles.side}>{left.emoji}</div>
        <div className={styles.pivot} />
        <div className={styles.side}>{right.emoji}</div>
      </div>
    </div>
  );
}
