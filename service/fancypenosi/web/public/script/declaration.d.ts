declare const fancypenosiUrl: string;
declare const transitionDuration: number;

type RegistrarAction = "sign-in" | "sign-up" | "recovery";
declare let registrarAction: RegistrarAction;

// source: https://www.totaltypescript.com/how-to-properly-type-window
interface Window {
  fadeTo: (url: string) => void;
  focusSignUp: () => void;
  focusSignIn: () => void;
  switchAction: (action: RegistrarAction) => void;
  signIn: (event: Event) => Promise<void>;
  signUp: (event: Event) => Promise<void>;
  validateUsername: (event: Event) => void;
  validateSignUpPassword: (event: Event) => void;
  validateResetPassword: (event: Event) => void;
  selectPrompt: (event: Event) => void;
  recovery1: (event: Event) => Promise<void>;
  recovery2: (event: Event) => Promise<void>;
  toggleNavDrawer: () => void;
}
