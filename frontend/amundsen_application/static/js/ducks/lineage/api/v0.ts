import axios, { AxiosError, AxiosResponse } from 'axios';
import { Lineage } from 'interfaces/Lineage';
import { getQueryParams } from 'ducks/utilMethods';

export const API_PATH = '/api/metadata/v0';

export type LineageAPI = { lineage: Lineage };

export function getTableLineage(key: string, depth: number, direction: string) {
  const tableQueryParams = getQueryParams({ key, depth, direction });
  return axios({
    url: `${API_PATH}/get_table_lineage?${tableQueryParams}`,
    method: 'GET',
  })
    .then((response: AxiosResponse<LineageAPI>) => ({
      data: response.data,
      status: response.status,
    }))
    .catch((e: AxiosError<LineageAPI>) => {
      const { response } = e;
      const status = response ? response.status : null;
      return Promise.reject({ status });
    });
}

export function getColumnLineage(
  key: string,
  columnName: string,
  depth: number,
  direction: string
) {
  const tableQueryParams = getQueryParams({
    key,
    depth,
    direction,
    column_name: columnName,
  });
  return axios({
    url: `${API_PATH}/get_column_lineage?${tableQueryParams}`,
    method: 'GET',
  })
    .then((response: AxiosResponse<LineageAPI>) => ({
      data: response.data,
      status: response.status,
    }))
    .catch((e: AxiosError<LineageAPI>) => {
      const { response } = e;
      const status = response ? response.status : null;
      return Promise.reject({ status });
    });
}
