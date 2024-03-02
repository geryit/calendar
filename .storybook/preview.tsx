import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { fjalla, libre, workSans } from "../src/utils/fonts";

/**
 * Storybook Preview Configuration Module
 *
 * This module configures the Storybook preview environment. It imports styles and fonts,
 * and sets global parameters and decorators for story rendering.
 *
 */

const preview: Preview = {
  decorators: [
    (Story) => (
      <main
        // Apply fonts to all stories
        className={`${workSans.variable} ${fjalla.variable} ${libre.variable}`}
      >
        <Story />
      </main>
    ),
  ],
};

export default preview;
