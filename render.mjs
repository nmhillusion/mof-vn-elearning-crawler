import { BullEngine } from "n2ngin-bull-engine";

new BullEngine()
  .config({
    rootDir: process.cwd() + "/src",
    outDir: process.cwd() + "/dist",
    pug: {
      enabled: true,
      config: {
        pretty: false,
      },
    },
    scss: {
      enabled: true,
      config: {
        outputStyle: "compressed",
      },
    },
    typescript: {
      enabled: true,
    },
    copyResource: {
      enabled: true,
    },
    rewriteJavascript: {
      enabled: true,
      rewriteImport: true,
      compress: true,
    },
  })
  .render();
