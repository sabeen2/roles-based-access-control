export function filterNullValues(obj: any) {
  return Object?.fromEntries(
    Object?.entries(obj)?.filter(([value]) => value !== null)
  );
}
