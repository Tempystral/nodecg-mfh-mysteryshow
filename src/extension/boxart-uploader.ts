import { request } from "http";
import fs from "fs";
import * as ctx from "./util/nodecg";
const nodecg = ctx.get();

function uploadBoxart(url:string) {
  const whitelist = ["jpg", "jpeg", "png", "gif", "webp"];

  const ext = url.split(".").pop();
  if (ext && !whitelist.includes(ext)) {
    nodecg.log.error("Invalid file type");
    return;
  }

  const filename = url.split("/").pop();
  const timestamp = Date.now();
  const filepath = `assets/nodecg-mfh-mysteryshow/boxarts/${timestamp}-${filename}`;

  download(url, filepath, () => {});
}

function download(url:string, dest:string, cb) {
  const file = fs.createWriteStream(dest);
  const sendReq = request(url);

  // verify response code
  sendReq.on("response", (response) => {
    console.log(response.statusCode);
    if (response.statusCode !== 200) {
      file.close(cb);
      fs.unlink(dest, () => cb());
      return cb("Response status was " + response.statusCode);
    }

    sendReq.pipe(file);
  });

  // close() is async, call cb after close completes
  file.on("finish", () => file.close(cb));

  // check for request errors
  sendReq.on("error", (err) => {
    fs.unlink(dest, () => cb(err.message)); // delete the (partial) file and then return the error
  });

  file.on("error", (err) => {
    // Handle errors
    fs.unlink(dest, () => cb(err.message)); // delete the (partial) file and then return the error
  });
};
nodecg.listenFor("uploadBoxart", uploadBoxart);
