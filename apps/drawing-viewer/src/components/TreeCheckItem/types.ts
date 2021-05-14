export interface Node {
  id: string;
  label?: string | JSX.Element;
  checked?: boolean;
  nodes?: Node[];
}

export type OnCheck = (data: { id: string, checked?: boolean }) => any;
