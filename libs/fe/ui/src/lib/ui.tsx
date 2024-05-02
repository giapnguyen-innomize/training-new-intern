import * as React from 'react';
import styles from './ui.module.scss';

interface ButtonProps {
  onClick?: () => void;
  theme: keyof typeof BUTTON_THEME;
  children?: React.ReactNode;
}

const BUTTON_THEME = {
  submit: styles.submitBtn,
  delete: styles.deleteBtn,
  update: styles.updateBtn,
  create: styles.createBtn,
  closeDialog: styles.closeDialogBtn,
};

interface InputProps {
  label: string;
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  theme,
  children,
  onClick,
}: ButtonProps) => {
  const styleBtn = BUTTON_THEME[theme];
  return (
    <button className={styleBtn} onClick={onClick}>
      {children}
    </button>
  );
};

const InputForm: React.FC<InputProps> = ({
  label,
  onChange,
  required = false,
  readOnly = false,
  placeholder,
  name,
  value,
}) => {
  return (
    <div>
      {label}
      <input
        onChange={onChange}
        type="text"
        required={required}
        readOnly={readOnly}
        placeholder={placeholder}
        name={name}
        value={value}
      />
    </div>
  );
};

export { Button, InputForm };
