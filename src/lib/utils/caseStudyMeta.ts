export const CASE_STUDY_IMAGES: Record<string, string> = {
  "employee-task-management": "/images/case-study-task-management.jpg",
  "gift-delivery-ecommerce": "/images/case-study-ecommerce.jpg",
};

export function getCaseStudyCategory(slug: string): string {
  return slug === "employee-task-management"
    ? "Backend Architecture"
    : "Full-Stack Web";
}

export function getShortProjectLabel(title: string, maxWords = 2): string {
  const words = title.trim().split(/\s+/).filter(Boolean);
  return words.slice(0, maxWords).join(" ");
}
