export const slugify = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "-")
    .replace(/^-+|-+$/g, "");
};
