type SelectOption = {
  label: string;
  value: string;
};

export interface FilterRowProps {
  label: string;
  imgSrc: string;
  imgAlt: string;
  selectOptions: SelectOption[];
}
