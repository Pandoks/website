export const addYank = () => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "y") {
      navigator.clipboard.writeText(window.location.href);
    }
  });
};
