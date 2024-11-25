export interface ICompanyInterface {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  logo: string;
  category: string;
  location: string;
}

export interface ICompaniesProps {
  filteredCompanies: ICompanyInterface[];
}

export interface ICompanyPageProps {
  params: { companyId: string[] };
  searchParams?: { tab: string };
}

export interface ICompanyDetailsProps {
  companyId: string[];
  tab: string | undefined;
}
