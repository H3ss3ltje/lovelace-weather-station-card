import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import serve from "rollup-plugin-serve";

const dev = process.env.ROLLUP_WATCH;

const serveOptions = {
  contentBase: ["./dist"],
  host: "0.0.0.0",
  port: 5500,
  allowCrossOrigin: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

export default {
  input: "src/weather-station-card.js",
  output: {
    file: "dist/weather-station-card.js",
    format: "es",
    inlineDynamicImports: true,
    sourcemap: dev ? true : false,
  },
  plugins: [
    nodeResolve(),
    dev && serve(serveOptions),
    !dev &&
      terser({
        format: { comments: false },
        maxWorkers: 1,
      }),
  ],
};
