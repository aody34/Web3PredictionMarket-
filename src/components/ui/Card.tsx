'use client';

import { ReactNode } from 'react';

export interface CardProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'gradient' | 'glass';
    hover?: boolean;
    padding?: 'sm' | 'md' | 'lg' | 'none';
    onClick?: () => void;
}

export function Card({
    children,
    className = '',
    variant = 'default',
    hover = false,
    padding = 'md',
    onClick,
}: CardProps) {
    const baseStyles = `
    rounded-xl transition-all duration-300
  `;

    const variants = {
        default: `
      bg-[var(--bg-card)] border border-[var(--border-color)]
    `,
        gradient: `
      bg-[var(--bg-card)] border border-[var(--border-color)]
      bg-gradient-to-br from-[rgba(124,58,237,0.1)] to-[rgba(6,182,212,0.05)]
    `,
        glass: `
      bg-[rgba(22,22,31,0.8)] backdrop-blur-xl
      border border-[rgba(255,255,255,0.05)]
    `,
    };

    const paddings = {
        none: '',
        sm: 'p-3',
        md: 'p-5',
        lg: 'p-7',
    };

    const hoverStyles = hover
        ? 'hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--color-primary)]/20 hover:border-[var(--border-color-light)] cursor-pointer'
        : '';

    return (
        <div
            className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${hoverStyles} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

export interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
    return (
        <div className={`mb-4 ${className}`}>
            {children}
        </div>
    );
}

export interface CardTitleProps {
    children: ReactNode;
    className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
    return (
        <h3 className={`text-lg font-semibold text-[var(--text-primary)] ${className}`}>
            {children}
        </h3>
    );
}

export interface CardDescriptionProps {
    children: ReactNode;
    className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
    return (
        <p className={`text-sm text-[var(--text-secondary)] mt-1 ${className}`}>
            {children}
        </p>
    );
}

export interface CardContentProps {
    children: ReactNode;
    className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
    return <div className={className}>{children}</div>;
}

export interface CardFooterProps {
    children: ReactNode;
    className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
    return (
        <div className={`mt-4 pt-4 border-t border-[var(--border-color)] ${className}`}>
            {children}
        </div>
    );
}
