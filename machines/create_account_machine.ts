import { setup, assign, fromPromise } from "xstate";

export type GenderOptions = 'male' | 'female' | 'other';

type CreateAccountProps = {
  name: string;
  gender: GenderOptions;
  childrenNames: string[];
  email: string;
  password: string;
};

export const GENDER_OPTIONS = ['male', 'female', 'other'];

function hasDuplicates(arr: string[]): boolean {
  const uniqueElements = new Set(arr);
  return uniqueElements.size !== arr.length;
}

const createAccount = async ({ name, gender, childrenNames, email, password }: CreateAccountProps) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data ={
    name,
    gender,
    childrenNames,
    email,
    password,
  }
  console.log('createAccount', data);
  return data;
};

export const machine = setup({
  types: {
    context: {} as {
      name: string;
      email: string;
      gender: GenderOptions;
      password: string;
      childrenNames: string[];
    },
    events: {} as
      | { type: 'SAVE_NAME'; name: string; }
      | { type: 'SAVE_GENDER'; gender: GenderOptions; }
      | { type: 'SAVE_CHILDREN_NAMES'; childrenNames: string[]; }
      | { type: 'SAVE_EMAIL'; email: string; }
      | { type: 'SAVE_PASSWORD'; password: string; }
      | { type: 'CREATE_ACCOUNT'; }
      | { type: 'NEXT_SCREEN'; }
      | { type: 'BACK_SCREEN'; }
  },
  actors: {
    createAccount: fromPromise(async ({ input }: { input: CreateAccountProps }) => {
      const response = await createAccount({
        name: input.name,
        gender: input.gender,
        childrenNames: input.childrenNames,
        email: input.email,
        password: input.password,
      });
      return response;
    }),
  },
  actions: {
    storeNameInContext: assign({
      name: ({ context, event }) => {
        if (event.type === 'SAVE_NAME') {
          return event.name.trim();
        }
        return context.name;
      },
    }),
    storeGenderInContext: assign({
      gender: ({ context, event }) => {
        if (event.type === 'SAVE_GENDER') {
          return event.gender;
        }
        return context.gender;
      },
    }),
    storeChildrenNamesInContext: assign({
      childrenNames: ({ context, event }) => {
        if (event.type === 'SAVE_CHILDREN_NAMES') {
          return event.childrenNames;
        }
        return context.childrenNames;
      },
    }),
    storeEmailInContext: assign({
      email: ({ context, event }) => {
        if (event.type === 'SAVE_EMAIL') {
          return event.email;
        }
        return context.email;
      },
    }),
    storePasswordInContext: assign({
      password: ({ context, event }) => {
        if (event.type === 'SAVE_PASSWORD') {
          return event.password;
        }
        return context.password;
      },
    }),
  },
  guards: {
    isNameInEventValid: ({ event }) => event.type === 'SAVE_NAME' && typeof event.name === 'string',
    isGenderInEventValid: ({ event }) => event.type === 'SAVE_GENDER' && GENDER_OPTIONS.includes(event.gender),
    isChildNameInEventValid: ({ event }) => event.type === 'SAVE_CHILDREN_NAMES' && !hasDuplicates(event.childrenNames),
    isEmailInEventValid: ({ event }) => event.type === 'SAVE_EMAIL' && typeof event.email === 'string',
    isPasswordInEventValid: ({ event }) => event.type === 'SAVE_PASSWORD' && typeof event.password === 'string',
    isValidNameInContext: ({ context }) => context.name.length > 0,
    isValidGenderInContext: ({ context }) => GENDER_OPTIONS.includes(context.gender),
    isValidChildNameInContext: ({ context }) => context.childrenNames.length > 0,
    isValidEmailInContext: ({ context }) => context.email.length > 0,
    isValidPasswordInContext: ({ context }) => context.password.length > 0,
    isValidLoginDetailsInContext: ({ context }) =>  context.email.length > 0 && context.password.length > 0,
  },
}).createMachine({
  context: {
    name: "",
    email: "",
    gender: "other",
    password: "",
    childrenNames: [],
  },
  id: "CREATE_ACCOUNT_MACHINE",
  initial: "NAME_SCREEN",
  states: {
    NAME_SCREEN: {
      on: {
        SAVE_NAME: {
          guard: 'isNameInEventValid',
          actions: {
            type: "storeNameInContext",
            params: {
              name: "string",
            },
          },
        },
        NEXT_SCREEN: {
          guard: 'isValidNameInContext',
          target: "GENDER_SCREEN",
        },
      },
    },
    GENDER_SCREEN: {
      on: {
        SAVE_GENDER: {
          actions: {
            guard: 'isGenderInEventValid',
            type: "storeGenderInContext",
            params: {
              gender: "string",
            },
          },
        },
        BACK_SCREEN: {
          target: "NAME_SCREEN",
        },
        NEXT_SCREEN: {
          guard: 'isValidGenderInContext',
          target: "CHILDREN_NAMES_SCREEN",
        },
      },
    },
    CHILDREN_NAMES_SCREEN: {
      on: {
        SAVE_CHILDREN_NAMES: [
          {
            guard: 'isChildNameInEventValid',
            actions: {
              type: "storeChildrenNamesInContext",
              params: {
                childrenNames: [],
              },
            },
          },
        ],
        BACK_SCREEN: {
          target: "GENDER_SCREEN",
        },
        NEXT_SCREEN: {
          guard: 'isValidChildNameInContext',
          target: "LOGIN_DETAILS_SCREEN",
        },
      },
    },
    LOGIN_DETAILS_SCREEN: {
      on: {
        SAVE_EMAIL: {
          actions: {
            guard: 'isEmailInEventValid',
            type: "storeEmailInContext",
            params: {
              email: "string",
            },
          },
        },
        SAVE_PASSWORD: {
          actions: {
            guard: 'isPasswordInEventValid',
            type: "storePasswordInContext",
            params: {
              password: "string",
            },
          },
        },
        BACK_SCREEN: {
          target: "CHILDREN_NAMES_SCREEN",
        },
        CREATE_ACCOUNT: {
          guard: 'isValidLoginDetailsInContext',
          target: "CREATING_ACCOUNT",
        },
      },
    },
    CREATING_ACCOUNT: {
      invoke: {
        id: "createAccount",
        src: "createAccount",
        input: ({ context }) => ({
          name: context.name,
          gender: context.gender,
          childrenNames: context.childrenNames,
          email: context.email,
          password: context.password,
        }),
        onDone: {
          target: "HOME_SCREEN",
        },
        onError: {
          target: "ERROR_SCREEN",
        },
      },
    },
    HOME_SCREEN: {
      type: 'final',
    },
    ERROR_SCREEN: {
      type: 'final',
    },
  },
});
