import { BullEngine } from "n2ngin-bull-engine";

const [_, __, mode] = process.argv;

const isProdMode = "PROD" === String(mode).toUpperCase();

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
      config: {
        rewriteImport: true,
        compress: isProdMode,
      },
    },
    watch: {
      enabled: !isProdMode,
      config: {
        handleChangeEvent: true,
        handleRenameEvent: true,
      },
    },
  })
  .render();
