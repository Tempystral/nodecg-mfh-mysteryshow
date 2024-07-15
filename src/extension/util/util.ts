import NodeCG from "@nodecg/types";
import clone from "clone";
import _ from "lodash";
import { get } from "./nodecg";

/* export function bindReplicant(vueName:string, replicantName:string = vueName, debounceWait:number = 1000) {
  const replicant = get().Replicant(replicantName, {
    defaultValue: vueName,
  });
  let preventSend = false;

  let sendValue = _.debounce(function (newValue) {
    replicant.value = newValue;
  }, debounceWait);

  let readValue = (newValue) => {
    vueName = clone(newValue);

    preventSend = true;
    $nextTick(() => {
      preventSend = false;
    });
  };

  NodeCG.waitForReplicants(replicant).then(() => {
    readValue(replicant.value);

    replicant.on("change", (newValue) => {
      readValue(newValue);
    });

    this.$watch(vueName, (newValue) => {
      if (!preventSend) {
        sendValue(newValue);
      }
    });
  });
} */

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
