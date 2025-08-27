
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LogOut,
  SlidersHorizontal,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MenuItem = {
  icon: LucideIcon;
  title: string;
  href?: string;
};

const mainNavItems: MenuItem[] = [
    { icon: SlidersHorizontal, title: 'Manage RCSA', href: '/admin/rcsa' },
];

const footerNavItems: MenuItem[] = [
  { icon: LogOut, title: 'Logout', href: '/login' },
];

const NavItem = ({ item }: { item: MenuItem }) => {
  const { icon: Icon, title, href } = item;
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <SidebarMenuButton asChild isActive={isActive}>
      <Link href={href || '#'}>
        <Icon />
        <span>{title}</span>
      </Link>
    </SidebarMenuButton>
  );
};

export function AdminSidebar() {
  return (
    <Sidebar collapsible="icon">
      <div className="flex h-full flex-col">
        <SidebarHeader className="p-4">
          <Link href="/admin/rcsa" className="flex flex-col items-center gap-2 text-sidebar-foreground">
             <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="h-10 w-auto"
                fill="currentColor"
            >
                <path d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm0 160H40V56h176v144Z" opacity=".2"/>
                <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z" />
                <path d="M172.42 72.83a8 8 0 0 0-10.84 2.83l-56 96a8 8 0 0 0 13.68 8l56-96a8 8 0 0 0-2.84-10.83Z" />
            </svg>
            <span className="text-xl font-semibold">
              SMART
            </span>
            <span className="text-sm font-medium text-sidebar-foreground/70 -mt-1">Admin Panel</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <NavItem item={item} />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            {footerNavItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <NavItem item={item} />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
