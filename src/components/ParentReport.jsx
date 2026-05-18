import styles from './ParentReport.module.css';

export function ParentReport({ stats, focus }) {
  const accuracy = stats.attempts === 0 ? 0 : Math.round((stats.correct / stats.attempts) * 100);

  return (
    <aside className={styles.report}>
      <h2>부모 리포트</h2>
      <ul>
        <li>정확도: {accuracy}% ({stats.correct}/{stats.attempts})</li>
        <li>재도전 횟수: {stats.retryCount}회</li>
        <li>이번 학습 포인트: {focus}</li>
        <li>권장 활동: 집에서 비슷한 물건 2개를 직접 들어보세요.</li>
      </ul>
    </aside>
  );
}
