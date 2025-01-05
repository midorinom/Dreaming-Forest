import type { Dialogue } from "@/app/lib/definitions/welcome-definitions";

const smallSpiritDialogue: Dialogue = {
  welcome:
    "Welcome to Dreaming Forest, a Maplestory tool to help you keep track of stuff! Do login if you already have an account.",
  select_region: "To get started, select your region.",
  add_character:
    "Add a character that you want to track. You can get an image of your character from maplestory.gg, nexon rankings page or maples.im",
  create_account:
    "This step is optional but recommended. By creating an account, your data will be securely stored and accessible across multiple devices, ensuring you never lose it even if your browser data is lost.",
  uploading: "Loading, please wait...",
  login: "Retrieving all your data and logging in, please wait a moment...",
};

const smallSpiritImage: Dialogue = {
  welcome: "/welcome/small_spirit_happy.png",
  select_region: "/welcome/small_spirit_smiling.png",
  add_character: "/welcome/small_spirit_smiling.png",
  create_account: "/welcome/small_spirit_happy.png",
  uploading: "/welcome/small_spirit_smiling.png",
  login: "/welcome/small_spirit_happy.png",
};

export { smallSpiritDialogue, smallSpiritImage };
