import * as React from 'react';
import styles from './ui.module.scss';

interface ButtonProps {
  onClick?: () => void;
  theme: 'submitBtnCss' | 'deleteBtnCss' | 'updateBtnCss' | 'createBtnCss' | 'closeDialogCss';
  children?: React.ReactNode;
}
interface InputProps {
  type?: string;
  required?:boolean;
  readOnly?: boolean;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BUTTON_THEME = {
  submitBtnCss: styles.submitBtn,
  deleteBtnCss: styles.deleteBtn,
  updateBtnCss: styles.updateBtn,
  createBtnCss: styles.createBtn, 
  closeDialogCss:styles.closeDialogBtn
};

const Button: React.FC<ButtonProps> = ({
  theme,
  children,
  onClick,
}: ButtonProps) => {
  const styleBtn = BUTTON_THEME[theme];
  return <button className={styleBtn} onClick={onClick}>{children}</button>;
};

const Input: React.FC<InputProps> = ({
  onChange,
  type = 'text',
  required=false,
  readOnly = false,
  placeholder,
  name,
  value,
}) => {
  return (
    <input
      onChange={onChange}
      type={type}
      required={required}
      readOnly={readOnly}
      placeholder={placeholder}
      name={name}
      value={value}
    />
  );
};

export {Button, Input};
