export enum ReviewTypeEnum {
  Company = "company",
  Salary = "salary",
  Interview = "interview",
}

export interface IFormValues {
  reviewType: ReviewTypeEnum | null;
  companyName: string | null;
  roleType: string | null;
  totalWorkExperience: string | null;
  overallRating: number | null;
  pros: string | null;
  cons: string | null;
  salary: number | null;
  employmentType: string | null;
}

export interface ICompanyReviewFieldsProps {
  experienceOptions: string[];
  control: any;
  errors: any;
  register: any;
  employmentTypes: { value: string; label: string }[];
}

export interface ISelectFieldProps {
  name: string;
  control: any;
  label: string;
  options: string[];
  error?: { message: string };
  required?: boolean;
}

export interface IRatingFieldProps {
  control: any;
  error?: { message: string };
  label?: string;
  description?: string;
}

export interface ITextareaFieldProps {
  id: string;
  label: string;
  register: any;
  error?: { message: string };
  placeholder: string;
}

export interface IReviewType {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  disabled?: boolean;
}

export interface ISelectReviewTypeProps {
  reviewTypes: IReviewType[];
  control: any;
  errors: any;
  roleOptions: string[];
  companyOptions: string[];
}

export interface ISalaryReviewFieldsProps {
  control: any;
  experienceOptions: string[];
  employmentTypes: { value: string; label: string }[];
  errors: any;
  register: any;
}

export interface ISalaryInputProps {
  register: any;
  error?: { message: string };
}
