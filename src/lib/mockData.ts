export interface SaaSData {
  id: string;
  name: string;
  description: string;
  price: number;
  renewalDate: string;
  contract: {
    signedDate: string;
    term: string;
    autoRenewal: boolean;
    cancellationDeadline: string | null;
  };
  usage: {
    activeUsers: number;
    totalLicenses: number;
    utilizationRate: number;
  };
  paymentHistory: {
    date: string;
    amount: number;
  }[];
  usageHistory: {
    date: string;
    activeUsers: number;
  }[];
  tasks: {
    taskType: string;
    saasName: string;
    employeeId: string;
    priority: string;
    status: string;
  }[];
  alerts: {
    type: string;
    message: string;
  }[];
}

export const mockSaaSData: SaaSData[] = [
  {
    id: "salesforce1",
    name: "Salesforce",
    description: "Customer relationship management software.",
    price: 15000,
    renewalDate: "2024-03-15",
    contract: {
      signedDate: "2022-03-15",
      term: "Annual",
      autoRenewal: true,
      cancellationDeadline: "2024-02-15",
    },
    usage: {
      activeUsers: 450,
      totalLicenses: 500,
      utilizationRate: 90,
    },
    paymentHistory: [
      { date: "2023-03-15", amount: 15000 },
      { date: "2022-03-15", amount: 15000 },
    ],
    usageHistory: [
      { date: "2023-01-01", activeUsers: 420 },
      { date: "2023-02-01", activeUsers: 435 },
      { date: "2023-03-01", activeUsers: 450 },
    ],
    tasks: [
      {
        taskType: "User Provisioning",
        saasName: "Salesforce",
        employeeId: "emp123",
        priority: "High",
        status: "In Progress",
      },
      {
        taskType: "Training",
        saasName: "Salesforce",
        employeeId: "emp456",
        priority: "Medium",
        status: "Completed",
      },
    ],
    alerts: [
      { type: "License", message: "10 licenses are nearing full utilization." },
      { type: "Contract", message: "Contract renewal is approaching." },
    ],
  },
  {
    id: "slack1",
    name: "Slack",
    description: "Team collaboration and messaging platform.",
    price: 12000,
    renewalDate: "2024-02-01",
    contract: {
      signedDate: "2022-02-01",
      term: "Annual",
      autoRenewal: true,
      cancellationDeadline: "2024-01-01",
    },
    usage: {
      activeUsers: 950,
      totalLicenses: 1000,
      utilizationRate: 95,
    },
    paymentHistory: [
      { date: "2023-02-01", amount: 12000 },
      { date: "2022-02-01", amount: 12000 },
    ],
    usageHistory: [
      { date: "2022-12-01", activeUsers: 920 },
      { date: "2023-01-01", activeUsers: 940 },
      { date: "2023-02-01", activeUsers: 950 },
    ],
    tasks: [
      {
        taskType: "User Deprovisioning",
        saasName: "Slack",
        employeeId: "emp789",
        priority: "High",
        status: "Pending",
      },
    ],
    alerts: [
      { type: "Security", message: "Unusual login activity detected." },
    ],
  },
  {
    id: "asana1",
    name: "Asana",
    description: "Project management tool for team collaboration.",
    price: 9000,
    renewalDate: "2024-04-01",
    contract: {
      signedDate: "2022-04-01",
      term: "Annual",
      autoRenewal: false,
      cancellationDeadline: null,
    },
    usage: {
      activeUsers: 280,
      totalLicenses: 300,
      utilizationRate: 93,
    },
    paymentHistory: [
      { date: "2023-04-01", amount: 9000 },
      { date: "2022-04-01", amount: 9000 },
    ],
    usageHistory: [
      { date: "2023-01-01", activeUsers: 260 },
      { date: "2023-02-01", activeUsers: 270 },
      { date: "2023-03-01", activeUsers: 280 },
    ],
    tasks: [],
    alerts: [
      { type: "Integration", message: "Integration with Google Drive is down." },
    ],
  },
  {
    id: "hubspot1",
    name: "HubSpot",
    description: "Marketing, sales, and service software.",
    price: 18000,
    renewalDate: "2024-05-15",
    contract: {
      signedDate: "2022-05-15",
      term: "Annual",
      autoRenewal: true,
      cancellationDeadline: "2024-04-15",
    },
    usage: {
      activeUsers: 120,
      totalLicenses: 150,
      utilizationRate: 80,
    },
    paymentHistory: [
      { date: "2023-05-15", amount: 18000 },
      { date: "2022-05-15", amount: 18000 },
    ],
    usageHistory: [
      { date: "2023-02-01", activeUsers: 110 },
      { date: "2023-03-01", activeUsers: 115 },
      { date: "2023-04-01", activeUsers: 120 },
    ],
    tasks: [
      {
        taskType: "User Training",
        saasName: "HubSpot",
        employeeId: "emp999",
        priority: "Medium",
        status: "Scheduled",
      },
    ],
    alerts: [
      { type: "Data", message: "Data sync with advertising platforms failed." },
    ],
  },
  {
    id: "zoom1",
    name: "Zoom",
    description: "Video conferencing and online meeting platform.",
    price: 8000,
    renewalDate: "2024-06-01",
    contract: {
      signedDate: "2022-06-01",
      term: "Annual",
      autoRenewal: true,
      cancellationDeadline: "2024-05-01",
    },
    usage: {
      activeUsers: 550,
      totalLicenses: 600,
      utilizationRate: 92,
    },
    paymentHistory: [
      { date: "2023-06-01", amount: 8000 },
      { date: "2022-06-01", amount: 8000 },
    ],
    usageHistory: [
      { date: "2023-03-01", activeUsers: 520 },
      { date: "2023-04-01", activeUsers: 540 },
      { date: "2023-05-01", activeUsers: 550 },
    ],
    tasks: [],
    alerts: [
      { type: "Update", message: "New version of Zoom is available." },
    ],
  },
];

export const generateUsageTrendData = (saasId: string) => {
  const saas = mockSaaSData.find((saas) => saas.id === saasId);
  if (!saas) return [];

  return saas.usageHistory.map((item) => ({
    name: item.date,
    users: item.activeUsers,
  }));
};

export const generatePaymentTrendData = (saasId: string) => {
  const saas = mockSaaSData.find((saas) => saas.id === saasId);
  if (!saas) return [];

  return saas.paymentHistory.map((item) => ({
    name: item.date,
    amount: item.amount,
  }));
};

// Add these properties to the ContractDocument type
export interface ContractDocument {
  id: string;
  type: "Contract" | "Invoice" | "Amendment";
  title: string;
  dateAdded: string;
  size: string;
  saasId: string;
  saasName: string;
  isRenewal?: boolean;
  relatedContractId?: string;
  contractPeriod?: {
    start: string;
    end: string;
  };
}

// Update mockContracts array to include relationships
export const mockContracts: ContractDocument[] = [
  // Salesforce documents
  {
    id: "sf-contract-1",
    type: "Contract",
    title: "Salesforce Subscription Agreement",
    dateAdded: "2022-01-15",
    size: "1.2 MB",
    saasId: "sf1",
    saasName: "Salesforce",
    isRenewal: false,
    contractPeriod: {
      start: "2022-01-15",
      end: "2023-01-14"
    }
  },
  {
    id: "sf-contract-2",
    type: "Contract",
    title: "Salesforce Renewal Agreement",
    dateAdded: "2023-01-10",
    size: "1.1 MB",
    saasId: "sf1",
    saasName: "Salesforce",
    isRenewal: true,
    contractPeriod: {
      start: "2023-01-15",
      end: "2024-01-14"
    }
  },
  {
    id: "sf-invoice-1",
    type: "Invoice",
    title: "Salesforce Invoice - Jan 2022",
    dateAdded: "2022-01-20",
    size: "245 KB",
    saasId: "sf1",
    saasName: "Salesforce",
    relatedContractId: "sf-contract-1"
  },
  {
    id: "sf-invoice-2",
    type: "Invoice",
    title: "Salesforce Invoice - Jan 2023",
    dateAdded: "2023-01-20",
    size: "256 KB",
    saasId: "sf1",
    saasName: "Salesforce",
    relatedContractId: "sf-contract-2"
  },
  {
    id: "sf-amendment-1",
    type: "Amendment",
    title: "Salesforce Seats Amendment",
    dateAdded: "2022-06-10",
    size: "450 KB",
    saasId: "sf1",
    saasName: "Salesforce",
    relatedContractId: "sf-contract-1"
  },
  
  // Slack documents
  {
    id: "slack-contract-1",
    type: "Contract",
    title: "Slack Enterprise Agreement",
    dateAdded: "2022-03-01",
    size: "980 KB",
    saasId: "slack1",
    saasName: "Slack",
    isRenewal: false,
    contractPeriod: {
      start: "2022-03-01",
      end: "2023-02-28"
    }
  },
  {
    id: "slack-contract-2",
    type: "Contract",
    title: "Slack Renewal Agreement",
    dateAdded: "2023-02-15",
    size: "1.0 MB",
    saasId: "slack1",
    saasName: "Slack",
    isRenewal: true,
    contractPeriod: {
      start: "2023-03-01",
      end: "2024-02-29"
    }
  },
  {
    id: "slack-invoice-1",
    type: "Invoice",
    title: "Slack Invoice - Q1 2022",
    dateAdded: "2022-03-05",
    size: "300 KB",
    saasId: "slack1",
    saasName: "Slack",
    relatedContractId: "slack-contract-1"
  },
  {
    id: "slack-invoice-2",
    type: "Invoice",
    title: "Slack Invoice - Q1 2023",
    dateAdded: "2023-03-05",
    size: "310 KB",
    saasId: "slack1",
    saasName: "Slack",
    relatedContractId: "slack-contract-2"
  },
  
  // Asana documents
  {
    id: "asana-contract-1",
    type: "Contract",
    title: "Asana Project Management Subscription",
    dateAdded: "2022-05-10",
    size: "850 KB",
    saasId: "asana1",
    saasName: "Asana",
    isRenewal: false,
    contractPeriod: {
      start: "2022-05-10",
      end: "2023-05-09"
    }
  },
  {
    id: "asana-invoice-1",
    type: "Invoice",
    title: "Asana Invoice - May 2022",
    dateAdded: "2022-05-15",
    size: "180 KB",
    saasId: "asana1",
    saasName: "Asana",
    relatedContractId: "asana-contract-1"
  },
  {
    id: "asana-invoice-2",
    type: "Invoice",
    title: "Asana Invoice - Aug 2022",
    dateAdded: "2022-08-15",
    size: "185 KB",
    saasId: "asana1",
    saasName: "Asana",
    relatedContractId: "asana-contract-1"
  },
  
  // HubSpot documents
  {
    id: "hubspot-contract-1",
    type: "Contract",
    title: "HubSpot Marketing Hub Contract",
    dateAdded: "2022-02-01",
    size: "1.1 MB",
    saasId: "hubspot1",
    saasName: "HubSpot",
    isRenewal: false,
    contractPeriod: {
      start: "2022-02-01",
      end: "2023-01-31"
    }
  },
  {
    id: "hubspot-contract-2",
    type: "Contract",
    title: "HubSpot Renewal Agreement",
    dateAdded: "2023-01-20",
    size: "1.2 MB",
    saasId: "hubspot1",
    saasName: "HubSpot",
    isRenewal: true,
    contractPeriod: {
      start: "2023-02-01",
      end: "2024-01-31"
    }
  },
  {
    id: "hubspot-invoice-1",
    type: "Invoice",
    title: "HubSpot Invoice - Feb 2022",
    dateAdded: "2022-02-05",
    size: "320 KB",
    saasId: "hubspot1",
    saasName: "HubSpot",
    relatedContractId: "hubspot-contract-1"
  },
  {
    id: "hubspot-invoice-2",
    type: "Invoice",
    title: "HubSpot Invoice - Feb 2023",
    dateAdded: "2023-02-05",
    size: "330 KB",
    saasId: "hubspot1",
    saasName: "HubSpot",
    relatedContractId: "hubspot-contract-2"
  },
  {
    id: "hubspot-amendment-1",
    type: "Amendment",
    title: "HubSpot Service Add-on Amendment",
    dateAdded: "2022-07-15",
    size: "420 KB",
    saasId: "hubspot1",
    saasName: "HubSpot",
    relatedContractId: "hubspot-contract-1"
  }
];
