export interface TsoPricingResult {
  proposedCapacity: string;
  expectedComboPrice: string;
  estimatedMonthlySavings: string;
  expectedPaybackPeriod: string;
  isEffective: boolean;
}

export const tsoGetPricingOptions = (bill: number): TsoPricingResult => {
  if (bill < 1500000) {
    return {
      proposedCapacity: "pricing.notSuitable",
      expectedComboPrice: "-",
      estimatedMonthlySavings: "-",
      expectedPaybackPeriod: "-",
      isEffective: false,
    };
  } else if (bill < 2000000) { // Actually 1tr5 - 2tr can be <= 2000000 but < is fine. Let's use <= as in most brackets
    return {
      proposedCapacity: "3kWp - Lưu trữ 5kWh",
      expectedComboPrice: "69.000.000",
      estimatedMonthlySavings: "~ 1.400.000",
      expectedPaybackPeriod: "~ 4 năm",
      isEffective: true,
    };
  } else if (bill <= 3000000) {
    return {
      proposedCapacity: "5kWp - Lưu trữ 10kWh",
      expectedComboPrice: "99.000.000",
      estimatedMonthlySavings: "~ 2.300.000",
      expectedPaybackPeriod: "~ 4 năm",
      isEffective: true,
    };
  } else if (bill <= 5000000) {
    return {
      proposedCapacity: "8kWp - Lưu trữ 16kWh",
      expectedComboPrice: "139.000.000",
      estimatedMonthlySavings: "~ 3.700.000",
      expectedPaybackPeriod: "~ 4 năm",
      isEffective: true,
    };
  } else if (bill <= 8000000) {
    return {
      proposedCapacity: "12kWp - Lưu trữ 32kWh",
      expectedComboPrice: "189.000.000",
      estimatedMonthlySavings: "~ 6.000.000",
      expectedPaybackPeriod: "~ 4 năm",
      isEffective: true,
    };
  }

  // Fallback for bill > 8000000 (handled primarily by the UI component)
  return {
    proposedCapacity: "pricing.contactForPrice",
    expectedComboPrice: "-",
    estimatedMonthlySavings: "-",
    expectedPaybackPeriod: "-",
    isEffective: true,
  };
};
