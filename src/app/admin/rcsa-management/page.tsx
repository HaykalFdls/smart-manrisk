
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
import { Button } from '@/components/ui/button';
import { getRcsaData, updateRcsaData, type RCSAData } from '@/lib/rcsa-data';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Save, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

type RCSAAdminData = Pick<RCSAData, 'no' | 'unitKerja' | 'potensiRisiko' | 'keterangan'>;

export default function RcsaManagementPage() {
  const { toast } = useToast();
  const [data, setData] = useState<RCSAAdminData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const allData = getRcsaData();
    const adminViewData = allData.map(({ no, unitKerja, potensiRisiko, keterangan }) => ({ no, unitKerja, potensiRisiko, keterangan }));
    setData(adminViewData);
    setIsLoading(false);
  }, []);

  const handleInputChange = (
    index: number,
    field: keyof Omit<RCSAAdminData, 'no'>,
    value: string
  ) => {
    const newData = [...data];
    // @ts-ignore
    newData[index][field] = value;
    setData(newData);
  };
  
  const handleAddNew = () => {
    const newRisk: RCSAAdminData = {
        no: data.length > 0 ? Math.max(...data.map(d => d.no)) + 1 : 1,
        unitKerja: '',
        potensiRisiko: '',
        keterangan: '',
    };
    setData([...data, newRisk]);
  };

  const handleDelete = (indexToDelete: number) => {
    setData(prevData => prevData.filter((_, index) => index !== indexToDelete));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate async operation
    setTimeout(() => {
      const existingData = getRcsaData();
      
      const updatedNos = new Set(data.map(d => d.no));
      const removedData = existingData.filter(d => !updatedNos.has(d.no));

      const finalData = data.map((adminRow, index) => {
          const existingRow = existingData.find(d => d.no === adminRow.no) || {};
          return {
              ...existingRow,
              ...adminRow,
          };
      }) as RCSAData[];

      const finalDataWithoutRemoved = finalData.filter(d => updatedNos.has(d.no))
         .map((d, index) => ({...d, no: index + 1}));


      updateRcsaData(finalDataWithoutRemoved);
      
      setData(finalDataWithoutRemoved.map(({ no, unitKerja, potensiRisiko, keterangan }) => ({ no, unitKerja, potensiRisiko, keterangan })));

      toast({
        title: 'Sukses!',
        description: 'Data master RCSA berhasil diperbarui.',
      });
      setIsSaving(false);
    }, 1000);
  };

  if (isLoading) {
    return <div className="p-8">Memuat data...</div>;
  }

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
