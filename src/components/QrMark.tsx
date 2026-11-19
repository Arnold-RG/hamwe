function hash(value: string): number {
  return Array.from(value).reduce((sum, char) => (sum * 33 + char.charCodeAt(0)) >>> 0, 5381)
}

function inFinder(row: number, col: number, size: number): boolean {
  const inBox = (r: number, c: number, originR: number, originC: number) =>
    r >= originR && r < originR + 7 && c >= originC && c < originC + 7
  return inBox(row, col, 0, 0) || inBox(row, col, 0, size - 7) || inBox(row, col, size - 7, 0)
}

function finderCell(row: number, col: number, originR: number, originC: number): boolean {
  const r = row - originR
  const c = col - originC
  return r === 0 || c === 0 || r === 6 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)
}

export function QrMark({ value, label }: { value: string; label: string }) {
  const size = 25
  const seed = hash(value)
  const cells: boolean[][] = []

  for (let row = 0; row < size; row += 1) {
    cells[row] = []
    for (let col = 0; col < size; col += 1) {
      if (inFinder(row, col, size)) {
        const originC = col >= size - 7 ? size - 7 : 0
        const originR = row >= size - 7 ? size - 7 : 0
        cells[row][col] = finderCell(row, col, originR, originC)
      } else if (row === 6 || col === 6) {
        cells[row][col] = (row + col) % 2 === 0
      } else {
        const bit = (seed ^ (row * 131 + col * 17 + value.length * 9)) >>> (col % 16)
        cells[row][col] = (bit & 1) === 1
      }
    }
  }

  return (
    <figure className="qr-mark">
      <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Ticket QR ${label}`}>
        <rect width={size} height={size} fill="#f7f4ea" />
        {cells.flatMap((line, row) =>
          line.map((on, col) =>
            on ? <rect key={`${row}-${col}`} x={col} y={row} width="1" height="1" fill="#141c16" /> : null,
          ),
        )}
      </svg>
      <figcaption>{label}</figcaption>
    </figure>
  )
}
