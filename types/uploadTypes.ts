export interface DefaultOption {
  name: string;
  property: string;
  value: number;
  range: {
    min: number;
    max: number;
  };
  unit: string;
  defaultValue: number;
}

export interface Property {
  scale: number;
  type: string;
  DEFAULT_OPTIONS: DefaultOption[];
}

export interface ArrayOfUrlObjects {
  idx: number;
  url: string;
  type: string;
}
