declare const fancypenosiUrl: string;
declare const transitionDuration: number;

type RegistrarAction = "sign-in" | "sign-up";
declare let registrarAction: RegistrarAction;

// declare const lmao: Record<string,string>
// type lmao = typeof lmao[keyof typeof lmao];

// source: https://www.totaltypescript.com/how-to-properly-type-window
interface Window {
  fadeTo: (url: string) => void;
  focusSignUp: () => void;
  focusSignIn: () => void;
  switchAction: (action: RegistrarAction) => void;
  signIn: (event: Event) => Promise<void>;
  signUp: (event: Event) => Promise<void>;
}
