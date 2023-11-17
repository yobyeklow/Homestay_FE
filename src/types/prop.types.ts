export type Props = {
  children:
    | string
    | JSX.Element
    | JSX.Element[]
    | (() => JSX.Element)
    | React.ReactNode;
};
