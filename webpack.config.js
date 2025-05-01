const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const {
  isEnvDevelopment,
  isEnvProduction,
  mode,
  shouldUseSourceMap,

  cssRegex,
  cssModuleRegex,

  sassRegex,
  sassModuleRegex,

  lessRegex,
  lessModuleRegex,

  lessLoader,
  lessModuleLoader,

  sassLoader,
  cssLoader,

  shouldBundleAnalyzer,
  shouldGenerateHTML,
} = require("./webpack-sharing");

const resolveApp = (relativePath) => path.resolve(__dirname, relativePath);

const paths = {
  appSrc: resolveApp("src"),
  appPath: resolveApp("."),
  appBuild: resolveApp("lib"),
};

const resolveEntry = (relativePath) => path.resolve(paths.appSrc, relativePath);

const webpackEntry = {
  index: {
    import: resolveEntry("index.ts"),
  },
  "@input": {
    import: resolveEntry("@input/index.ts"),
  },
  "@label": {
    import: resolveEntry("@label/index.ts"),
  },
  "@icon": {
    import: resolveEntry("@icon/index.ts"),
  },
  "@hook": {
    import: resolveEntry("@hook/index.ts"),
  },
  "@combobox": {
    import: resolveEntry("@combobox/index.ts"),
  },
};

console.debug({
  webpackEntry,
});

// console.log(entryObj);
/** @type { import('webpack').Configuration } */
module.exports = {
  entry: webpackEntry,
  output: {
    filename: (pathData) => {
      return pathData.chunk.name === "index" ? "[name].js" : "[name]/index.js";
    },
    path: path.resolve(__dirname, "lib"),
    clean: true,
    publicPath: "./",
    globalObject: "this",
    library: {
      type: "module",
    },
  },
  mode: mode,
  devtool: isEnvProduction
    ? shouldUseSourceMap
      ? "source-map"
      : false
    : isEnvDevelopment && "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: cssLoader,
        sideEffects: true,
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: sassLoader,
        sideEffects: true,
      },
      {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: lessLoader,
        sideEffects: true,
      },
      {
        test: lessModuleRegex,
        use: lessModuleLoader,
        sideEffects: true,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".jsx", ".tsx"],
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
  plugins: isEnvProduction
    ? [
        new MiniCssExtractPlugin({
          filename: (pathData) => {
            return pathData.chunk.name === "index"
              ? "main.css"
              : "[name]/index.css";
          },
        }),
        shouldBundleAnalyzer ? new BundleAnalyzerPlugin() : undefined,
        shouldGenerateHTML ? new HtmlWebpackPlugin() : undefined,
        new TsconfigPathsPlugin({
          configFile: resolveApp("./tsconfig.json"),
        }),
      ].filter(Boolean)
    : [],
  externals: {
    react: "react",
    "react-dom": "react-dom",
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.lightningCssMinify,
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
  experiments: {
    outputModule: true, // ✅ required for library.type = 'module'
  },
};
