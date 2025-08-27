
'use client';

import { getRcsaMasterData } from './rcsa-master-data';

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

const RCSA_DATA_KEY = 'rcsaDataStore';

// Function to get the current data
export const getRcsaData = (): RCSAData[] => {
  if (typeof window === 'undefined') {
    return getRcsaMasterData();
  }
  try {
    const item = window.localStorage.getItem(RCSA_DATA_KEY);
    if (item) {
      return JSON.parse(item);
    } else {
      // If no data in localStorage, initialize with default master data
      const masterData = getRcsaMasterData();
      window.localStorage.setItem(RCSA_DATA_KEY, JSON.stringify(masterData));
      return masterData;
    }
  } catch (error) {
    console.error("Failed to read from localStorage", error);
    return getRcsaMasterData();
  }
};

// Function to update the data
export const updateRcsaData = (newData: RCSAData[]) => {
   if (typeof window === 'undefined') {
    return;
  }
  try {
     // We remove the calculated fields before storing, as they are recalculated on load.
     const dataToStore = newData.map(({ besaranInheren, levelInheren, besaranResidual, levelResidual, ...rest }) => rest);
     window.localStorage.setItem(RCSA_DATA_KEY, JSON.stringify(dataToStore));
  } catch (error) {
     console.error("Failed to write to localStorage", error);
  }
};
