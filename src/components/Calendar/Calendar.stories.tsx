import { Meta, type StoryObj } from "@storybook/react";
import Calendar from "./Calendar";
import weeklyProgram from "@/data/program.json";

const meta = {
  title: "Calendar",
  component: Calendar,
} satisfies Meta<typeof Calendar>;

export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    weeklyProgram,
    currentDateRaw: new Date(),
    shouldMoveIncompleteActivitiesToPresent: true,
  },
  argTypes: {
    currentDateRaw: {
      control: { type: "date" },
    },
  },
};
