import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import { Autocomplete, Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsonDataPemasukan from "../../component/TableRekap/data.json";
import jsonDataPengeluaran from "../../component/TablePengeluaran/data.json";
import BackButtonPengeluaran from "../../component/BackButtonPengeluaran/BackButtonPengeluaran";

const red = "#D32F2F";
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

const kategori = [
  { label: "Kebersihan" },
  { label: "Keamanan" },
  { label: "Sumbangan" },
];

const penerima = [{ label: "Bendahara" }, { label: "Ketua RT" }];

const status = [{ label: "Lunas" }, { label: "Sebagian" }, { label: "Belum" }];

const AddDataPengeluaran = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [selectedKategori, setSelectedKategori] = useState(null);
  const [kategoriInputValue, setKategoriInputValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [statusInputValue, setStatusInputValue] = useState("");
  const [selectedPenerima, setSelectedPenerima] = useState(null);
  const [penerimaInputValue, setPenerimaInputValue] = useState("");
  const [tanggalTerima, setTanggalPenerima] = useState("");
  const [dataPemasukan, setDataPemasukan] = useState(null);
  const [dataPengeluaran, setDataPengeluaran] = useState(null);
  const [keterangan, setKeterangan] = useState("");
  const [penanggungJawab, setPenanggungJawab] = useState("");
  const [tanggalPengeluaran, setTanggalPengeluaran] = useState("");
  const [nominal, setNominal] = useState(0);

  useEffect(() => {
    setDataPemasukan(jsonDataPemasukan);
    setDataPengeluaran(jsonDataPengeluaran);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      keterangan,
      penanggung_jawab: penanggungJawab,
      tanggal_pengeluaran: tanggalPengeluaran,
      nominal: parseInt(nominal),
    };

    try {
      await axios.post(
        "http://localhost:5001/save_data_pengeluaran",
        dataToSend
      );
      navigate("/pengeluaran");
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menyimpan data. Periksa apakah nama sudah ada");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginBottom: 80 }}>
        <Navbar
          jsonDataPemasukan={dataPemasukan}
          jsonDataPengeluaran={dataPengeluaran}
        />
        <Typography
          mt={13}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 30,
            fontWeight: "bold",
            color: "#337357",
          }}
        >
          Tambah Data Pengeluaran
        </Typography>
        <Box mx={33}>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              margin="normal"
              label="Keterangan"
              name="keterangan"
              autoFocus
              color="green"
              value={keterangan}
              onChange={(e) => {
                setKeterangan(e.target.value);
              }}
              sx={{ width: 350 }}
            />

            <TextField
              margin="normal"
              label="Penanggung Jawab"
              name="penanggungJawab"
              autoFocus
              color="green"
              value={penanggungJawab}
              onChange={(e) => {
                setPenanggungJawab(e.target.value);
              }}
              sx={{ width: 350 }}
            />
          </Box>

          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              type="date"
              name="tanggal_pengeluaran"
              value={tanggalPengeluaran}
              onChange={(e) => {
                setTanggalPengeluaran(e.target.value);
              }}
              style={{
                marginTop: 17,
                height: 35,
                width: 330,
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                outline: "none",
                transition: "border-color 0.2s",
                fontFamily: "Roboto, sans-serif",
                color: "black",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#337357";
                e.target.style.transition = "border-color 0.2s, color 0.2s";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ccc";
              }}
            />
            <TextField
              margin="normal"
              required
              label="Nominal"
              name="nonimal"
              autoFocus
              color="green"
              value={nominal}
              onChange={(e) => {
                setNominal(e.target.value);
              }}
              sx={{ width: 350 }}
            />
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <BackButtonPengeluaran />
            <Button
              variant="contained"
              style={{ textTransform: "none", color: "white", marginLeft: 10 }}
              color="green"
              onClick={handleSubmit}
            >
              Kirim
            </Button>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default AddDataPengeluaran;
