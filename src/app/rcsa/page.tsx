
'use client';
import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilePlus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import type { RCSAData } from '@/lib/rcsa-data';
import { getRcsaData, updateRcsaData } from '@/lib/rcsa-data';

const jenisRisikoOptions = [
    "Risiko Kredit",
    "Risiko Pasar",
    "Risiko Likuiditas",
    "Risiko Operasional",
    "Risiko Hukum",
    "Risiko Reputasi",
    "Risiko Stratejik",
    "Risiko Kepatuhan",
    "Risiko Imbal Hasil",
    "Risiko Investasi"
];

const calculateLevel = (besaran: number | null): string => {
    if (besaran === null || isNaN(besaran) || besaran <= 0) return '#N/A';
    if (besaran <= 5) return 'LOW';
    if (besaran <= 10) return 'LOW TO MODERATE';
    if (besaran <= 15) return 'MODERATE';
    if (besaran <= 20) return 'MODERATE TO HIGH';
    return 'HIGH';
}


const getLevelBadgeVariant = (level: string) => {
  switch (level) {
    case 'LOW':
      return 'outline';
    case 'LOW TO MODERATE':
      return 'secondary';
    case 'MODERATE':
        return 'secondary';
    case 'MODERATE TO HIGH':
        return 'destructive';
    case 'HIGH':
      return 'destructive';
    default:
      return 'default';
  }
};

export default function RcsasPage() {
  const [data, setData] = useState<RCSAData[]>([]);

  useEffect(() => {
    setData(getRcsaData());
  }, []);
  
  const handleInputChange = <K extends keyof RCSAData>(index: number, field: K, value: RCSAData[K]) => {
      const newData = [...data];
      newData[index][field] = value;
      setData(newData);
      // Note: In a real app, you'd likely want to save changes back to the source.
      // For this prototype, changes are only kept in the component's state.
  };
  
  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Risk Control Self-Assessment (RCSA)</h1>
            <p className="text-muted-foreground">Detailed risk assessment and control analysis.</p>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
            <div className="overflow-x-auto">
                <Table className="min-w-max">
                <TableHeader>
                    <TableRow>
                    <TableHead rowSpan={2} className="text-center align-middle border">NO.</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border min-w-[300px]">POTENSI RISIKO (ADMIN)</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border min-w-[200px]">Jenis Risiko (USER DROPDOWN)</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border min-w-[250px]">PENYEBAB RISIKO (USER)</TableHead>
                    <TableHead colSpan={4} className="text-center align-middle border">RISIKO INHEREN</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border min-w-[250px]">PENGENDALIAN/MITIGASI RISIKO (USER)</TableHead>
                    <TableHead colSpan={4} className="text-center align-middle border">RISIKO RESIDUAL</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border min-w-[150px]">Penilaian Tingkat Efektivitas Kontrol</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border">Prioritas</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border min-w-[250px]">Action Plan/Mitigasi</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border min-w-[150px]">PIC</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border min-w-[250px]">KETERANGAN</TableHead>
                    </TableRow>
                    <TableRow>
                    <TableHead className="text-center border">DAMPAK</TableHead>
                    <TableHead className="text-center border">FREKUENSI</TableHead>
                    <TableHead className="text-center border">BESARAN</TableHead>
                    <TableHead className="text-center border">LEVEL</TableHead>
                    <TableHead className="text-center border">DAMPAK</TableHead>
                    <TableHead className="text-center border">KEMUNGKINAN</TableHead>
                    <TableHead className="text-center border">BESARAN</TableHead>
                    <TableHead className="text-center border">LEVEL</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, index) => {
                        const besaranInheren = (row.dampakInheren ?? 0) * (row.frekuensiInheren ?? 0);
                        const levelInheren = calculateLevel(besaranInheren);
                        const besaranResidual = (row.dampakResidual ?? 0) * (row.kemungkinanResidual ?? 0);
                        const levelResidual = calculateLevel(besaranResidual);

                        return (
                            <TableRow key={row.no}>
                                <TableCell className="text-center border">{row.no}</TableCell>
                                <TableCell className="border max-w-xs">{row.potensiRisiko}</TableCell>
                                <TableCell className="border">
                                    <Select
                                        value={row.jenisRisiko ?? ""}
                                        onValueChange={(value) => handleInputChange(index, 'jenisRisiko', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Jenis Risiko" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {jenisRisikoOptions.map(option => (
                                                <SelectItem key={option} value={option}>{option}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="border">
                                    <Textarea 
                                        value={row.penyebabRisiko ?? ""}
                                        onChange={(e) => handleInputChange(index, 'penyebabRisiko', e.target.value)}
                                        placeholder="Isi penyebab risiko..."
                                    />
                                </TableCell>
                                <TableCell className="text-center border">
                                    <Input 
                                        type="number"
                                        min="1" max="5"
                                        value={row.dampakInheren ?? ""}
                                        onChange={(e) => handleInputChange(index, 'dampakInheren', parseInt(e.target.value, 10))}
                                        className="text-center"
                                    />
                                </TableCell>
                                <TableCell className="text-center border">
                                    <Input 
                                        type="number" 
                                        min="1" max="5"
                                        value={row.frekuensiInheren ?? ""}
                                        onChange={(e) => handleInputChange(index, 'frekuensiInheren', parseInt(e.target.value, 10))}
                                        className="text-center"
                                    />
                                </TableCell>
                                <TableCell className="text-center border font-bold">{!isNaN(besaranInheren) && besaranInheren > 0 ? besaranInheren : ''}</TableCell>
                                <TableCell className="text-center border">
                                    <Badge variant={getLevelBadgeVariant(levelInheren)}>{levelInheren}</Badge>
                                </TableCell>
                                <TableCell className="border">{row.pengendalian}</TableCell>
                                <TableCell className="text-center border">{row.dampakResidual}</TableCell>
                                <TableCell className="text-center border">{row.kemungkinanResidual}</TableCell>
                                <TableCell className="text-center border">{!isNaN(besaranResidual) && besaranResidual > 0 ? besaranResidual : ''}</TableCell>
                                <TableCell className="text-center border">
                                    <Badge variant={getLevelBadgeVariant(levelResidual)}>{levelResidual}</Badge>
                                </TableCell>
                                <TableCell className="border">{row.penilaianKontrol}</TableCell>
                                <TableCell className="text-center border">{/* Prioritas */}</TableCell>
                                <TableCell className="border">{row.actionPlan}</TableCell>
                                <TableCell className="border">{row.pic}</TableCell>
                                <TableCell className="border">{row.keterangan}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
