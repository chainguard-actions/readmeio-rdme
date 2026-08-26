#! /usr/bin/env node
// Chainguard usage telemetry — best-effort, fails open, fire-and-forget.
// Installed as a node action's runs.pre hook (a standalone file) or prepended
// to an existing pre file. Uses dynamic import('node:https') rather than
// require so it runs whether the file is loaded as CommonJS or as an ES module
// — a standalone .js under a package.json with "type": "module" is treated as
// ESM, where require is not defined. Wrapped so any failure is swallowed and
// never breaks the host action.
//
// Reports this action's invocation to the Actions.Record endpoint. When the
// workflow grants `id-token: write` an OIDC token is minted and sent so the
// record is verified; otherwise the repository is self-reported (unverified).
(() => {
  const RECORD_URL = 'https://actions.enforce.dev/actions/v1/record';
  const AUDIENCE = 'actions.chainguard.dev';

  import('node:https').then((mod) => {
    const https = mod.default || mod;

    const record = (token) => {
      try {
        const body = JSON.stringify({
          repository: process.env.GITHUB_REPOSITORY || '',
          action: process.env.GITHUB_ACTION_REPOSITORY || '',
        });
        const headers = {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        const req = https.request(RECORD_URL, { method: 'POST', headers });
        req.on('error', () => {});
        req.setTimeout(2000, () => req.destroy());
        req.end(body);
      } catch {}
    };

    const reqURL = process.env.ACTIONS_ID_TOKEN_REQUEST_URL;
    const reqTok = process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;
    if (!reqURL || !reqTok) {
      record('');
      return;
    }

    let done = false;
    const fallback = () => {
      if (!done) {
        done = true;
        record('');
      }
    };
    const r = https.get(
      `${reqURL}&audience=${encodeURIComponent(AUDIENCE)}`,
      { headers: { Authorization: `Bearer ${reqTok}` } },
      (res) => {
        let data = '';
        res.on('data', (c) => { data += c; });
        res.on('end', () => {
          if (done) return;
          done = true;
          let token = '';
          try { token = JSON.parse(data).value || ''; } catch {}
          record(token);
        });
      },
    );
    r.on('error', fallback);
    r.setTimeout(2000, () => r.destroy());
  }).catch(() => {});
})();

// @ts-check

import fs from 'node:fs';
import path from 'node:path';

const newTarget = './commands.js';

/**
 * We need to duplicate the `package.json` file (with a few modifications) from the root of the project to the
 * `dist-gha` directory, so that the GitHub Actions-flavored `oclif` configuration can find it.
 */
function writeGitHubActionsPackageJson() {
  const current = JSON.parse(
    fs.readFileSync(path.resolve(import.meta.dirname, '../package.json'), { encoding: 'utf-8' }),
  );

  current.private = true;

  // set the correct targets for GitHub Actions
  current.oclif.commands.target = newTarget;
  Object.values(current.oclif.hooks).forEach(hook => {
    // oxlint-disable-next-line no-param-reassign
    hook.target = newTarget;
  });

  // remove properties that are only applicable in a CLI context
  delete current.oclif.helpClass;
  delete current.oclif.plugins;

  // Add GitHub Actions debug statement
  // (we cannot use the '@actions/core' package here since we do not have access to any of our npm dependencies)
  // oxlint-disable-next-line no-console -- This file is a wrapper for emitting logs to GH Actions.
  console.log(`::debug::writing package.json to dist-gha: ${JSON.stringify(current)}`);

  // write the new package.json file
  fs.writeFileSync(path.resolve(import.meta.dirname, '../dist-gha/package.json'), JSON.stringify(current, null, 2));
}

writeGitHubActionsPackageJson();
