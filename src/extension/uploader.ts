import AssetFile from '@nodecg/types/server/assets/AssetFile';
import fs from 'fs';
import { sha1 } from 'crypto-hash';
import { BUNDLE_NAMESPACE } from './constants';
import * as ctx from './util/nodecg';
const nodecg = ctx.get();
const whitelist = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

function uploadAsset(msg: { asset: string; url: string }) {
  const { asset, url } = msg;

  const ext = url.split('.').pop();
  const filename = url.split('/').pop();
  if (!ext || !filename) {
    nodecg.log.error('Invalid filename');
    return;
  }
  if (ext && !whitelist.includes(ext)) {
    nodecg.log.error('Invalid file type');
    return;
  }

  const timestamp = Date.now();
  const filepath = `assets/nodecg-mfh-mysteryshow/${asset}/${timestamp}-${filename}`;
  let checksum = '';

  download(url, filepath, (hash: string) => {
    checksum = hash;
  });
  addAssetToCollection(
    {
      base: filepath,
      category: asset,
      ext: ext,
      name: filename,
      url: filepath,
      namespace: BUNDLE_NAMESPACE,
      sum: checksum,
    },
    asset
  );
}

function addAssetToCollection(asset: AssetFile, collection: string) {
  const assetReplicant = nodecg.Replicant<AssetFile[]>(`asset:${collection}`, BUNDLE_NAMESPACE);
  assetReplicant.value?.push(asset);
}

function download(url: string, dest: string, cb) {
  return fetch(url).then(
    async (success) => {
      console.log('Success!');
      const blob = await success.blob();
      fs.writeFileSync(dest, Buffer.from(await blob.arrayBuffer()));
      cb(await (await import('crypto-hash')).sha1(fs.readFileSync(dest)));
    },
    (reject) => {
      console.log('Error: Status code was ' + reject.statusCode);
    }
  );
}
nodecg.listenFor('uploadAsset', BUNDLE_NAMESPACE, uploadAsset);
