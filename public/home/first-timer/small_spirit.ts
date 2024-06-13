import { Dialogue } from "@/app/lib/definitions/first-timer-definitions";

const smallSpiritDialogue: Dialogue = {
  welcome:
    "Welcome to Dreaming Forest, a Maplestory tool to help you keep track of stuff! To get started, select your region and add a character.",
  add_character:
    "Add a character that you want to track. To get an image of your character, search your IGN in maplestory.gg or make it in maples.im.",
  create_account:
    "This step is optional but recommended. By creating an account, your data will be securely stored and accessible across multiple devices, ensuring you never lose it even if your browser data is lost.",
};

const smallSpiritImage: Dialogue = {
  welcome: "/home/first-timer/small_spirit_happy.png",
  add_character: "/home/first-timer/small_spirit_smiling.png",
  create_account: "/home/first-timer/small_spirit_smiling.png",
};

export { smallSpiritDialogue, smallSpiritImage };
