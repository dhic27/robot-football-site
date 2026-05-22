const fs = require("node:fs");
const path = require("node:path");

const rollupNative = path.join(__dirname, "..", "node_modules", "rollup", "dist", "native.js");
const wasmNative = path.join(__dirname, "..", "node_modules", "@rollup", "wasm-node", "dist", "native.js");

if (fs.existsSync(rollupNative) && fs.existsSync(wasmNative)) {
  fs.writeFileSync(rollupNative, 'module.exports = require("../../@rollup/wasm-node/dist/native.js");\n');
  console.log("Patched Rollup native loader to use @rollup/wasm-node.");
}
