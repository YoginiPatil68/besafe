module.exports = function (api) {
    api.cache(true);

    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module-resolver",
                {
                    alias: {
                        "@screens": "./src/screens",
                        "@config": "./src/config",
                        "@contexts": "./src/contexts",
                        "@components": "./src/components",
                        "@types": "./src/types",
                        "@utils": "./src/utils",
                        "@assets": "./src/assets"
                    }
                }
            ]
        ]
    };
};
