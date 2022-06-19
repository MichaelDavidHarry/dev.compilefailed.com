const ExcelColumnIndexMapper = require('./ExcelColumnIndexMapper');

test('getExcelColumnNameForIndex 0 should be "A"', () => {
  expect(ExcelColumnIndexMapper.getExcelColumnNameForIndex(0)).toBe("A");
});

test('getExcelColumnNameForIndex 1 should be "B"', () => {
  expect(ExcelColumnIndexMapper.getExcelColumnNameForIndex(1)).toBe("B");
});

test('getExcelColumnNameForIndex 25 should be "Z"', () => {
  expect(ExcelColumnIndexMapper.getExcelColumnNameForIndex(25)).toBe("Z");
});

test('getExcelColumnNameForIndex 26 should be "AA"', () => {
  expect(ExcelColumnIndexMapper.getExcelColumnNameForIndex(26)).toBe("AA");
});

test('getExcelColumnNameForIndex 702 should be "AAA"', () => {
  expect(ExcelColumnIndexMapper.getExcelColumnNameForIndex(702)).toBe("AAA");
});

test('getExcelColumnNameForIndex 16383 should be "XFD"', () => {
  expect(ExcelColumnIndexMapper.getExcelColumnNameForIndex(16383)).toBe("XFD");
});

test('getIndexForExcelColumnName "A" should be 0', () => {
  expect(ExcelColumnIndexMapper.getIndexForExcelColumnName("A")).toBe(0);
});

test('getIndexForExcelColumnName "B" should be 1', () => {
  expect(ExcelColumnIndexMapper.getIndexForExcelColumnName("B")).toBe(1);
});

test('getIndexForExcelColumnName "Z" should be 25', () => {
  expect(ExcelColumnIndexMapper.getIndexForExcelColumnName("Z")).toBe(25);
});

test('getIndexForExcelColumnName "AA" should be 26', () => {
  expect(ExcelColumnIndexMapper.getIndexForExcelColumnName("AA")).toBe(26);
});

test('getIndexForExcelColumnName "AAA" should be 702', () => {
  expect(ExcelColumnIndexMapper.getIndexForExcelColumnName("AAA")).toBe(702);
});

test('getIndexForExcelColumnName "XFD" should be 16383', () => {
  expect(ExcelColumnIndexMapper.getIndexForExcelColumnName("XFD")).toBe(16383);
});