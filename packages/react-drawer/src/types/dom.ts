export interface DomNode {
  attributes: Record<string, any>;
  id: string;
  name: string;
  nodes?: DomNode[];
}

export interface HtmlAttribute {
  name: string;
  value: React.ReactText;
}
