// adapters/cloudflare-pages/vite.config.ts
import { cloudflarePagesAdapter } from "file:///C:/Users/devce/Development/vroom-coffee-roastery/node_modules/@builder.io/qwik-city/lib/adapters/cloudflare-pages/vite/index.mjs";
import { extendConfig } from "file:///C:/Users/devce/Development/vroom-coffee-roastery/node_modules/@builder.io/qwik-city/lib/vite/index.mjs";

// vite.config.ts
import { defineConfig } from "file:///C:/Users/devce/Development/vroom-coffee-roastery/node_modules/vite/dist/node/index.js";
import { qwikVite } from "file:///C:/Users/devce/Development/vroom-coffee-roastery/node_modules/@builder.io/qwik/dist/optimizer.mjs";
import { qwikCity } from "file:///C:/Users/devce/Development/vroom-coffee-roastery/node_modules/@builder.io/qwik-city/lib/vite/index.mjs";
import tsconfigPaths from "file:///C:/Users/devce/Development/vroom-coffee-roastery/node_modules/vite-tsconfig-paths/dist/index.mjs";

// package.json
var package_default = {
  name: "vroom-coffee-roastery",
  description: "Demo app with sample routes",
  engines: {
    node: "^18.18.0 || ^20.3.0 || >=21.0.0"
  },
  "engines-annotation": "Mostly required by sharp which needs a Node-API v9 compatible runtime",
  private: true,
  trustedDependencies: [
    "sharp"
  ],
  "trustedDependencies-annotation": "Needed for bun to allow running install scripts",
  type: "module",
  scripts: {
    build: "qwik build",
    "build.client": "vite build",
    "build.preview": "vite build --ssr src/entry.preview.tsx",
    "build.server": "vite build -c adapters/cloudflare-pages/vite.config.ts",
    "build.types": "tsc --incremental --noEmit",
    "cf-typegen": "wrangler types",
    deploy: "npm run build && wrangler pages deploy",
    dev: "vite --mode ssr",
    "dev.debug": "node --inspect-brk ./node_modules/vite/bin/vite.js --mode ssr --force",
    fmt: "prettier --write .",
    "fmt.check": "prettier --check .",
    lint: 'eslint "src/**/*.ts*"',
    preview: "npm run build && wrangler pages dev",
    "preview.remote": "npm run build && wrangler pages dev --remote",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:migrate:prod": "prisma migrate deploy",
    serve: "wrangler pages dev ./dist --compatibility-flags=nodejs_als",
    start: "vite --open --mode ssr",
    qwik: "qwik"
  },
  devDependencies: {
    "@builder.io/qwik": "^1.12.0",
    "@builder.io/qwik-city": "^1.12.0",
    "@cloudflare/workers-types": "^4.20250410.0",
    "@modular-forms/qwik": "^0.29.1",
    "@types/node": "^22.15.29",
    "@typescript-eslint/eslint-plugin": "7.16.1",
    "@typescript-eslint/parser": "7.16.1",
    eslint: "8.57.0",
    "eslint-plugin-qwik": "^1.12.0",
    prettier: "3.3.3",
    prisma: "^6.8.2",
    typescript: "5.4.5",
    undici: "*",
    vite: "5.3.5",
    "vite-tsconfig-paths": "^4.2.1",
    wrangler: "^3.0.0"
  },
  dependencies: {
    "@prisma/adapter-d1": "^6.9.0",
    "@prisma/client": "^6.8.2",
    "@tailwindcss/vite": "^4.1.3",
    "@tsndr/cloudflare-worker-jwt": "^3.2.0",
    "@types/eslint": "^9.6.1",
    bcryptjs: "^3.0.2",
    "class-variance-authority": "^0.7.1",
    clsx: "^2.1.1",
    "tailwind-merge": "^3.3.0",
    tailwindcss: "^4.1.3",
    valibot: "^1.1.0"
  }
};

// vite.config.ts
import tailwindcss from "file:///C:/Users/devce/Development/vroom-coffee-roastery/node_modules/@tailwindcss/vite/dist/index.mjs";
var platform = {};
if (process.env.NODE_ENV === "development") {
  const { getPlatformProxy } = await import("file:///C:/Users/devce/Development/vroom-coffee-roastery/node_modules/wrangler/wrangler-dist/cli.js");
  platform = await getPlatformProxy();
}
var { dependencies = {}, devDependencies = {} } = package_default;
errorOnDuplicatesPkgDeps(devDependencies, dependencies);
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    plugins: [qwikCity({
      platform
    }), qwikVite({
      experimental: ["valibot"]
    }), tsconfigPaths(), tailwindcss()],
    // This tells Vite which dependencies to pre-build in dev mode.
    optimizeDeps: {
      // Put problematic deps that break bundling here, mostly those with binaries.
      // For example ['better-sqlite3'] if you use that in server functions.
      exclude: []
    },
    resolve: {
      alias: {
        ".prisma/client/edge": "./node_modules/.prisma/client/edge.js"
      }
    },
    /**
     * This is an advanced setting. It improves the bundling of your server code. To use it, make sure you understand when your consumed packages are dependencies or dev dependencies. (otherwise things will break in production)
     */
    // ssr:
    //   command === "build" && mode === "production"
    //     ? {
    //         // All dev dependencies should be bundled in the server build
    //         noExternal: Object.keys(devDependencies),
    //         // Anything marked as a dependency will not be bundled
    //         // These should only be production binary deps (including deps of deps), CLI deps, and their module graph
    //         // If a dep-of-dep needs to be external, add it here
    //         // For example, if something uses `bcrypt` but you don't have it as a dep, you can write
    //         // external: [...Object.keys(dependencies), 'bcrypt']
    //         external: Object.keys(dependencies),
    //       }
    //     : undefined,
    server: {
      headers: {
        // Don't cache the server response in dev mode
        "Cache-Control": "public, max-age=0"
      }
    },
    preview: {
      headers: {
        // Do cache the server response in preview (non-adapter production build)
        "Cache-Control": "public, max-age=600"
      }
    }
  };
});
function errorOnDuplicatesPkgDeps(devDependencies2, dependencies2) {
  let msg = "";
  const duplicateDeps = Object.keys(devDependencies2).filter(
    (dep) => dependencies2[dep]
  );
  const qwikPkg = Object.keys(dependencies2).filter(
    (value) => /qwik/i.test(value)
  );
  msg = `Move qwik packages ${qwikPkg.join(", ")} to devDependencies`;
  if (qwikPkg.length > 0) {
    throw new Error(msg);
  }
  msg = `
    Warning: The dependency "${duplicateDeps.join(", ")}" is listed in both "devDependencies" and "dependencies".
    Please move the duplicated dependencies to "devDependencies" only and remove it from "dependencies"
  `;
  if (duplicateDeps.length > 0) {
    throw new Error(msg);
  }
}

// adapters/cloudflare-pages/vite.config.ts
var vite_config_default2 = extendConfig(vite_config_default, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.cloudflare-pages.tsx", "@qwik-city-plan"]
      }
    },
    plugins: [cloudflarePagesAdapter()]
  };
});
export {
  vite_config_default2 as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYWRhcHRlcnMvY2xvdWRmbGFyZS1wYWdlcy92aXRlLmNvbmZpZy50cyIsICJ2aXRlLmNvbmZpZy50cyIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxkZXZjZVxcXFxEZXZlbG9wbWVudFxcXFx2cm9vbS1jb2ZmZWUtcm9hc3RlcnlcXFxcYWRhcHRlcnNcXFxcY2xvdWRmbGFyZS1wYWdlc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZGV2Y2VcXFxcRGV2ZWxvcG1lbnRcXFxcdnJvb20tY29mZmVlLXJvYXN0ZXJ5XFxcXGFkYXB0ZXJzXFxcXGNsb3VkZmxhcmUtcGFnZXNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2RldmNlL0RldmVsb3BtZW50L3Zyb29tLWNvZmZlZS1yb2FzdGVyeS9hZGFwdGVycy9jbG91ZGZsYXJlLXBhZ2VzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgY2xvdWRmbGFyZVBhZ2VzQWRhcHRlciB9IGZyb20gXCJAYnVpbGRlci5pby9xd2lrLWNpdHkvYWRhcHRlcnMvY2xvdWRmbGFyZS1wYWdlcy92aXRlXCI7XG5pbXBvcnQgeyBleHRlbmRDb25maWcgfSBmcm9tIFwiQGJ1aWxkZXIuaW8vcXdpay1jaXR5L3ZpdGVcIjtcbmltcG9ydCBiYXNlQ29uZmlnIGZyb20gXCIuLi8uLi92aXRlLmNvbmZpZ1wiO1xuXG5leHBvcnQgZGVmYXVsdCBleHRlbmRDb25maWcoYmFzZUNvbmZpZywgKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGJ1aWxkOiB7XG4gICAgICBzc3I6IHRydWUsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIGlucHV0OiBbXCJzcmMvZW50cnkuY2xvdWRmbGFyZS1wYWdlcy50c3hcIiwgXCJAcXdpay1jaXR5LXBsYW5cIl0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW2Nsb3VkZmxhcmVQYWdlc0FkYXB0ZXIoKV0sXG4gIH07XG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZGV2Y2VcXFxcRGV2ZWxvcG1lbnRcXFxcdnJvb20tY29mZmVlLXJvYXN0ZXJ5XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxkZXZjZVxcXFxEZXZlbG9wbWVudFxcXFx2cm9vbS1jb2ZmZWUtcm9hc3RlcnlcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2RldmNlL0RldmVsb3BtZW50L3Zyb29tLWNvZmZlZS1yb2FzdGVyeS92aXRlLmNvbmZpZy50c1wiOy8qKlxyXG4gKiBUaGlzIGlzIHRoZSBiYXNlIGNvbmZpZyBmb3Igdml0ZS5cclxuICogV2hlbiBidWlsZGluZywgdGhlIGFkYXB0ZXIgY29uZmlnIGlzIHVzZWQgd2hpY2ggbG9hZHMgdGhpcyBmaWxlIGFuZCBleHRlbmRzIGl0LlxyXG4gKi9cclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCB0eXBlIFVzZXJDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgeyBxd2lrVml0ZSB9IGZyb20gXCJAYnVpbGRlci5pby9xd2lrL29wdGltaXplclwiO1xyXG5pbXBvcnQgeyBxd2lrQ2l0eSB9IGZyb20gXCJAYnVpbGRlci5pby9xd2lrLWNpdHkvdml0ZVwiO1xyXG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xyXG5pbXBvcnQgcGtnIGZyb20gXCIuL3BhY2thZ2UuanNvblwiO1xyXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAnQHRhaWx3aW5kY3NzL3ZpdGUnXHJcblxyXG5sZXQgcGxhdGZvcm0gPSB7fTtcclxuXHJcbmlmKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgY29uc3QgeyBnZXRQbGF0Zm9ybVByb3h5IH0gPSBhd2FpdCBpbXBvcnQoJ3dyYW5nbGVyJyk7XHJcbiAgcGxhdGZvcm0gPSBhd2FpdCBnZXRQbGF0Zm9ybVByb3h5KCk7XHJcbn1cclxuXHJcbnR5cGUgUGtnRGVwID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcclxuY29uc3QgeyBkZXBlbmRlbmNpZXMgPSB7fSwgZGV2RGVwZW5kZW5jaWVzID0ge30gfSA9IHBrZyBhcyBhbnkgYXMge1xyXG4gIGRlcGVuZGVuY2llczogUGtnRGVwO1xyXG4gIGRldkRlcGVuZGVuY2llczogUGtnRGVwO1xyXG4gIFtrZXk6IHN0cmluZ106IHVua25vd247XHJcbn07XHJcbmVycm9yT25EdXBsaWNhdGVzUGtnRGVwcyhkZXZEZXBlbmRlbmNpZXMsIGRlcGVuZGVuY2llcyk7XHJcblxyXG4vKipcclxuICogTm90ZSB0aGF0IFZpdGUgbm9ybWFsbHkgc3RhcnRzIGZyb20gYGluZGV4Lmh0bWxgIGJ1dCB0aGUgcXdpa0NpdHkgcGx1Z2luIG1ha2VzIHN0YXJ0IGF0IGBzcmMvZW50cnkuc3NyLnRzeGAgaW5zdGVhZC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pOiBVc2VyQ29uZmlnID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgcGx1Z2luczogW3F3aWtDaXR5KHtcclxuICAgICAgcGxhdGZvcm1cclxuICAgIH0pLCBxd2lrVml0ZSh7XHJcbiAgICAgIGV4cGVyaW1lbnRhbDogWyd2YWxpYm90J11cclxuICAgIH0pLCB0c2NvbmZpZ1BhdGhzKCksIHRhaWx3aW5kY3NzKCldLFxyXG4gICAgLy8gVGhpcyB0ZWxscyBWaXRlIHdoaWNoIGRlcGVuZGVuY2llcyB0byBwcmUtYnVpbGQgaW4gZGV2IG1vZGUuXHJcbiAgICBvcHRpbWl6ZURlcHM6IHtcclxuICAgICAgLy8gUHV0IHByb2JsZW1hdGljIGRlcHMgdGhhdCBicmVhayBidW5kbGluZyBoZXJlLCBtb3N0bHkgdGhvc2Ugd2l0aCBiaW5hcmllcy5cclxuICAgICAgLy8gRm9yIGV4YW1wbGUgWydiZXR0ZXItc3FsaXRlMyddIGlmIHlvdSB1c2UgdGhhdCBpbiBzZXJ2ZXIgZnVuY3Rpb25zLlxyXG4gICAgICBleGNsdWRlOiBbXSxcclxuICAgIH0sXHJcblxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIFwiLnByaXNtYS9jbGllbnQvZWRnZVwiOlwiLi9ub2RlX21vZHVsZXMvLnByaXNtYS9jbGllbnQvZWRnZS5qc1wiXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgaXMgYW4gYWR2YW5jZWQgc2V0dGluZy4gSXQgaW1wcm92ZXMgdGhlIGJ1bmRsaW5nIG9mIHlvdXIgc2VydmVyIGNvZGUuIFRvIHVzZSBpdCwgbWFrZSBzdXJlIHlvdSB1bmRlcnN0YW5kIHdoZW4geW91ciBjb25zdW1lZCBwYWNrYWdlcyBhcmUgZGVwZW5kZW5jaWVzIG9yIGRldiBkZXBlbmRlbmNpZXMuIChvdGhlcndpc2UgdGhpbmdzIHdpbGwgYnJlYWsgaW4gcHJvZHVjdGlvbilcclxuICAgICAqL1xyXG4gICAgLy8gc3NyOlxyXG4gICAgLy8gICBjb21tYW5kID09PSBcImJ1aWxkXCIgJiYgbW9kZSA9PT0gXCJwcm9kdWN0aW9uXCJcclxuICAgIC8vICAgICA/IHtcclxuICAgIC8vICAgICAgICAgLy8gQWxsIGRldiBkZXBlbmRlbmNpZXMgc2hvdWxkIGJlIGJ1bmRsZWQgaW4gdGhlIHNlcnZlciBidWlsZFxyXG4gICAgLy8gICAgICAgICBub0V4dGVybmFsOiBPYmplY3Qua2V5cyhkZXZEZXBlbmRlbmNpZXMpLFxyXG4gICAgLy8gICAgICAgICAvLyBBbnl0aGluZyBtYXJrZWQgYXMgYSBkZXBlbmRlbmN5IHdpbGwgbm90IGJlIGJ1bmRsZWRcclxuICAgIC8vICAgICAgICAgLy8gVGhlc2Ugc2hvdWxkIG9ubHkgYmUgcHJvZHVjdGlvbiBiaW5hcnkgZGVwcyAoaW5jbHVkaW5nIGRlcHMgb2YgZGVwcyksIENMSSBkZXBzLCBhbmQgdGhlaXIgbW9kdWxlIGdyYXBoXHJcbiAgICAvLyAgICAgICAgIC8vIElmIGEgZGVwLW9mLWRlcCBuZWVkcyB0byBiZSBleHRlcm5hbCwgYWRkIGl0IGhlcmVcclxuICAgIC8vICAgICAgICAgLy8gRm9yIGV4YW1wbGUsIGlmIHNvbWV0aGluZyB1c2VzIGBiY3J5cHRgIGJ1dCB5b3UgZG9uJ3QgaGF2ZSBpdCBhcyBhIGRlcCwgeW91IGNhbiB3cml0ZVxyXG4gICAgLy8gICAgICAgICAvLyBleHRlcm5hbDogWy4uLk9iamVjdC5rZXlzKGRlcGVuZGVuY2llcyksICdiY3J5cHQnXVxyXG4gICAgLy8gICAgICAgICBleHRlcm5hbDogT2JqZWN0LmtleXMoZGVwZW5kZW5jaWVzKSxcclxuICAgIC8vICAgICAgIH1cclxuICAgIC8vICAgICA6IHVuZGVmaW5lZCxcclxuXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIC8vIERvbid0IGNhY2hlIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgaW4gZGV2IG1vZGVcclxuICAgICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJwdWJsaWMsIG1heC1hZ2U9MFwiLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHByZXZpZXc6IHtcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIC8vIERvIGNhY2hlIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgaW4gcHJldmlldyAobm9uLWFkYXB0ZXIgcHJvZHVjdGlvbiBidWlsZClcclxuICAgICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJwdWJsaWMsIG1heC1hZ2U9NjAwXCIsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH07XHJcbn0pO1xyXG5cclxuLy8gKioqIHV0aWxzICoqKlxyXG5cclxuLyoqXHJcbiAqIEZ1bmN0aW9uIHRvIGlkZW50aWZ5IGR1cGxpY2F0ZSBkZXBlbmRlbmNpZXMgYW5kIHRocm93IGFuIGVycm9yXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXZEZXBlbmRlbmNpZXMgLSBMaXN0IG9mIGRldmVsb3BtZW50IGRlcGVuZGVuY2llc1xyXG4gKiBAcGFyYW0ge09iamVjdH0gZGVwZW5kZW5jaWVzIC0gTGlzdCBvZiBwcm9kdWN0aW9uIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuZnVuY3Rpb24gZXJyb3JPbkR1cGxpY2F0ZXNQa2dEZXBzKFxyXG4gIGRldkRlcGVuZGVuY2llczogUGtnRGVwLFxyXG4gIGRlcGVuZGVuY2llczogUGtnRGVwLFxyXG4pIHtcclxuICBsZXQgbXNnID0gXCJcIjtcclxuICAvLyBDcmVhdGUgYW4gYXJyYXkgJ2R1cGxpY2F0ZURlcHMnIGJ5IGZpbHRlcmluZyBkZXZEZXBlbmRlbmNpZXMuXHJcbiAgLy8gSWYgYSBkZXBlbmRlbmN5IGFsc28gZXhpc3RzIGluIGRlcGVuZGVuY2llcywgaXQgaXMgY29uc2lkZXJlZCBhIGR1cGxpY2F0ZS5cclxuICBjb25zdCBkdXBsaWNhdGVEZXBzID0gT2JqZWN0LmtleXMoZGV2RGVwZW5kZW5jaWVzKS5maWx0ZXIoXHJcbiAgICAoZGVwKSA9PiBkZXBlbmRlbmNpZXNbZGVwXSxcclxuICApO1xyXG5cclxuICAvLyBpbmNsdWRlIGFueSBrbm93biBxd2lrIHBhY2thZ2VzXHJcbiAgY29uc3QgcXdpa1BrZyA9IE9iamVjdC5rZXlzKGRlcGVuZGVuY2llcykuZmlsdGVyKCh2YWx1ZSkgPT5cclxuICAgIC9xd2lrL2kudGVzdCh2YWx1ZSksXHJcbiAgKTtcclxuXHJcbiAgLy8gYW55IGVycm9ycyBmb3IgbWlzc2luZyBcInF3aWstY2l0eS1wbGFuXCJcclxuICAvLyBbUExVR0lOX0VSUk9SXTogSW52YWxpZCBtb2R1bGUgXCJAcXdpay1jaXR5LXBsYW5cIiBpcyBub3QgYSB2YWxpZCBwYWNrYWdlXHJcbiAgbXNnID0gYE1vdmUgcXdpayBwYWNrYWdlcyAke3F3aWtQa2cuam9pbihcIiwgXCIpfSB0byBkZXZEZXBlbmRlbmNpZXNgO1xyXG5cclxuICBpZiAocXdpa1BrZy5sZW5ndGggPiAwKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcclxuICB9XHJcblxyXG4gIC8vIEZvcm1hdCB0aGUgZXJyb3IgbWVzc2FnZSB3aXRoIHRoZSBkdXBsaWNhdGVzIGxpc3QuXHJcbiAgLy8gVGhlIGBqb2luYCBmdW5jdGlvbiBpcyB1c2VkIHRvIHJlcHJlc2VudCB0aGUgZWxlbWVudHMgb2YgdGhlICdkdXBsaWNhdGVEZXBzJyBhcnJheSBhcyBhIGNvbW1hLXNlcGFyYXRlZCBzdHJpbmcuXHJcbiAgbXNnID0gYFxyXG4gICAgV2FybmluZzogVGhlIGRlcGVuZGVuY3kgXCIke2R1cGxpY2F0ZURlcHMuam9pbihcIiwgXCIpfVwiIGlzIGxpc3RlZCBpbiBib3RoIFwiZGV2RGVwZW5kZW5jaWVzXCIgYW5kIFwiZGVwZW5kZW5jaWVzXCIuXHJcbiAgICBQbGVhc2UgbW92ZSB0aGUgZHVwbGljYXRlZCBkZXBlbmRlbmNpZXMgdG8gXCJkZXZEZXBlbmRlbmNpZXNcIiBvbmx5IGFuZCByZW1vdmUgaXQgZnJvbSBcImRlcGVuZGVuY2llc1wiXHJcbiAgYDtcclxuXHJcbiAgLy8gVGhyb3cgYW4gZXJyb3Igd2l0aCB0aGUgY29uc3RydWN0ZWQgbWVzc2FnZS5cclxuICBpZiAoZHVwbGljYXRlRGVwcy5sZW5ndGggPiAwKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcclxuICB9XHJcbn0iLCAie1xyXG4gIFwibmFtZVwiOiBcInZyb29tLWNvZmZlZS1yb2FzdGVyeVwiLFxyXG4gIFwiZGVzY3JpcHRpb25cIjogXCJEZW1vIGFwcCB3aXRoIHNhbXBsZSByb3V0ZXNcIixcclxuICBcImVuZ2luZXNcIjoge1xyXG4gICAgXCJub2RlXCI6IFwiXjE4LjE4LjAgfHwgXjIwLjMuMCB8fCA+PTIxLjAuMFwiXHJcbiAgfSxcclxuICBcImVuZ2luZXMtYW5ub3RhdGlvblwiOiBcIk1vc3RseSByZXF1aXJlZCBieSBzaGFycCB3aGljaCBuZWVkcyBhIE5vZGUtQVBJIHY5IGNvbXBhdGlibGUgcnVudGltZVwiLFxyXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxyXG4gIFwidHJ1c3RlZERlcGVuZGVuY2llc1wiOiBbXHJcbiAgICBcInNoYXJwXCJcclxuICBdLFxyXG4gIFwidHJ1c3RlZERlcGVuZGVuY2llcy1hbm5vdGF0aW9uXCI6IFwiTmVlZGVkIGZvciBidW4gdG8gYWxsb3cgcnVubmluZyBpbnN0YWxsIHNjcmlwdHNcIixcclxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcclxuICBcInNjcmlwdHNcIjoge1xyXG4gICAgXCJidWlsZFwiOiBcInF3aWsgYnVpbGRcIixcclxuICAgIFwiYnVpbGQuY2xpZW50XCI6IFwidml0ZSBidWlsZFwiLFxyXG4gICAgXCJidWlsZC5wcmV2aWV3XCI6IFwidml0ZSBidWlsZCAtLXNzciBzcmMvZW50cnkucHJldmlldy50c3hcIixcclxuICAgIFwiYnVpbGQuc2VydmVyXCI6IFwidml0ZSBidWlsZCAtYyBhZGFwdGVycy9jbG91ZGZsYXJlLXBhZ2VzL3ZpdGUuY29uZmlnLnRzXCIsXHJcbiAgICBcImJ1aWxkLnR5cGVzXCI6IFwidHNjIC0taW5jcmVtZW50YWwgLS1ub0VtaXRcIixcclxuICAgIFwiY2YtdHlwZWdlblwiOiBcIndyYW5nbGVyIHR5cGVzXCIsXHJcbiAgICBcImRlcGxveVwiOiBcIm5wbSBydW4gYnVpbGQgJiYgd3JhbmdsZXIgcGFnZXMgZGVwbG95XCIsXHJcbiAgICBcImRldlwiOiBcInZpdGUgLS1tb2RlIHNzclwiLFxyXG4gICAgXCJkZXYuZGVidWdcIjogXCJub2RlIC0taW5zcGVjdC1icmsgLi9ub2RlX21vZHVsZXMvdml0ZS9iaW4vdml0ZS5qcyAtLW1vZGUgc3NyIC0tZm9yY2VcIixcclxuICAgIFwiZm10XCI6IFwicHJldHRpZXIgLS13cml0ZSAuXCIsXHJcbiAgICBcImZtdC5jaGVja1wiOiBcInByZXR0aWVyIC0tY2hlY2sgLlwiLFxyXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IFxcXCJzcmMvKiovKi50cypcXFwiXCIsXHJcbiAgICBcInByZXZpZXdcIjogXCJucG0gcnVuIGJ1aWxkICYmIHdyYW5nbGVyIHBhZ2VzIGRldlwiLFxyXG4gICAgXCJwcmV2aWV3LnJlbW90ZVwiOiBcIm5wbSBydW4gYnVpbGQgJiYgd3JhbmdsZXIgcGFnZXMgZGV2IC0tcmVtb3RlXCIsXHJcbiAgICBcInByaXNtYTpnZW5lcmF0ZVwiOiBcInByaXNtYSBnZW5lcmF0ZVwiLFxyXG4gICAgXCJwcmlzbWE6bWlncmF0ZVwiOiBcInByaXNtYSBtaWdyYXRlIGRldlwiLFxyXG4gICAgXCJwcmlzbWE6bWlncmF0ZTpwcm9kXCI6IFwicHJpc21hIG1pZ3JhdGUgZGVwbG95XCIsXHJcbiAgICBcInNlcnZlXCI6IFwid3JhbmdsZXIgcGFnZXMgZGV2IC4vZGlzdCAtLWNvbXBhdGliaWxpdHktZmxhZ3M9bm9kZWpzX2Fsc1wiLFxyXG4gICAgXCJzdGFydFwiOiBcInZpdGUgLS1vcGVuIC0tbW9kZSBzc3JcIixcclxuICAgIFwicXdpa1wiOiBcInF3aWtcIlxyXG4gIH0sXHJcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAYnVpbGRlci5pby9xd2lrXCI6IFwiXjEuMTIuMFwiLFxyXG4gICAgXCJAYnVpbGRlci5pby9xd2lrLWNpdHlcIjogXCJeMS4xMi4wXCIsXHJcbiAgICBcIkBjbG91ZGZsYXJlL3dvcmtlcnMtdHlwZXNcIjogXCJeNC4yMDI1MDQxMC4wXCIsXHJcbiAgICBcIkBtb2R1bGFyLWZvcm1zL3F3aWtcIjogXCJeMC4yOS4xXCIsXHJcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIyLjE1LjI5XCIsXHJcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiNy4xNi4xXCIsXHJcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCI3LjE2LjFcIixcclxuICAgIFwiZXNsaW50XCI6IFwiOC41Ny4wXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tcXdpa1wiOiBcIl4xLjEyLjBcIixcclxuICAgIFwicHJldHRpZXJcIjogXCIzLjMuM1wiLFxyXG4gICAgXCJwcmlzbWFcIjogXCJeNi44LjJcIixcclxuICAgIFwidHlwZXNjcmlwdFwiOiBcIjUuNC41XCIsXHJcbiAgICBcInVuZGljaVwiOiBcIipcIixcclxuICAgIFwidml0ZVwiOiBcIjUuMy41XCIsXHJcbiAgICBcInZpdGUtdHNjb25maWctcGF0aHNcIjogXCJeNC4yLjFcIixcclxuICAgIFwid3JhbmdsZXJcIjogXCJeMy4wLjBcIlxyXG4gIH0sXHJcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAcHJpc21hL2FkYXB0ZXItZDFcIjogXCJeNi45LjBcIixcclxuICAgIFwiQHByaXNtYS9jbGllbnRcIjogXCJeNi44LjJcIixcclxuICAgIFwiQHRhaWx3aW5kY3NzL3ZpdGVcIjogXCJeNC4xLjNcIixcclxuICAgIFwiQHRzbmRyL2Nsb3VkZmxhcmUtd29ya2VyLWp3dFwiOiBcIl4zLjIuMFwiLFxyXG4gICAgXCJAdHlwZXMvZXNsaW50XCI6IFwiXjkuNi4xXCIsXHJcbiAgICBcImJjcnlwdGpzXCI6IFwiXjMuMC4yXCIsXHJcbiAgICBcImNsYXNzLXZhcmlhbmNlLWF1dGhvcml0eVwiOiBcIl4wLjcuMVwiLFxyXG4gICAgXCJjbHN4XCI6IFwiXjIuMS4xXCIsXHJcbiAgICBcInRhaWx3aW5kLW1lcmdlXCI6IFwiXjMuMy4wXCIsXHJcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjQuMS4zXCIsXHJcbiAgICBcInZhbGlib3RcIjogXCJeMS4xLjBcIlxyXG4gIH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThaLFNBQVMsOEJBQThCO0FB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QSxNQUNuQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLFNBQVM7QUFBQTtBQUFBLFFBRVAsaUJBQWlCO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7QUFTRCxTQUFTLHlCQUNQQSxrQkFDQUMsZUFDQTtBQUNBLE1BQUksTUFBTTtBQUdWLFFBQU0sZ0JBQWdCLE9BQU8sS0FBS0QsZ0JBQWUsRUFBRTtBQUFBLElBQ2pELENBQUMsUUFBUUMsY0FBYSxHQUFHO0FBQUEsRUFDM0I7QUFHQSxRQUFNLFVBQVUsT0FBTyxLQUFLQSxhQUFZLEVBQUU7QUFBQSxJQUFPLENBQUMsVUFDaEQsUUFBUSxLQUFLLEtBQUs7QUFBQSxFQUNwQjtBQUlBLFFBQU0sc0JBQXNCLFFBQVEsS0FBSyxJQUFJLENBQUM7QUFFOUMsTUFBSSxRQUFRLFNBQVMsR0FBRztBQUN0QixVQUFNLElBQUksTUFBTSxHQUFHO0FBQUEsRUFDckI7QUFJQSxRQUFNO0FBQUEsK0JBQ3VCLGNBQWMsS0FBSyxJQUFJLENBQUM7QUFBQTtBQUFBO0FBS3JELE1BQUksY0FBYyxTQUFTLEdBQUc7QUFDNUIsVUFBTSxJQUFJLE1BQU0sR0FBRztBQUFBLEVBQ3JCO0FBQ0Y7OztBRHRIQSxJQUFPQyx1QkFBUSxhQUFhLHFCQUFZLE1BQU07QUFDNUMsU0FBTztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsZUFBZTtBQUFBLFFBQ2IsT0FBTyxDQUFDLGtDQUFrQyxpQkFBaUI7QUFBQSxNQUM3RDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQztBQUFBLEVBQ3BDO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsiZGV2RGVwZW5kZW5jaWVzIiwgImRlcGVuZGVuY2llcyIsICJ2aXRlX2NvbmZpZ19kZWZhdWx0Il0KfQo=
