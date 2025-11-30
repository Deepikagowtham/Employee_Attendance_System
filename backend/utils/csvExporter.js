export const generateCSV = (data, headers) => {
  // Convert headers object to CSV header row
  const headerKeys = Object.keys(headers)
  const headerRow = headerKeys.map((key) => headers[key]).join(",")

  // Convert data rows
  const dataRows = data.map((row) => {
    return headerKeys
      .map((key) => {
        const value = row[key]
        // Handle dates
        if (value instanceof Date) {
          return value.toISOString().split("T")[0]
        }
        // Handle commas in values by wrapping in quotes
        return typeof value === "string" && value.includes(",") ? `"${value}"` : value || ""
      })
      .join(",")
  })

  return [headerRow, ...dataRows].join("\n")
}
