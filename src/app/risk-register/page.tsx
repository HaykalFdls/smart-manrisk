"use client";

import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { fetchRisks, createRisk, updateRisk, deleteRisk } from "@/lib/api";
import { fetchUsers } from "@/lib/api";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MoreHorizontal, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const riskSchema = z.object({
  'Kategori Risiko/Proses': z.string().min(1, "Kategori Risiko/Proses is required."),
  'Risk Event/Potensi Risiko': z.string().min(1, "Risk Event/Potensi Risiko is required."),
  'Risiko Residual': z.string().min(1, "Risiko Residual is required."),
  'Risk Owner': z.string().min(1, "Risk Owner is required."),
  'Risk Treatment Plan': z.string().min(1, "Risk Treatment Plan is required."),
  'Jenis Risiko': z.string().optional(),
  'Root Cause': z.string().optional(),
  'Lokasi': z.string().optional(),
  'Dampak': z.string().optional(),
  'Deskripsi Risk Treatment Plan': z.string().optional(),
  'Fraud Indicator': z.boolean().default(false),
  'Keterangan': z.string().optional(),
});


export default function RiskRegisterPage() {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRisk, setEditingRisk] = useState<Risk | null>(null);
  const [viewingRisk, setViewingRisk] = useState<Risk | null>(null);
  const [deletingRisk, setDeletingRisk] = useState<Risk | null>(null);

  const userNameMap = Object.fromEntries(users.map(u => [u.id, u.name]));
  const userDivisionMap = Object.fromEntries(users.map(u => [u.id, u.division]));


useEffect(() => {
  const loadData = async () => {
    try {
      const [risksData, usersData] = await Promise.all([
        fetchRisks(),
        fetchUsers()
      ]);
      console.log("Users:", usersData);
      console.log("Risks:", risksData);
      setRisks(risksData);
      setUsers(usersData);
    } catch (err) {
      toast({ title: "Error", description: "Gagal memuat data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
  loadData();
}, []);


  const form = useForm<z.infer<typeof riskSchema>>({
    resolver: zodResolver(riskSchema),
    defaultValues: {
      'Kategori Risiko/Proses': "",
      'Risk Event/Potensi Risiko': "",
      'Risiko Residual': "",
      'Risk Owner': "",
      'Risk Treatment Plan': "",
      'Jenis Risiko': "",
      'Root Cause': "",
      'Lokasi': "",
      'Dampak': "",
      'Deskripsi Risk Treatment Plan': "",
      'Fraud Indicator': false,
      'Keterangan': "",
    },
  });

  const handleDivisionClick = (divisionName: string) => {
    setSelectedDivision(divisionName);
  };

  const handleBackClick = () => {
    setSelectedDivision(null);
  };

  const handleAddNewRisk = () => {
    setEditingRisk(null);
    form.reset();
    setIsFormOpen(true);
  };

  const handleEditRisk = (risk: Risk) => {
    setEditingRisk(risk);
    form.reset(risk);
    setIsFormOpen(true);
  };

  const handleDeleteRisk = (risk: Risk) => {
    setDeletingRisk(risk);
  };

  const confirmDelete = async () => {
    if (deletingRisk) {
      try {
        await deleteRisk(deletingRisk.No);
        setRisks(risks.filter(r => r.No !== deletingRisk.No));
        toast({ title: "Risk Deleted", description: "The risk has been successfully deleted.", variant: "destructive" });
      } catch (err) {
        toast({ title: "Error", description: String(err), variant: "destructive" });
      } finally {
        setDeletingRisk(null);
      }
    }
  };

  
  const handleViewDetails = (risk: Risk) => {
    setViewingRisk(risk);
  };

  async function onSubmit(values: z.infer<typeof riskSchema>) {
    try {
      if (editingRisk) {
        // Update existing risk
        const updated = await updateRisk(editingRisk.No, values);
        setRisks(risks.map(r => r.No === editingRisk.No ? updated : r));
        toast({ title: "Risk Updated", description: "The risk has been successfully updated." });
      } else {
        // Add new risk
        const newRisk = await createRisk({
          kategori_risiko: values['Kategori Risiko/Proses'],
          jenis_risiko: values['Jenis Risiko'],
          skenario_risiko: values['Risk Event/Potensi Risiko'],
          root_cause: values['Root Cause'],
          dampak: values['Dampak'],
          risiko_residual: values['Risiko Residual'],
          pemilik_risiko: parseInt(values['Risk Owner']),
          rencana_penanganan: values['Risk Treatment Plan'],
          deskripsi_rencana_penanganan: values['Deskripsi Risk Treatment Plan'],
          fraud_indicator: values['Fraud Indicator'],
          keterangan: values['Keterangan'],
          divisi: selectedDivision,
        });

        setRisks([...risks, newRisk]);
        toast({ title: "Risk Added", description: "The new risk has been successfully added." });
      }
      console.log("Payload:", {kategori_risiko: values['Kategori Risiko/Proses'],});

      setIsFormOpen(false);
      setEditingRisk(null);
      form.reset();
    } catch (err) {
      toast({ title: "Error", description: String(err), variant: "destructive" });
    }
  }



console.log("userNameMap:", userNameMap);
console.log("userDivisionMap:", userDivisionMap);
console.log("Risks:", risks);
console.log("Users:", users);


  const filteredRisks = selectedDivision
    ? risks.filter(risk => {
        const ownerDivisi = userDivisionMap[risk.pemilik_risiko];
        return ownerDivisi === selectedDivision;
      }) : [];

  
  const divisionTotals = users
  .map(user => {
    const totalRisk = risks.filter(r => r.pemilik_risiko === user.id).length;
    return { name: user.division, total: totalRisk };
  })
  .filter(div => div.total > 0);  
console.log("divisionTotals:", divisionTotals);

  if (!selectedDivision) {
    return (
      <>
        <PageHeader
            title="Operational Risk Register"
            description="Total Risk Event / Potensi Risiko per Divisi">
        </PageHeader>
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Divisi</TableHead>
                        <TableHead className="text-right">Total RE/PR</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {divisionTotals.map((division) => (
                        <TableRow key={division.name} onClick={() => handleDivisionClick(division.name)} className="cursor-pointer">
                        <TableCell className="font-medium">{division.name}</TableCell>
                        <TableCell className="text-right">{division.total}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
        <PageHeader title={selectedDivision} description={`A list of risks for the ${selectedDivision} division.`}>
        <Button variant="outline" onClick={handleBackClick}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
        </Button>
        <Button onClick={handleAddNewRisk}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Risk
        </Button>
        </PageHeader>
        <Card>
        <CardContent className="p-6">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Kategori Risiko</TableHead>
                <TableHead>Jenis Resiko</TableHead>
                <TableHead>Risiko Residual</TableHead>
                <TableHead>Pemilik Risiko</TableHead>
                <TableHead>Rencana Penanganan Risiko</TableHead>
                <TableHead>Fraud</TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredRisks.map((risk) => (
                <TableRow key={risk.No}>
                    <TableCell className="font-medium">{risk.id}</TableCell>
                    <TableCell>{risk.kategori_risiko}</TableCell>
                    <TableCell>{risk.jenis_risiko}</TableCell>
                    <TableCell>
                      <Badge
                          variant={
                          risk.risiko_residual === 'Tinggi' || risk.risiko_residual === 'Sangat Tinggi'
                              ? 'destructive'
                              : risk.risiko_residual === 'Menengah' ? 'warning' : 'success'
                          }
                          className="capitalize">
                          {risk.risiko_residual}
                      </Badge>
                    </TableCell>
<TableCell>
  <div className="flex flex-col">
    <span className="font-medium">{risk.pemilik_nama}</span>
    <Badge variant="outline" className="w-fit mt-1">
      {risk.jabatan}
    </Badge>
  </div>
</TableCell>


                    <TableCell>{risk.rencana_penanganan}</TableCell>
                    <TableCell>
                    {risk['Fraud Indicator'] ? <CheckCircle className="h-5 w-5 text-success" /> : <XCircle className="h-5 w-5 text-destructive" />}
                    </TableCell>
                    <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewDetails(risk)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditRisk(risk)}>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteRisk(risk)} className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
        </Card>

      {/* Add/Edit Risk Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-3xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{editingRisk ? 'Edit Risk' : 'Add New Risk'}</DialogTitle>
            <DialogDescription>
              {editingRisk ? 'Update the details for the existing risk.' : `Fill in the details for the new risk in the ${selectedDivision} division.`}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto pr-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="Kategori Risiko/Proses" render={({ field }) => (<FormItem><FormLabel>Kategori Risiko/Proses</FormLabel><FormControl><Input placeholder="e.g., Pengelolaan sistem bank" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="Risk Event/Potensi Risiko" render={({ field }) => (<FormItem><FormLabel>Risk Event/Potensi Risiko</FormLabel><FormControl><Textarea placeholder="e.g., Serangan siber pada sistem bank" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="Risiko Residual" render={({ field }) => (<FormItem><FormLabel>Risiko Residual</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select one" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Rendah">Rendah</SelectItem><SelectItem value="Menengah">Menengah</SelectItem><SelectItem value="Tinggi">Tinggi</SelectItem><SelectItem value="Sangat Tinggi">Sangat Tinggi</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="Risk Owner" render={({ field }) => (
                <FormItem>
                  <FormLabel>Risk Owner</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Pemilik Risiko" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users.map(user => (
                        <SelectItem key={user.id} value={String(user.id)}>
                          {user.name} - {user.division}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)}/>

                <FormField control={form.control} name="Risk Treatment Plan" render={({ field }) => (<FormItem><FormLabel>Risk Treatment Plan</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select one" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Mitigate">Mitigate</SelectItem><SelectItem value="Accept">Accept</SelectItem><SelectItem value="Transfer">Transfer</SelectItem><SelectItem value="Avoid">Avoid</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="Jenis Risiko" render={({ field }) => (<FormItem><FormLabel>Jenis Risiko</FormLabel><FormControl><Input placeholder="e.g., Risiko teknologi informasi" {...field} /></FormControl><FormMessage /></FormItem>)}/>
                <FormField control={form.control} name="Root Cause" render={({ field }) => (<FormItem><FormLabel>Root Cause</FormLabel><FormControl><Textarea placeholder="e.g., Kurangnya proteksi" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="Lokasi" render={({ field }) => (<FormItem><FormLabel>Lokasi</FormLabel><FormControl><Input placeholder="e.g., Kantor Pusat" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="Dampak" render={({ field }) => (<FormItem><FormLabel>Dampak</FormLabel><FormControl><Textarea placeholder="e.g., Gangguan operasional" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="Deskripsi Risk Treatment Plan" render={({ field }) => (<FormItem><FormLabel>Deskripsi Risk Treatment Plan</FormLabel><FormControl><Textarea placeholder="e.g., Meningkatkan firewall" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="Keterangan" render={({ field }) => (<FormItem><FormLabel>Keterangan</FormLabel><FormControl><Textarea placeholder="e.g., Risiko ini membutuhkan perhatian khusus" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="Fraud Indicator" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"><div className="space-y-0.5"><FormLabel>Fraud Indicator</FormLabel></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>)} />

                <DialogFooter className="sticky bottom-0 bg-background pt-4 -mr-6 px-6 pb-4 border-t">
                  <Button type="button" variant="secondary" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                  <Button type="submit">{editingRisk ? 'Save Changes' : 'Add Risk'}</Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
      
       {/* View Details Dialog */}
      <Dialog open={!!viewingRisk} onOpenChange={(open) => !open && setViewingRisk(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Risk Details</DialogTitle>
            <DialogDescription>
              Viewing details for risk no. {viewingRisk?.No}.
            </DialogDescription>
          </DialogHeader>
          {viewingRisk && (
            <div className="space-y-4 text-sm max-h-[70vh] overflow-y-auto pr-6">
                {Object.entries(viewingRisk).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 gap-2 border-b pb-2">
                    <span className="font-semibold text-muted-foreground">{key}</span>
                    <span className="col-span-2">
                      {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                      </span>
                  </div>
                ))}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingRisk(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingRisk} onOpenChange={(open) => !open && setDeletingRisk(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the risk
              from the register.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingRisk(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
