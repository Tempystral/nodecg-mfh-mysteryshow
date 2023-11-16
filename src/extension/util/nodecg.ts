import type NodeCG from '@nodecg/types';

let nodecg: NodeCG.ServerAPI;

export function set(ctx: NodeCG.ServerAPI): void {
  nodecg = ctx;
}

export function get(): NodeCG.ServerAPI {
  return nodecg;
}
