/* eslint-disable max-len */

import { get as nodecg } from './nodecg';

const BUNDLE_NAMESPACE = 'nodecg-mfh-mysteryshow';

/**
 * This is where you can declare all your replicant to import easily into other files,
 * and to make sure they have any correct settings on startup.
 */

export const timerRep = nodecg().Replicant('timer', BUNDLE_NAMESPACE, {
  defaultValue: { ms: 0, pausedMs: 0, state: 'stopped' },
});
export const stopTimerWhenDoneRep = nodecg().Replicant('stopTimerWhenDone', BUNDLE_NAMESPACE, {
  defaultValue: true,
});
export const stopTimerWhenDoneCountRep = nodecg().Replicant(
  'stopTimerWhenDoneCount',
  BUNDLE_NAMESPACE,
  {
    defaultValue: 2,
  },
);

// const waitScreenState = useReplicant('waitScreenState', undefined, { defaultValue: 0 });

// bindReplicant.call(this, 'waitScreenState', 'waitScreenState', 0);
// bindReplicant.call(this, 'showRainwave', 'showRainwave', 0);
// bindReplicant.call(this, 'topText');
// bindReplicant.call(this, 'playerInfo');
// bindReplicant.call(this, 'currentEventLogo');

// bindReplicant.call(this, 'eventLogo', 'assets:eventLogo');
