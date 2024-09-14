export type PaginationState = {
  page: number;
  window: number;
};

export type PaginationProps = {
  pages: number;
  state: PaginationState;
  onPageChange: (page: number) => void;
  className?: string;
  note?: JSX.Element | string;
};
