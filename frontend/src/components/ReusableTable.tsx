"use client";
import React from "react";
import { Table, TableProps, PaginationProps } from "antd";
import type { ColumnsType } from "antd/es/table";

export interface ReusableTableProps<T> extends TableProps<T> {
  data: T[];
  columns: ColumnsType<T>;
  loading?: boolean;
  pagination?: PaginationProps | false;
  rowKey?: string | ((record: T) => string);
  onRowClick?: (record: T, index: number) => void;
  onChange?: TableProps<T>["onChange"];
}

const ReusableTable = <T extends object>({
  data,
  columns,
  loading = false,
  pagination = { pageSize: 10 },
  rowKey = "id",
  onRowClick,
  onChange,
  ...restProps
}: ReusableTableProps<T>) => {
  const handleRowClick = (record: T, index?: number) => ({
    onClick: () => onRowClick?.(record, index!),
  });

  return (
    <Table<T>
      {...restProps}
      dataSource={data}
      columns={columns}
      loading={loading}
      pagination={pagination}
      rowKey={rowKey}
      onChange={onChange}
      onRow={onRowClick ? handleRowClick : undefined}
    />
  );
};

export default ReusableTable;
