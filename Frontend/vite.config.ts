import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [react(), eslint()],
  base: "/quik",
  // server: {
  //   proxy: {
  //     // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
  //     "/assets": {
  //       target: "http://barak-pc:8080/quik",
  //       changeOrigin: true,
  //       secure: false,
  //       configure: (proxy, _options) => {
  //         proxy.on("error", (err, _req, _res) => {
  //           console.log("proxy error", err);
  //         });
  //         proxy.on("proxyReq", (proxyReq, req, _res) => {
  //           console.log("Sending Request to the Target:", req.method, req.url);
  //         });
  //         proxy.on("proxyRes", (proxyRes, req, _res) => {
  //           console.log(
  //             "Received Response from the Target:",
  //             proxyRes.statusCode,
  //             req.url
  //           );
  //         });
  //       },
  //     },
  //     // with options: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
  //   },
  // },
});
