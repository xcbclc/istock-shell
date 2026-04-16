import { describe, it, expect } from 'vitest';
import {
  transposeMatrix,
  transposeTable,
  rotateMatrix,
  sortTable,
  filterTable,
  selectColumns,
  renameColumns,
  concatTables,
  leftJoin,
  innerJoin,
  groupBy,
  aggregate,
  pivotTable,
  tableDescriptiveStats,
} from '../../src/table-operations';

describe('transposeMatrix', () => {
  it('should transpose matrix correctly', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const result = transposeMatrix(matrix);
    expect(result).toEqual([
      [1, 4],
      [2, 5],
      [3, 6],
    ]);
  });

  it('should handle empty matrix', () => {
    expect(transposeMatrix([])).toEqual([]);
  });

  it('should throw error for inconsistent row lengths', () => {
    const matrix = [
      [1, 2],
      [3, 4, 5],
    ];
    expect(() => transposeMatrix(matrix)).toThrow('All rows must have the same length');
  });
});

describe('transposeTable', () => {
  it('should transpose table correctly', () => {
    const table = [
      { a: 1, b: 2 },
      { a: 3, b: 4 },
    ];
    const result = transposeTable(table);
    expect(result).toEqual([
      { row_0: 1, row_1: 3 },
      { row_0: 2, row_1: 4 },
    ]);
  });
});

describe('rotateMatrix', () => {
  it('should rotate matrix 90 degrees clockwise', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const result = rotateMatrix(matrix);
    expect(result).toEqual([
      [4, 1],
      [5, 2],
      [6, 3],
    ]);
  });
});

describe('sortTable', () => {
  const table = [
    { name: 'Alice', age: 30, salary: 50000 },
    { name: 'Bob', age: 25, salary: 45000 },
    { name: 'Charlie', age: 35, salary: 60000 },
    { name: 'Alice', age: 28, salary: 48000 },
  ];

  it('should sort by single column ascending', () => {
    const result = sortTable(table, 'age');
    expect(result[0].name).toBe('Bob'); // age 25
    expect(result[3].name).toBe('Charlie'); // age 35
  });

  it('should sort by single column descending', () => {
    const result = sortTable(table, 'age', 'desc');
    expect(result[0].name).toBe('Charlie'); // age 35
    expect(result[3].name).toBe('Bob'); // age 25
  });

  it('should sort by multiple columns', () => {
    const result = sortTable(table, ['name', 'age']);
    expect(result[0].name).toBe('Alice');
    expect(result[0].age).toBe(28);
    expect(result[1].name).toBe('Alice');
    expect(result[1].age).toBe(30);
  });
});

describe('filterTable', () => {
  const table = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 },
  ];

  it('should filter rows based on predicate', () => {
    const result = filterTable(table, (row) => row.age > 30);
    expect(result).toEqual([{ name: 'Charlie', age: 35 }]);
  });
});

describe('selectColumns', () => {
  const table = [
    { name: 'Alice', age: 30, salary: 50000 },
    { name: 'Bob', age: 25, salary: 45000 },
  ];

  it('should select specified columns', () => {
    const result = selectColumns(table, ['name', 'age']);
    expect(result).toEqual([
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
    ]);
  });

  it('should handle missing columns', () => {
    const result = selectColumns(table, ['name', 'department']);
    expect(result).toEqual([{ name: 'Alice' }, { name: 'Bob' }]);
  });
});

describe('renameColumns', () => {
  const table = [
    { oldName: 'Alice', oldAge: 30 },
    { oldName: 'Bob', oldAge: 25 },
  ];

  it('should rename columns according to mapping', () => {
    const result = renameColumns(table, { oldName: 'name', oldAge: 'age' });
    expect(result).toEqual([
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
    ]);
  });

  it('should leave unmapped columns unchanged', () => {
    const result = renameColumns(table, { oldName: 'name' });
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('oldAge');
  });
});

describe('concatTables', () => {
  it('should concatenate multiple tables', () => {
    const table1 = [{ a: 1 }, { a: 2 }];
    const table2 = [{ a: 3 }];
    const table3 = [{ a: 4 }, { a: 5 }];
    const result = concatTables([table1, table2, table3]);
    expect(result).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }]);
  });
});

describe('leftJoin', () => {
  const left = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];
  const right = [
    { employeeId: 1, salary: 50000 },
    { employeeId: 2, salary: 45000 },
    { employeeId: 4, salary: 60000 },
  ];

  it('should perform left join', () => {
    const result = leftJoin(left, right, 'id', 'employeeId');
    expect(result).toEqual([
      { id: 1, name: 'Alice', salary: 50000 },
      { id: 2, name: 'Bob', salary: 45000 },
      { id: 3, name: 'Charlie' }, // no match in right table
    ]);
  });
});

describe('innerJoin', () => {
  const left = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ];
  const right = [
    { employeeId: 1, salary: 50000 },
    { employeeId: 2, salary: 45000 },
    { employeeId: 4, salary: 60000 },
  ];

  it('should perform inner join', () => {
    const result = innerJoin(left, right, 'id', 'employeeId');
    expect(result).toEqual([
      { id: 1, name: 'Alice', salary: 50000 },
      { id: 2, name: 'Bob', salary: 45000 },
      // Charlie (id=3) not included because no match
    ]);
  });
});

describe('groupBy', () => {
  const table = [
    { department: 'HR', employee: 'Alice', salary: 50000 },
    { department: 'IT', employee: 'Bob', salary: 60000 },
    { department: 'HR', employee: 'Charlie', salary: 55000 },
    { department: 'IT', employee: 'David', salary: 65000 },
  ];

  it('should group by single column', () => {
    const groups = groupBy(table, 'department');
    expect(Object.keys(groups)).toEqual(['HR', 'IT']);
    expect(groups.HR).toHaveLength(2);
    expect(groups.IT).toHaveLength(2);
  });

  it('should group by multiple columns', () => {
    const table2 = [
      { dept: 'A', role: 'Manager', name: 'Alice' },
      { dept: 'A', role: 'Staff', name: 'Bob' },
      { dept: 'B', role: 'Manager', name: 'Charlie' },
      { dept: 'A', role: 'Manager', name: 'David' },
    ];
    const groups = groupBy(table2, ['dept', 'role']);
    expect(groups['A|Manager']).toHaveLength(2);
    expect(groups['A|Staff']).toHaveLength(1);
    expect(groups['B|Manager']).toHaveLength(1);
  });
});

describe('aggregate', () => {
  const table = [
    { department: 'HR', salary: 50000 },
    { department: 'IT', salary: 60000 },
    { department: 'HR', salary: 55000 },
    { department: 'IT', salary: 65000 },
  ];

  it('should aggregate data by group', () => {
    const result = aggregate(table, 'department', {
      salary: 'mean',
      count: 'count',
    });
    expect(result).toEqual([
      { department: 'HR', salary: 52500, count: 2 },
      { department: 'IT', salary: 62500, count: 2 },
    ]);
  });

  it('should support multiple aggregate functions', () => {
    const result = aggregate(table, 'department', {
      salary: 'sum',
      minSalary: 'min',
      maxSalary: 'max',
    });
    expect(result).toEqual([
      { department: 'HR', salary: 105000, minSalary: 50000, maxSalary: 55000 },
      { department: 'IT', salary: 125000, minSalary: 60000, maxSalary: 65000 },
    ]);
  });
});

describe('pivotTable', () => {
  const salesData = [
    { region: 'North', product: 'A', sales: 100 },
    { region: 'North', product: 'B', sales: 150 },
    { region: 'South', product: 'A', sales: 200 },
    { region: 'South', product: 'B', sales: 250 },
    { region: 'North', product: 'A', sales: 120 },
    { region: 'South', product: 'B', sales: 300 },
  ];

  it('should create pivot table with sum aggregation', () => {
    const result = pivotTable(salesData, 'region', 'product', 'sales', 'sum');
    expect(result).toEqual([
      { region: 'North', A: 220, B: 150 }, // A: 100+120, B: 150
      { region: 'South', A: 200, B: 550 }, // A: 200, B: 250+300
    ]);
  });

  it('should create pivot table with mean aggregation', () => {
    const result = pivotTable(salesData, 'region', 'product', 'sales', 'mean');
    expect(result).toEqual([
      { region: 'North', A: 110, B: 150 }, // A: (100+120)/2 = 110
      { region: 'South', A: 200, B: 275 }, // A: 200, B: (250+300)/2 = 275
    ]);
  });
});

describe('tableDescriptiveStats', () => {
  const table = [
    { id: 1, age: 25, salary: 50000 },
    { id: 2, age: 30, salary: 60000 },
    { id: 3, age: 35, salary: 70000 },
    { id: 4, age: 28, salary: 55000 },
    { id: 5, age: 32, salary: 65000 },
  ];

  it('should compute descriptive statistics for numeric columns', () => {
    const stats = tableDescriptiveStats(table);
    expect(stats.age).toBeDefined();
    expect(stats.salary).toBeDefined();
    expect(stats.id).toBeDefined();

    expect(stats.age.mean).toBeCloseTo(30);
    expect(stats.age.min).toBe(25);
    expect(stats.age.max).toBe(35);
    expect(stats.salary.mean).toBe(60000);
  });

  it('should handle non-numeric columns', () => {
    const table2 = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
    ];
    const stats = tableDescriptiveStats(table2);
    expect(stats.name.mean).toBeNull();
    expect(stats.name.count).toBe(2);
  });
});
