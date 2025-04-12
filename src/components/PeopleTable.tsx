import * as React from "react";
import {
  DataGrid, GridColDef, GridFilterModel,
  GetApplyQuickFilterFn,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Card, CardContent, Theme, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UsersService } from "../services/users.service";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";



function PeopleTable() {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const [rows, setRows] = useState<User[]>([]);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5,
    page: 0,
  });
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<GridFilterModel>({
    items: [],
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { t } = useTranslation("common");
  const basePath = "main.table.header."

  const columns: GridColDef[] = [
    { field: "id", headerName: t(basePath + "id"), flex: 1, },
    { field: "firstName", headerName: t(basePath + "firstName"), flex: 1 },
    { field: "lastName", headerName: t(basePath + "lastName"), flex: 1 },
    {
      field: "birthDate", headerName: t(basePath + "dob"), flex: 1
    },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => { handleEditClick(params.row) }} size="small">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => { handleDeleteClick(params.row) }} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ];
  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };
  const onFilterChange = React.useCallback((filterModel: GridFilterModel) => {

    setLoading(true);
    // Here you save the data you need from the filter model
    setSearch(filterModel);
  }, []);

  function QuickSearchToolbar() {
    return (
      <Box
      >
        <GridToolbarQuickFilter debounceMs={300} autoFocus sx={{ width: "100%", marginRight: "auto" }} />
      </Box>
    );
  }
  const loadData = async () => {
    try {
      const res = await UsersService.getAll({ filter: search?.quickFilterValues?.[0] ?? "", page: paginationModel.page + 1, pageSize: paginationModel.pageSize });
      setRows(res.results);
      setRowCount(res.totalResults);
    } catch (error) {
      console.error("Errore durante il fetch:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadData();
  }, [paginationModel.page, paginationModel.pageSize, search]);

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
      {selectedUser && (
        <EditUserModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={async (updatedUser) => {
            await UsersService.update(selectedUser.id, updatedUser)
            // Aggiorna l'utente nella tua lista
            loadData();
          }}
          user={selectedUser}
        />
      )}

      {selectedUser && (
        <DeleteUserModal
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={async () => {
            await UsersService.remove(selectedUser.id);
            loadData();
          }}
          user={selectedUser}
        />
      )}
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

      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2} sx={{ marginTop: 10 }} >
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
            sx={{
              border: 1, borderColor: "var(--DataGrid-rowBorderColor)",
              borderRadius: 2,
            }}
            filterMode="server"

            onFilterModelChange={onFilterChange}
            columns={columns}
            rowCount={rowCount}
            loading={loading}
            paginationMode="server"
            pageSizeOptions={[5, 10, 20, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            disableRowSelectionOnClick
            slots={{ toolbar: QuickSearchToolbar }}
          />
        </Box>
      )}
    </Box>
  );
}

export default PeopleTable;
