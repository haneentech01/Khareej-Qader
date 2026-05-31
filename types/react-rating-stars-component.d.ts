declare module "react-rating-stars-component" {
  export interface ReactStarsProps {
    classNames?: string;
    edit?: boolean;
    half?: boolean;
    value?: number;
    count?: number;
    char?: string;
    size?: number;
    color?: string;
    activeColor?: string;
    isHalf?: boolean;
    emptyIcon?: import("react").ReactNode;
    halfIcon?: import("react").ReactNode;
    fullIcon?: import("react").ReactNode;
    onChange?: (newRating: number) => void;
    a11y?: boolean;
  }

  const ReactStars: import("react").ComponentType<ReactStarsProps>;
  export default ReactStars;
}
