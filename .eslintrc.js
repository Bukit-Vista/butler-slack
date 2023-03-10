module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: ["eslint:recommended", "eslint-config-prettier"],
    plugins: ["eslint-plugin-prettier"],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        "prettier/prettier": "error",
        "no-unused-vars": "warn",
    },
};
