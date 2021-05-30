import create from "zustand";

export type CodeState = {
  code: string;
  setCode: (code: string) => void;
  clearCode: () => void;
};

export const useCodeStore = create<CodeState>((set) => ({
  code: "",
  setCode: (code: string) => set({ code }),
  clearCode: () => set({ code: "" }),
}));
