import { rankItem } from "@tanstack/match-sorter-utils"
import { ColumnDef, FilterFn, SortingState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import moment from "moment"
import { useEffect, useMemo, useState } from "react"
import { RiSearch2Line } from "react-icons/ri"
import { Overwrite } from "src/helper"
import { FishType } from "src/hooks/useFishs"
import SortColumnTable from "../sortColumnTable"
import RowTableFishPriceSkeleton from "./rowTableFishPriceSkeleton"
import 'src/styles/pages/fishPrice/tableFishPrice.scss'
import Button from "../button"
import { MdAdd } from 'react-icons/md'

interface TableFishPriceProps {
    fishs: FishType[] | undefined
}

type FishTypeWithIndex = Overwrite<FishType, {
    index: number
}>

const TableFishPrice = ({ fishs }: TableFishPriceProps) => {
    const [data, setData] = useState<FishTypeWithIndex[]>([])
    const [globalFilter, setGlobalFilter] = useState<string>('')
    const [sortRankFish, setSortRankFish] = useState<SortingState>([])
    const columns = useMemo<ColumnDef<FishTypeWithIndex>[]>(() => [
        {
            accessorKey: 'index',
            header: 'No',
            cell: info => (
                <div>
                    {info.getValue<number>()}
                </div>
            )
        },
        {
            accessorKey: 'area_kota',
            header: 'Kota',
            cell: info => info.getValue()
        },
        {
            accessorKey: 'area_provinsi',
            header: 'Provinsi',
            cell: info => info.getValue()
        },
        {
            accessorKey: 'komoditas',
            header: 'Ikan',
            cell: info => info.getValue()
        },
        {
            accessorKey: 'price',
            header: 'Harga',
            cell: info => info.getValue()
        },
        {
            accessorKey: 'size',
            header: 'Ukuran',
            cell: info => info.getValue()
        },
        {
            accessorKey: 'timestamp',
            header: 'Tanggal',
            cell: info => moment(info.getValue<number>()).format('MMMM DD YYYY hh:mm')
        },
    ], [])
    const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
        const itemRank = rankItem(row.getValue(columnId), value)

        addMeta({
            itemRank,
        })

        return itemRank.passed
    }

    useEffect(() => {
        setData(fishs?.map((data, index) => ({ ...data, index: index + 1 })) ?? [])
    }, [fishs])

    const table = useReactTable<FishTypeWithIndex>({
        data,
        columns,
        filterFns: {
            fuzzyFilter
        },
        state: {
            sorting: sortRankFish,
            globalFilter
        },
        onSortingChange: setSortRankFish,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
    })

    return (
        <div className='wrap-table-fish-price column'>
            <div className="header-table-fish-price row">
                <div className="column">
                    <div className="row counting">
                        <h1>
                            Data Ikan
                        </h1>
                        <div>
                            {fishs?.length ?? 0}
                        </div>
                    </div>
                    <Button className="btn-add-data-fish">
                        Tambah Harga Baru
                        <MdAdd className="icon" />
                    </Button>
                </div>
                <div className="search row">
                    <RiSearch2Line className='icon' />
                    <input type="text" placeholder='Cari ikan...' value={globalFilter} onChange={e => setGlobalFilter(e.target.value)} />
                </div>
            </div>
            <div className="wrap-table-fish-price-overflow">
                <table className='table-fish-price' cellPadding={0}>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        <div className="wrap-th" onClick={header.column.getToggleSortingHandler()}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            {{
                                                asc: <SortColumnTable down={true} />,
                                                desc: <SortColumnTable up={true} />,
                                            }[header.column.getIsSorted() as string] ?? <SortColumnTable />}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className={cell.id.split('_')[1]}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {
                            !fishs?.length && (
                                <>
                                    <RowTableFishPriceSkeleton />
                                    <RowTableFishPriceSkeleton />
                                    <RowTableFishPriceSkeleton />
                                    <RowTableFishPriceSkeleton />
                                </>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableFishPrice