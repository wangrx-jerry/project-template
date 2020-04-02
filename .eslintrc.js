// http://eslint.org/docs/user-guide/configuring
/**
 * 规则说明
 * rules: {
 *  "规则名": [规则值, 规则配置]
 * }
 * "off"或者0    //关闭规则关闭
 * "warn"或者1    //在打开的规则作为警告（不影响退出代码）
 * "error"或者2    //把规则作为一个错误（退出代码触发时为1）
 * tab缩进
 *
 * 参考地址：http://eslint.cn/docs/rules/
 * TODO: header 校验
 */
module.exports = {
    root: true,
    env: {
        "node": true
    },
    extends: [
        "plugin:vue/essential",
        "@vue/standard"
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "indent": ["error","tab"],
        "key-spacing": [1, {"beforeColon": false,"afterColon": true}],
        "no-tabs": ["off",{"allowIndentationTabs": true}],
        "semi": ["error","always"],//语句结束的分号
        "comma-spacing": ["error", { "before": false, "after": true }],
        "object-curly-spacing": ["error", "never"],
        "keyword-spacing": ["error", {//控制关键字前后空格
            "overrides": {
                "if": {"before": false, "after": false },
                "else": { "before": false, "after": false },
                "for": { "before": false,  "after": false },
                "while": { "before": false,  "after": false },
                "switch": { "before": false,  "after": false },
                "case": { "before": false,  "after": false }
            }
        }],
        "vue/no-unused-vars": ["off", {
            "vars": "all",
            "args": "after-used",
            "ignoreRestSiblings": false,
            "argsIgnorePattern": "header"
        }],
        "one-var": ["off", "always"]
    },
    parserOptions: {
        "parser": "babel-eslint"
    }
};
