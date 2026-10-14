import { useState } from 'react';
import { Work } from '../types';

/** Selection state for WorkModal with prev/next navigation through `list`. */
export function useWorkModal(list: Work[]) {
  const [selected, setSelected] = useState<Work | null>(null);
  const index = selected ? list.findIndex((work) => work.id === selected.id) : -1;
  const hasPrev = index > 0;
  const hasNext = index >= 0 && index < list.length - 1;

  return {
    selected,
    hasPrev,
    hasNext,
    open: (work: Work) => setSelected(work),
    close: () => setSelected(null),
    prev: () => {
      if (hasPrev) setSelected(list[index - 1]);
    },
    next: () => {
      if (hasNext) setSelected(list[index + 1]);
    },
  };
}
