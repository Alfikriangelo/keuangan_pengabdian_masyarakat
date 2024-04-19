import React, { useEffect, useState } from 'react';
import Navbar from '../../component/Navbar/Navbar';
import DoughnutChart from '../../component/DoughnutChart/DoughnutChart';
import Table from '../../component/TablePengeluaran/Table';
import jsonDataPemasukan from '../../component/TableRekap/data.json';
import jsonDataPengeluaran from '../../component/TablePengeluaran/data.json';

const Pengeluaran = () => {
  const [dataPemasukan, setDataPemasukan] = useState(null);
  const [dataPengeluaran, setDataPengeluaran] = useState(null);

  useEffect(() => {
    setDataPemasukan(jsonDataPemasukan);
    setDataPengeluaran(jsonDataPengeluaran);
  }, []);

  return (
    <div>
      <Navbar jsonDataPemasukan={dataPemasukan} jsonDataPengeluaran={dataPengeluaran} />
      <DoughnutChart jsonDataPemasukan={dataPemasukan} jsonDataPengeluaran={dataPengeluaran} />
      <Table />
    </div>
  );
};

export default Pengeluaran;
