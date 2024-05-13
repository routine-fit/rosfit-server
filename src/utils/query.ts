import { Request } from 'express';

import { CustomError } from 'src/interfaces/custom-error';
import { FilterType, OrderBy, QueryType } from 'src/interfaces/request';

const formatFilerValue = (value: QueryType): FilterType => {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }

  if (!isNaN(Number(value))) {
    return Number(value);
  }

  // By default will return a string or object value
  return value;
};

const getNestedFilerChild = (
  value: QueryType,
  keys: string[],
  acum: Record<string, FilterType> = {},
): any => {
  const childKey = keys[0];
  if (keys.length > 0) {
    return {
      ...acum,
      [childKey]: getNestedFilerChild(value, keys.slice(1, keys.length), acum[childKey] as any),
    };
  }
  return formatFilerValue(value);
};

const formatFilters = (query: QueryType) => {
  return Object.entries(query).reduce<Record<string, FilterType | Record<string, FilterType>>>(
    (acum, [key, value]) => {
      if (!value) return acum;

      if (key.search(/\./) !== -1) {
        const [parentKey, ...keys] = key.split('.');
        acum[parentKey] = getNestedFilerChild(value, keys, acum[parentKey] as any);
        return acum;
      }

      acum[key] = formatFilerValue(value);
      return acum;
    },
    {},
  );
};

const formatOrderBy = (orderBy: QueryType): OrderBy => {
  if (!Array.isArray(orderBy) && orderBy.length === 0) {
    throw new CustomError(400, 'Order by must have at least one value on the array.');
  }

  return orderBy as OrderBy;
};

export const getFormattedQueryParams = (query: Request['query']) => {
  const { orderBy, skip, take, cursor, ...rest } = query;

  return {
    orderBy: orderBy ? formatOrderBy(orderBy) : undefined,
    skip: typeof skip === 'string' ? parseInt(skip, 2) : undefined,
    take: typeof take === 'string' ? parseInt(take, 2) : undefined,
    query: formatFilters(rest),
  };
};
