import NodeCG from "@nodecg/types";

const timeformat = /^((?<hours>\d?\d):)?(?<mins>\d\d):(?<secs>\d\d)$/;
let nodecg: NodeCG.ClientAPI;

/**
 * Parses a text representation of time into seconds.
 * @param time as a string
 * @returns The number of seconds represented by the string. If the regex does not match, `null` will be returned.
 */
export function parseTime(time:string) {
  const matches = time.match(timeformat);
  if (matches?.groups) {
    let hours = matches.groups.hours ? parseInt(matches.groups.hours) : 0;
    let mins = matches.groups.mins ? parseInt(matches.groups.mins) : 0;
    let secs = matches.groups.secs ? parseInt(matches.groups.secs) : 0;
    if (mins < 24 && secs < 60) {
      return secs + (mins * 60) + (hours * 3600);
    }
  }
  return null;
}

export function formatTimer(time?: number, includeMs: boolean = true, alwaysIncludeHours: boolean = true) {
  if (!time) return "00:00:00";
  let out = "";

  var ms = Math.floor(time % 1000),
    s = Math.floor((time / 1000) % 60),
    m = Math.floor((time / (1000 * 60)) % 60),
    h = Math.floor((time / (1000 * 60 * 60)) % 24);

  if (alwaysIncludeHours || h > 0) {
    out += ("0" + h).slice(-2) + ":";
  }
  out += ("0" + m).slice(-2) + ":";
  out += ("0" + s).slice(-2);

  if (includeMs) {
    out += "." + ("00" + ms).slice(-3);
  }

  return out;
}

export function apostrophe(s: string) {
  if (s.slice(-1) == "s") {
    return s + "’";
  } else {
    return s + "’s";
  }
}
