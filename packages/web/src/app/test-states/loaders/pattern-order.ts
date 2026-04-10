import type { GridSize, LoaderPattern } from "./types";

/**
 * Returns an array of length `size*size` where `result[i]` is the order
 * position (0-based) of cell `i` (row-major) in the animation sequence.
 * Cells that share an order value animate together.
 */
export function getPatternOrder(
  size: GridSize,
  pattern: LoaderPattern,
): number[] {
  const total = size * size;
  const order = new Array<number>(total).fill(0);
  const indexOf = (row: number, col: number) => row * size + col;

  switch (pattern) {
    case "sequential": {
      for (let i = 0; i < total; i++) order[i] = i;
      return order;
    }

    case "reverse": {
      for (let i = 0; i < total; i++) order[i] = total - 1 - i;
      return order;
    }

    case "rows": {
      for (let r = 0; r < size; r++)
        for (let c = 0; c < size; c++) order[indexOf(r, c)] = r;
      return order;
    }

    case "columns": {
      for (let r = 0; r < size; r++)
        for (let c = 0; c < size; c++) order[indexOf(r, c)] = c;
      return order;
    }

    case "diagonal": {
      for (let r = 0; r < size; r++)
        for (let c = 0; c < size; c++) order[indexOf(r, c)] = r + c;
      return order;
    }

    case "center": {
      const mid = (size - 1) / 2;
      for (let r = 0; r < size; r++)
        for (let c = 0; c < size; c++)
          order[indexOf(r, c)] = Math.round(
            Math.max(Math.abs(r - mid), Math.abs(c - mid)),
          );
      return order;
    }

    case "checker": {
      for (let r = 0; r < size; r++)
        for (let c = 0; c < size; c++) order[indexOf(r, c)] = (r + c) % 2;
      return order;
    }

    case "cross": {
      const mid = Math.floor(size / 2);
      for (let r = 0; r < size; r++)
        for (let c = 0; c < size; c++)
          order[indexOf(r, c)] = r === mid || c === mid ? 0 : 1;
      return order;
    }

    case "breathe": {
      for (let i = 0; i < total; i++) order[i] = 0;
      return order;
    }

    case "snake": {
      let pos = 0;
      for (let r = 0; r < size; r++) {
        if (r % 2 === 0) {
          for (let c = 0; c < size; c++) order[indexOf(r, c)] = pos++;
        } else {
          for (let c = size - 1; c >= 0; c--) order[indexOf(r, c)] = pos++;
        }
      }
      return order;
    }

    case "spiral": {
      let top = 0;
      let bottom = size - 1;
      let left = 0;
      let right = size - 1;
      let pos = 0;
      while (top <= bottom && left <= right) {
        for (let c = left; c <= right; c++) order[indexOf(top, c)] = pos++;
        top++;
        for (let r = top; r <= bottom; r++) order[indexOf(r, right)] = pos++;
        right--;
        if (top <= bottom) {
          for (let c = right; c >= left; c--) order[indexOf(bottom, c)] = pos++;
          bottom--;
        }
        if (left <= right) {
          for (let r = bottom; r >= top; r--) order[indexOf(r, left)] = pos++;
          left++;
        }
      }
      return order;
    }

    case "arch": {
      // Ordered by column distance from center, ties broken by row (top first)
      const mid = (size - 1) / 2;
      const cells: Array<{ idx: number; key: number }> = [];
      for (let r = 0; r < size; r++)
        for (let c = 0; c < size; c++)
          cells.push({
            idx: indexOf(r, c),
            key: Math.abs(c - mid) * size + r,
          });
      cells.sort((a, b) => a.key - b.key);
      cells.forEach((cell, i) => (order[cell.idx] = i));
      return order;
    }
  }
}
