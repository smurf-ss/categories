import React, { useState, useMemo, useCallback } from "react";

import Grid from "@material-ui/core/Grid";

import Autocomplete from "../components/Autocomplete";
import Table from "../components/Table";

type CategoriesFormState = {
  categoriesName: string | null;
};

function createData(categoriesName: string) {
  return { categoriesName };
}

const dataSource = [
  createData("Frozen yoghurt"),
  createData("Ice cream sandwich"),
  createData("Eclair"),
  createData("Cupcake"),
  createData("Gingerbread"),
];

const Categories = () => {
  const [formState, setFormState] = useState<CategoriesFormState>({
    categoriesName: null,
  });

  const handleChange = useCallback(
    (name: string, value: CategoriesFormState["categoriesName"]) => {
      setFormState({ ...formState, [name]: value });
    },
    []
  );

  const columns = useMemo(
    () => [
      {
        key: "",
        title: "no",
        render: (row: any, index: number) => {
          return <>{index + 1}</>;
        },
      },
      {
        key: "categoriesName",
        title: "categoriesName",
        search: formState.categoriesName,
      },
    ],
    [formState]
  );

  return (
    <Grid container justifyContent='center'>
      <Grid item container justifyContent='center'>
        <Autocomplete
          name='categoriesName'
          options={[{ label: "Eclair" }, { label: "The Kid" }]}
          value={formState?.categoriesName ?? ""}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <Table<CategoriesFormState> dataSource={dataSource} columns={columns} />
      </Grid>
    </Grid>
  );
};

export default Categories;
