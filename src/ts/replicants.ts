import { useReplicant } from 'nodecg-vue-composable';
import { type DashboardTimer } from '@nodecg-mfh-mysterytournament/types';

const timer = useReplicant<DashboardTimer>('timer', undefined, {
  defaultValue: { ms: 0, pausedMs: 0, state: 'stopped' },
});
const stopTimerWhenDone = useReplicant('stopTimerWhenDone', undefined, { defaultValue: true });
const stopTimerWhenDoneCount = useReplicant('stopTimerWhenDoneCount', undefined, {
  defaultValue: 2,
});

export { timer, stopTimerWhenDone, stopTimerWhenDoneCount };
