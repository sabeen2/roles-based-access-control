export const capitalizeFirstLetter = (str: string): string => {
  if (!str) {
    return "";
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeString = (str: string): string => {
  if (!str) {
    return "";
  }

  return str
    .split(/(\s+|\b)/)
    .map((word) =>
      /^[a-zA-Z]+$/.test(word) ? capitalizeFirstLetter(word) : word
    )
    .join("");
};

export const convertStrIntoSlug = (str: string = "") => {
  return str.trim().toLowerCase().split(" ").join("-");
};

export const convertStrWhiteSpace = (str: string = "") => {
  return str.trim().split(" ").join("-");
};

export const singularOrPlural = (
  count: number,
  singularStr: string,
  pluralStr: string
) => {
  return count === 0 || count > 1 ? pluralStr : singularStr;
};

export const addCommas = (value: number | string = 0) => {
  const val = typeof value === "string" ? Number(value) : value;

  if (typeof val !== "number") {
    return "";
  }

  return new Intl.NumberFormat("en-IN").format(val);
};
