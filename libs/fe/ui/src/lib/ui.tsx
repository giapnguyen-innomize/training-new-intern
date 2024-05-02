import * as React from 'react';
import styles from './ui.module.scss';

interface ButtonProps {
  onClick?: () => void;
  theme: keyof typeof BUTTON_THEME;
  children?: React.ReactNode;
}

const BUTTON_THEME = {
  submitBtnCss: styles.submitBtn,
  deleteBtnCss: styles.deleteBtn,
  updateBtnCss: styles.updateBtn,
  createBtnCss: styles.createBtn,
  closeDialogCss: styles.closeDialogBtn,
};

interface InputProps {
  children?: React.ReactNode;
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
  children,
  onChange,
  required = false,
  readOnly = false,
  placeholder,
  name,
  value,
}) => {
  return (
    <div>
      {children}
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
