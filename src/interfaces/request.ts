export type OrderBy = { [k: string]: 'asc' | 'desc' }[];

export type FilterType = string | boolean | number | qs.ParsedQs[] | qs.ParsedQs | string[];

export type QueryType = qs.ParsedQs[] | qs.ParsedQs | string | string[];
