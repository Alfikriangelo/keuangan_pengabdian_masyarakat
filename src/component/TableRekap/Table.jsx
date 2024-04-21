import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, styled } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const red = "#FFCDD2";
const white = "#F8FAE5";
const green = "#337357";

const theme = createTheme({
  palette: {
    red: {
      main: red,
    },
    white: {
      main: white,
    },
    green: {
      main: green,
    },
  },
});

function Row(props) {
  const { row, onDelete } = props;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handlePerbaruiDataButton = () => {
    navigate(`/perbarui-data/${row.id}`);
  };

  const getLatestStatus = (category) => {
    const latestHistory = row.history.filter(
      (item) => item.kategori === category
    );
    return latestHistory.length > 0
      ? latestHistory[latestHistory.length - 1].status
      : "Belum";
  };

  const handleDelete = () => {
    onDelete(row.id);
  };

  const renderAdditionalInfo = (historyRow) => {
    const additionalInfo = [];
    if (historyRow.kategori === "Keamanan" && historyRow.nominal > 30000) {
      const lebihan = historyRow.nominal - 30000;
      additionalInfo.push("Nominal Keamanan: Rp30000" + ` + Rp${lebihan}`);
    }
    if (historyRow.kategori === "Kebersihan" && historyRow.nominal > 30000) {
      const lebihan = historyRow.nominal - 30000;
      additionalInfo.push("Nominal Kebersihan: Rp30000" + ` + Rp${lebihan}`);
    }
    return additionalInfo.join(", ");
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row">
            {row.id}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.nama}
          </TableCell>
          <TableCell align="left">
            <Box
              sx={{
                display: "inline-block",
                backgroundColor:
                  getLatestStatus("Keamanan") === "Lunas"
                    ? "#C8E6C9"
                    : getLatestStatus("Keamanan") === "Sebagian"
                    ? "#FFF9C4"
                    : getLatestStatus("Keamanan") === "Belum"
                    ? "#FFCDD2"
                    : "transparent",
                padding: "4px 8px",
                borderRadius: "4px",
                color:
                  getLatestStatus("Keamanan") === "Lunas"
                    ? "#337357"
                    : getLatestStatus("Keamanan") === "Sebagian"
                    ? "#F57F17"
                    : getLatestStatus("Keamanan") === "Belum"
                    ? "#D32F2F"
                    : "inherit",
              }}
            >
              {getLatestStatus("Keamanan")}
            </Box>
          </TableCell>
          <TableCell align="left">
            <Box
              sx={{
                display: "inline-block",
                backgroundColor:
                  getLatestStatus("Kebersihan") === "Lunas"
                    ? "#C8E6C9"
                    : getLatestStatus("Kebersihan") === "Sebagian"
                    ? "#FFF9C4"
                    : getLatestStatus("Kebersihan") === "Belum"
                    ? "#FFCDD2"
                    : "transparent",
                padding: "4px 8px",
                borderRadius: "4px",
                color:
                  getLatestStatus("Kebersihan") === "Lunas"
                    ? "#337357"
                    : getLatestStatus("Kebersihan") === "Sebagian"
                    ? "#F57F17"
                    : getLatestStatus("Kebersihan") === "Belum"
                    ? "#D32F2F"
                    : "inherit",
              }}
            >
              {getLatestStatus("Kebersihan")}
            </Box>
          </TableCell>
          <TableCell align="left">
            <Box
              sx={{
                display: "inline-block",
                backgroundColor:
                  getLatestStatus("Sumbangan") === "Lunas"
                    ? "#C8E6C9"
                    : getLatestStatus("Sumbangan") === "Sebagian"
                    ? "#FFF9C4"
                    : getLatestStatus("Sumbangan") === "Belum"
                    ? "#FFCDD2"
                    : "transparent",
                padding: "4px 8px",
                borderRadius: "4px",
                color:
                  getLatestStatus("Sumbangan") === "Lunas"
                    ? "#337357"
                    : getLatestStatus("Sumbangan") === "Sebagian"
                    ? "#F57F17"
                    : getLatestStatus("Sumbangan") === "Belum"
                    ? "#D32F2F"
                    : "inherit",
              }}
            >
              {getLatestStatus("Sumbangan")}
            </Box>
          </TableCell>
          <TableCell
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <IconButton>
              <EditIcon color="green" onClick={handlePerbaruiDataButton} />
            </IconButton>
            <IconButton>
              <DeleteIcon color="error" onClick={handleDelete} />
            </IconButton>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Riwayat
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Tanggal</TableCell>
                      <TableCell>Penerima</TableCell>
                      <TableCell align="left">Kategori</TableCell>
                      <TableCell align="left">Status</TableCell>
                      <TableCell align="left">Info Tambahan</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.tanggal}>
                        <TableCell component="th" scope="row">
                          {historyRow.tanggal_terima}
                        </TableCell>
                        <TableCell>{historyRow.penerima}</TableCell>
                        <TableCell align="left">
                          {historyRow.kategori}
                        </TableCell>
                        <TableCell align="left">{historyRow.status}</TableCell>
                        <TableCell align="left">
                          {renderAdditionalInfo(historyRow)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    </ThemeProvider>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    nama: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        kategori: PropTypes.string.isRequired,
        penerima: PropTypes.string.isRequired,
        tanggal: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        nominal: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default function TableComponent({ jsonData }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalNominal, setTotalNominal] = useState(0);

  useEffect(() => {
    let total = 0;
    jsonData.forEach((row) => {
      row.history.forEach((entry) => {
        total += entry.nominal;
      });
    });
    setTotalNominal(total);
  }, [jsonData, searchTerm]);

  const handleTambahDataButton = () => {
    navigate("/tambah-data-rekap");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/delete_data_rekap/${id}`);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const filteredData = jsonData.filter((row) => {
    return row.nama.toLowerCase().includes(searchTerm.toLowerCase()); // Sesuaikan dengan field yang ingin dicari
  });

  const slicedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Typography
            variant="h4"
            noWrap
            component="a"
            fontWeight="bold"
            style={{
              display: { xs: "none", md: "flex" },
              color: "#337357",
              textDecoration: "none",
              fontFamily: "roboto",
            }}
          >
            Tabel Rekap data
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Toolbar>
              <Search style={{ backgroundColor: "#C8E6C9", color: "black" }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Cari…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={handleSearchTermChange}
                />
              </Search>
            </Toolbar>
            <Button
              variant="outlined"
              style={{ textTransform: "none" }}
              color="green"
              onClick={handleTambahDataButton}
            >
              Tambah
            </Button>
          </div>
        </div>
        <TableContainer sx={{ mt: 2 }} component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead style={{ backgroundColor: "#337357" }}>
              <TableRow>
                <TableCell style={{ color: "white" }}>No</TableCell>
                <TableCell style={{ color: "white" }}>Nama</TableCell>
                <TableCell style={{ color: "white" }}>Keamanan</TableCell>
                <TableCell style={{ color: "white" }}>Kebersihan</TableCell>
                <TableCell style={{ color: "white" }}>Sumbangan</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedData.map((row, index) => (
                <Row key={index} row={row} onDelete={handleDelete} />
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </TableContainer>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography style={{ color: "#337357" }} fontWeight="bold">
            Total : Rp
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(totalNominal)}
          </Typography>
        </div>
      </div>
    </ThemeProvider>
  );
}
