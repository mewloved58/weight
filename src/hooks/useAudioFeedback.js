import { useCallback } from 'react';

const MESSAGES = {
  pick: '선택했어요.',
  observe: '저울을 살펴봐요.',
  correct: '정답이에요. 아주 잘했어요.',
  wrong: '괜찮아요. 다시 살펴봐요.',
  next: '다음 문제로 갈게요.'
};

export function useAudioFeedback() {
  const speak = useCallback((key) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(MESSAGES[key] || '좋아요.');
    utter.lang = 'ko-KR';
    utter.rate = 0.95;
    utter.pitch = 1.05;
    window.speechSynthesis.speak(utter);
  }, []);

  return { speak };
}
