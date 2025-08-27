
'use client';
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  LayoutDashboard,
  GitMerge,
  Landmark,
  Waves,
  ShieldAlert,
  ServerCog,
  ShieldCheck,
  FileText,
  Gavel,
  ChevronDown,
  Settings,
  LogOut,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SubMenuItem = {
  name: string;
  href: string;
};

type MenuItem = {
  icon: LucideIcon;
  title: string;
  href?: string;
  submenu?: SubMenuItem[];
};

const mainNavItems: MenuItem[] = [
  { icon: LayoutDashboard, title: 'Dashboard', href: '/' },
  {
    icon: GitMerge,
    title: 'Risk Integration',
    submenu: [
      { name: 'Dashboard & Report', href: '#' },
      { name: 'Risk Register', href: '/risk-register' },
    ],
  },
  {
    icon: Landmark,
    title: 'Credit & Investment Risk',
    submenu: [
      { name: 'Dashboard & Report', href: '#' },
    ],
  },
  {
    icon: Waves,
    title: 'Liquidity & Market Risk',
    submenu: [
      { name: 'Dashboard & Report', href: '#' },
    ],
  },
  {
    icon: ShieldAlert,
    title: 'Operational Risk',
    submenu: [
      { name: 'Dashboard & Report', href: '#' },
      { name: 'Risk Control Self-Assessment (RCSA)', href: '/rcsa' },
    ],
  },
  {
    icon: ServerCog,
    title: 'IT Risk Management',
    submenu: [
      { name: 'Dashboard & Report', href: '#' },
    ],
  },
  {
    icon: ShieldCheck,
    title: 'BCMS',
    submenu: [
      { name: 'Dashboard & report', href: '#' },
    ],
  },
  { icon: FileText, title: 'Regulation Update', href: '#' },
  { icon: Gavel, title: 'Governance & Compliance', href: '#' },
];

const footerNavItems: MenuItem[] = [
  { icon: Settings, title: 'Settings', href: '#' },
];

const NavItemWithSubmenu = ({
  icon: Icon,
  title,
  submenu,
}: {
  icon: LucideIcon;
  title: string;
  submenu: SubMenuItem[];
}) => {
  const pathname = usePathname();
  const isAnySubmenuActive = submenu.some(item => pathname.startsWith(item.href) && item.href !== '#');
  const [isOpen, setIsOpen] = useState(isAnySubmenuActive);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton className="justify-between w-full" isActive={isAnySubmenuActive}>
          <div className="flex items-center gap-2">
            <Icon />
            <span>{title}</span>
          </div>
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {submenu.map((item) => (
            <SidebarMenuSubItem key={item.name}>
              <SidebarMenuSubButton asChild isActive={pathname === item.href}>
                <Link href={item.href} className="whitespace-normal h-auto">{item.name}</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
};

const NavItem = ({ item }: { item: MenuItem }) => {
  const { icon: Icon, title, submenu, href } = item;
  const pathname = usePathname();
  const isActive = href === pathname;

  if (submenu) {
    return <NavItemWithSubmenu icon={Icon} title={title} submenu={submenu} />;
  }

  return (
    <SidebarMenuButton asChild isActive={isActive}>
      <Link href={href || '#'}>
        <Icon />
        <span>{title}</span>
      </Link>
    </SidebarMenuButton>
  );
};

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <div className="flex h-full flex-col">
        <SidebarHeader className="p-4">
          <Link href="/" className="flex flex-col items-center gap-2 text-sidebar-foreground">
             <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="h-10 w-auto"
                fill="currentColor"
            >
                <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z" />
                <path d="M172.42 72.83a8 8 0 0 0-10.84 2.83l-56 96a8 8 0 0 0 13.68 8l56-96a8 8 0 0 0-2.84-10.83Z" />
            </svg>
            <span className="text-xl font-semibold">
              SMART
            </span>
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
