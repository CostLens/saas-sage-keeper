
import { faker } from "@faker-js/faker";

export interface SaaSData {
  id: string;
  name: string;
  logo?: string;
  category?: string;
  description?: string;
  renewalDate: string;
  price: number;
  active?: boolean;
  owner?: string | null;
  riskLevel?: "Low" | "Medium" | "High"; // Add risk level for shadow IT
  contract: {
    startDate: string;
    endDate: string;
    term: string;
    autoRenew: boolean;
    terminationClause: string;
    signedDate?: string;
    cancellationDeadline?: string;
    hasTerminationClause?: boolean;
  };
  usage: {
    totalLicenses?: number;
    activeUsers?: number;
    utilizationRate?: number;
  };
  pricingTerms: string;
  lastPayment?: {
    date: string;
    amount: number;
    status: string;
  };
}

export interface ObligationData {
  id: string;
  saasId: string;
  saasName: string;
  type: string;
  description: string;
  dueDate: string;
  status: string;
  priority: string;
}

export interface ContractDocument {
  id: string;
  title: string;
  type: string;
  saasId: string;
  saasName: string;
  dateAdded: string;
  size: string;
  url?: string;
  relatedContractId?: string;
  contractPeriod?: {
    start: string;
    end: string;
  };
  isRenewal?: boolean;
}

export const mockSaaSData: SaaSData[] = Array.from({ length: 20 }, (_, i) => {
  const name = faker.company.name();
  const startDate = faker.date.past().toISOString().slice(0, 10);
  const endDate = faker.date.future().toISOString().slice(0, 10);
  const price = faker.number.int({ min: 50, max: 1000 });
  const totalLicenses = faker.number.int({ min: 10, max: 100 });
  const activeUsers = faker.number.int({ min: 5, max: totalLicenses });
  const utilizationRate = faker.number.int({ min: 60, max: 95 });
  const lastPaymentDate = faker.date.recent().toISOString().slice(0, 10);
  const paymentAmount = price;
  const paymentStatus = faker.helpers.arrayElement(['Paid', 'Pending', 'Failed']);
  const autoRenew = faker.datatype.boolean();
  const active = faker.datatype.boolean();
  const signedDate = faker.date.past().toISOString().slice(0, 10);
  const cancellationDeadline = faker.date.future().toISOString().slice(0, 10);
  const hasTerminationClause = faker.datatype.boolean();
  const riskLevel = faker.helpers.arrayElement(['Low', 'Medium', 'High']);

  return {
    id: faker.string.uuid(),
    name: name,
    logo: faker.image.url(),
    category: faker.helpers.arrayElement(['Productivity', 'Marketing', 'Finance', 'HR', 'Development', 'Unmanaged']),
    description: faker.lorem.sentence(),
    renewalDate: faker.date.future().toISOString().slice(0, 10),
    price: price,
    active: active,
    riskLevel: riskLevel,
    contract: {
      startDate: startDate,
      endDate: endDate,
      term: faker.helpers.arrayElement(['Monthly', 'Annual', 'Quarterly']),
      autoRenew: autoRenew,
      terminationClause: faker.lorem.sentence(),
      signedDate: signedDate,
      cancellationDeadline: cancellationDeadline,
      hasTerminationClause: hasTerminationClause
    },
    usage: {
      totalLicenses: totalLicenses,
      activeUsers: activeUsers,
      utilizationRate: utilizationRate
    },
    pricingTerms: faker.helpers.arrayElement(['User-based', 'Usage-based', 'Flat Rate']),
    lastPayment: {
      date: lastPaymentDate,
      amount: paymentAmount,
      status: paymentStatus,
    },
  };
});

// Add owner field to some of the mock data
mockSaaSData.forEach((saas, index) => {
  const owners = [
    "Sarah Johnson", "Michael Chen", "Emily Davis", "Carlos Rodriguez", 
    "Aisha Patel", "Trevor Williams", null
  ];
  
  // Assign an owner to every third item
  if (index % 3 === 0) {
    saas.owner = owners[index % owners.length];
  }
});

// Generate payment trend data
export function generatePaymentTrendData(saasId: string) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const saas = mockSaaSData.find(s => s.id === saasId);
  const baseAmount = saas ? saas.price : 500;
  
  return months.map((month, index) => ({
    name: month,
    amount: baseAmount + faker.number.int({ min: -50, max: 50 })
  }));
}

// Mock obligations data
export const mockObligations: ObligationData[] = mockSaaSData.slice(0, 10).map((saas, index) => {
  const types = ['Payment', 'Review', 'Cancellation', 'Compliance'];
  const statuses = ['Pending', 'Completed', 'Overdue'];
  const priorities = ['High', 'Medium', 'Low'];
  
  return {
    id: faker.string.uuid(),
    saasId: saas.id,
    saasName: saas.name,
    type: types[index % types.length],
    description: `${types[index % types.length]} obligation for ${saas.name}`,
    dueDate: faker.date.future().toISOString().slice(0, 10),
    status: statuses[index % statuses.length],
    priority: priorities[index % priorities.length]
  };
});

// Mock contracts data
export const mockContracts: ContractDocument[] = mockSaaSData.flatMap((saas, index) => {
  const baseId = faker.string.uuid();
  
  // Create a main contract document
  const mainContract: ContractDocument = {
    id: baseId,
    title: `${saas.name} Contract`,
    type: "Contract",
    saasId: saas.id,
    saasName: saas.name,
    dateAdded: faker.date.past().toISOString(),
    size: `${faker.number.int({ min: 1, max: 10 })} MB`,
    contractPeriod: {
      start: saas.contract.startDate,
      end: saas.contract.endDate
    },
    isRenewal: index % 3 !== 0 // Every third contract is not a renewal
  };
  
  // Create some related documents
  const relatedDocs: ContractDocument[] = [];
  
  // Add an amendment for some contracts
  if (index % 4 === 0) {
    relatedDocs.push({
      id: faker.string.uuid(),
      title: `${saas.name} Contract Amendment`,
      type: "Amendment",
      saasId: saas.id,
      saasName: saas.name,
      dateAdded: faker.date.recent().toISOString(),
      size: `${faker.number.int({ min: 100, max: 500 })} KB`,
      relatedContractId: baseId
    });
  }
  
  // Add invoices for all contracts
  relatedDocs.push({
    id: faker.string.uuid(),
    title: `${saas.name} Invoice Q1`,
    type: "Invoice",
    saasId: saas.id,
    saasName: saas.name,
    dateAdded: faker.date.recent().toISOString(),
    size: `${faker.number.int({ min: 100, max: 500 })} KB`,
    relatedContractId: baseId
  });
  
  return [mainContract, ...relatedDocs];
});
