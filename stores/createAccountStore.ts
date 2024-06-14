import { create } from 'zustand';

interface CreateAccountState {
  name: string;
  gender: 'male' | 'female' | 'other' | undefined;
  childrenNames: string[];
  email: string;
  setName: (name: string) => void;
  setGender: (gender: 'male' | 'female' | 'other') => void;
  setChildrenNames: (childrenNames: string[]) => void;
  setEmail: (email: string) => void;
}

export const useCreateAccountStore = create<CreateAccountState>((set) => ({
  name: '',
  gender: undefined,
  childrenNames: [],
  email: '',
  setName: (name) => set({ name }),
  setGender: (gender) => set({ gender }),
  setChildrenNames: (childrenNames) => set({ childrenNames }),
  setEmail: (email) => set({ email }),
}));
