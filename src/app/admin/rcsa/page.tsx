
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
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { FilePlus, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { getRcsaData, updateRcsaData, type RCSAData } from '@/lib/rcsa-data';

export default function AdminRcsasPage() {
  const [data, setData] = useState<RCSAData[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<RCSAData | null>(null);
  const [itemToDelete, setItemToDelete] = useState<RCSAData | null>(null);
  const [newRiskText, setNewRiskText] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setData(getRcsaData());
  }, []);

  const saveChanges = (newData: RCSAData[]) => {
    updateRcsaData(newData);
    setData(newData);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setNewRiskText('');
    setModalOpen(true);
  };

  const handleEdit = (item: RCSAData) => {
    setEditingItem(item);
    setNewRiskText(item.potensiRisiko);
    setModalOpen(true);
  };

  const handleDelete = (item: RCSAData) => {
    setItemToDelete(item);
    setAlertOpen(true);
  };
  
  const confirmDelete = () => {
    if (!itemToDelete) return;
    const newData = data.filter((item) => item.no !== itemToDelete.no);
    saveChanges(newData);
    toast({ title: 'Sukses!', description: 'Item berhasil dihapus.' });
    setAlertOpen(false);
    setItemToDelete(null);
  };

  const handleSave = () => {
    if (!newRiskText.trim()) {
      toast({ variant: 'destructive', title: 'Error!', description: 'Potensi risiko tidak boleh kosong.' });
      return;
    }
    
    let newData;
    if (editingItem) {
      // Edit existing item
      newData = data.map((item) =>
        item.no === editingItem.no ? { ...item, potensiRisiko: newRiskText } : item
      );
    } else {
      // Add new item
      const newId = data.length > 0 ? Math.max(...data.map(item => item.no)) + 1 : 1;
      const newItem: RCSAData = {
          no: newId,
          potensiRisiko: newRiskText,
          jenisRisiko: null,
          penyebabRisiko: null,
          dampakInheren: null,
          frekuensiInheren: null,
          pengendalian: null,
          dampakResidual: null,
          kemungkinanResidual: null,
          penilaianKontrol: null,
          actionPlan: null,
          pic: null,
          keterangan: null,
      };
      newData = [...data, newItem];
    }
    
    saveChanges(newData);
    toast({ title: 'Sukses!', description: `Item berhasil ${editingItem ? 'diperbarui' : 'ditambahkan'}.` });
    setModalOpen(false);
    setEditingItem(null);
    setNewRiskText('');
  };

  return (
    <>
      <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage RCSA Risks</h1>
            <p className="text-muted-foreground">Add, edit, or delete risk potentials for the RCSA form.</p>
          </div>
          <Button onClick={handleAddNew}>
            <FilePlus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">No.</TableHead>
                  <TableHead>Potensi Risiko</TableHead>
                  <TableHead className="w-[120px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.no}>
                    <TableCell className="font-medium">{item.no}</TableCell>
                    <TableCell>{item.potensiRisiko}</TableCell>
                    <TableCell className="text-right">
                       <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                          <Edit className="h-4 w-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(item)}>
                          <Trash2 className="h-4 w-4" />
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Potensi Risiko' : 'Add New Potensi Risiko'}</DialogTitle>
            <DialogDescription>
              {editingItem ? 'Ubah teks potensi risiko di bawah ini.' : 'Masukkan teks untuk potensi risiko yang baru.'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
             <Input 
                value={newRiskText}
                onChange={(e) => setNewRiskText(e.target.value)}
                placeholder="Contoh: Terdapat selisih KAS Teller"
            />
          </div>
          <DialogFooter>
             <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
       <AlertDialog open={isAlertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the item: "{itemToDelete?.potensiRisiko}"
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
