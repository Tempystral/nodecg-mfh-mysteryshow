import { DashboardOption } from '@nodecg-mfh-mysterytournament/types';

const defaultAspectRatio: DashboardOption = {
  text: 'Auto',
  value: 'false',
};

const aspectRatioOptions: DashboardOption[] = [
  defaultAspectRatio,
  {
    text: '4:3',
    value: '4:3',
  },
  {
    text: '16:9',
    value: '16:9',
  },
  {
    text: '1:1',
    value: '1:1',
  },
  {
    text: '4:6 (Tate)',
    value: '4:6',
  },
  {
    text: '10:9 (GB, GBC, GG)',
    value: '10:9',
  },
  {
    text: '3:2 (GBA)',
    value: '3:2',
  },
  {
    text: '12:7 (VB)',
    value: '12:7',
  },
  {
    text: '30:17 (PSP)',
    value: '30:17',
  },
];

const defaultRaceState: DashboardOption = {
  text: 'None',
  value: 'none',
};

const raceStateOptions: DashboardOption[] = [
  defaultRaceState,
  {
    text: '1st Place',
    value: 'winner',
  },
  {
    text: '2nd Place',
    value: 'loser',
  },
  {
    text: 'Forfeit',
    value: 'forfeit',
  },
];

const pronounOptions: string[] = ['', 'He/Him', 'She/Her', 'They/Them'];
const defaultPronouns = '';

export {
  aspectRatioOptions,
  defaultAspectRatio,
  raceStateOptions,
  defaultRaceState,
  pronounOptions,
  defaultPronouns,
};
