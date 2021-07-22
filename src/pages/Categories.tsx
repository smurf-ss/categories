import React, { useState, useMemo, useCallback, useEffect } from "react";

import Grid from "@material-ui/core/Grid";

import { queryCategories } from "../services/categories";

import Autocomplete, { AutocompleteOptions } from "../components/Autocomplete";
import Table from "../components/Table";
import Page from "../components/Page";

type CategoriesFormState = {
  categoriesName: string | null;
};

const Categories = () => {
  const [categoriesLUT, setCategoriesLUT] = useState<AutocompleteOptions[]>([]);
  const [dataSource, setDataSource] = useState<CategoriesFormState[]>([]);

  const [formState, setFormState] = useState<CategoriesFormState>({
    categoriesName: null,
  });

  const getCategories = useCallback(async () => {
    const categories: string[] = await queryCategories();

    const categoriesLUT = categories.map((categoriesName: string) => ({
      label: categoriesName,
    }));

    const dataSource = categories.map((categoriesName: string) => ({
      categoriesName,
    }));

    setCategoriesLUT(categoriesLUT);
    setDataSource(dataSource);
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

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
    [formState.categoriesName]
  );

  return (
    <Page>
      <Grid container spacing={1}>
        <Grid item container justifyContent='flex-end'>
          <Autocomplete
            name='categoriesName'
            options={categoriesLUT}
            value={formState?.categoriesName ?? ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Table<CategoriesFormState>
            dataSource={dataSource}
            columns={columns}
          />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Categories;
