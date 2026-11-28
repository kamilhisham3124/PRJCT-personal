export interface NavLinkItem {
  href: string;
  label: string;
  isExternal: boolean;
}

export const MAIN_NAV_ITEMS: readonly NavLinkItem[] = [
  { href: "/work", label: "Work", isExternal: false },
  { href: "/about", label: "About", isExternal: false },
  { href: "/lab", label: "Lab", isExternal: false },
  { href: "/contact", label: "Contact", isExternal: false },
];

export const QUICK_DRAWER_NAV_ITEMS: readonly NavLinkItem[] = [
  { href: "/work", label: "Selected Case Studies", isExternal: false },
  { href: "/lab", label: "Component Lab & Telemetry", isExternal: false },
  { href: "/about", label: "Engineering Experience", isExternal: false },
  { href: "/contact", label: "Direct Inquiry Form", isExternal: false },
];

export const QUICK_DRAWER_TRIGGER_META = {
  label: "Quick Reference: Overview & Contact",
  isExternal: false,
} as const;

export const CONTACT_CTA_ITEM: NavLinkItem = {
  href: "/contact",
  label: "Get in touch",
  isExternal: false,
};
