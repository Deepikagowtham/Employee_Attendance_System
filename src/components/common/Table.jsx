"use client"
import "../styles/table.css"

const Table = ({ columns, data, loading = false, onRowClick = null }) => {
  if (loading) {
    return <div className="table-loading">Loading...</div>
  }

  if (!data || data.length === 0) {
    return <div className="table-empty">No data available</div>
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className={onRowClick ? "clickable" : ""} onClick={() => onRowClick?.(row)}>
              {columns.map((col) => (
                <td key={col.key}>{col.render ? col.render(row[col.key], row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
