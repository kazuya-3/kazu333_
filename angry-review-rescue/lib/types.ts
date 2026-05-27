export type StarRating = 1 | 2 | 3 | 4 | 5;

export type BusinessType =
  | "Restaurant"
  | "Cafe"
  | "Salon"
  | "Barber"
  | "Dentist"
  | "Hotel"
  | "Home Service"
  | "Other";

export type Tone =
  | "Calm & Professional"
  | "Warm & Human"
  | "Firm but Respectful"
  | "Short & Simple";

export interface RescueInput {
  reviewText: string;
  rating: StarRating;
  businessType: BusinessType;
  ownerContext: string;
  preferredTone: Tone;
}

export interface RiskScores {
  /** 0–100. Higher = more likely the owner replies defensively. */
  defensiveRisk: number;
  /** 0–100. Higher = the generic-reply trap is more likely. */
  genericRisk: number;
  /** 0–100. Higher = future customers reading this will trust the business more. */
  futureCustomerTrust: number;
}

export interface ReplyVariant {
  id: "calm" | "warm" | "firm";
  title: string;
  useCase: string;
  text: string;
  badges: string[];
}

export interface RescueResult {
  scores: RiskScores;
  detectedIssues: string[];
  replies: ReplyVariant[];
  recoveryDM: string;
  futureCustomerLens: { label: string; passes: boolean }[];
}
