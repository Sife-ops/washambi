declare const transitionDuration: number;

// source: https://www.totaltypescript.com/how-to-properly-type-window
interface Window {
  fadeTo: (url: string) => void;
}
