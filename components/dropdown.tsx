'use client'
import { useState } from 'react';
import { ChevronDownIcon } from '@/components/icons';
import NextLink from 'next/link';
import { cn } from '@/lib/utils';
interface DropdownProps {
  label: string;
  children: React.ReactNode;
  className?:string;
}

export const Dropdown = ({ label, children,className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative inline-block text-left",className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-gray-700 hover:text-primary focus:outline-none"
      >
        {label} <ChevronDownIcon className="w-4 h-4" />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
          {children}
        </div>
      )}
    </div>
  );
};

interface DropdownItemProps {
  href: string;
  children: React.ReactNode;
  className?:string;
}

export const DropdownItem = ({ href, children,className }: DropdownItemProps) => {
  return (
    <NextLink href={href} className={cn("block px-4 py-2 text-gray-700 hover:bg-gray-100",className)}>
      {children}
    </NextLink>
  );
};

interface DropdownMenuProps {
  children: React.ReactNode;
  className?:string;
}

export const DropdownMenu = ({ children }: DropdownMenuProps) => {
  return <div className="py-1">{children}</div>;
};
interface DropdownTrigger{
    children: React.ReactNode;
    className?:string;
}

export const DropdownTrigger = ({ children,className }:DropdownTrigger) => {
  return <div className={cn(className)}>{children}</div>;
};
