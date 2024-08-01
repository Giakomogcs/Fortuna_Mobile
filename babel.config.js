module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@assets": "./assets",
            "@components": "./src/componets",
            "@screens": "./src/screens",
            "@theme": "./src/theme",
          },
        },
      ],
    ],
  };
};
