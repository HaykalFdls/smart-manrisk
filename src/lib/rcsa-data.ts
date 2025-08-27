
export type RCSAData = {
  no: number;
  potensiRisiko: string;
  jenisRisiko: string | null;
  penyebabRisiko: string | null;
  dampakInheren: number | null;
  frekuensiInheren: number | null;
  besaranInheren: number | null; // Ditambahkan
  levelInheren: string | null; // Ditambahkan
  pengendalian: string | null;
  dampakResidual: number | null;
  kemungkinanResidual: number | null;
  penilaianKontrol: string | null;
  actionPlan: string | null;
  pic: string | null;
  keterangan: string | null;
};

// This is our mock database. In a real application, this would be a database call.
let rcsaDataStore: RCSAData[] = [
  {
    no: 1,
    potensiRisiko: 'Terdapat selisih KAS Teller',
    jenisRisiko: 'Risiko Operasional',
    penyebabRisiko: 'Human error',
    dampakInheren: 4,
    frekuensiInheren: 1,
    besaranInheren: 4,
    levelInheren: 'Rendah',
    pengendalian: 'Rekonsiliasi kas harian',
    dampakResidual: 2,
    kemungkinanResidual: 1,
    penilaianKontrol: 'Efektif',
    actionPlan: 'Tingkatkan frekuensi supervisi',
    pic: 'Kepala Teller',
    keterangan: '',
  },
  {
    no: 2,
    potensiRisiko: 'Terdapat pengisian slip oleh nasabah yang tidak dilakukan dengan benar (tidak lengkap, salah alamat, tidak diverifikasi)',
    jenisRisiko: 'Risiko Operasional',
    penyebabRisiko: 'Kurangnya pemahaman nasabah',
    dampakInheren: 3,
    frekuensiInheren: 2,
    besaranInheren: 6,
    levelInheren: 'Menengah',
    pengendalian: 'Verifikasi ulang oleh teller',
    dampakResidual: 2,
    kemungkinanResidual: 2,
    penilaianKontrol: 'Tidak Efektif',
    actionPlan: 'Edukasi nasabah melalui poster',
    pic: 'Kepala Cabang',
    keterangan: '',
  },
  {
    no: 3,
    potensiRisiko: 'Terjadi kelebihan pembayaran yang pada nasabah yang menarik uang cash pada teller',
    jenisRisiko: null,
    penyebabRisiko: null,
    dampakInheren: null,
    frekuensiInheren: null,
    besaranInheren: null,
    levelInheren: null,
    pengendalian: null,
    dampakResidual: null,
    kemungkinanResidual: null,
    penilaianKontrol: 'Cukup Efektif',
    actionPlan: null,
    pic: null,
    keterangan: null,
  },
  {
    no: 4,
    potensiRisiko: 'Terdapat pemalsuan tandatangan dari nasabah terhadap slip dll',
    jenisRisiko: null,
    penyebabRisiko: null,
    dampakInheren: null,
    frekuensiInheren: null,
    besaranInheren: null,
    levelInheren: null,
    pengendalian: null,
    dampakResidual: null,
    kemungkinanResidual: null,
    penilaianKontrol: '#N/A',
    actionPlan: null,
    pic: null,
    keterangan: null,
  },
  {
    no: 5,
    potensiRisiko: 'Terdapat selisih antara uang pada Mesin ATM dengan catatan buku besar kas ATM',
    jenisRisiko: null,
    penyebabRisiko: null,
    dampakInheren: null,
    frekuensiInheren: null,
    besaranInheren: null,
    levelInheren: null,
    pengendalian: null,
    dampakResidual: null,
    kemungkinanResidual: null,
    penilaianKontrol: '#N/A',
    actionPlan: null,
    pic: null,
    keterangan: null,
  },
];


// Function to get the current data
export const getRcsaData = (): RCSAData[] => {
  // Return a copy to prevent direct mutation of the store
  return JSON.parse(JSON.stringify(rcsaDataStore));
};

// Function to update the data
export const updateRcsaData = (newData: RCSAData[]) => {
  rcsaDataStore = newData;
};
