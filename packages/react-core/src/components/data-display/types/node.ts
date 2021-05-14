export interface Node {
  id: string;
  label?: string | JSX.Element;
  checked: boolean;
  nodes?: Node[];
}
