import React from 'react';

type InputProps = {
  regExp: RegExp;
} & Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'className'>;

export const validClasses = ['border-green-600', 'text-green-900'];
export const errorClasses = ['border-red-600', 'text-red-900'];

const Input = ({ regExp, ...rest }: InputProps) => {
  return (
    <input
      onChange={(event) => {
        const value = event.currentTarget.value;
        const isNotAValidStudentNumber = !regExp.test(value);
        if (value.length === 0) {
          event.currentTarget.classList.remove(...errorClasses);
          return event.currentTarget.classList.remove(...validClasses);
        }
        if (isNotAValidStudentNumber) {
          event.currentTarget.classList.add(...errorClasses);
          return event.currentTarget.classList.remove(...validClasses);
        }
        event.currentTarget.classList.add(...validClasses);
        event.currentTarget.classList.remove(...errorClasses);
      }}
      {...rest}
      className="h-12 rounded-lg border-4 bg-foreground px-2 py-1 text-background shadow-sm duration-300 ease-in-out"
    />
  );
};

export default Input;
