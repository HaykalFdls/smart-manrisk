
'use client';

import { getRcsaMasterData } from './rcsa-master-data';

export type RCSAData = {
  no: number;
  unitKerja: string;
  potensiRisiko: string;
  jenisRisiko: string | null;
  penyebabRisiko: string | null;
  dampakInheren: number | null;
  frekuensiInheren: number | null;
  pengendalian: string | null;
  dampakResidual: number | null;
  kemungkinanResidual: number | null;
  penilaianKontrol: string | null;
  actionPlan: string | null;
  pic: string | null;
  keterangan: string | null;
};

export type RCSASubmission = {
    id: string;
    submittedAt: string;
    data: RCSAData[];
}

// Key for the user's current, unsubmitted work (draft)
const RCSA_DRAFT_KEY = 'rcsaDraftStore';
// Key for all historical submissions viewable by the admin
const RCSA_SUBMISSIONS_KEY = 'rcsaSubmissionsStore';

// Function to get the current DRAFT data
export const getRcsaData = (): RCSAData[] => {
  if (typeof window === 'undefined') {
    return getRcsaMasterData();
  }
  try {
    const item = window.localStorage.getItem(RCSA_DRAFT_KEY);
    if (item) {
      return JSON.parse(item);
    } else {
      // If no draft in localStorage, initialize with default master data
      const masterData = getRcsaMasterData();
      window.localStorage.setItem(RCSA_DRAFT_KEY, JSON.stringify(masterData));
      return masterData;
    }
  } catch (error) {
    console.error("Failed to read draft from localStorage", error);
    return getRcsaMasterData();
  }
};

// Function to update the DRAFT data
export const updateRcsaData = (newData: RCSAData[]) => {
   if (typeof window === 'undefined') {
    return;
  }
  try {
     window.localStorage.setItem(RCSA_DRAFT_KEY, JSON.stringify(newData));
  } catch (error) {
     console.error("Failed to write draft to localStorage", error);
  }
};


// --- Functions for Submissions ---

// Function to get ALL submissions
export const getAllRcsaSubmissions = (): RCSASubmission[] => {
    if (typeof window === 'undefined') {
        return [];
    }
    try {
        const item = window.localStorage.getItem(RCSA_SUBMISSIONS_KEY);
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.error("Failed to read submissions from localStorage", error);
        return [];
    }
};

// Function to ADD a new submission
export const addRcsaSubmission = (submissionData: RCSAData[]) => {
    if (typeof window === 'undefined') {
        return;
    }
    try {
        const allSubmissions = getAllRcsaSubmissions();
        const newSubmission: RCSASubmission = {
            id: (allSubmissions.length + 1).toString(),
            submittedAt: new Date().toISOString(),
            data: submissionData,
        };
        const updatedSubmissions = [...allSubmissions, newSubmission];
        window.localStorage.setItem(RCSA_SUBMISSIONS_KEY, JSON.stringify(updatedSubmissions));
    } catch (error) {
        console.error("Failed to add submission to localStorage", error);
    }
}
