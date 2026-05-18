import { useMemo, useReducer } from 'react';
import { getSession } from '../data/learningContent';

const PHASE = {
  PREDICT: 'predict',
  OBSERVE: 'observe',
  REFLECT: 'reflect'
};

const initialState = {
  sessionIndex: 0,
  phase: PHASE.PREDICT,
  selectedId: null,
  stats: {
    attempts: 0,
    correct: 0,
    retryCount: 0,
    recent: []
  }
};

function reducer(state, action) {
  switch (action.type) {
    case 'DROP_CHOICE':
      if (state.phase !== PHASE.PREDICT || state.selectedId) return state;
      return {
        ...state,
        phase: PHASE.OBSERVE,
        selectedId: action.payload
      };
    case 'RESOLVE': {
      const isCorrect = action.payload.isCorrect;
      return {
        ...state,
        phase: PHASE.REFLECT,
        stats: {
          ...state.stats,
          attempts: state.stats.attempts + 1,
          correct: state.stats.correct + (isCorrect ? 1 : 0),
          retryCount: state.stats.retryCount + (isCorrect ? 0 : 1),
          recent: [...state.stats.recent.slice(-4), isCorrect]
        }
      };
    }
    case 'NEXT':
      return {
        ...state,
        sessionIndex: state.sessionIndex + 1,
        phase: PHASE.PREDICT,
        selectedId: null
      };
    default:
      return state;
  }
}

export function useLearningFlow() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const session = useMemo(() => getSession(state.sessionIndex), [state.sessionIndex]);

  const isCorrect = state.selectedId === session.heavierId;

  const dropChoice = (id) => dispatch({ type: 'DROP_CHOICE', payload: id });
  const resolve = () => dispatch({ type: 'RESOLVE', payload: { isCorrect } });
  const next = () => dispatch({ type: 'NEXT' });

  return {
    session,
    phase: state.phase,
    selectedId: state.selectedId,
    isCorrect,
    dropChoice,
    resolve,
    next,
    progress: state.sessionIndex + 1,
    stats: state.stats,
    canResolve: state.phase === PHASE.OBSERVE,
    phaseOrder: PHASE
  };
}
