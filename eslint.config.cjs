const unicorn = require("eslint-plugin-unicorn");

module.exports = [
  {
    ignores: ["node_modules/**"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: require("@babel/eslint-parser"),
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-env"],
        },
      },
      globals: {
        URLSearchParams: "readonly",
        setTimeout: "readonly",
        fetch: "readonly",
        console: "readonly",
        document: "readonly",
        window: "readonly",
        Api: "readonly",
        PhotographerData: "readonly",
        PhotographerProfil: "readonly",
        PhotographerHeader: "readonly",
        PhotographerInfo: "readonly",
        DropdownFilter: "readonly",
        PhotographerMedia: "readonly",
        PhotographerMediaCard: "readonly",
        InitData: "readonly",
        ContactForm: "readonly",
        Lightbox: "readonly",
      },
    },
    plugins: {
      unicorn,
    },
    rules: {
      "no-undef": "error",
      indent: ["error", 4],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
        },
      ],
    },
  },
];
