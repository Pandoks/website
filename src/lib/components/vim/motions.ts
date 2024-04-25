import { active_vim } from "$lib/stores";

export let left = null;
export let down = null;
export let up = null;
export let right = null;

const handleKey = (event: KeyboardEvent) => {
  const key = event.key;

  if (
    !active_vim &&
    (key === "h" || key === "j" || key === "k" || key === "l")
  ) {
    // write to active_vim
  }

  switch (key) {
    case "h":
      break;
    case "j":
      break;
    case "k":
      break;
    case "l":
      break;
    default:
      break;
  }
};

document.addEventListener("keydown", handleKey);
