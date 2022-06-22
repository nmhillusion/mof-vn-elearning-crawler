import { BullEngine } from "n2ngin-bull-engine";

new BullEngine()
  .config({
    rootDir: process.cwd() + "/src",
    outDir: process.cwd() + "/dist",
    pug: {
      enabled: true,
    },
    scss: {
      enabled: true,
    },
    typescript: {
      enabled: true,
    },
    copyResource: {
      enabled: true,
    },
  })
  .render();
