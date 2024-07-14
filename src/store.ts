import { create } from "zustand";

type Store = {
  boundary: number;
  setBoundary: (newBoudnary: number) => void;
  cubesAmount: number;
  setCubesAmount: (newCubesAmount: number) => void;
};

const useStore = create<Store>()((set) => ({
  boundary: 30,
  setBoundary: (newBoundary) => set({ boundary: newBoundary }),
  cubesAmount: 10_000,
  setCubesAmount: (newCubesAmount) => set({ cubesAmount: newCubesAmount }),
}));

export { useStore };
