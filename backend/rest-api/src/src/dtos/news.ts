import { PartialDocument } from './common';

export interface News<T = string, I = string> extends PartialDocument<T> {
  created_at: I;
  title: string;
  subtitle: string;
  text: string;
  preview: string;
  photos: string[];
  to?: string;
  button_label?: string;
}