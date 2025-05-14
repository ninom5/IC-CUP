export type EditInputType = {
  type: string;
  name: string;
  label: string;
  min?: number | string;
  max?: number | string;
  value: string;
  disabled: boolean;
  placeholder?: string;
};

export type ReusableEditComponentProps = {
  inputs: EditInputType[];
  onEditClick?: () => void;
  onSubmitClick?: () => void;
};
