
import { useState, useEffect } from "react";

// Define the types for key users
export interface KeyUser {
  name: string;
  department: string;
  email: string;
}

// Define the type for Shadow IT data
export interface ShadowITData {
  id: string;
  name: string;
  url: string;
  category: string;
  riskLevel: "High" | "Medium" | "Low";
  description: string;
  usersCount: number;
  activeLastWeek: number;
  departmentsCount: number;
  firstDetected: string;
  isCompliant: boolean;
  gdprCompliant: boolean;
  hipaaCompliant: boolean;
  hasDPA: boolean;
  dataSensitivity: string;
  dataLocation: string;
  certifications: string[];
  riskFactors: string[];
  businessImpact: string;
  keyUsers: KeyUser[];
}

// Mock data for Shadow IT applications
const mockShadowITData: ShadowITData[] = [
  {
    id: "1",
    name: "Trello",
    url: "https://trello.com",
    category: "Project Management",
    riskLevel: "Medium",
    description: "Kanban-style project management tool used by marketing team without IT approval",
    usersCount: 27,
    activeLastWeek: 18,
    departmentsCount: 3,
    firstDetected: "2023-06-15",
    isCompliant: false,
    gdprCompliant: true,
    hipaaCompliant: false,
    hasDPA: false,
    dataSensitivity: "Medium",
    dataLocation: "United States",
    certifications: ["SOC 2", "ISO 27001"],
    riskFactors: [
      "No data processing agreement in place",
      "Sharing sensitive project information",
      "No centralized administration"
    ],
    businessImpact: "Used for marketing campaign planning and creative workflows, adoption has increased across multiple teams",
    keyUsers: [
      { name: "Sarah Johnson", department: "Marketing", email: "sarah@example.com" },
      { name: "Mike Peterson", department: "Marketing", email: "mike@example.com" },
      { name: "Emily Chen", department: "Creative", email: "emily@example.com" }
    ]
  },
  {
    id: "2",
    name: "Calendly",
    url: "https://calendly.com",
    category: "Scheduling",
    riskLevel: "Low",
    description: "Appointment scheduling software used by sales and customer success teams",
    usersCount: 12,
    activeLastWeek: 10,
    departmentsCount: 2,
    firstDetected: "2023-08-22",
    isCompliant: false,
    gdprCompliant: true,
    hipaaCompliant: false,
    hasDPA: true,
    dataSensitivity: "Low",
    dataLocation: "United States",
    certifications: ["SOC 2"],
    riskFactors: [
      "Limited oversight of external meeting scheduling",
      "Integration with company email accounts"
    ],
    businessImpact: "Streamlines scheduling with prospects and customers, improves sales team productivity",
    keyUsers: [
      { name: "Alex Rivera", department: "Sales", email: "alex@example.com" },
      { name: "Jordan Smith", department: "Customer Success", email: "jordan@example.com" }
    ]
  },
  {
    id: "3",
    name: "Airtable",
    url: "https://airtable.com",
    category: "Database",
    riskLevel: "High",
    description: "Collaborative database tool being used to store customer information and project data",
    usersCount: 18,
    activeLastWeek: 15,
    departmentsCount: 4,
    firstDetected: "2023-04-10",
    isCompliant: false,
    gdprCompliant: false,
    hipaaCompliant: false,
    hasDPA: false,
    dataSensitivity: "High",
    dataLocation: "United States",
    certifications: ["SOC 2", "ISO 27001"],
    riskFactors: [
      "Contains personally identifiable information (PII)",
      "No data processing agreement",
      "Potential duplicate of approved CRM system",
      "No backup or data retention controls"
    ],
    businessImpact: "Being used to track customer projects and store sensitive client information outside approved systems",
    keyUsers: [
      { name: "David Wong", department: "Operations", email: "david@example.com" },
      { name: "Lisa Patel", department: "Product", email: "lisa@example.com" },
      { name: "Carlos Rodriguez", department: "Engineering", email: "carlos@example.com" }
    ]
  },
  {
    id: "4",
    name: "Figma",
    url: "https://figma.com",
    category: "Design",
    riskLevel: "Medium",
    description: "Collaborative design tool used by design and product teams",
    usersCount: 15,
    activeLastWeek: 12,
    departmentsCount: 2,
    firstDetected: "2023-05-18",
    isCompliant: true,
    gdprCompliant: true,
    hipaaCompliant: false,
    hasDPA: true,
    dataSensitivity: "Medium",
    dataLocation: "United States",
    certifications: ["SOC 2"],
    riskFactors: [
      "External sharing of product designs",
      "Intellectual property concerns",
      "Limited access control oversight"
    ],
    businessImpact: "Essential for product design workflows, with increasing adoption across product and engineering teams",
    keyUsers: [
      { name: "Emma Wilson", department: "Design", email: "emma@example.com" },
      { name: "Tyler Black", department: "Product", email: "tyler@example.com" }
    ]
  },
  {
    id: "5",
    name: "ChatGPT",
    url: "https://chat.openai.com",
    category: "AI Assistant",
    riskLevel: "High",
    description: "AI language model being used to draft emails, content, and potentially code",
    usersCount: 34,
    activeLastWeek: 29,
    departmentsCount: 6,
    firstDetected: "2023-01-30",
    isCompliant: false,
    gdprCompliant: false,
    hipaaCompliant: false,
    hasDPA: false,
    dataSensitivity: "High",
    dataLocation: "United States",
    certifications: [],
    riskFactors: [
      "Potential data leakage of confidential information",
      "No enterprise controls or oversight",
      "Content generated may not be compliant with company standards",
      "Data retention concerns"
    ],
    businessImpact: "Widely adopted across organization for content generation, research, and productivity assistance",
    keyUsers: [
      { name: "Ryan Johnson", department: "Marketing", email: "ryan@example.com" },
      { name: "Sophia Chen", department: "Engineering", email: "sophia@example.com" },
      { name: "Marcus Lee", department: "Sales", email: "marcus@example.com" }
    ]
  }
];

export function useShadowITData() {
  const [shadowITData, setShadowITData] = useState<ShadowITData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with a delay
    const timer = setTimeout(() => {
      setShadowITData(mockShadowITData);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return { shadowITData, loading };
}
