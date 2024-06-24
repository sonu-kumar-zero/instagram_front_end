interface DefaultOption {
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

export const DEFAULT_OPTIONS: DefaultOption[] = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: "%",
    defaultValue: 100
  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    defaultValue: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: "%"
  },
  {
    name: "Saturation",
    property: "saturate",
    value: 100,
    defaultValue: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: "%"
  },
  {
    name: "Grayscale",
    property: "grayscale",
    value: 0,
    defaultValue: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: "%"
  },
  {
    name: "Sepia",
    property: "sepia",
    value: 0,
    defaultValue: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: "%"
  },
  {
    name: "Hue Rotate",
    property: "hue-rotate",
    value: 0,
    defaultValue: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: "deg"
  },
  {
    name: "Blur",
    property: "blur",
    value: 0,
    defaultValue: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: "px"
  },
  {
    name: "Vignette",
    property: "vignette",
    value: 0,
    defaultValue: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: "px"
  }
];
