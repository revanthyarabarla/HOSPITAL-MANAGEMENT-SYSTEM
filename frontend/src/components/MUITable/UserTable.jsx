import React from "react";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import ConfirmDeleteDialogue from "./ConfirmDeleteDialogue";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "Name", label: "Name", minWidth: 170 },
  { id: "Email", label: "Email", minWidth: 170 },
  { id: "Role", label: "Role", minWidth: 170 },
  { id: "actionsID", label: "Actions", minWidth: 100 },
];

function createData(Name, Email, Role, actionsID) {
  return { Name, Email, Role, actionsID };
}

export default function UserTable({ userList, deleteUser }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [openConfirmDeleteDialogue, setOpenConfirmDeleteDialogue] =
    React.useState(false);

  const navigate = useNavigate();

  const handleDeleteDialogueOpen = () => {
    setOpenConfirmDeleteDialogue(true);
  };

  const handleDeleteDialogueClose = () => {
    setOpenConfirmDeleteDialogue(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let rows = userList?.map((user) => {
    return createData(
      user.firstName + " " + user.lastName,
      user.email,
      user.userType,
      user._id
    );
  });

  return (
    <Paper
      sx={{
        width: "95%",
        overflow: "hidden",
        marginTop: 2,
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2) ",
      }}
    >
      <TableContainer>
        <TableContainer stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "actionsID") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Tooltip title="Edit" placement="top" arrow>
                              <EditIcon
                                className="mx-2"
                                style={{ color: "#ff6600", fontSize: 30 }}
                                onClick={() => {
                                  navigate(`/users/edit/${value}`);
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="Delete" placement="top" arrow>
                              <DeleteIcon
                                className="mx-2"
                                style={{ color: "red", fontSize: 30 }}
                                onClick={handleDeleteDialogueOpen}
                              />
                            </Tooltip>
                            <ConfirmDeleteDialogue
                              title="Confirm Delete"
                              message="Are you sure you want to delete this record? This action cannot be undone."
                              open={openConfirmDeleteDialogue}
                              handleClose={handleDeleteDialogueClose}
                              handleDelete={() => {
                                deleteUser(value);
                                handleDeleteDialogueClose();
                              }}
                            />
                          </TableCell>
                        );
                      } else if (column.id == "Role") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <span className="custom-badge status-green">
                              {value}
                            </span>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </TableContainer>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          "& p": {
            marginTop: "auto",
            marginBottom: "auto",
          },
        }}
      />
    </Paper>
  );
}
