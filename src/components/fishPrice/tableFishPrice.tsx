import { rankItem } from "@tanstack/match-sorter-utils"
import { ColumnDef, FilterFn, SortingState, Table, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import moment from "moment"
import { useEffect, useMemo, useState } from "react"
import { RiSearch2Line } from "react-icons/ri"
import { Overwrite, parseNumberFormatID, uppercaseFirstWord } from "src/helper"
import { FishType } from "src/hooks/useFishs"
import SortColumnTable from "../sortColumnTable"
import RowTableFishPriceSkeleton from "./rowTableFishPriceSkeleton"
import 'src/styles/pages/fishPrice/tableFishPrice.scss'
import Button from "../button"
import { MdAdd } from 'react-icons/md'
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi'
import DialogAddDataFish from "./dialogAddDataFish"
import ToastSuccessAddFish from "./toastSuccessAddFish"

interface TableFishPriceProps {
    fishs: FishType[] | undefined
}

type FishTypeWithIndex = Overwrite<FishType, {
    index: number,
    price: string
}>

interface TablePaginationProps {
    table: Table<FishTypeWithIndex>
}

const TablePagination = ({ table }: TablePaginationProps) => {
    const pageSize = table.getPageCount()
    const pageIndex = table.getState().pagination.pageIndex
    const limitPagination = pageIndex + 5 > pageSize ? pageSize : pageIndex + 5

    return (
        <div className="row pagination">
            <button className="previous" onClick={() => table.previousPage()}>
                <HiChevronLeft className="icon" />
            </button>
            <div className="row">
                {Array.from(Array(pageSize ?? 1).keys()).slice(pageIndex, limitPagination).map(page => (
                    <button className={`page ${pageIndex === page ? 'active' : ''}`} onClick={() => table.setPageIndex(page)}>
                        {page + 1}
                    </button>
                ))}
            </div>
            <button className="next" onClick={() => limitPagination - pageIndex === 1 ? null : table.nextPage()}>
                <HiChevronRight className="icon" />
            </button>
        </div>
    )
}

const TableFishPrice = ({ fishs }: TableFishPriceProps) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [data, setData] = useState<FishTypeWithIndex[]>([])
    const [openToastSuccess, setOpenToastSuccess] = useState(false)
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
            cell: info => moment(info.getValue<number>()).format('MMMM DD YYYY HH:mm')
        },
    ], [])
    const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
        const itemRank = rankItem(row.getValue(columnId), value)

        addMeta({
            itemRank,
        })

        return itemRank.passed
    }
    const onSuccessAddingFish = () => {
        setOpenDialog(false)
        setOpenToastSuccess(false)
        setTimeout(() => {
            setOpenToastSuccess(true)
        }, 100);
    }

    useEffect(() => {
        setData(fishs?.map((data, index) => ({
            ...data,
            index: index + 1,
            price: `Rp ${parseNumberFormatID(data.price)}`,
            area_kota: uppercaseFirstWord(data.area_kota.toLowerCase()),
            area_provinsi: uppercaseFirstWord(data.area_provinsi.toLocaleLowerCase()),
            komoditas: uppercaseFirstWord(data.komoditas.toLowerCase())
        })) ?? [])
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
        initialState: {
            pagination: {
                pageSize: 20
            }
        },
        onSortingChange: setSortRankFish,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
    })

    return (
        <>
            <div className='wrap-table-fish-price column'>
                <div className="header-table-fish-price column">
                    <div className="row counting">
                        <h1>
                            Data Ikan
                        </h1>
                        <div>
                            {fishs?.length ?? 0}
                        </div>
                    </div>
                    <div className="row">
                        <Button className="btn-add-data-fish" onClick={() => setOpenDialog(true)}>
                            Tambah <span className="extended-text">&nbsp;Harga Ikan</span>
                            <MdAdd className="icon" />
                        </Button>
                        <div className="search row">
                            <RiSearch2Line className='icon' />
                            <input type="text" placeholder='Cari ikan...' value={globalFilter} onChange={e => setGlobalFilter(e.target.value)} />
                        </div>
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
                <TablePagination table={table} />
            </div>
            <DialogAddDataFish open={openDialog} onOpenChange={setOpenDialog} onSuccess={onSuccessAddingFish} />
            <ToastSuccessAddFish open={openToastSuccess} setOpen={setOpenToastSuccess} />
        </>
    )
}

export default TableFishPrice