import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

/**
 * Storybook Configuration for Next.js.
 *
 * - `stories` defines the file patterns for Storybook to locate story files in the project.
 * - `addons` lists the addons used to extend Storybook's features and functionality.
 * - `framework` specifies the framework settings; in this case, Next.js with specific options.
 * - `docs` configures the documentation generation behavior.
 * - `webpackFinal` is a customization function that modifies the webpack configuration.
 */
const config: StorybookConfig = {
  // Patterns for story files.
  stories: ["../src/**/*.stories.@(ts|tsx)"],

  // Addons provide additional features to Storybook, such as links between stories,
  // essential tools, and interaction testing capabilities.
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  // Framework configuration for Next.js, enabling the use of SWC for faster builds.
  framework: {
    name: "@storybook/nextjs",
    options: {
      builder: {
        useSWC: true, // Enables SWC support
      },
    },
  },
  // Documentation configuration that specifies how auto-documentation is generated.
  docs: {
    autodocs: "tag",
  },
  // Webpack configuration function to set up custom aliasing and potentially other
  // webpack-specific customizations.
  webpackFinal: async (config: any) => {
    // Aliases "@" to the src directory for easier imports within story files.
    config.resolve.alias["@"] = path.resolve(__dirname, "../src");
    return config;
  },
};
export default config;
