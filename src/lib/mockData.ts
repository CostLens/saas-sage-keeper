
// Sample data for development
export interface SaaSData {
  id: string;
  name: string;
  active: boolean; // Added active property
  renewalDate: string;
  price: number;
  pricingTerms: "Usage-based" | "User-based" | "Flat-rate";
  lastPayment: {
    amount: number;
    date: string;
    status: "Paid" | "Pending" | "Failed";
  };
  usage: {
    activeUsers: number;
    totalLicenses?: number;
    status: "Underutilized" | "Optimal" | "Overutilized";
    utilizationRate: number;
  };
  contract: {
    signedDate: string;
    term: string;
    autoRenewal: boolean;
    cancellationDeadline?: string;
  };
}

export interface ObligationData {
  id: string;
  saasId: string;
  saasName: string;
  description: string;
  dueDate: string;
  status: "Pending" | "Completed" | "Overdue";
  priority: "Low" | "Medium" | "High";
  type: "Payment" | "Review" | "Cancellation" | "Other";
}

export const mockSaasData: SaaSData[] = [
  {
    id: "1",
    name: "Slack",
    active: true,
    renewalDate: "2024-08-15",
    price: 12500,
    pricingTerms: "User-based",
    lastPayment: {
      amount: 12500,
      date: "2024-02-15",
      status: "Paid"
    },
    usage: {
      activeUsers: 85,
      totalLicenses: 100,
      status: "Optimal",
      utilizationRate: 85
    },
    contract: {
      signedDate: "2023-08-15",
      term: "Annual",
      autoRenewal: true,
      cancellationDeadline: "2024-07-15"
    }
  },
  {
    id: "2",
    name: "Salesforce",
    active: true,
    renewalDate: "2024-06-30",
    price: 45000,
    pricingTerms: "User-based",
    lastPayment: {
      amount: 45000,
      date: "2023-06-30",
      status: "Paid"
    },
    usage: {
      activeUsers: 28,
      totalLicenses: 50,
      status: "Underutilized",
      utilizationRate: 56
    },
    contract: {
      signedDate: "2023-06-30",
      term: "Annual",
      autoRenewal: true,
      cancellationDeadline: "2024-05-30"
    }
  },
  {
    id: "3",
    name: "AWS",
    active: true,
    renewalDate: "N/A",
    price: 8750,
    pricingTerms: "Usage-based",
    lastPayment: {
      amount: 8750,
      date: "2024-05-01",
      status: "Paid"
    },
    usage: {
      activeUsers: 15,
      status: "Optimal",
      utilizationRate: 90
    },
    contract: {
      signedDate: "2022-01-15",
      term: "Monthly",
      autoRenewal: true
    }
  },
  {
    id: "4",
    name: "Zoom",
    active: true,
    renewalDate: "2024-07-01",
    price: 8000,
    pricingTerms: "User-based",
    lastPayment: {
      amount: 8000,
      date: "2023-07-01",
      status: "Paid"
    },
    usage: {
      activeUsers: 42,
      totalLicenses: 100,
      status: "Underutilized",
      utilizationRate: 42
    },
    contract: {
      signedDate: "2023-07-01",
      term: "Annual",
      autoRenewal: true,
      cancellationDeadline: "2024-06-01"
    }
  },
  {
    id: "5",
    name: "Adobe Creative Cloud",
    active: true,
    renewalDate: "2024-09-15",
    price: 9600,
    pricingTerms: "User-based",
    lastPayment: {
      amount: 9600,
      date: "2023-09-15",
      status: "Paid"
    },
    usage: {
      activeUsers: 18,
      totalLicenses: 20,
      status: "Optimal",
      utilizationRate: 90
    },
    contract: {
      signedDate: "2023-09-15",
      term: "Annual",
      autoRenewal: true,
      cancellationDeadline: "2024-08-15"
    }
  },
  {
    id: "6",
    name: "HubSpot",
    active: false,
    renewalDate: "2024-10-01",
    price: 18000,
    pricingTerms: "Flat-rate",
    lastPayment: {
      amount: 18000,
      date: "2023-10-01",
      status: "Paid"
    },
    usage: {
      activeUsers: 25,
      totalLicenses: 25,
      status: "Optimal",
      utilizationRate: 100
    },
    contract: {
      signedDate: "2023-10-01",
      term: "Annual",
      autoRenewal: true,
      cancellationDeadline: "2024-09-01"
    }
  },
  {
    id: "7",
    name: "Microsoft 365",
    active: true,
    renewalDate: "2024-08-01",
    price: 15000,
    pricingTerms: "User-based",
    lastPayment: {
      amount: 15000,
      date: "2023-08-01",
      status: "Paid"
    },
    usage: {
      activeUsers: 120,
      totalLicenses: 125,
      status: "Optimal",
      utilizationRate: 96
    },
    contract: {
      signedDate: "2023-08-01",
      term: "Annual",
      autoRenewal: true,
      cancellationDeadline: "2024-07-01"
    }
  },
  {
    id: "8",
    name: "Dropbox Business",
    active: true,
    renewalDate: "2024-07-15",
    price: 6000,
    pricingTerms: "User-based",
    lastPayment: {
      amount: 6000,
      date: "2023-07-15",
      status: "Paid"
    },
    usage: {
      activeUsers: 72,
      totalLicenses: 75,
      status: "Optimal",
      utilizationRate: 96
    },
    contract: {
      signedDate: "2023-07-15",
      term: "Annual",
      autoRenewal: true,
      cancellationDeadline: "2024-06-15"
    }
  }
];

export const mockObligations: ObligationData[] = [
  {
    id: "1",
    saasId: "2",
    saasName: "Salesforce",
    description: "Review license utilization and optimize seats before renewal",
    dueDate: "2024-05-30",
    status: "Pending",
    priority: "High",
    type: "Review"
  },
  {
    id: "2",
    saasId: "4",
    saasName: "Zoom",
    description: "Cancel or renew contract",
    dueDate: "2024-06-01",
    status: "Pending",
    priority: "High",
    type: "Cancellation"
  },
  {
    id: "3",
    saasId: "1",
    saasName: "Slack",
    description: "Review upcoming renewal terms",
    dueDate: "2024-06-15",
    status: "Pending",
    priority: "Medium",
    type: "Review"
  },
  {
    id: "4",
    saasId: "7",
    saasName: "Microsoft 365",
    description: "Pay quarterly invoice",
    dueDate: "2024-05-15",
    status: "Overdue",
    priority: "High",
    type: "Payment"
  },
  {
    id: "5",
    saasId: "3",
    saasName: "AWS",
    description: "Review cloud resource utilization",
    dueDate: "2024-05-20",
    status: "Pending",
    priority: "Medium",
    type: "Review"
  },
  {
    id: "6",
    saasId: "5",
    saasName: "Adobe Creative Cloud",
    description: "Discuss team seat requirements",
    dueDate: "2024-07-15",
    status: "Pending",
    priority: "Low",
    type: "Other"
  }
];

// Generate trend data for a SaaS
export function generateUsageTrendData(saasId: string) {
  // Generate 12 months of usage data
  const today = new Date();
  const data = [];
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthName = date.toLocaleString('default', { month: 'short' });
    
    // Base value determined by SaaS ID for consistency
    const baseValue = parseInt(saasId) * 10;
    // Add some randomness but keep a trend
    const userValue = baseValue + Math.floor(Math.random() * 20) - 5 + (i * 2);
    
    data.push({
      name: monthName,
      users: Math.max(5, userValue)
    });
  }
  
  return data;
}

export function generatePaymentTrendData(saasId: string) {
  // Generate 12 months of payment data
  const today = new Date();
  const data = [];
  
  const saas = mockSaasData.find(s => s.id === saasId);
  const basePayment = saas ? saas.price / 12 : 1000; // Monthly equivalent
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthName = date.toLocaleString('default', { month: 'short' });
    
    // Most SaaS have relatively consistent payments, with some variation
    let paymentValue = basePayment;
    
    // If usage-based, add more variation
    if (saas?.pricingTerms === 'Usage-based') {
      paymentValue = basePayment * (0.85 + (Math.random() * 0.3));
    }
    
    // Round to 2 decimal places
    paymentValue = Math.round(paymentValue * 100) / 100;
    
    data.push({
      name: monthName,
      amount: paymentValue
    });
  }
  
  return data;
}

// Generate total spend by category for charts
export function generateSpendByCategory() {
  return [
    { name: "Productivity", value: 35000 },
    { name: "Sales & Marketing", value: 65000 },
    { name: "Development", value: 45000 },
    { name: "Communication", value: 25000 },
    { name: "Design", value: 15000 }
  ];
}

// Generate data for contract documents
export interface ContractDocument {
  id: string;
  saasId: string;
  saasName: string;
  title: string;
  type: "Contract" | "Invoice" | "Amendment";
  dateAdded: string;
  size: string;
}

export const mockContracts: ContractDocument[] = [
  {
    id: "doc1",
    saasId: "1",
    saasName: "Slack",
    title: "Slack Enterprise Agreement 2023-2024",
    type: "Contract",
    dateAdded: "2023-08-15",
    size: "1.2 MB"
  },
  {
    id: "doc2",
    saasId: "1",
    saasName: "Slack",
    title: "Slack Invoice Q1 2024",
    type: "Invoice",
    dateAdded: "2024-02-15",
    size: "245 KB"
  },
  {
    id: "doc3",
    saasId: "2",
    saasName: "Salesforce",
    title: "Salesforce Enterprise Agreement 2023-2024",
    type: "Contract",
    dateAdded: "2023-06-30",
    size: "3.5 MB"
  },
  {
    id: "doc4",
    saasId: "3",
    saasName: "AWS",
    title: "AWS Service Agreement",
    type: "Contract",
    dateAdded: "2022-01-15",
    size: "890 KB"
  },
  {
    id: "doc5",
    saasId: "3",
    saasName: "AWS",
    title: "AWS Invoice April 2024",
    type: "Invoice",
    dateAdded: "2024-05-01",
    size: "312 KB"
  },
  {
    id: "doc6",
    saasId: "4",
    saasName: "Zoom",
    title: "Zoom Enterprise License Agreement",
    type: "Contract",
    dateAdded: "2023-07-01",
    size: "1.8 MB"
  },
  {
    id: "doc7",
    saasId: "5",
    saasName: "Adobe Creative Cloud",
    title: "Adobe CC Team License",
    type: "Contract",
    dateAdded: "2023-09-15",
    size: "1.5 MB"
  },
  {
    id: "doc8",
    saasId: "7",
    saasName: "Microsoft 365",
    title: "Microsoft 365 Business Premium Agreement",
    type: "Contract",
    dateAdded: "2023-08-01",
    size: "2.2 MB"
  },
  {
    id: "doc9",
    saasId: "7",
    saasName: "Microsoft 365",
    title: "Microsoft 365 License Amendment",
    type: "Amendment",
    dateAdded: "2024-01-15",
    size: "450 KB"
  }
];
