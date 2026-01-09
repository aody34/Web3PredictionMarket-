'use client';

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            helperText,
            leftElement,
            rightElement,
            className = '',
            ...props
        },
        ref
    ) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftElement && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                            {leftElement}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
              w-full px-4 py-3 bg-[var(--bg-secondary)] border rounded-xl
              text-[var(--text-primary)] text-sm
              placeholder:text-[var(--text-muted)]
              transition-all duration-200
              focus:outline-none focus:border-[var(--color-primary)]
              focus:ring-2 focus:ring-[var(--color-primary)]/20
              disabled:opacity-50 disabled:cursor-not-allowed
              ${leftElement ? 'pl-10' : ''}
              ${rightElement ? 'pr-10' : ''}
              ${error
                                ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20'
                                : 'border-[var(--border-color)]'
                            }
              ${className}
            `}
                        {...props}
                    />
                    {rightElement && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                            {rightElement}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="mt-1.5 text-xs text-[var(--color-error)]">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1.5 text-xs text-[var(--text-muted)]">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, helperText, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={`
            w-full px-4 py-3 bg-[var(--bg-secondary)] border rounded-xl
            text-[var(--text-primary)] text-sm
            placeholder:text-[var(--text-muted)]
            transition-all duration-200
            focus:outline-none focus:border-[var(--color-primary)]
            focus:ring-2 focus:ring-[var(--color-primary)]/20
            disabled:opacity-50 disabled:cursor-not-allowed
            resize-none min-h-[100px]
            ${error
                            ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20'
                            : 'border-[var(--border-color)]'
                        }
            ${className}
          `}
                    {...props}
                />
                {error && (
                    <p className="mt-1.5 text-xs text-[var(--color-error)]">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1.5 text-xs text-[var(--text-muted)]">{helperText}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    className={`
            w-full px-4 py-3 bg-[var(--bg-secondary)] border rounded-xl
            text-[var(--text-primary)] text-sm
            transition-all duration-200 cursor-pointer
            focus:outline-none focus:border-[var(--color-primary)]
            focus:ring-2 focus:ring-[var(--color-primary)]/20
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error
                            ? 'border-[var(--color-error)]'
                            : 'border-[var(--border-color)]'
                        }
            ${className}
          `}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p className="mt-1.5 text-xs text-[var(--color-error)]">{error}</p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';
