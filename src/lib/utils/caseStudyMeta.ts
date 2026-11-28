export const CASE_STUDY_IMAGES: Record<string, string> = {
  "employee-task-management": "/images/case-study-task-management.jpg",
  "gift-delivery-ecommerce": "/images/case-study-ecommerce.jpg",
};

export function getCaseStudyCategory(slug: string): string {
  return slug === "employee-task-management"
    ? "Backend Architecture"
    : "Full-Stack Web";
}
