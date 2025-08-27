
'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getRcsaData, updateRcsaData, type RCSAData } from '@/lib/rcsa-data';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Save, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export default function RcsaManagementPage() {
  const { toast } = useToast();
  // We only manage a subset of fields here
  const [data, setData] = useState<Pick<RCSAData, 'no' | 'unitKerja' | 'potensiRisiko' | 'keterangan'>[]>(
    getRcsaData().map(({ no, unitKerja, potensiRisiko, keterangan }) => ({ no, unitKerja, potensiRisiko, keterangan }))
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (
    index: number,
    field: keyof Pick<RCSAData, 'unitKerja' | 'potensiRisiko' | 'keterangan'>,
    value: string
  ) => {
    const newData = [...data];
    // @ts-ignore
    newData[index][field] = value;
    setData(newData);
  };
  
  const handleAddNew = () => {
    const newRisk = {
        no: data.length > 0 ? Math.max(...data.map(d => d.no)) + 1 : 1,
        unitKerja: '',
        potensiRisiko: '',
        keterangan: '',
    };
    setData([...data, newRisk]);
  };

  const handleDelete = (indexToDelete: number) => {
    const newData = data.filter((_, index) => index !== indexToDelete);
    setData(newData);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      const existingData = getRcsaData();
      
      const finalData = data.map((adminRow, index) => {
          const existingRow = existingData.find(d => d.no === adminRow.no) || {};
          return {
              ...existingRow,
              ...adminRow,
              no: index + 1, // Re-number to keep sequence
          };
      }) as RCSAData[];


      updateRcsaData(finalData);
      // Update local state with re-numbered data to stay in sync
      setData(finalData.map(({ no, unitKerja, potensiRisiko, keterangan }) => ({ no, unitKerja, potensiRisiko, keterangan })));

      toast({
        title: 'Sukses!',
        description: 'Data master RCSA berhasil diperbarui.',
      });
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Kelola Master RCSA
          </h1>
          <p className="text-muted-foreground">
            Tambah, ubah, atau hapus data master yang akan diisi oleh unit operasional.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Baris
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px] text-center">No.</TableHead>
                  <TableHead className="min-w-[200px]">Unit Kerja</TableHead>
                  <TableHead className="min-w-[400px]">
                    Potensi Risiko (Pertanyaan untuk User)
                  </TableHead>
                   <TableHead className="min-w-[300px]">Keterangan (Opsional)</TableHead>
                   <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={row.no}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                     <TableCell>
                      <Input
                        value={row.unitKerja || ''}
                        onChange={(e) =>
                          handleInputChange(index, 'unitKerja', e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={row.potensiRisiko}
                        onChange={(e) =>
                          handleInputChange(index, 'potensiRisiko', e.target.value)
                        }
                        className="min-h-[60px]"
                      />
                    </TableCell>
                     <TableCell>
                      <Textarea
                        value={row.keterangan || ''}
                        onChange={(e) =>
                          handleInputChange(index, 'keterangan', e.target.value)
                        }
                         className="min-h-[60px]"
                      />
                    </TableCell>
                    <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(index)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    </TableCell>
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
