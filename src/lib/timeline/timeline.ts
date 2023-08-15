export type Timeline = {
  isSelected: (id: string) => boolean;
  handleClick: (id: string) => void;
};
