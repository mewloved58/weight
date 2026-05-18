import styles from './LearningCard.module.css';

export function LearningCard({ item, disabled, selectedId, onTap }) {
  const selected = selectedId === item.id;

  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', item.id);
    onTap(item.id);
  };

  return (
    <button
      className={`${styles.card} ${selected ? styles.picked : ''}`}
      onClick={() => onTap(item.id)}
      onDragStart={handleDragStart}
      draggable={!disabled}
      disabled={disabled}
      aria-label={`${item.label} 카드`}
    >
      <span className={styles.emoji}>{item.emoji}</span>
      <span className={styles.label}>{item.label}</span>
    </button>
  );
}
