const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

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

  // Single optimization flag
  shouldOptimize,
} = require('./webpack-sharing.js');

const resolveApp = (relativePath) => path.resolve(__dirname, relativePath);

const paths = {
  appSrc: resolveApp('src'),
  appPath: resolveApp('.'),
  appBuild: resolveApp('lib'),
};

const resolveEntry = (relativePath) => path.resolve(paths.appSrc, relativePath);

const webpackEntry = {
  index: {
    import: resolveEntry('index.ts'),
  },
  '@input': {
    import: resolveEntry('@input/index.ts'),
  },
  '@label': {
    import: resolveEntry('@label/index.ts'),
  },
  '@icons': {
    import: resolveEntry('@icons/index.ts'),
  },
  '@combobox': {
    import: resolveEntry('@combobox/index.ts'),
  },
  '@button': {
    import: resolveEntry('@button/index.ts'),
  },
  '@zustand': {
    import: resolveEntry('@zustand/index.ts'),
  },
  '@utils': {
    import: resolveEntry('@utils/index.ts'),
  },
  '@hook': {
    import: resolveEntry('@hook/index.ts'),
  },
};

/** @type { import('webpack').Configuration } */
module.exports = {
  entry: webpackEntry,
  output: {
    filename: (pathData) => {
      return pathData.chunk.name === 'index' ? '[name].js' : '[name]/index.js';
    },
    path: path.resolve(__dirname, 'lib'),
    clean: true,
    publicPath: './',
    globalObject: 'this',
    library: {
      type: 'umd',
    },
  },
  mode: mode,
  devtool: isEnvProduction ? (shouldUseSourceMap ? 'source-map' : false) : isEnvDevelopment && 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.webpack.json',
            onlyCompileBundledFiles: true,
          },
        },
        exclude: /(node_modules|__tests__|__test__|\.spec\.|\.test\.|\.stories\.).*$/,
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
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.jsx', '.tsx'],
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: resolveApp('./tsconfig.webpack.json'),
      }),
    ],
  },
  plugins: isEnvProduction
    ? [
        new MiniCssExtractPlugin({
          filename: (pathData) => {
            return pathData.chunk.name === 'index' ? 'core-ui.css' : '[name]/index.css';
          },
        }),
        shouldBundleAnalyzer ? new BundleAnalyzerPlugin() : undefined,
        shouldGenerateHTML ? new HtmlWebpackPlugin() : undefined,
      ].filter(Boolean)
    : [],
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  optimization: {
    minimize: isEnvProduction && shouldOptimize,
    minimizer: shouldOptimize
      ? [
          // JS minification with Terser
          new TerserPlugin({
            extractComments: false,
            parallel: true,
          }),

          // CSS minification with LightningCSS
          new CssMinimizerPlugin({
            minify: CssMinimizerPlugin.lightningCssMinify,
            minimizerOptions: {
              preset: [
                'default',
                {
                  discardComments: { removeAll: true },
                },
              ],
            },
            parallel: true,
          }),
        ]
      : [],
  },
};
