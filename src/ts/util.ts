

function asPlayer(player: number) {
  function makeName(name: string) {
    return `player${player}${name}`;
  }
  return { makeName };
}

export { asPlayer };
