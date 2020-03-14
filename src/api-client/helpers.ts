// [0,0] [1,0] [2,0] [3,0] [4,0]
// [0,1] [1,1] [2,1] [3,1] [4,1]
// [0,2] [1,2] [2,2] [3,2] [4,2]
// [0,3] [1,3] [2,3] [3,3] [4,3]
// [0,4] [1,4] [2,4] [3,4] [4,4]
import {map, slice} from "lodash";

export function slice2d(matrix: string[][], start: [number, number]=[0, 0], end: [number, number]): string[][] {
    const [x1, y1, x2, y2] = [...start, ...end];
    return map(slice(matrix, y1, y2), (row: string[]) => slice(row, x1, x2));
}

