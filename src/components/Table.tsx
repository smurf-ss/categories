import React, { useMemo } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TableMaterialUI from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

type TableColumnProps<DataSource = any> = {
  key: any;
  title: string;
  render?: (row: DataSource, index: number) => JSX.Element;
  search?: string | null;
};

type TableProps<DataSource = any> = {
  dataSource: DataSource[];
  columns: TableColumnProps<DataSource>[];
};

const useTable = <DataSource extends any>({
  dataSource,
  columns,
}: TableProps<DataSource>) => {
  const rows = useMemo(
    () =>
      dataSource.filter((row: any) => {
        const searchColumns = columns.filter((col) => col.search);
        if (searchColumns.length === 0) {
          return true;
        }

        return searchColumns.some((col) =>
          String(row[col.key]).includes(String(col.search))
        );
      }),
    [dataSource, columns]
  );

  return { rows };
};

const Table = <DataSource extends any>({
  dataSource = [],
  columns = [],
}: TableProps<DataSource>) => {
  const classes = useStyles();
  const { rows } = useTable<DataSource>({ dataSource, columns });

  return (
    <Paper>
      <TableContainer>
        <TableMaterialUI className={classes.table}>
          <TableHead>
            <TableRow>
              {columns.map((col: any) => (
                <TableCell key={col.key}>{col.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: number) => {
              return (
                <TableRow key={index}>
                  {columns.map((col: any) => {
                    if (col?.render) {
                      return (
                        <TableCell component='th' scope='row' key={col.key}>
                          {col?.render?.(row, index)}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell component='th' scope='row' key={col.key}>
                        {row[col.key]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </TableMaterialUI>
      </TableContainer>
    </Paper>
  );
};

export default Table;
