declare const transitionDuration: number;
declare const fancypenosiUrl: string;

// source: https://www.totaltypescript.com/how-to-properly-type-window
interface Window {
  fadeTo: (url: string) => void;
  signOut: () => void;
}
