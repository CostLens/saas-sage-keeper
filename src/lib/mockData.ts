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
  contract: {
    startDate: string;
    endDate: string;
    term: string;
    autoRenew: boolean;
    terminationClause: string;
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

  return {
    id: faker.string.uuid(),
    name: name,
    logo: faker.image.url(),
    category: faker.commerce.department(),
    description: faker.lorem.sentence(),
    renewalDate: faker.date.future().toISOString().slice(0, 10),
    price: price,
    active: active,
    contract: {
      startDate: startDate,
      endDate: endDate,
      term: faker.helpers.arrayElement(['Monthly', 'Annual', 'Quarterly']),
      autoRenew: autoRenew,
      terminationClause: faker.lorem.sentence(),
    },
    usage: {
      totalLicenses: totalLicenses,
      activeUsers: activeUsers,
      utilizationRate: utilizationRate,
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
