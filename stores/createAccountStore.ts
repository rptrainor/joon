import { create } from 'zustand';

import { GENDER_OPTIONS } from '@/app/(auth)/gender-screen';

interface CreateAccountState {
  name: string;
  gender: typeof GENDER_OPTIONS[number] | undefined;
  childrenNames: string[];
  email: string;
  setName: (name: string) => void;
  setGender: (gender: typeof GENDER_OPTIONS[number]) => void;
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
