
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
import { getRcsaData, type RCSAData } from '@/lib/rcsa-data';
import { useMemo } from 'react';

const getLevelFromBesaran = (besaran: number | null | undefined) => {
  if (besaran === null || besaran === undefined) return { label: '-', className: '' };
  if (besaran >= 20) return { label: 'Sangat Tinggi', className: 'bg-red-700 text-white' };
  if (besaran >= 12) return { label: 'Tinggi', className: 'bg-red-500 text-white' };
  if (besaran >= 5) return { label: 'Menengah', className: 'bg-yellow-400 text-black' };
  return { label: 'Rendah', className: 'bg-green-500 text-white' };
};


export default function RcsaReportPage() {
  const data: RCSAData[] = getRcsaData();

  const calculatedData = useMemo(() => {
    return data.map(row => {
      const dampakInheren = row.dampakInheren;
      const frekuensiInheren = row.frekuensiInheren;
      const besaranInheren = (dampakInheren !== null && frekuensiInheren !== null && dampakInheren > 0 && frekuensiInheren > 0)
        ? dampakInheren * frekuensiInheren
        : null;
      const levelInheren = getLevelFromBesaran(besaranInheren).label;

      const dampakResidual = row.dampakResidual;
      const kemungkinanResidual = row.kemungkinanResidual;
      const besaranResidual = (dampakResidual !== null && kemungkinanResidual !== null && dampakResidual > 0 && kemungkinanResidual > 0)
        ? dampakResidual * kemungkinanResidual
        : null;
      const levelResidual = getLevelFromBesaran(besaranResidual).label;
      
      return {
        ...row,
        besaranInheren,
        levelInheren,
        besaranResidual,
        levelResidual
      };
    })
  }, [data]);

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Laporan RCSA Terisi
        </h1>
        <p className="text-muted-foreground">
          Tinjau data RCSA yang telah diisi dan dikirim oleh unit operasional.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-max whitespace-nowrap">
               <TableHeader>
                <TableRow>
                  <TableHead rowSpan={2} className="w-[40px] text-center sticky left-0 bg-card z-10 border-r">No.</TableHead>
                  <TableHead rowSpan={2} className="min-w-[200px] sticky left-12 bg-card z-10 border-r">Unit Kerja</TableHead>
                  <TableHead rowSpan={2} className="min-w-[300px] sticky left-64 bg-card z-10 border-r">Potensi Risiko</TableHead>
                  <TableHead rowSpan={2} className="min-w-[200px] border-r">Jenis Risiko</TableHead>
                  <TableHead rowSpan={2} className="min-w-[250px] border-r">Penyebab Risiko</TableHead>
                  
                  <TableHead colSpan={4} className="text-center border-x bg-blue-50">RISIKO INHEREN</TableHead>
                  
                  <TableHead rowSpan={2} className="min-w-[250px] border-r">Pengendalian/Mitigasi Risiko</TableHead>
                  
                  <TableHead colSpan={4} className="text-center border-x bg-green-50">RISIKO RESIDUAL</TableHead>
                  
                  <TableHead rowSpan={2} className="min-w-[180px] border-r">Penilaian Tingkat Efektivitas Kontrol</TableHead>
                  <TableHead rowSpan={2} className="min-w-[250px] border-r">Action Plan/Mitigasi</TableHead>
                  <TableHead rowSpan={2} className="min-w-[150px] border-r">PIC</TableHead>
                  <TableHead rowSpan={2} className="min-w-[250px]">Keterangan</TableHead>
                </TableRow>
                <TableRow>
                  {/* RISIKO INHEREN */}
                  <TableHead className="w-[80px] text-center border-x bg-blue-50">Dampak</TableHead>
                  <TableHead className="w-[80px] text-center bg-blue-50">Frekuensi</TableHead>
                  <TableHead className="w-[80px] text-center border-x bg-blue-50">Besaran</TableHead>
                  <TableHead className="w-[120px] text-center bg-blue-50">Level</TableHead>
                  {/* RISIKO RESIDUAL */}
                  <TableHead className="w-[80px] text-center border-x bg-green-50">Dampak</TableHead>
                  <TableHead className="w-[110px] text-center bg-green-50">Kemungkinan</TableHead>
                  <TableHead className="w-[80px] text-center border-x bg-green-50">Besaran</TableHead>
                  <TableHead className="w-[120px] text-center bg-green-50">Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calculatedData.map((row) => (
                  <TableRow key={row.no}>
                    <TableCell className="text-center sticky left-0 bg-card z-10 border-r">{row.no}</TableCell>
                    <TableCell className="font-medium sticky left-12 bg-card z-10 border-r">{row.unitKerja}</TableCell>
                    <TableCell className="sticky left-64 bg-card z-10 border-r whitespace-normal">{row.potensiRisiko}</TableCell>
                    
                    <TableCell>{row.jenisRisiko || '-'}</TableCell>
                    <TableCell className="whitespace-normal">{row.penyebabRisiko || '-'}</TableCell>

                    {/* INHEREN */}
                    <TableCell className="text-center">{row.dampakInheren || '-'}</TableCell>
                    <TableCell className="text-center">{row.frekuensiInheren || '-'}</TableCell>
                    <TableCell className="text-center font-bold">{row.besaranInheren || '-'}</TableCell>
                    <TableCell className="text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getLevelFromBesaran(row.besaranInheren).className}`}>
                           {row.levelInheren || '-'}
                        </span>
                    </TableCell>

                    <TableCell className="whitespace-normal">{row.pengendalian || '-'}</TableCell>
                    
                    {/* RESIDUAL */}
                    <TableCell className="text-center">{row.dampakResidual || '-'}</TableCell>
                    <TableCell className="text-center">{row.kemungkinanResidual || '-'}</TableCell>
                     <TableCell className="text-center font-bold">{row.besaranResidual || '-'}</TableCell>
                    <TableCell className="text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getLevelFromBesaran(row.besaranResidual).className}`}>
                           {row.levelResidual || '-'}
                        </span>
                    </TableCell>

                    <TableCell>{row.penilaianKontrol || '-'}</TableCell>
                    <TableCell className="whitespace-normal">{row.actionPlan || '-'}</TableCell>
                    <TableCell>{row.pic || '-'}</TableCell>
                    <TableCell className="whitespace-normal">{row.keterangan || '-'}</TableCell>
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
