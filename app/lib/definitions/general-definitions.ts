export type AutoCompleteProps = {
  items: string[];
  value: string;
  onChange(val: string): void;
  input_id: string;
  dropdown_className: {};
  input_className: string;
  label_className: string;
  dropdown_content_className: string;
  ul_className: string;
  li_className: string;
};

export type CharacterDetails = {
  image: File | null;
  ign?: string;
  level?: number;
  maplestoryClass?: string;
};

export type UserDetails = {
  region: string;
  characters: CharacterDetails[];
};
