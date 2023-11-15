import { Timer } from 'timer-node';
import { assert } from 'console';
import * as ctx from './util/nodecg';

const nodecg = ctx.get();

const timerRep = nodecg.Replicant('timer');
const stopTimerWhenDoneRep = nodecg.Replicant('stopTimerWhenDone', {
  defaultValue: true,
});
const stopTimerWhenDoneCountRep = nodecg.Replicant('stopTimerWhenDoneCount', {
  defaultValue: 2,
});

let timer = new Timer();
let state = 'stopped';

const timerObj = {
  ms: 0,
  pausedMs: 0,
  state: 'stopped',
};

function updateRep() {
  timerObj.state = state;

  timerRep.value = timerObj;
}

updateRep();

function play() {
  if (timer.isStopped() || !timer.isStarted()) {
    timer.start();
  }
  if (timer.isPaused()) {
    timer.resume();
  }

  state = 'playing';
}
nodecg.listenFor('timerPlay', play);

function pause() {
  state = 'paused';
  updateRep();
}
nodecg.listenFor('timerPause', pause);

function reset() {
  timer = new Timer();
  state = 'stopped';

  timerObj.ms = timer.ms();
  timerObj.pausedMs = timer.ms();

  updateRep();
}
nodecg.listenFor('timerReset', reset);

function set(input:string) {
  const parts = input.split(':');
  const parts2 = parts.at(-1)?.split('.');

  const ms = (parts2?.length ?? 0) > 1 ? (parts2?.[1] ?? '0') : '0';
  const s = parts2?.[0] ?? '0';
  parts.pop();

  let subtract = 0;
  subtract += parseInt(ms);
  subtract += parseInt(s) * 1000;

  let mul = 60000;

  for (let i = parts.length - 1; i >= 0; i--) {
    subtract += parseInt(parts[i]) * mul;
    mul *= 60;
  }

  const timestamp = Date.now() - subtract;

  timer = new Timer({
    startTimestamp: timestamp,
  });
  timer.pause();

  state = 'stopped';
  timerObj.ms = timer.ms();
  timerObj.pausedMs = timer.ms();

  updateRep();
}
nodecg.listenFor('timerSet', set);

const raceStates:any = [];

for (let i = 0; i < 4; i++) {
  raceStates.push(
    nodecg.Replicant(`player${i}raceState`, { defaultValue: 'none' }),
  );
}

function playerRaceStateChanged(data) {
  const { player } = data;
  const raceState = data.state;

  // check if we wanna stop the timer
  if (stopTimerWhenDoneRep.value) {
    let donePlayers = 0;

    for (let i = 0; i < raceStates.length; i++) {
      if (raceStates[i].value !== 'none' || player === i) {
        donePlayers++;
      }
    }

    if (state === 'playing' && donePlayers >= stopTimerWhenDoneCountRep.value) {
      pause();
    }
  }

  // check for place (should maybe be part of its own extension script)
  let newState = 'none';

  if (raceState === 'done') {
    const otherPlayer = player % 2 === 0 ? player + 1 : player - 1;
    newState = 'winner';

    if (raceStates[otherPlayer].value === 'winner') {
      newState = 'loser';
    }
  } else if (raceState === 'forfeit') {
    newState = 'forfeit';
  }

  raceStates[player].value = newState;
}
nodecg.listenFor('playerRaceStateChanged', playerRaceStateChanged);

function tick() {
  if (state === 'playing' || state === 'paused') {
    timerObj.pausedMs = timer.ms();
    if (state === 'playing') {
      timerObj.ms = timer.ms();
    }

    updateRep();
  }
}
setInterval(tick, 11);
