import { useReactTable, flexRender, getCoreRowModel, getSortedRowModel, createColumnHelper, SortingState, ColumnDef } from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'
import { RankFish } from 'src/services/fish'
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdSearch } from 'react-icons/io'
import { RiSearch2Line } from 'react-icons/ri'
import 'src/styles/pages/home/tableRankFish.scss'
import { Overwrite } from 'src/helper'

interface RankFishProps {
    rankFish?: RankFish[]
}

type RankFishTable = Overwrite<RankFish, {
    index: number
    last_price: string
    average_size: string
    average_price: string
}>

const SortTable = ({ down, up }: { down?: boolean, up?: boolean }) => (
    <div className='column justify-content-center align-items-center'>
        <IoMdArrowDropup className={`icon-sort ${up ? 'active' : ''}`} />
        <IoMdArrowDropdown className={`icon-sort  ${down ? 'active' : ''}`} />
    </div>
)

const TableRankFish = ({ rankFish = [] }: RankFishProps) => {
    const [data, setData] = useState<RankFishTable[]>([])
    const [sortRankFish, setSortRankFish] = useState<SortingState>([])
    const columns = useMemo<ColumnDef<RankFishTable>[]>(() => [
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
            accessorKey: 'id',
            header: 'Ikan',
            cell: info => info.getValue()
        },
        {
            accessorKey: 'last_price',
            header: 'Harga',
            cell: info => info.getValue()
        },
        {
            accessorKey: 'average_size',
            header: 'Ukuran Rata Rata',
            cell: info => info.getValue()
        },
        {
            accessorKey: 'average_price',
            header: 'Harga Rata Rata',
            cell: info => info.getValue()
        },
        {
            accessorKey: 'last_update',
            header: 'Update Terakhir',
            cell: info => info.getValue()
        },
    ], [])

    useEffect(() => {
        setData(rankFish.map((data, index) => ({
            ...data,
            index: index + 1,
            last_price: `Rp ${Intl.NumberFormat('id-ID').format(data.last_price)}`,
            average_size: `${data.average_size.toFixed(data.average_size % 1 === 0 ? 0 : 1)} cm`,
            average_price: `Rp ${Intl.NumberFormat('id-ID').format(parseFloat(data.average_price.toFixed(0)))}`
        })))
    }, [rankFish])

    const table = useReactTable<RankFishTable>({
        data,
        columns,
        state: {
            sorting: sortRankFish
        },
        onSortingChange: setSortRankFish,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    })

    return (
        <div className='wrap-table-rank-fish column'>
            <div className="header-table-rank-fish row">
                <div className="column">
                    <h1>Ikan Berkualitas</h1>
                    <p>Lihat harga dari ikan paling berkualitas</p>
                </div>
                <div className="search row">
                    <RiSearch2Line className='icon' />
                    <input type="text" placeholder='Cari ikan...' />
                </div>
            </div>
            <div className="wrap-table-rank-fish-overflow">
                <table className='table-rank-fish' cellPadding={0}>
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
                                                asc: <SortTable down={true} />,
                                                desc: <SortTable up={true} />,
                                            }[header.column.getIsSorted() as string] ?? <SortTable />}
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
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableRankFish