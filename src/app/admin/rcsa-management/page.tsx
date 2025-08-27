
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
import { Save, Shield } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export default function RcsaManagementPage() {
  const { toast } = useToast();
  const [data, setData] = useState<RCSAData[]>(getRcsaData());
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (
    index: number,
    field: keyof RCSAData,
    value: string
  ) => {
    const newData = [...data];
    // @ts-ignore
    newData[index][field] = value;
    setData(newData);
  };

  const handleSave = () => {
    setIsSaving(true);
    // In a real app, this would be an API call
    setTimeout(() => {
      updateRcsaData(data);
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
            Ubah pertanyaan potensi risiko yang akan diisi oleh unit operasional.
          </p>
        </div>
        <div className="flex items-center gap-2">
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
                  <TableHead className="min-w-[400px]">
                    Potensi Risiko (Pertanyaan untuk User)
                  </TableHead>
                   <TableHead>Keterangan (Opsional)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={row.no}>
                    <TableCell className="text-center">{row.no}</TableCell>
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

