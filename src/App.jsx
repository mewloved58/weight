import { useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { DropScale } from './components/DropScale';
import { LearningCard } from './components/LearningCard';
import { ParentReport } from './components/ParentReport';
import { StageIndicator } from './components/StageIndicator';
import { useLearningFlow } from './hooks/useLearningFlow';
import { useAudioFeedback } from './hooks/useAudioFeedback';
import styles from './styles/App.module.css';

export function App() {
  const { session, phase, selectedId, isCorrect, dropChoice, resolve, next, progress, stats, canResolve } = useLearningFlow();
  const { speak } = useAudioFeedback();

  useEffect(() => {
    if (phase === 'observe') {
      speak('observe');
      const timer = setTimeout(() => resolve(), 900);
      return () => clearTimeout(timer);
    }

    if (phase === 'reflect') {
      speak(isCorrect ? 'correct' : 'wrong');
    }

    return undefined;
  }, [phase, isCorrect, resolve, speak]);

  const coachText = phase === 'predict'
    ? session.progression[0].coach
    : phase === 'observe'
      ? session.progression[1].coach
      : isCorrect
        ? `정답! ${session.left.id === session.heavierId ? session.left.label : session.right.label}이 더 무거워요.`
        : `다시 보기: ${session.left.id === session.heavierId ? session.left.hint : session.right.hint}`;

  const handlePick = (id) => {
    if (phase !== 'predict') return;
    speak('pick');
    dropChoice(id);
  };

  return (
    <AppShell
      header={<><p className={styles.kicker}>크기 탐험대</p><h1>무게 비교 놀이</h1><p className={styles.progress}>세션 {progress}</p></>}
      footer={<button className={styles.primary} onClick={() => { speak('next'); next(); }}>다음 활동</button>}
    >
      <StageIndicator progression={session.progression} currentPhase={phase} />
      <DropScale
        left={session.left}
        right={session.right}
        selectedId={selectedId}
        phase={phase}
        heavierId={session.heavierId}
        onDrop={handlePick}
      />

      <p className={styles.coach} aria-live="polite">{coachText}</p>

      <div className={styles.choices}>
        <LearningCard item={session.left} selectedId={selectedId} onTap={handlePick} disabled={phase !== 'predict'} />
        <LearningCard item={session.right} selectedId={selectedId} onTap={handlePick} disabled={phase !== 'predict'} />
      </div>

      <div className={styles.badges}>
        <span>정답 {stats.correct}/{stats.attempts}</span>
        <span>{canResolve ? '결과 확인 중...' : '다음 행동 준비 완료'}</span>
      </div>

      <ParentReport stats={stats} focus={session.focus} />
    </AppShell>
  );
}
