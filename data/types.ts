export type LeadType = "Insurer" | "MGA" | "Broker" | "Association" | "Event";

export type Priority = 1 | 2 | 3;

export type Lead = {
  id: string;
  organisation: string;
  person: string;
  role: string;
  type: LeadType;
  priority: Priority;
  focus: string;
  why: string;
  approach?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  note?: string;
};

export type Organisation = {
  id: string;
  name: string;
  type: LeadType | "Network";
  sydneyAddress?: string;
  phone?: string;
  email?: string;
  website?: string;
  people: { name: string; role: string; email?: string; phone?: string }[];
  notes?: string;
};

export type IndustryEvent = {
  id: string;
  name: string;
  when: string;
  where: string;
  why: string;
  contact?: string;
  website?: string;
  status: "This week" | "Upcoming" | "Annual" | "Past 2026";
};
