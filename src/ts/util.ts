function asPlayer(player: number) {
  function makeName(name: string) {
    return `player${player}${name}`;
  }
  return { makeName };
}

// eslint-disable-next-line import/prefer-default-export
export { asPlayer };
