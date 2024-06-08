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

const createAccount = async ({ name, gender, childrenNames, email, password }: CreateAccountProps) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    name,
    gender,
    childrenNames,
    email,
    password,
  };
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
          return event.name;
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
    isValidNameInContext: ({ event }) => event.type === 'SAVE_NAME' && event.name.length > 0,
    isValidGenderInContext: ({ event }) => event.type === 'SAVE_GENDER' && GENDER_OPTIONS.includes(event.gender),
    isValidChildrenNamesInContext: ({ event }) => event.type === 'SAVE_CHILDREN_NAMES' && event.childrenNames.length > 0,
    isValidEmailInContext: ({ event }) => event.type === 'SAVE_EMAIL' && event.email.length > 0,
    isValidPasswordInContext: ({ event }) => event.type === 'SAVE_PASSWORD' && event.password.length > 0,
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
          actions: {
            type: "storeNameInContext",
            params: {
              name: "string",
            },
          },
        },
        NEXT_SCREEN: {
          target: "GENDER_SCREEN",
        },
      },
    },
    GENDER_SCREEN: {
      on: {
        SAVE_GENDER: {
          actions: {
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
          target: "CHILDREN_NAMES_SCREEN",
        },
      },
    },
    CHILDREN_NAMES_SCREEN: {
      on: {
        SAVE_CHILDREN_NAMES: {
          actions: {
            type: "storeChildrenNamesInContext",
            params: {
              childrenNames: [],
            },
          },
        },
        BACK_SCREEN: {
          target: "GENDER_SCREEN",
        },
        NEXT_SCREEN: {
          target: "LOGIN_DETAILS_SCREEN",
        },
      },
    },
    LOGIN_DETAILS_SCREEN: {
      on: {
        SAVE_EMAIL: {
          actions: {
            type: "storeEmailInContext",
            params: {
              email: "string",
            },
          },
        },
        SAVE_PASSWORD: {
          actions: {
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
