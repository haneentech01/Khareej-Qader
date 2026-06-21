import "youtube-video-element";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "youtube-video": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          slot?: string;
          style?: React.CSSProperties;
          ref?: React.RefObject<HTMLElement>;
        },
        HTMLElement
      >;
    }
  }
}
