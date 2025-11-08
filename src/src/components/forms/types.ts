export interface FormFieldValue {
  name?: string;
  [key: string]: any; // allow dynamic form fields
}

export interface FormState {
  values: FormFieldValue;
  errors: Partial<Record<keyof FormFieldValue, string>>;
}

// export interface FormProps {
//   formState: FormState;
//   handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
//   handleReset: (event: React.MouseEvent<HTMLButtonElement | HTMLFormElement>) => void;
//   handleFormFieldChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
// }


export interface FormProps {
  formState: FormState;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleReset: (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => void;
  handleFormFieldChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}