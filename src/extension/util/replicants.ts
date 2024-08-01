/* eslint-disable max-len */

import { BUNDLE_NAMESPACE } from '@nodecg-mfh-mysterytournament/constants';
import {
  DashboardOption,
  DashboardTimer,
  GameOptions,
  PlayerOptions,
} from '@nodecg-mfh-mysterytournament/types';
import NodeCG from '@nodecg/types';
import * as ctx from './nodecg';
import AssetFile from '@nodecg/types/server/assets/AssetFile';

const nodecg = ctx.get();
/**
 * This is where you can declare all your replicant to import easily into other files,
 * and to make sure they have any correct settings on startup.
 */

function makeName(player: number, name: string) {
  return `player${player}${name}`;
}

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
  defaultValue: { game: 'Retro Garbage', gamemaster: '', platform: '' },
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
  defaultValue: 'Kusogrand8! Four-way match in Mystery Game!',
});

export const playerNames = [1, 2, 3, 4].map((player) =>
  nodecg.Replicant<string>(makeName(player, 'name'), BUNDLE_NAMESPACE, {
    defaultValue: '',
  })
);
export const playerPronouns = [1, 2, 3, 4].map((player) =>
  nodecg.Replicant<string>(makeName(player, 'pronouns'), BUNDLE_NAMESPACE, {
    defaultValue: '',
  })
);
export const playerTwitchNames = [1, 2, 3, 4].map((player) =>
  nodecg.Replicant<string>(makeName(player, 'twitch'), BUNDLE_NAMESPACE, {
    defaultValue: '',
  })
);
export const playerAspectRatios = [1, 2, 3, 4].map((player) =>
  nodecg.Replicant<DashboardOption>(makeName(player, 'aspectRatio'), BUNDLE_NAMESPACE, {
    defaultValue: {
      text: 'Auto',
      value: 'false',
    },
  })
);

export const playerOptionReps = [1, 2, 3, 4].map((player) =>
  nodecg.Replicant<PlayerOptions>(makeName(player, 'playerOptions'), BUNDLE_NAMESPACE, {
    defaultValue: {
      name: '',
      pronouns: '',
      twitch: '',
      isZombie: false,
      isAudible: false,
    },
  })
);

export const playerImageReps = [1, 2, 3, 4].map((player) =>
  nodecg.Replicant<AssetFile>(makeName(player, 'Image'), BUNDLE_NAMESPACE, {
    defaultValue: {
      sum: '',
      base: '',
      ext: '',
      name: '',
      namespace: '',
      category: '',
      url: '',
    },
  })
);

export const gamemasterImageRep = nodecg.Replicant<AssetFile>('gmImage', BUNDLE_NAMESPACE, {
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

export const selectableAssetName = nodecg.Replicant<string>(
  'selectableAssetName',
  BUNDLE_NAMESPACE,
  {
    defaultValue: 'currentBoxart',
  }
);
export const assetCollectionName = nodecg.Replicant<string>(
  'selectableAssetCollection',
  BUNDLE_NAMESPACE,
  {
    defaultValue: 'boxarts',
  }
);

nodecg.listenFor(
  'setImageSelectorReplicant',
  BUNDLE_NAMESPACE,
  (msg: { asset: string; replicant: string }) => {
    selectableAssetName.value = msg.asset;
    assetCollectionName.value = msg.replicant;
    console.log(`Rep set: ${assetCollectionName.value} | Asset set: ${selectableAssetName.value}`);
  }
);

// const waitScreenState = useReplicant('waitScreenState', undefined, { defaultValue: 0 });

// bindReplicant.call(this, 'waitScreenState', 'waitScreenState', 0);
// bindReplicant.call(this, 'showRainwave', 'showRainwave', 0);
// bindReplicant.call(this, 'topText');
// bindReplicant.call(this, 'playerInfo');
// bindReplicant.call(this, 'currentEventLogo');

// bindReplicant.call(this, 'eventLogo', 'assets:eventLogo');
