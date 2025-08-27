
'use client';

export type RCSAData = {
  no: number;
  unitKerja: string;
  potensiRisiko: string;
  
  // User Inputs
  jenisRisiko: string | null;
  penyebabRisiko: string | null;
  
  // Inherent Risk
  dampakInheren: number | null;
  frekuensiInheren: number | null;
  
  // Control
  pengendalian: string | null;

  // Residual Risk
  dampakResidual: number | null;
  kemungkinanResidual: number | null;

  // Assessment & Action
  penilaianKontrol: string | null;
  actionPlan: string | null;
  pic: string | null;

  // Admin field
  keterangan: string | null;

  // Calculated fields (will be added dynamically on the client)
  besaranInheren?: number | null;
  levelInheren?: string | null;
  besaranResidual?: number | null;
  levelResidual?: string | null;
};

const initialData: RCSAData[] = [
  {
    no: 1,
    unitKerja: 'Teller',
    potensiRisiko: 'Terdapat selisih KAS Teller',
    jenisRisiko: 'Risiko Operasional',
    penyebabRisiko: 'Human error',
    dampakInheren: 4,
    frekuensiInheren: 1,
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
    unitKerja: 'Teller',
    potensiRisiko: 'Terdapat pengisian slip oleh nasabah yang tidak dilakukan dengan benar (tidak lengkap, salah alamat, tidak diverifikasi)',
    jenisRisiko: 'Risiko Operasional',
    penyebabRisiko: 'Kurangnya pemahaman nasabah',
    dampakInheren: 3,
    frekuensiInheren: 2,
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
    unitKerja: 'Operasional',
    potensiRisiko: 'Terjadi kelebihan pembayaran yang pada nasabah yang menarik uang cash pada teller',
    jenisRisiko: null,
    penyebabRisiko: null,
    dampakInheren: null,
    frekuensiInheren: null,
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
    unitKerja: 'Layanan Nasabah',
    potensiRisiko: 'Terdapat pemalsuan tandatangan dari nasabah terhadap slip dll',
    jenisRisiko: null,
    penyebabRisiko: null,
    dampakInheren: null,
    frekuensiInheren: null,
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
    unitKerja: 'ATM',
    potensiRisiko: 'Terdapat selisih antara uang pada Mesin ATM dengan catatan buku besar kas ATM',
    jenisRisiko: null,
    penyebabRisiko: null,
    dampakInheren: null,
    frekuensiInheren: null,
    pengendalian: null,
    dampakResidual: null,
    kemungkinanResidual: null,
    penilaianKontrol: '#N/A',
    actionPlan: null,
    pic: null,
    keterangan: null,
  },
];

const RCSA_DATA_KEY = 'rcsaDataStore';

// Function to get the current data
export const getRcsaData = (): RCSAData[] => {
  if (typeof window === 'undefined') {
    return initialData;
  }
  try {
    const item = window.localStorage.getItem(RCSA_DATA_KEY);
    if (item) {
      return JSON.parse(item);
    } else {
      // If no data in localStorage, initialize with default data
      window.localStorage.setItem(RCSA_DATA_KEY, JSON.stringify(initialData));
      return initialData;
    }
  } catch (error) {
    console.error("Failed to read from localStorage", error);
    return initialData;
  }
};

// Function to update the data
export const updateRcsaData = (newData: RCSAData[]) => {
   if (typeof window === 'undefined') {
    return;
  }
  try {
     const dataToStore = newData.map(({ besaranInheren, levelInheren, besaranResidual, levelResidual, ...rest }) => rest);
     window.localStorage.setItem(RCSA_DATA_KEY, JSON.stringify(dataToStore));
  } catch (error) {
     console.error("Failed to write to localStorage", error);
  }
};
