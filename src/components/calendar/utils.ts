
import { SaaSData } from "@/lib/mockData";
import { addDays, isBefore, isAfter } from "date-fns";

/**
 * Filters renewals due in the next 90 days
 */
export function getUpcomingRenewals(saasData: SaaSData[]) {
  const today = new Date();
  const ninetyDaysFromNow = addDays(today, 90);
  
  // Filter renewals due in the next 90 days
  const renewals = saasData
    .filter(saas => saas.renewalDate !== "N/A")
    .map(saas => ({
      ...saas,
      renewalDateObj: new Date(saas.renewalDate)
    }));
  
  const upcomingRenewals = renewals.filter(saas => 
    isBefore(saas.renewalDateObj, ninetyDaysFromNow) && 
    saas.renewalDateObj >= today
  ).sort((a, b) => a.renewalDateObj.getTime() - b.renewalDateObj.getTime());
  
  // Calculate upcoming renewal amounts
  const upcomingRenewalAmount = upcomingRenewals.reduce((total, saas) => total + saas.price, 0);

  return { renewals, upcomingRenewals, upcomingRenewalAmount };
}

/**
 * Filters payments due in the next 30 days
 */
export function getUpcomingPayments(saasData: SaaSData[]) {
  const today = new Date();
  const thirtyDaysFromNow = addDays(today, 30);
  
  // Filter payments due in the next 30 days
  const paymentsData = saasData.filter(saas => {
    if (saas.lastPayment && saas.lastPayment.date) {
      // Assuming monthly payments based on last payment date
      const lastPaymentDate = new Date(saas.lastPayment.date);
      const nextPaymentDate = new Date(lastPaymentDate);
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
      
      return isAfter(nextPaymentDate, today) && isBefore(nextPaymentDate, thirtyDaysFromNow);
    }
    return false;
  });

  const paymentsAmount = paymentsData.reduce((total, saas) => 
    total + (saas.lastPayment ? saas.lastPayment.amount : 0), 0);

  return { paymentsData, paymentsAmount };
}

/**
 * Filters terminations with deadlines in the next 30 days
 */
export function getUpcomingTerminations(saasData: SaaSData[]) {
  const today = new Date();
  const thirtyDaysFromNow = addDays(today, 30);
  
  // Filter terminations with deadlines in the next 30 days
  const terminationsData = saasData.filter(saas => {
    if (saas.contract) {
      const deadlineDate = new Date(saas.contract.cancellationDeadline || saas.contract.endDate);
      return isAfter(deadlineDate, today) && isBefore(deadlineDate, thirtyDaysFromNow);
    }
    return false;
  });

  return { terminationsData };
}
