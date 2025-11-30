/**
 * CSV Export Utility
 * Handles client-side CSV export functionality
 */

export const exportToCSV = (csvContent, filename = "export.csv") => {
  // Create a Blob from the CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

  // Create a temporary link element
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  // Set link attributes
  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"

  // Append to body, click, and remove
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // Clean up the URL object
  URL.revokeObjectURL(url)
}

/**
 * Convert array of objects to CSV string
 */
export const arrayToCSV = (data) => {
  if (!data || data.length === 0) return ""

  // Get headers from first object
  const headers = Object.keys(data[0])

  // Create header row
  const headerRow = headers.map((h) => `"${h}"`).join(",")

  // Create data rows
  const dataRows = data.map((row) =>
    headers
      .map((header) => {
        const value = row[header]
        // Escape quotes and wrap in quotes if contains comma
        if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return `"${value}"`
      })
      .join(","),
  )

  return [headerRow, ...dataRows].join("\n")
}
