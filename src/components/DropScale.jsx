import styles from './DropScale.module.css';

export function DropScale({ left, right, selectedId, phase, heavierId, onDrop }) {
  const tiltClass = phase === 'reflect'
    ? heavierId === left.id
      ? styles.leftHeavy
      : styles.rightHeavy
    : '';

  const handleDrop = (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text/plain');
    if (id) onDrop(id);
  };

  return (
    <section className={styles.section} aria-label="저울 영역">
      <div className={`${styles.board} ${tiltClass}`}>
        <div className={styles.slot}>{left.emoji}</div>
        <div className={styles.pivot} />
        <div className={styles.slot}>{right.emoji}</div>
      </div>
      <div className={styles.dropZone} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        {selectedId ? '선택 완료' : '여기에 무거운 물건 카드를 놓아요'}
      </div>
    </section>
  );
}
