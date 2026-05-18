import raw from './learningContent.json';

function getItem(id) {
  return raw.items.find((item) => item.id === id);
}

export function getSession(index) {
  const session = raw.sessions[index % raw.sessions.length];
  const [leftId, rightId] = session.pair;
  const left = getItem(leftId);
  const right = getItem(rightId);
  const heavierId = left.weightLevel >= right.weightLevel ? left.id : right.id;

  return {
    ...session,
    left,
    right,
    heavierId,
    progression: raw.progression
  };
}

export const contentMeta = raw;
