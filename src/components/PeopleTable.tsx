import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Card, CardContent, TextField, Theme, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UsersService } from "../services/users.service";
import { useEffect, useState } from "react";
import { User } from "../types/user";



function PeopleTable() {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const [rows, setRows] = useState<User[]>([]);
const [page, setPage] = useState(0); // ATTENZIONE: DataGrid usa zero-based
const [pageSize, setPageSize] = useState(10);
const [rowCount, setRowCount] = useState(0);
const [loading, setLoading] = useState(false);

const loadData = async () => {
  try {
    setLoading(true);
    const res = await UsersService.getAll({ page: page + 1, pageSize });
    setRows(res.results);
    setRowCount(res.totalResults);
  } catch (error) {
    console.error("Errore durante il fetch:", error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadData();
}, [page, pageSize]);
    const { t } = useTranslation("common");
   
    useEffect(() => {
      UsersService.getAll({ page: 1, pageSize: 100 })
        .then((res) => setRows(res.results))
        .catch((err) =>
          console.error("Errore durante il caricamento utenti:", err)
        );
    }, []);
   const columns: GridColDef[] = [
     { field: "id", headerName: "Id", flex: 1 },
     { field: "firstName", headerName: "Nome", flex: 1 },
     { field: "lastName", headerName: "Cognome", flex: 1 },
     { field: "birthDate", headerName: "Data di nascita", flex: 1 },
     {
       field: "actions",
       headerName: "",
       sortable: false,
       filterable: false,
       width: 100,
       renderCell: () => (
         <>
           <IconButton size="small" color="primary">
             <EditIcon fontSize="small" />
           </IconButton>
           <IconButton size="small" color="error">
             <DeleteIcon fontSize="small" />
           </IconButton>
         </>
       ),
     },
   ];
  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        boxShadow: 0,
        width: { xs: "45vh", sm: "190vh" },
        height: "90vh", // per espandere all’altezza del contenitore padre
      }}
    >
      <Typography
        noWrap
        sx={{
          color: "black",
          fontSize: 24,
          mb: 2,
          textAlign: "left",
        }}
      >
        {t("main.title")}
      </Typography>

      <TextField
        placeholder="Cerca"
        fullWidth
        size="small"
        sx={{ mb: 2 }}
        value={"null"}
      />

      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {rows.map((row) => (
            <Card variant="outlined" key={row.id}>
              <CardContent>
                {columns.map((col) => (
                  <Box key={col.field} sx={{ mb: 1, display: "flex", flexDirection: "column", width: "100%" }}>
                    <Typography fontSize={12} color="text.secondary">
                      {col.headerName?.toUpperCase()}
                    </Typography>
                    <Typography>
                      {row[col.field as keyof typeof row]}
                    </Typography>
                  </Box>
                ))}
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <IconButton size="small" >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Box>
          <DataGrid rows={rows}
        columns={columns}
        rowCount={rowCount}
        loading={loading}
        paginationMode="server"
        page={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
          setPage(0); // reset alla prima pagina
        }}
        paginationModel={{ page, pageSize }}
        pageSizeOptions={[5, 10, 20, 50]}
        disableRowSelectionOnClick
          />
        </Box>
      )}
    </Box>
  );
}

export default PeopleTable;
