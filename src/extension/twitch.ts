import * as ctx from './util/nodecg';
import { RefreshingAuthProvider, StaticAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { writeFile, readFile } from 'fs/promises';

const nodecg = ctx.get();

const clientId = nodecg.bundleConfig.twitchClientId as string;
const clientSecret = nodecg.bundleConfig.twitchClientSecret as string;
const twitchChannel = nodecg.bundleConfig.twitchChannel as string;

const twitchTemplate = nodecg.Replicant('twitchTemplate', {
  defaultValue: 'Mystery Tournament 0017! {player1} vs. {player2}',
});

//--------- USERS ---------
// MauriceSY: 210715672
// MFH: 175608452
// MFS: 258966332
// (These are not secret)

//--------- GAME ---------
// MysteryFunHouse: 10553
// Retro: 27284

async function init() {
  const buf = await readFile(__dirname + '/twitch_token.json');
  const tokenData = JSON.parse(buf.toString('utf-8'));

  const authProvider = new RefreshingAuthProvider({
    clientId,
    clientSecret,
  });
  authProvider.onRefresh(async (newTokenData) =>
    writeFile(__dirname + '/twitch_token.json', JSON.stringify(newTokenData, null, 4), {
      encoding: 'utf-8',
    })
  );
  await authProvider.addUserForToken(tokenData);

  return new ApiClient({ authProvider });
}

init().then(apiClient => {
  nodecg.listenFor('updateTwitch', async (options, ack) => {
    const requestedGame = nodecg.readReplicant<string>('game');

    // template placeholders
    const placeHolders: Record<string, string | undefined> = {
      player1: nodecg.readReplicant('player0name'),
      player2: nodecg.readReplicant('player1name'),
      player3: nodecg.readReplicant('player2name'),
      player4: nodecg.readReplicant('player3name'),
      round1: nodecg.readReplicant('match1round'),
      round2: nodecg.readReplicant('match2round'),
    };

    // replace all placeholders in twitchTemplate
    let title = twitchTemplate.value ?? '';
    for (let [placeholder, val] of Object.entries(placeHolders)) {
      title = title.replace('{' + placeholder + '}', val ?? '');
    }

    let gameId = '27284'; // default to "Retro" if game not found
    let gameName = 'Retro';

    if (requestedGame) {
      const game = await apiClient.games.getGameByName(requestedGame);
      gameId = game ? game.id : '27284'; // default to "Retro" if game not found
      gameName = game ? game.name : 'Retro';
    }
    try {
      await apiClient.channels.updateChannelInfo(twitchChannel, {
        title: title,
        gameId: gameId,
      });
      if (ack && !ack.handled) {
        ack(null, {
          title: title,
          game: gameName,
        });
      }
    } catch (err) {
      console.error(err);
      if (ack && !ack.handled) {
        ack(new Error('Something went wrong. Try again or tell Maurice.'));
      }
    }
  });
});
