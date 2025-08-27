
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Cpu, Landmark, Gavel, Users, ClipboardList, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const divisionData: { division: string; total: number; Icon: LucideIcon; description: string }[] = [
  {
    division: 'Teknologi Informasi',
    total: 500,
    Icon: Cpu,
    description: 'Risiko terkait infrastruktur, sistem, dan keamanan siber.',
  },
  {
    division: 'Pengendalian Keuangan',
    total: 350,
    Icon: Landmark,
    description: 'Risiko terkait pasar, kredit, dan pelaporan keuangan.',
  },
  {
    division: 'Kepatuhan',
    total: 280,
    Icon: Gavel,
    description: 'Risiko terkait regulasi, hukum, dan kebijakan internal.',
  },
  {
    division: 'Sumber Daya Insani',
    total: 320,
    Icon: Users,
    description: 'Risiko terkait personil, talenta, dan budaya kerja.',
  },
  {
    division: 'Operasional',
    total: 970,
    Icon: ClipboardList,
    description: 'Risiko terkait proses internal, kegagalan sistem, dan eksternal.',
  },
];

export default function RiskRegisterPage() {
  const router = useRouter();

  const handleDivisionClick = (division: string) => {
    // Later, this can navigate to a detailed page, e.g.:
    // router.push(`/risk-register/${encodeURIComponent(division)}`);
    alert(`Menampilkan detail untuk divisi: ${division}`);
  };

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Risk Register</h1>
        <p className="text-muted-foreground">Pilih divisi untuk melihat detail risiko operasional.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {divisionData.map(({ division, total, Icon, description }) => (
          <Card
            key={division}
            className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
            onClick={() => handleDivisionClick(division)}
          >
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                    <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                    <CardTitle>{division}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-bold">{total}</div>
                <p className="text-xs text-muted-foreground">Total Risk Event / Potensi Risiko</p>
            </CardContent>
            <CardFooter className="flex items-center justify-end text-sm font-medium text-primary hover:underline">
                <span>Lihat Detail</span>
                <ArrowRight className="ml-2 h-4 w-4" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
