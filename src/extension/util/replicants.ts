/* eslint-disable max-len */

import { get as nodecg } from './nodecg';

/**
 * This is where you can declare all your replicant to import easily into other files,
 * and to make sure they have any correct settings on startup.
 */

export const timerRep = nodecg().Replicant('timer', { defaultValue: { ms: 0, pausedMs: 0, state: 'stopped' } });
export const stopTimerWhenDoneRep = nodecg().Replicant('stopTimerWhenDone', {
  defaultValue: true,
});
export const stopTimerWhenDoneCountRep = nodecg().Replicant('stopTimerWhenDoneCount', {
  defaultValue: 2,
});
