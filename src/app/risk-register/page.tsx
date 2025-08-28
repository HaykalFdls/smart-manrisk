
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Cpu, Landmark, Gavel, Users, ClipboardList, ArrowRight, Shield, Building, BarChart, AreaChart, DollarSign, Briefcase, FileText, Scale, Handshake, Search, Lightbulb, UserCheck, FolderGit2, Coins } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const divisionData: { division: string; total: number; Icon: LucideIcon; description: string }[] = [
  {
    division: 'Divisi Audit Internal',
    total: 2,
    Icon: Search,
    description: 'Risiko terkait audit dan pengawasan internal.',
  },
  {
    division: 'Divisi Sumber Daya Insani (SDI)',
    total: 1,
    Icon: Users,
    description: 'Risiko terkait personil, talenta, dan budaya kerja.',
  },
  {
    division: 'Divisi Perencanaan Strategis',
    total: 1,
    Icon: Lightbulb,
    description: 'Risiko terkait perencanaan dan strategi jangka panjang.',
  },
  {
    division: 'Divisi Penyelamatan & Penyelesaian Pembiayaan (P3)',
    total: 1,
    Icon: Handshake,
    description: 'Risiko terkait penyelamatan dan penyelesaian kredit.',
  },
  {
    division: 'Divisi Pembiayaan Konsumer',
    total: 1,
    Icon: UserCheck,
    description: 'Risiko pada produk pembiayaan untuk konsumen.',
  },
  {
    division: 'Divisi Dana Jasa Ritel',
    total: 0,
    Icon: Coins,
    description: 'Risiko terkait pengelolaan dana dan jasa di segmen ritel.',
  },
  {
    division: 'Divisi Dana Korporasi dan Institusi (Insbank)',
    total: 0,
    Icon: Landmark,
    description: 'Risiko terkait pendanaan dari korporasi dan institusi.',
  },
  {
    division: 'Divisi Kepatuhan',
    total: 1,
    Icon: Gavel,
    description: 'Risiko terkait regulasi, hukum, dan kebijakan internal.',
  },
  {
    division: 'Divisi Teknologi Informasi',
    total: 3,
    Icon: Cpu,
    description: 'Risiko terkait infrastruktur, sistem, dan keamanan siber.',
  },
  {
    division: 'Divisi Operasional',
    total: 2,
    Icon: ClipboardList,
    description: 'Risiko terkait proses internal, kegagalan sistem, dan eksternal.',
  },
  {
    division: 'Divisi Pengendalian Keuangan',
    total: 2,
    Icon: AreaChart,
    description: 'Risiko terkait pasar, kredit, dan pelaporan keuangan.',
  },
  {
    division: 'Divisi Risiko Pembiayaan',
    total: 0,
    Icon: DollarSign,
    description: 'Analisis dan mitigasi risiko dari seluruh aktivitas pembiayaan.',
  },
  {
    division: 'Divisi Pembiayaan UMKM, Ritel, & Komersil',
    total: 0,
    Icon: Briefcase,
    description: 'Risiko dari pembiayaan untuk segmen UMKM, ritel, dan komersil.',
  },
  {
    division: 'Divisi Manajemen Risiko',
    total: 0,
    Icon: Shield,
    description: 'Pengelolaan kerangka kerja manajemen risiko secara keseluruhan.',
  },
  {
    division: 'Divisi Bisnis Digital',
    total: 1,
    Icon: FolderGit2,
    description: 'Risiko terkait inovasi dan operasional produk digital.',
  },
  {
    division: 'Desk Sekretariat Perusahaan (Corsec)',
    total: 0,
    Icon: Building,
    description: 'Risiko terkait komunikasi dan administrasi perusahaan.',
  },
  {
    division: 'Desk Pengembangan Produk & Prosedur (Sysdur)',
    total: 0,
    Icon: BarChart,
    description: 'Risiko dalam pengembangan produk dan penyusunan prosedur.',
  },
  {
    division: 'Desk Administrasi Pembiayaan & Bisnis Legal (APBL)',
    total: 0,
    Icon: FileText,
    description: 'Risiko terkait administrasi dan aspek legal pembiayaan.',
  },
  {
    division: 'Desk Legal',
    total: 0,
    Icon: Scale,
    description: 'Risiko hukum yang dihadapi oleh perusahaan.',
  },
  {
    division: 'Desk Treasury',
    total: 0,
    Icon: DollarSign,
    description: 'Risiko terkait pengelolaan likuiditas dan investasi keuangan.',
  },
];

export default function RiskRegisterPage() {
  const router = useRouter();

  const handleDivisionClick = (division: string) => {
    router.push(`/risk-register/${encodeURIComponent(division)}`);
  };

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Risk Register</h1>
        <p className="text-muted-foreground">Pilih divisi untuk melihat detail risiko operasional.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Kantor Pusat</CardTitle>
          <CardDescription>Daftar divisi dan unit kerja di bawah kantor pusat.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {divisionData.map(({ division, total, Icon, description }, index) => (
              <div key={division}>
                <div
                  className="flex items-center gap-4 rounded-lg p-3 cursor-pointer transition-colors hover:bg-accent"
                  onClick={() => handleDivisionClick(division)}
                >
                  <div className="rounded-lg bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{division.replace(/Divisi|Desk/g, '').trim()}</p>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-lg">{total}</p>
                      <p className="text-xs text-muted-foreground">Risiko</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                {index < divisionData.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
