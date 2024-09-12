import ContainerCup from "../containercup";

export interface containercupsProps {
  containercups: ContainerCup[];
  setIsPopupOpen: (value: boolean) => void;
}

export interface containercupsPropsWithoutCups {
  setIsPopupOpen: (value: boolean) => void;
}