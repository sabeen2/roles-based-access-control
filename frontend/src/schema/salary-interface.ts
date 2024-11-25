export interface IPositionData {
  position: string;
  salary: number;
  description: string;
}

export interface ITopSalaries {
  position: string;
  reportCount: number;
}

export interface ISalary {
  amount: number;
  experience: string;
  location: string;
}

export interface IPosition {
  title: string;
  salaries: ISalary[];
}

export interface ICompanyData {
  name: string;
  logo: string;
  description: string;
  employeeCount: string;
  industry: string;
  headquarters: string;
  positions: IPosition[];
}

export interface IIndustryAverages {
  [jobTitle: string]: number;
}

export interface ISalaryCardProps {
  searchTerm?: string | undefined;
  companyData: ICompanyData;
  industryAverages: IIndustryAverages;
}

export interface ISalariesCard {
  id: number;
  name: string;
  positions: number;
  salaries: number;
  industry: string;
  avgSalary: number;
}

export interface ISalariesCardProps {
  filteredCompanies: ISalariesCard[];
}
