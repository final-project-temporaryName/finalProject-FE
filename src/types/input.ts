import { GetUserLinks } from '@/types/users';
import { ChangeEvent, FocusEventHandler } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputProps {
  label?: string;
  id: string;
  type?: 'text' | 'nickname' | 'file';
  placeholder?: string;
  error?: any;
  register?: UseFormRegisterReturn;
  style?: string;
  accept?: string;
  readOnly?: boolean;
  onImageUpload?: (url: string) => void;
  userId?: number;
  defaultValue?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export interface LinkInputProps {
  link: { id: string; linkId?: number };
  remove: () => void;
  index: number;
  handleLinkErrorUpdate?: (hasError: boolean) => void;
  handleAddLink?: (newLink: GetUserLinks) => void;
}
