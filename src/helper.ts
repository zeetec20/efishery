const fetcher = (input: RequestInfo | URL, init?: RequestInit) => fetch(input, init).then(res => res.json())
const uppercaseFirstWord = (string: string) => string.replace(/\b[a-z]/g, letter => letter.toUpperCase())
const parseNumberFormatID = (number: number) => Intl.NumberFormat('id-ID').format(number)

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

export type {
    Overwrite
}
export {
    fetcher,
    uppercaseFirstWord,
    parseNumberFormatID
}