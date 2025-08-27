
'use client';

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
import { FilePlus } from 'lucide-react';

const rcsaData = [
  {
    no: 1,
    unitKerja: 'Teller',
    potensiRisiko: 'Terdapat selisih KAS Teller',
    jenisRisiko: 'Operasional',
    penyebabRisiko: 'Human error',
    dampakInheren: 4,
    frekuensiInheren: 1,
    besaranInheren: 4,
    levelInheren: 'LOW',
    pengendalian: 'Rekonsiliasi kas harian',
    dampakResidual: 2,
    kemungkinanResidual: 1,
    besaranResidual: 2,
    levelResidual: 'LOW',
    penilaianKontrol: 'Efektif',
    prioritas: 24,
    actionPlan: 'Tingkatkan frekuensi supervisi',
    pic: 'Kepala Teller',
    keterangan: '',
  },
  {
    no: 2,
    unitKerja: 'Teller',
    potensiRisiko: 'Terdapat pengisian slip oleh nasabah yang tidak dilakukan dengan benar (tidak lengkap, salah alamat, tidak diverifikasi)',
    jenisRisiko: 'Operasional',
    penyebabRisiko: 'Kurangnya pemahaman nasabah',
    dampakInheren: 3,
    frekuensiInheren: 2,
    besaranInheren: 6,
    levelInheren: 'LOW TO MODERATE',
    pengendalian: 'Verifikasi ulang oleh teller',
    dampakResidual: 2,
    kemungkinanResidual: 2,
    besaranResidual: 4,
    levelResidual: 'LOW',
    penilaianKontrol: 'Tidak Efektif',
    prioritas: 22,
    actionPlan: 'Edukasi nasabah melalui poster',
    pic: 'Kepala Cabang',
    keterangan: '',
  },
  {
    no: 3,
    unitKerja: 'Teller',
    potensiRisiko: 'Terjadi kelebihan pembayaran yang pada nasabah yang menarik uang cash pada teller',
    jenisRisiko: null,
    penyebabRisiko: null,
    dampakInheren: null,
    frekuensiInheren: null,
    besaranInheren: 0,
    levelInheren: '#N/A',
    pengendalian: null,
    dampakResidual: null,
    kemungkinanResidual: null,
    besaranResidual: 0,
    levelResidual: '#N/A',
    penilaianKontrol: 'Cukup Efektif',
    prioritas: '#N/A',
    actionPlan: null,
    pic: null,
    keterangan: null,
  },
    {
    no: 4,
    unitKerja: 'Teller',
    potensiRisiko: 'Terdapat pemalsuan tandatangan dari nasabah terhadap slip dll',
    jenisRisiko: null,
    penyebabRisiko: null,
    dampakInheren: null,
    frekuensiInheren: null,
    besaranInheren: 0,
    levelInheren: '#N/A',
    pengendalian: null,
    dampakResidual: null,
    kemungkinanResidual: null,
    besaranResidual: 0,
    levelResidual: '#N/A',
    penilaianKontrol: '#N/A',
    prioritas: '#N/A',
    actionPlan: null,
    pic: null,
    keterangan: null,
  },
  {
    no: 5,
    unitKerja: 'Teller',
    potensiRisiko: 'Terdapat selisih antara uang pada Mesin ATM dengan catatan buku besar kas ATM',
    jenisRisiko: null,
    penyebabRisiko: null,
    dampakInheren: null,
    frekuensiInheren: null,
    besaranInheren: 0,
    levelInheren: '#N/A',
    pengendalian: null,
    dampakResidual: null,
    kemungkinanResidual: null,
    besaranResidual: 0,
    levelResidual: '#N/A',
    penilaianKontrol: '#N/A',
    prioritas: '#N/A',
    actionPlan: null,
    pic: null,
    keterangan: null,
  },
];

const getLevelBadgeVariant = (level: string) => {
  switch (level) {
    case 'LOW':
      return 'outline';
    case 'LOW TO MODERATE':
      return 'secondary';
    case 'MODERATE':
        return 'secondary';
    case 'HIGH':
      return 'destructive';
    default:
      return 'default';
  }
};

export default function RcsasPage() {
  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Risk Control Self-Assessment (RCSA)</h1>
            <p className="text-muted-foreground">Detailed risk assessment and control analysis.</p>
        </div>
        <Button>
            <FilePlus className="mr-2 h-4 w-4" />
            Add New
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
            <div className="overflow-x-auto">
                <Table className="min-w-max">
                <TableHeader>
                    <TableRow>
                    <TableHead rowSpan={2} className="text-center align-middle border">NO.</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border">UNIT KERJA (ADMIN)</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border">POTENSI RISIKO (ADMIN)</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border">Jenis Risiko (USER DROPDOWN)</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border">PENYEBAB RISIKO (USER)</TableHead>
                    <TableHead colSpan={4} className="text-center align-middle border">RISIKO INHEREN</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border">PENGENDALIAN/MITIGASI RISIKO (USER)</TableHead>
                    <TableHead colSpan={4} className="text-center align-middle border">RISIKO RESIDUAL</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border">Penilaian Tingkat Efektivitas Kontrol</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border">Prioritas</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border">Action Plan/Mitigasi</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border">PIC</TableHead>
                    <TableHead rowSpan={2} className="text-center align-middle border">KETERANGAN</TableHead>
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
                    {rcsaData.map((row) => (
                    <TableRow key={row.no}>
                        <TableCell className="text-center border">{row.no}</TableCell>
                        <TableCell className="border">{row.unitKerja}</TableCell>
                        <TableCell className="border max-w-xs">{row.potensiRisiko}</TableCell>
                        <TableCell className="border">{row.jenisRisiko}</TableCell>
                        <TableCell className="border">{row.penyebabRisiko}</TableCell>
                        <TableCell className="text-center border">{row.dampakInheren}</TableCell>
                        <TableCell className="text-center border">{row.frekuensiInheren}</TableCell>
                        <TableCell className="text-center border">{row.besaranInheren}</TableCell>
                        <TableCell className="text-center border">
                            <Badge variant={getLevelBadgeVariant(row.levelInheren)}>{row.levelInheren}</Badge>
                        </TableCell>
                        <TableCell className="border">{row.pengendalian}</TableCell>
                        <TableCell className="text-center border">{row.dampakResidual}</TableCell>
                        <TableCell className="text-center border">{row.kemungkinanResidual}</TableCell>
                        <TableCell className="text-center border">{row.besaranResidual}</TableCell>
                        <TableCell className="text-center border">
                            <Badge variant={getLevelBadgeVariant(row.levelResidual)}>{row.levelResidual}</Badge>
                        </TableCell>
                        <TableCell className="border">{row.penilaianKontrol}</TableCell>
                        <TableCell className="text-center border">{row.prioritas}</TableCell>
                        <TableCell className="border">{row.actionPlan}</TableCell>
                        <TableCell className="border">{row.pic}</TableCell>
                        <TableCell className="border">{row.keterangan}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
