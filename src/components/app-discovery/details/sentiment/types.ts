
export interface SentimentData {
  netPromoterScore: number;
  respondents: number;
  breakdown: {
    detractors: { count: number; percentage: number };
    passives: { count: number; percentage: number };
    promoters: { count: number; percentage: number };
  };
  criticality: number;
  reviews: {
    id: number;
    name: string;
    avatar: string;
    date: string;
    rating: number;
    comment: string;
    critical: boolean;
  }[];
  ratingDistribution: {
    rating: number;
    percentage: number;
  }[];
  surveyQuestions: {
    id: number;
    question: string;
    type: string;
    scale?: string;
    options?: string[];
    required: boolean;
  }[];
}
