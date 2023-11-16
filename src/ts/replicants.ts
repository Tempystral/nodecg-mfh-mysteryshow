import { useReplicant } from 'nodecg-vue-composable';
import { type DashboardTimer } from '@nodecg-mfh-mysterytournament/types';
import { BUNDLE_NAMESPACE } from './constants';

const timer = useReplicant<DashboardTimer>('timer', BUNDLE_NAMESPACE, {
  defaultValue: { ms: 0, pausedMs: 0, state: 'stopped' },
});
const stopTimerWhenDone = useReplicant<boolean>('stopTimerWhenDone', BUNDLE_NAMESPACE, { defaultValue: true });
const stopTimerWhenDoneCount = useReplicant<number>('stopTimerWhenDoneCount', BUNDLE_NAMESPACE, {
  defaultValue: 2,
});

const waitScreenState = useReplicant("waitScreenState", BUNDLE_NAMESPACE, {defaultValue: 0});

// bindReplicant.call(this, "waitScreenState", "waitScreenState", 0);
//     bindReplicant.call(this, "showRainwave", "showRainwave", 0);
//     bindReplicant.call(this, "topText");
//     bindReplicant.call(this, "playerInfo");
//     bindReplicant.call(this, "currentEventLogo");

//     bindReplicant.call(this, "eventLogo", "assets:eventLogo")

export { timer, stopTimerWhenDone, stopTimerWhenDoneCount };
