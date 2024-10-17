module.exports = {
  apps: [
    {
      name: "MSU eProcurement",
      port: "3000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
      env_development: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        NUXT_PUBLIC_API_BASE: process.env.NUXT_PUBLIC_API_BASE,
      },
    },
  ],
};
