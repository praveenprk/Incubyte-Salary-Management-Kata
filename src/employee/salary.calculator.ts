export function calculateSalary(gross: number, country: string) {
  // const c = country.toLowerCase()
  const c = country;
  let tdsRate = 0

  if (c === 'india') tdsRate = 0.10
  else if (c === 'united states') tdsRate = 0.12

  const tds = gross * tdsRate
  const netSalary = gross - tds

  return { tds, netSalary }
}