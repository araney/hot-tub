const path = require("path");

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");

module.exports = (env, argv) => {
    return {
        devServer: {
            contentBase: path.resolve(__dirname, "dist"),
            hot: true
        },
        devtool: argv.mode === "production"
            ? false
            : "eval-source-map",
        plugins: [ 
            // for performing TypeScript type checking separately from compilation
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    configFile: path.resolve(__dirname, "tsconfig.json"),
                    extensions: {
                        vue: {
                            enabled: true,
                            compiler: "@vue/compiler-sfc"
                        }
                    }
                }
            }),

            // for creating demo html
            new HtmlWebpackPlugin({
                chunks: ["demo"],
                template: path.resolve(__dirname, "demo/demo.html")
            }),
            
            // for compiling .vue files
            new VueLoaderPlugin(),

            // define variables expected by Vue 3
            new DefinePlugin({
                __VUE_OPTIONS_API__: false,
                __VUE_PROD_DEVTOOLS__: false
            })
        ],
        resolve: {
            extensions: [ 
                ".ts", 
                ".js",
                ".mjs"
            ],
            plugins: [
                // allows using `paths` option from tsconfig
                new TsConfigPathsPlugin({
                    configFile: path.resolve(__dirname, "tsconfig.json")
                })
            ]
        },
        stats: {
            all: false,
            assets: true,
            builtAt: true,
            errors: true,
            timings: true,
            warnings: true,
            // suppress this false warning -- transpileOnly mode can't detect imported types
            // but our forked type checking will error on any actual import problems
            warningsFilter: /export .* was not found in/,
        },
        module: {
            rules: [{
                test: /\.css$/,
                loader: [
                    "style-loader",
                    "css-loader"
                ]
            },{
                test: /\.less$/,
                // order matters here
                loader: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },{
                test: /\.ts$/,
                use: [{
                    loader: "ts-loader",
                    options: {
                        // allows compiling .vue files with TypeScript
                        appendTsSuffixTo: [ /\.vue$/ ],
                        // ignore files outside of bundle
                        onlyCompileBundledFiles: true,
                        // skip most type checking, this will be done by fork plugin
                        transpileOnly: true
                    }
                }]
            },{
                test: /\.vue$/,
                loader: "vue-loader"
            },{
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto"
            }]
        },
        entry: {
            demo: path.resolve(__dirname, "demo/demo.ts"),
            vue3: path.resolve(__dirname, "index.ts")
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "dist")
        }
    }
};
