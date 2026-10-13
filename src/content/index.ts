import resumeData from "./resume.json";
import employeeTaskData from "./case-studies/employee-task-management.json";
import giftDeliveryData from "./case-studies/gift-delivery-ecommerce.json";
import {
  ResumeContentSchema,
  CaseStudyContentSchema,
  ResumeContent,
  CaseStudyContent,
} from "../lib/validators/contentValidator";

export function getResumeContent(): ResumeContent {
  return ResumeContentSchema.parse(resumeData);
}

export function getAllCaseStudies(): CaseStudyContent[] {
  const c1 = CaseStudyContentSchema.parse(employeeTaskData);
  const c2 = CaseStudyContentSchema.parse(giftDeliveryData);
  return [c1, c2];
}

export function getCaseStudyBySlug(slug: string): CaseStudyContent | null {
  const studies = getAllCaseStudies();
  return studies.find((s) => s.slug === slug) ?? null;
}
