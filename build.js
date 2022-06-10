const build = require('extra-build');

const owner  = 'nodef';
const srcts  = 'index.ts';




// Get keywords for main/sub package.
function keywords(ds) {
  var m = build.readMetadata('.');
  var s = new Set([...m.keywords, ...ds.map(d => d.name)]);
  return Array.from(s);
}


// Publish root package to NPM, GitHub.
function publishRoot(ds, ver) {
  var _package = build.readDocument('package.json');
  var m = build.readMetadata('.');
  m.version  = ver;
  m.keywords = keywords(ds);
  build.writeMetadata('.', m);
  build.publish('.');
  try { build.publishGithub('.', owner); }
  catch {}
  build.writeDocument(_package);
}


// Deploy root package to NPM, GitHub.
function deployRoot(ds, ver) {
  build.bundleScript(`.build/${srcts}`);
  publishRoot(ds, ver);
}


// Deploy root, sub packages to NPM, GitHub.
function deployAll(ds) {
  var m   = build.readMetadata('.');
  var ver = build.nextUnpublishedVersion(m.name, m.version);
  build.exec(`tsc`);
  build.updateGithubRepoDetails();
  build.generateDocs(`src/${srcts}`);
  build.publishDocs();
  deployRoot(ds, ver);
}


// Generate wiki for all exported symbols.
function generateWiki() {
  // createWikiFiles();
  // generateWikiFiles();
}


// Sort docs details by original order.
function compareLocation(a, b) {
  if (a.kind!==b.kind) return 0;
  return a.location.localeCompare(b.location);
}


// Update README.
function updateReadme(ds) {
  var m  = build.readMetadata('.');
  var repo = m.name;
  var re = /namespace|function/i;
  var ds = ds.slice().sort(compareLocation);
  var dm = new Map(ds.map(d => [d.name, d]));
  var txt = build.readFileText('README.md');
  txt = build.wikiUpdateIndex(txt, dm, d => re.test(d.kind));
  txt = build.wikiUpdateLinkReferences(txt, dm, {owner, repo});
  build.writeFileText('README.md', txt);
}


function main(a) {
  var p  = build.loadDocs([`src/${srcts}`]);
  var ds = p.children.map(build.docsDetails);
  if (a[2] === 'deploy') deployAll(ds);
  else if (a[2] === 'wiki') generateWiki(ds);
  else if (a[2] === 'readme') updateReadme(ds);
  else build.bundleScript(`.build/${srcts}`);
}
main(process.argv);
