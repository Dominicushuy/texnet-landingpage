module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-unused-vars": "warn",
    "no-console": "warn",
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
  ignorePatterns: ["node_modules", ".next", "out", "public"],
};
