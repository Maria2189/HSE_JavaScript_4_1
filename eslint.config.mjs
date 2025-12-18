import js from "@eslint/js";

export default [
  // 1. Игнорируем папку dist
  {
    ignores: ["dist/"]
  },

  js.configs.recommended,

  // 2. Общие настройки для проекта (Браузер + Airbnb legacy)
  {
    languageOptions: {
      globals: {
        console: "readonly",
        window: "readonly",
        document: "readonly"
      }
    },
    plugins: {
      extends: ["airbnb-base/legacy"]
    }
  },

  // 3. Настройки СПЕЦИАЛЬНО для тестов (Jest)
  {
    files: ["**/*.test.js"], // Применяется только к файлам тестов
    languageOptions: {
      globals: {
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
        it: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly"
      }
    }
  },

  // 4. Настройки СПЕЦИАЛЬНО для конфига Webpack (Node.js)
  {
    files: ["webpack.config.js"], // Применяется только к этому файлу
    languageOptions: {
      globals: {
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        exports: "readonly"
      }
    }
  }
];