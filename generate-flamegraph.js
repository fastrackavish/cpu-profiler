const zeroEks = require('0x');

async function generateFlamegraph(profilePath) {
  const html = await zeroEks({
    argv: ['--visualize-only', profilePath]
  });
  require('fs').writeFileSync('flamegraph.html', html);
}

// Usage:
// Assume `cpu-profile.json` is the generated profile
// generateFlamegraph('cpu-profile.json');

module.exports = generateFlamegraph;
