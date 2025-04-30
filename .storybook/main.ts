import type { StorybookConfig } from "@storybook/react-webpack5";

import path from "path";
import { fileURLToPath } from "url";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import {
  lessRegex,
  lessLoader,
  sassLoader,
  sassRegex,
  lessModuleRegex,
  lessModuleLoader,
  isEnvProduction,
} from "../webpack-sharing";

const resolveApp = (relativePath: string) =>
  path.resolve(__dirname, relativePath);

const paths = {
  appSrc: resolveApp("../src"),
};

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config, { configType }) => {
    config.module?.rules?.push(
      {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: lessLoader,
        sideEffects: true,
        include: paths.appSrc,
      },
      {
        test: lessModuleRegex,
        use: lessModuleLoader,
        sideEffects: true,
        include: paths.appSrc,
      },
      {
        test: sassRegex,
        use: sassLoader,
        sideEffects: true,
        include: paths.appSrc,
      },
    );

    config.resolve = {
      ...config.resolve,
      plugins: [
        ...(config.resolve?.plugins || []),
        new TsconfigPathsPlugin({
          extensions: config.resolve?.extensions,
        }),
      ],
    };

    config.plugins = [
      ...(config.plugins || []),
      ...(isEnvProduction ? [new MiniCssExtractPlugin()] : []),
    ];

    return config;
  },
};

export default config;
