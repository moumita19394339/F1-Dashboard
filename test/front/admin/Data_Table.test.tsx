import { render, screen, fireEvent } from '@testing-library/react'
import { DataTable, Column } from '../../../components/admin/DataTable'

type TestRow = {
  id: number
  name: string
  age: number
}

describe('DataTable', () => {
  const mockData: TestRow[] = [
    { id: 1, name: 'Charles', age: 26 },
    { id: 2, name: 'Max', age: 24 },
    { id: 3, name: 'Lewis', age: 39 },
  ]

  const mockColumns: Column<TestRow>[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'age', header: 'Age', sortable: true },
  ]

  test('renders table headers and rows', () => {
    render(<DataTable data={mockData} columns={mockColumns} keyField="id" />)

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
    expect(screen.getByText('Charles')).toBeInTheDocument()
    expect(screen.getByText('Max')).toBeInTheDocument()
    expect(screen.getByText('Lewis')).toBeInTheDocument()
  })

  test('shows loading message when isLoading is true', () => {
    render(
      <DataTable
        data={[]}
        columns={mockColumns}
        keyField="id"
        isLoading={true}
      />
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('shows empty message when data is empty', () => {
    render(
      <DataTable
        data={[]}
        columns={mockColumns}
        keyField="id"
        emptyMessage="No records found"
      />
    )

    expect(screen.getByText('No records found')).toBeInTheDocument()
  })

  test('calls onRowClick when a row is clicked', () => {
    const handleRowClick = jest.fn()

    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
        keyField="id"
        onRowClick={handleRowClick}
      />
    )

    fireEvent.click(screen.getByText('Charles'))
    expect(handleRowClick).toHaveBeenCalledTimes(1)
    expect(handleRowClick).toHaveBeenCalledWith(mockData[0])
  })

  test('sorts rows in ascending order when name header is clicked once', () => {
    render(<DataTable data={mockData} columns={mockColumns} keyField="id" />)

    fireEvent.click(screen.getByText('Name'))

    const rows = screen.getAllByRole('row')
    expect(rows[1]).toHaveTextContent('Charles')
    expect(rows[2]).toHaveTextContent('Lewis')
    expect(rows[3]).toHaveTextContent('Max')
  })

  test('sorts rows in descending order when name header is clicked twice', () => {
    render(<DataTable data={mockData} columns={mockColumns} keyField="id" />)

    const nameHeader = screen.getByText('Name')
    fireEvent.click(nameHeader)
    fireEvent.click(nameHeader)

    const rows = screen.getAllByRole('row')
    expect(rows[1]).toHaveTextContent('Max')
    expect(rows[2]).toHaveTextContent('Lewis')
    expect(rows[3]).toHaveTextContent('Charles')
  })

  test('sorts numeric column correctly', () => {
    render(<DataTable data={mockData} columns={mockColumns} keyField="id" />)

    fireEvent.click(screen.getByText('Age'))

    const rows = screen.getAllByRole('row')
    expect(rows[1]).toHaveTextContent('Max')
    expect(rows[2]).toHaveTextContent('Charles')
    expect(rows[3]).toHaveTextContent('Lewis')
  })

  test('does not sort when column is not sortable', () => {
    const nonSortableColumns: Column<TestRow>[] = [
      { key: 'name', header: 'Name', sortable: false },
      { key: 'age', header: 'Age', sortable: true },
    ]

    render(
      <DataTable
        data={mockData}
        columns={nonSortableColumns}
        keyField="id"
      />
    )

    fireEvent.click(screen.getByText('Name'))

    const rows = screen.getAllByRole('row')
    expect(rows[1]).toHaveTextContent('Charles')
    expect(rows[2]).toHaveTextContent('Max')
    expect(rows[3]).toHaveTextContent('Lewis')
  })

  test('sorts mixed-type column using fallback string comparison', () => {
  type MixedRow = {
    id: number
    value: string | number
  }

  const mixedData: MixedRow[] = [
    { id: 1, value: '2' },
    { id: 2, value: 10 },
    { id: 3, value: '5' },
  ]

  const mixedColumns: Column<MixedRow>[] = [
    { key: 'value', header: 'Value', sortable: true },
  ]

  render(<DataTable data={mixedData} columns={mixedColumns} keyField="id" />)

  fireEvent.click(screen.getByText('Value'))

  const rows = screen.getAllByRole('row')
  expect(rows[1]).toHaveTextContent('10')
  expect(rows[2]).toHaveTextContent('2')
  expect(rows[3]).toHaveTextContent('5')
})
})