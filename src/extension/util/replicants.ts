/* eslint-disable max-len */

import { DashboardTimer, GameOptions } from '@nodecg-mfh-mysterytournament/types';
import * as ctx from './nodecg';
import NodeCG from '@nodecg/types';
import { BUNDLE_NAMESPACE } from '@nodecg-mfh-mysterytournament/constants';

const nodecg = ctx.get();
/**
 * This is where you can declare all your replicant to import easily into other files,
 * and to make sure they have any correct settings on startup.
 */

export const timerRep = nodecg.Replicant<DashboardTimer>('timer', BUNDLE_NAMESPACE, {
  defaultValue: { ms: 0, pausedMs: 0, state: 'stopped' },
});
export const stopTimerWhenDoneRep = nodecg.Replicant<boolean>(
  'stopTimerWhenDone',
  BUNDLE_NAMESPACE,
  {
    defaultValue: true,
  }
);
export const stopTimerConditionRep = nodecg.Replicant<number>(
  'stopTimerCondition',
  BUNDLE_NAMESPACE,
  {
    defaultValue: 3600,
  }
);

// TODO Make this a number, only do the string parsing on the client where it's relevant.
// If the parse is invalid, don't let the user enable the switch and give them an error message.
// Give the timer a more reliable way of testing whether the current milliseconds meet the auto-stop condition.

export const gameModel = nodecg.Replicant<GameOptions>('game', BUNDLE_NAMESPACE, {
  defaultValue: { game: 'Retro Garbage', goal: '', platform: '' },
});

export const boxart = nodecg.Replicant<NodeCG.AssetFile>('currentBoxart', BUNDLE_NAMESPACE, {
  defaultValue: {
    sum: '',
    base: '',
    ext: '',
    name: '',
    namespace: '',
    category: '',
    url: '',
  },
});

export const twitchTemplate = nodecg.Replicant<string>('twitchTemplate', BUNDLE_NAMESPACE, {
  defaultValue: "Kusogrand8! Four-way match in Mystery Game!"
});

// const waitScreenState = useReplicant('waitScreenState', undefined, { defaultValue: 0 });

// bindReplicant.call(this, 'waitScreenState', 'waitScreenState', 0);
// bindReplicant.call(this, 'showRainwave', 'showRainwave', 0);
// bindReplicant.call(this, 'topText');
// bindReplicant.call(this, 'playerInfo');
// bindReplicant.call(this, 'currentEventLogo');

// bindReplicant.call(this, 'eventLogo', 'assets:eventLogo');
