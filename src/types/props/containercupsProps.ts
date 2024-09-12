import ContainerCup from "../containercup";

export interface containercupsProps {
  containercups: ContainerCup[];
  setIsPopupOpen: (value: boolean) => void;
  setSelectedCup: (value: ContainerCup | null) => void;
}

export interface containercupsPropsWithoutCups {
  setIsPopupOpen: (value: boolean) => void;
}

export interface cupDetailProps {
  selectedCup: ContainerCup | null;
}