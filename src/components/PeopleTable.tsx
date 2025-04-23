import * as React from "react";
import {
  DataGrid, GridColDef,
  GridRenderCellParams
} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Card, CardContent, Pagination, SxProps, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UsersService } from "../services/users.service";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import SearchBar from "./SearchBar";
import useDebounce from "../services/useDebounce";
import toast, { Toaster } from 'react-hot-toast';


function PeopleTable() {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const { t } = useTranslation("common");
  const basePath = "main.table.header."

  const [rows, setRows] = useState<User[]>([]);
  const [paginationModel, setPaginationModel] = useState({ pageSize: 5, page: 0 });
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 200);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userEdited, setUserEdited] = useState(false);
  const actionButton = (params: GridRenderCellParams | { row: User }, sx?: SxProps<Theme> | undefined) => {
    return <>
      <IconButton sx={sx} onClick={() => { handleEditClick(params.row) }} size="small">
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton sx={sx} onClick={() => { handleDeleteClick(params.row) }} size="small">
        <DeleteIcon fontSize="small" />
      </IconButton>
    </>
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: t(basePath + "id"), flex: 1, },
    { field: "firstName", headerName: t(basePath + "firstName"), flex: 1 },
    { field: "lastName", headerName: t(basePath + "lastName"), flex: 1 },
    {
      field: "birthDate", headerName: t(basePath + "dob"), flex: 1,
      valueFormatter: UsersService.getFormattedDate,
      sortComparator: (v1, v2) => {
        const date1 = new Date(v1);
        const date2 = new Date(v2);
        return date1.getTime() - date2.getTime();
      }
    },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (params) => (
        actionButton(params)
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
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPaginationModel((prev) => ({
      ...prev,
      page: page - 1, // MUI Pagination è 1-based, DataGrid è 0-based
    }));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await UsersService.getAll({ filter: debouncedSearch ?? "", page: paginationModel.page + 1, pageSize: paginationModel.pageSize });
        setRows(res.results);
        setRowCount(res.totalResults);
        setError(null)
      } catch (e) {
        setError(t("main.table.error"));
      }
      finally {
        setLoading(false);
      }
    };

    setLoading(true);
    loadData();
  }, [paginationModel.page, paginationModel.pageSize, debouncedSearch, userEdited]);
  useEffect(() => {
    if (error) {

      toast.error(error, {
        duration: 4000,
        position: "top-right",
        style: {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
        }
      });

    }
  }, [error]);

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "theme.palette.background.paper",
        boxShadow: 0,
        width: { xs: "45vh", sm: "190vh" },
        height: "90vh",
      }}
    >
      <Toaster />
      {selectedUser && (
        <EditUserModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={async (updatedUser) => {
            try {
              setLoading(true);
              await UsersService.update(selectedUser.id, updatedUser)
              setUserEdited(true);
              setError(null)
            } catch (e) {
              setError(t("edit.error"));
            } finally {
              setLoading(false);
            }
          }}
          user={selectedUser}
        />
      )}

      {selectedUser && (
        <DeleteUserModal
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={async () => {
            try {
              setLoading(true);
              await UsersService.remove(selectedUser.id);
              setUserEdited(true);
              setError(null)
            } catch (e) {

              setError(t("delete.error"));
            } finally {
              setLoading(false);
            }
          }}
          user={selectedUser}
        />
      )}
      <Typography
        noWrap
        sx={{
          color: "theme.palette.text.primary",
          minHeight: 30,
          fontSize: 24,
          mb: 2,
          textAlign: "left",
        }}
      >
        {t("main.title")}
      </Typography>

      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2} >
          <Box >
            <SearchBar value={search} onChange={(changedValue: string) => {
              setSearch(changedValue);
            }} />
          </Box>
          <Box
            sx={{
              overflowY: "auto",
              maxHeight: "calc(100vh - 280px)", // Adatta in base a header + searchbar
              pr: 1,
              mb: 2,
              flex: 1,
              minHeight: 0
            }}
          >
            {rows.map((row) => (
              <Card variant="outlined" key={row.id} sx={{
                mb: 2,
              }}>
                <CardContent>
                  {columns.map((col) => (
                    <Box key={col.field} sx={{ mb: 1, display: "flex", flexDirection: "column", width: "100%", alignItems: "flex-start" }}>
                      <Typography fontSize={12} color="text.secondary">
                        {col.headerName?.toUpperCase()}
                      </Typography>
                      <Typography fontSize={12}>
                        {col.valueFormatter
                          ? UsersService.getFormattedDate(row[col.field as keyof typeof row])
                          : row[col.field as keyof typeof row]}
                      </Typography>
                    </Box>
                  ))}
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    {actionButton({ row }, {
                      border: "solid 1px",
                      width: "48%",
                      paddingLeft: 4.5,
                      paddingRight: 4.5,

                      borderRadius: 0.5,
                    })}
                  </Box>
                </CardContent>
              </Card>
            ))}

          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={Math.ceil(rowCount / paginationModel.pageSize)}
              page={paginationModel.page + 1}
              size="small"
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
            />
          </Box>
        </Box>
      ) : (
        <Box>
          <Box sx={{ mb: 2 }}>
            <SearchBar value={search} onChange={(changedValue: string) => {
              setSearch(changedValue);
            }} />
          </Box>
          <DataGrid rows={rows}
            sx={{
              border: 1, borderColor: "var(--DataGrid-rowBorderColor)",
              borderRadius: 1,
            }}
            filterMode="server"
            columns={columns}
            rowCount={rowCount}
            loading={loading}
            paginationMode="server"
            pageSizeOptions={[5, 10, 20, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            disableRowSelectionOnClick
          />
        </Box>
      )
      }
    </Box >
  );
}

export default PeopleTable;
