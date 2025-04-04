
import { SentimentData } from "./types";

// Mock sentiment data
export const mockSentimentData: SentimentData = {
  netPromoterScore: -41,
  respondents: 22,
  breakdown: {
    detractors: { count: 11, percentage: 50 },
    passives: { count: 9, percentage: 41 },
    promoters: { count: 2, percentage: 9 }
  },
  criticality: 73,
  reviews: [
    { 
      id: 1, 
      name: "Adrianna Hegmann", 
      avatar: "", 
      date: "Nov 13, 2024", 
      rating: 6,
      comment: "",
      critical: false 
    },
    { 
      id: 2, 
      name: "Zakary Olson", 
      avatar: "", 
      date: "Nov 11, 2024", 
      rating: 3,
      comment: "Indicated that they don't use this product",
      critical: false 
    },
    { 
      id: 3, 
      name: "Sydni Kirlin", 
      avatar: "", 
      date: "Nov 11, 2024", 
      rating: 4,
      comment: "",
      critical: false 
    }
  ],
  ratingDistribution: [
    { rating: 0, percentage: 0 },
    { rating: 1, percentage: 0 },
    { rating: 2, percentage: 0 },
    { rating: 3, percentage: 0 },
    { rating: 4, percentage: 5 },
    { rating: 5, percentage: 14 },
    { rating: 6, percentage: 32 },
    { rating: 7, percentage: 9 },
    { rating: 8, percentage: 32 },
    { rating: 9, percentage: 9 },
    { rating: 10, percentage: 0 }
  ],
  surveyQuestions: [
    {
      id: 1,
      question: "How likely are you to recommend this app to a colleague?",
      type: "rating",
      scale: "0-10",
      required: true
    },
    {
      id: 2,
      question: "How critical is this app to your daily work?",
      type: "rating",
      scale: "1-5",
      required: true
    },
    {
      id: 3,
      question: "Which features do you use most frequently?",
      type: "multi-select",
      options: ["Dashboard", "Reporting", "Analytics", "Automation", "API Integration"],
      required: true
    },
    {
      id: 4,
      question: "What improvements would you like to see?",
      type: "text",
      required: false
    },
    {
      id: 5,
      question: "How satisfied are you with the app's performance?",
      type: "rating",
      scale: "1-5",
      required: true
    }
  ]
};
