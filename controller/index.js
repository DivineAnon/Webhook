// CONTROLLER REFRENSI
const satuan = require('./refrensi/Satuan');
const kota = require('./refrensi/Kota');
const negara = require('./refrensi/Negara');
const pelabuhan = require('./refrensi/Pelabuhan');
const provinsi = require('./refrensi/Provinsi');
const perijinan = require('./refrensi/Perijinan');
const status_perijinan = require('./refrensi/Status_perijinan');
const ga = require('./refrensi/Ga');
const ga_logo = require('./refrensi/ga_logo');
const ga_pegawai = require('./refrensi/ga_pegawai');
const organisasi = require('./refrensi/organisasi');
const hscode = require('./refrensi/Hscode');
const incoterm = require('./refrensi/Incoterm');
const jenis_dokumen = require('./refrensi/Jenis_dokumen');
const jenis_permohonan = require('./refrensi/Jenis_permohonan');
const valuta = require('./refrensi/Valuta');
const daerah = require('./refrensi/Daerah');
const listHs = require('./refrensi/ListHscode');
const kurs = require('./refrensi/Kurs');
const layanan = require('./refrensi/layanan');
const kek = require('./refrensi/Kek');
const statusProses = require('./refrensi/status_proses');
const tipeKegiatan = require('./refrensi/tipeKegiatan');
const kpbc = require('./refrensi/Kpbc');
const btbmi_tarif = require('./refrensi/BtbmiTarif');
const btmi_temp = require('./refrensi/BtbmiTemp');
const cont_size = require('./refrensi/ContSize');
const cont_type = require('./refrensi/ContType')
const bank = require('./refrensi/bank');
const btbmi = require('./refrensi/btbmi');
const btbmiBab = require('./refrensi/btbmiBab');
const btbmiBagian = require('./refrensi/btbmiBagian');
const btbmiCoo = require('./refrensi/btbmiCoo');
const btbmiPreference = require('./refrensi/btbmiPreference');
const btbmiPreferenceDetail = require('./refrensi/btbmiPreferenceDetail');
const btbmiPreferenceHs = require('./refrensi/btbmiPreferenceHs');
const btbmiTarifCukai = require('./refrensi/btbmiTarifCukai');
const fasilitas = require('./refrensi/fasilitas');
const layananCont = require('./refrensi/layanan_cont');
const moda = require('./refrensi/moda');
const status_detailbarang = require('./refrensi/status_detailbarang');
const tujuanpemasukanbrg = require('./refrensi/tujuanpemasukanbrg');
const jaminan = require('./refrensi/Jaminan');
const jenis_nilai = require('./refrensi/JenisNilai');
const jenis_seal = require('./refrensi/JenisSeal');
const jenisbayar = require('./refrensi/JenisBayar');
const jenisEkspor = require('./refrensi/jenis_ekspor');
const kategoriEkspor = require('./refrensi/kategori_ekspor');
const caraPerdagangan = require('./refrensi/cara_perdagangan');
const caraPembayaran = require('./refrensi/cara_pembayaran');
const bkc = require('./refrensi/Bkc');
const jeniscukai = require('./refrensi/jeniscukai');
const kegiatan = require('./refrensi/Kegiatan_PP');
const jenis_barang = require('./refrensi/Jenis_barang');
const jenis_transaksi = require('./refrensi/Jenis_transaksi');
const jenis_tarif = require('./refrensi/Jenis_tarif');
const kemasan = require('./refrensi/Kemasan');
const group_kode = require('./refrensi/group_kode');
const btbmiTarifEkspor = require('./refrensi/btbmiTarifEkspor');
const docPenutup = require('./refrensi/docPenutup');
const kppbc = require('./refrensi/Kppbc');
const btbmiSpesifik = require('./refrensi/btbmiSpesifik');
const jenisLokasi = require('./refrensi/jenis_lokasi');
const kanwil = require('./refrensi/kanwil');
const entitas = require('./refrensi/entitas');
const komoditi = require('./refrensi/komoditi');
const tempatPenimbunan = require('./refrensi/tempatPenimbunan');
const jenisUsaha = require('./refrensi/jenis_usaha');
const tempatSimpanBarang = require('./refrensi/tempat_simpan_barang');
const tujuanPemasukan = require('./refrensi/tujuanPemasukan');
const btbmiTarifBk = require('./refrensi/btbmiTarifBk');
const gudangTps = require('./refrensi/gudang_tps');
const statusRefrensi = require('./refrensi/statusRefrensi');
const operatorBandara = require('./refrensi/Operator_bandara');
const operatorPelabuhan = require('./refrensi/Operator_pelabuhan');
const identitas = require('./refrensi/Identitas');
const jenisKontrak = require('./refrensi/jenisKontrak');
const kodeDokumen = require('./refrensi/kodeDokumen');
const jenisAnggaran = require('./refrensi/jenisAnggaran');



//INTR
const atr = require('./intr/Atr');
const fta = require('./intr/Fta');
const peraturan = require('./intr/Peraturan');


// END CONTROLLER REFRENSI
const v_btbmi = require('./view/v_btbmi');

const generate = require('./generate/generateNumberInvoice');
const listPengajuan = require('./refrensi/listPengajuan');

const dataPengangkut = require('./pengangkut/Data_pengangkut');

const controller = {};

// CONTROLLER REFRENSI
controller.satuan = satuan;
controller.kota = kota;
controller.negara = negara;
controller.pelabuhan = pelabuhan;
controller.provinsi = provinsi;
controller.perijinan = perijinan;
controller.status_perijinan = status_perijinan;
controller.ga = ga;
controller.ga_logo = ga_logo;
controller.ga_pegawai = ga_pegawai;
controller.organisasi = organisasi;
controller.hscode = hscode;
controller.incoterm = incoterm;
controller.jenis_dokumen = jenis_dokumen;
controller.jenis_permohonan = jenis_permohonan;
controller.valuta = valuta;
controller.daerah = daerah;
controller.listHs = listHs;
controller.kurs = kurs;
controller.kek = kek;
controller.layanan = layanan;
controller.statusProses = statusProses;
controller.tipeKegiatan = tipeKegiatan;
controller.kpbc = kpbc;
controller.btbmi_tarif = btbmi_tarif;
controller.btbmi_temp = btmi_temp;
controller.cont_size = cont_size;
controller.cont_type = cont_type;

controller.bank = bank;
controller.btbmi = btbmi;
controller.btbmiBab = btbmiBab;
controller.btbmiBagian = btbmiBagian;
controller.btbmiCoo = btbmiCoo;
controller.btbmiPreference = btbmiPreference;
controller.btbmiPreferenceDetail = btbmiPreferenceDetail;
controller.btbmiPreferenceHs = btbmiPreferenceHs;
controller.btbmiTarifCukai = btbmiTarifCukai;
controller.fasilitas = fasilitas;
controller.layananCont = layananCont;
controller.moda = moda;
controller.status_detailbarang = status_detailbarang;
controller.tujuanpemasukanbrg = tujuanpemasukanbrg;

controller.jaminan = jaminan;
controller.jenis_nilai = jenis_nilai;
controller.jenis_seal = jenis_seal;
controller.jenisbayar = jenisbayar;
controller.bkc = bkc;
controller.jeniscukai = jeniscukai;
controller.kegiatan = kegiatan;
controller.jenis_barang = jenis_barang;
controller.jenis_transaksi = jenis_transaksi;
controller.jenis_tarif = jenis_tarif;
controller.jenisEkspor = jenisEkspor;
controller.kategoriEkspor = kategoriEkspor;
controller.caraPerdagangan = caraPerdagangan;
controller.caraPembayaran = caraPembayaran;
controller.kemasan = kemasan;
controller.v_btbmi = v_btbmi;
controller.docPenutup = docPenutup;
controller.group_kode = group_kode;
controller.btbmiTarifEkspor = btbmiTarifEkspor;
controller.kppbc = kppbc;
controller.btbmiSpesifik = btbmiSpesifik;
controller.jenisLokasi = jenisLokasi;
controller.kanwil = kanwil;
controller.entitas = entitas;
controller.komoditi = komoditi;
controller.tempatPenimbunan = tempatPenimbunan;
controller.jenisUsaha = jenisUsaha;
controller.tempatSimpanBarang = tempatSimpanBarang;
controller.tujuanPemasukan = tujuanPemasukan;
controller.btbmiTarifBk = btbmiTarifBk;
controller.gudangTps = gudangTps;
controller.statusRefrensi = statusRefrensi;
controller.listPengajuan = listPengajuan;
controller.operatorBandara = operatorBandara;
controller.operatorPelabuhan = operatorPelabuhan;
controller.identitas = identitas;
controller.jenisKontrak = jenisKontrak;
controller.kodeDokumen = kodeDokumen;
controller.jenisAnggaran = jenisAnggaran;


controller.dataPengangkut = dataPengangkut;

//INTR
controller.atr = atr;
controller.fta = fta;
controller.peraturan = peraturan;

// END CONTROLLER REFRENSI

controller.generate = generate;

module.exports = controller;
