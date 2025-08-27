
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
      { name: 'Tingkat Kesehatan Bank (TKB)', href: '#' },
      { name: 'Profil Risiko Bankwide', href: '#' },
      { name: 'ICAAP', href: '#' },
      { name: 'RAS', href: '#' },
      { name: 'KRI', href: '#' },
      { name: 'EWS', href: '#' },
      { name: 'Profil Risiko Cabang', href: '#' },
      { name: 'RMI', href: '#' },
      { name: 'ICoFR', href: '#' },
      { name: 'KMR', href: '#' },
      { name: 'Risk Register', href: '/risk-register' },
    ],
  },
  {
    icon: Landmark,
    title: 'Credit & Investment Risk',
    submenu: [
      { name: 'Dashboard & Report', href: '#' },
      { name: 'Root Cause of Credit Risk (RCCR)', href: '#' },
      { name: 'Portofolio Guideline', href: '#' },
      { name: 'Financing at Risk (FAR)', href: '#' },
      { name: 'First Payment Default (FPD)', href: '#' },
      { name: 'Risk Profile & Risk Limit', href: '#' },
      { name: 'Vintage Analysis', href: '#' },
      { name: 'Stress Test Kredit & Permodalan', href: '#' },
      { name: 'ATMR Risiko Kredit', href: '#' },
    ],
  },
  {
    icon: Waves,
    title: 'Liquidity & Market Risk',
    submenu: [
      { name: 'Dashboard & Report', href: '#' },
      { name: 'LCR', href: '#' },
      { name: 'Risk Profile & Risk Limit', href: '#' },
      { name: 'NSFR', href: '#' },
      { name: 'Stress Test Likuiditas dan Pasar', href: '#' },
      { name: 'ATMR Risiko Pasar', href: '#' },
      { name: 'IRRBB', href: '#' },
    ],
  },
  {
    icon: ShieldAlert,
    title: 'Operational Risk',
    submenu: [
      { name: 'Dashboard & Report', href: '#' },
      { name: 'Risk Control Self-Assessment (RCSA)', href: '#' },
      { name: 'Loss Event Database (LED)', href: '#' },
      { name: 'ATMR Risiko Operasional', href: '#' },
      { name: 'Risk Profile & Risk Limit', href: '#' },
      { name: 'Risk Self-Assessment (RSA)', href: '#' },
      { name: 'Stress Test Operasional', href: '#' },
    ],
  },
  {
    icon: ServerCog,
    title: 'IT Risk Management',
    submenu: [
      { name: 'Dashboard & Report', href: '#' },
      { name: 'Profil Risiko Ketahanan & Keamanan Siber', href: '#' },
      { name: 'Tingkat Maturitas Digital Bank', href: '#' },
      { name: 'CSIRT', href: '#' },
      { name: 'Risk Profile & Risk Limit', href: '#' },
    ],
  },
  {
    icon: ShieldCheck,
    title: 'BCMS',
    submenu: [
      { name: 'Dashboard & report', href: '#' },
      { name: 'Business Impact Analysis', href: '#' },
      { name: 'Risk & Threat Assessment', href: '#' },
      { name: 'Business Continuity Plan (BCP)', href: '#' },
      { name: 'Disaster Recovery Plan (DRP)', href: '#' },
      { name: 'Recovery & Resolution Plan', href: '#' },
    ],
  },
  { icon: FileText, title: 'Regulation Update', href: '#' },
  { icon: Gavel, title: 'Governance & Compliance', href: '#' },
];

const footerNavItems: MenuItem[] = [
  { icon: Settings, title: 'Settings', href: '#' },
  { icon: LogOut, title: 'Logout', href: '#' },
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
  const isAnySubmenuActive = submenu.some(item => item.href === pathname);
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
              viewBox="0 0 108 32"
              className="h-8 w-auto"
              fill="currentColor"
            >
              <path d="M60.3,13.4c-2.4-0.8-4.2-1.5-4.2-2.6c0-1,0.8-1.7,2.1-1.7c2,0,3.3,1.1,3.4,2.8h4.9c-0.2-3.8-3-6.4-8.2-6.4c-5.1,0-8.5,2.7-8.5,6.3c0,2.9,2.4,4.5,5.8,5.7c2.7,0.9,3.9,1.6,3.9,2.7c0,1.4-1.4,1.9-2.7,1.9c-2,0-3.9-1.1-4.1-3.2h-5c0.2,4.4,3.6,7,9.1,7c5.8,0,9-2.6,9-6.5C70.6,16.1,65.2,14.9,60.3,13.4z M83.2,21.9c1.4,1,2,1.8,2,2.8c0,1.2-1,1.9-2.1,1.9c-1.6,0-2.8-1-2.9-2.4h-4.9c0.2,3.7,3.2,6,8,6c4.6,0,7.8-2.3,7.8-5.7c0-2.9-2.1-4.6-5.2-6.2c-2.2-1.2-4.4-2.4-4.4-4.2c0-1.5,1.2-2.6,3.2-2.6c2.4,0,3.8,1.4,4,3.2h4.9c-0.2-4.1-3.4-6.8-8.9-6.8c-5.1,0-8.3,2.5-8.3,6.2c0,2.4,1.6,4.2,4.6,5.8C80.2,20,82.1,21,83.2,21.9z M95.9,26.2V10.1h5v16.1H95.9z M45.8,26.2V10.1h5v16.1H45.8z M35.9,26.2V5.7h-5v20.5H35.9z M26.1,26.2V10.1h5v16.1H26.1z M11.1,26.2V10.1h5v16.1H11.1z M0.9,26.2V10.1h5v16.1H0.9z M39.9,22c1.4,0.9,2.4,1.8,2.4,3.1c0,1.6-1.5,2.6-3.1,2.6c-2.3,0-4-1.8-4.2-3.6H30c0.3,4.9,4.2,8.2,9.2,8.2c5.4,0,8.8-3.1,8.8-7.5c0-3.8-2.6-6.1-6.5-8.2c-2.9-1.6-5.8-3.2-5.8-5.6c0-2,1.6-3.5,4.2-3.5c3.2,0,5.1,1.9,5.3,4.3h5c-0.3-5.5-4.5-9.1-10.3-9.1c-6.8,0-11,3.4-11,8.2c0,3.2,2.1,5.6,6.1,7.7C36.6,20.2,38.8,21.2,39.9,22z M107.8,19.3c0,4.3-3.1,7.4-7.4,7.4c-4.3,0-7.4-3.1-7.4-7.4c0-4.3,3.1-7.4,7.4-7.4C104.7,11.9,107.8,15,107.8,19.3z M102.9,19.3c0-1.9-1.4-3.3-2.5-3.3s-2.5,1.4-2.5,3.3s1.4,3.3,2.5,3.3S102.9,21.2,102.9,19.3z M22.9,13.6c-1,0.6-1.4,1.2-1.4,1.8c0,0.8,0.7,1.2,1.4,1.2c1.1,0,1.9-0.7,2-1.6h2.7c-0.1,2.5-1.9,4-4.6,4c-2.8,0-4.6-1.5-4.6-3.7c0-1.9,1.4-3,3.3-4.1c1.5-0.8,2.2-1.2,2.2-1.8c0-0.8-0.8-1.3-1.6-1.3c-1.2,0-2.2,0.7-2.3,1.9h-2.7c0.1-2.6,2-4.5,5-4.5c3.1,0,4.8,1.6,4.8,3.9c0,1.8-1.1,2.9-3.3,4.1L22.9,13.6z M107.8,19.3c0,4.3-3.1,7.4-7.4,7.4c-4.3,0-7.4-3.1-7.4-7.4c0-4.3,3.1-7.4,7.4-7.4C104.7,11.9,107.8,15,107.8,19.3z M102.9,19.3c0-1.9-1.4-3.3-2.5-3.3s-2.5,1.4-2.5,3.3s1.4,3.3,2.5,3.3S102.9,21.2,102.9,19.3z M22.9,13.6c-1,0.6-1.4,1.2-1.4,1.8c0,0.8,0.7,1.2,1.4,1.2c1.1,0,1.9-0.7,2-1.6h2.7c-0.1,2.5-1.9,4-4.6,4c-2.8,0-4.6-1.5-4.6-3.7c0-1.9,1.4-3,3.3-4.1c1.5-0.8,2.2-1.2,2.2-1.8c0-0.8-0.8-1.3-1.6-1.3c-1.2,0-2.2,0.7-2.3,1.9h-2.7c0.1-2.6,2-4.5,5-4.5c3.1,0,4.8,1.6,4.8,3.9C26.5,12,25.4,13,22.9,13.6z M8.4,5.7H3.5v20.5h4.9V5.7z M89.4,5.7h-4.9v20.5h4.9V5.7z M74.8,5.7h-4.9v20.5h4.9V5.7z"/>
              <path d="M21.2,0.2c-2-0.2-3.7,1.3-4,3.3c-0.3,1.9,1,3.8,2.9,4.2c1.9,0.3,3.8-1,4.2-2.9c0.3-1.9-1-3.8-2.9-4.2C21.4,0.5,21.3,0.5,21.2,0.5C21.3,0.3,21.3,0.3,21.2,0.2z"/>
              <path d="M43.2,0.2c-2-0.2-3.7,1.3-4,3.3c-0.3,1.9,1,3.8,2.9,4.2c1.9,0.3,3.8-1,4.2-2.9c0.3-1.9-1-3.8-2.9-4.2C43.4,0.5,43.3,0.5,43.2,0.5C43.3,0.3,43.3,0.3,43.2,0.2z"/>
              <path d="M32.2,0.2c-2-0.2-3.7,1.3-4,3.3c-0.3,1.9,1,3.8,2.9,4.2c1.9,0.3,3.8-1,4.2-2.9c0.3-1.9-1-3.8-2.9-4.2C32.4,0.5,32.3,0.5,32.2,0.5C32.3,0.3,32.3,0.3,32.2,0.2z"/>
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
