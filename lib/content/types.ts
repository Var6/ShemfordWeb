/**
 * Field/type vocabulary shared by the registry, the admin editor and the
 * runtime resolver. Every editable string or image on a public page is
 * declared as one of these.
 */

export type ItemFieldType = "text" | "textarea" | "image" | "select" | "link";

export interface ItemField {
  key: string;
  label: string;
  type: ItemFieldType;
  /** only for type: "select" */
  options?: { label: string; value: string }[];
  help?: string;
}

export type Field =
  | {
      type: "text" | "textarea" | "link";
      key: string;
      label: string;
      help?: string;
      default: string;
    }
  | { type: "image"; key: string; label: string; help?: string; default: string }
  | {
      type: "imageList";
      key: string;
      label: string;
      help?: string;
      default: string[];
    }
  | {
      type: "select";
      key: string;
      label: string;
      help?: string;
      options: { label: string; value: string }[];
      default: string;
    }
  | {
      type: "list";
      key: string;
      label: string;
      help?: string;
      /** shape of each repeating row */
      fields: ItemField[];
      default: Record<string, string>[];
    };

export interface FieldGroup {
  label: string;
  fields: Field[];
}

export interface PageDef {
  /** human label shown in the admin editor */
  label: string;
  /** public URL, so the editor can offer a "view page" link */
  path: string;
  icon?: string;
  groups: FieldGroup[];
}

export type Registry = Record<string, PageDef>;

/** Flat resolved content for one page: key -> value */
export type PageContent = Record<string, unknown>;

/** All pages resolved: pageKey -> flat content */
export type SiteContent = Record<string, PageContent>;
