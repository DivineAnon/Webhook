var express = require('express');
var router = express.Router();
const xml2json = require('simple-xml2json');
const soapRequest = require('easy-soap-request');
const model = require('../../config/model/index');
const { v4: uuidv4 } = require('uuid');
const dateFormat = require('dateformat');
require('dotenv').config()

router.post('/skkMigas', async function(req, res) {
    let requestTime = new Date(Date.now());
    let uuid = uuidv4();
    
    await model.logServiceBKIPM.create({
      id_log: uuid,
      kd_layanan : req.body.KD_LAYANAN,
      id_permohonan : req.body.ID_PERMOHONAN,
      action_type : req.url,
      username : req.body.USERNAME,
      date_action : dateFormat(requestTime, "yyyy-mm-dd HH:MM:ss"),
      payload_input : JSON.stringify(req.body),
    }).then( async function(data){
      const sampleHeaders = {
        'user-agent': 'sampleTest',
        'Content-Type': 'text/xml;charset=UTF-8',
        'soapAction': 'skkmigas_prs_ws_provider_reqInswData_Binder_reqInswData',
      };
    
      const obj = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wss="http://wsproxy.skkmigas.go.id/skksiprs/wsSiprsInsw">
        <soapenv:Header/>
        <soapenv:Body>
            <wss:reqInswData>
                <reqInswSiprs>
                    <rkbiHeaderReq>
                    <NO_PENGAJUAN_INSW>?</NO_PENGAJUAN_INSW>
                    <NPWP>?</NPWP>
                    <suratPengajuanRkbi>
                        <USULAN_DATE>?</USULAN_DATE>
                        <USULAN_NO>?</USULAN_NO>
                    </suratPengajuanRkbi>
                    <dataPengajuanRkbi>
                        <NOMASTERLIST>?</NOMASTERLIST>
                        <TANGGALMASTERLIST>?</TANGGALMASTERLIST>
                        <STATUSBOP>?</STATUSBOP>
                        <NILAI_RKBI>?</NILAI_RKBI>
                        <KOMODITAS>?</KOMODITAS>
                        <KOMODITAS_SUB>?</KOMODITAS_SUB>
                        <KANTOR_BEA_PEMASUKAN>?</KANTOR_BEA_PEMASUKAN>
                        <KANWIL_BEA_PEMASUKAN>?</KANWIL_BEA_PEMASUKAN>
                        <INCOTERMS>?</INCOTERMS>
                    </dataPengajuanRkbi>
                    <anggaranPekerjaan>
                        <JENISANGGARAN>?</JENISANGGARAN>
                        <!--Optional:-->
                        <JENIS_ANGGARAN_LAIN>?</JENIS_ANGGARAN_LAIN>
                        <WPB_TAHUN>?</WPB_TAHUN>
                        <AFE_NOMOR>?</AFE_NOMOR>
                        <BUDGET_SCHEDULE>?</BUDGET_SCHEDULE>
                        <LINE_ITEM>?</LINE_ITEM>
                        <CURRENCY>?</CURRENCY>
                        <NILAI>?</NILAI>
                        <!--Optional:-->
                        <RISALAH_RAPAT>?</RISALAH_RAPAT>
                        <!--Optional:-->
                        <DESKRIPSI_PEKERJAAN>?</DESKRIPSI_PEKERJAAN>
                        <!--Optional:-->
                        <KET_ANGGARAN_PEKERJAAN>?</KET_ANGGARAN_PEKERJAAN>
                    </anggaranPekerjaan>
                    <informasiKontrakPekerjaan>
                        <JENIS_KONTRAK>?</JENIS_KONTRAK>
                        <JENIS_KONTRAK_LAIN>?</JENIS_KONTRAK_LAIN>
                        <SUBKONTRAKTOR_KONTRAK_NO>?</SUBKONTRAKTOR_KONTRAK_NO>
                        <DESCRIPTION>?</DESCRIPTION>
                        <SUBKONTRAKTOR>?</SUBKONTRAKTOR>
                        <SUBKONTRAKTORJUDUL>?</SUBKONTRAKTORJUDUL>
                        <SUBKONTRAKTOR_KONTRAK_DATE>?</SUBKONTRAKTOR_KONTRAK_DATE>
                        <JANGKA_WAKTU_AWAL>?</JANGKA_WAKTU_AWAL>
                        <JANGKA_WAKTU_AKHIR>?</JANGKA_WAKTU_AKHIR>
                        <SUBKONTRAKTOR_JANGKA_AWAL>?</SUBKONTRAKTOR_JANGKA_AWAL>
                        <SUBKONTRAKTOR_JANGKA_AKHIR>?</SUBKONTRAKTOR_JANGKA_AKHIR>
                        <!--Optional:-->
                        <NAMA_VENDOR>?</NAMA_VENDOR>
                    </informasiKontrakPekerjaan>
                    </rkbiHeaderReq>
                    <!--1 or more repetitions:-->
                    <rkbiSubkontraktorReq>
                    <NO_SUBKONTRAKTOR>?</NO_SUBKONTRAKTOR>
                    <!--Optional:-->
                    <NAMA_SUBKONTRAKTOR>?</NAMA_SUBKONTRAKTOR>
                    <!--Optional:-->
                    <TANGGAL_TTD_SUBKONTRAKTOR>?</TANGGAL_TTD_SUBKONTRAKTOR>
                    <!--Optional:-->
                    <JANGKA_SUBKONTRAK_AWAL>?</JANGKA_SUBKONTRAK_AWAL>
                    <!--Optional:-->
                    <JANGKA_SUBKONTRAK_AKHIR>?</JANGKA_SUBKONTRAK_AKHIR>
                    <!--Optional:-->
                    <JENIS_KONTRAK>?</JENIS_KONTRAK>
                    <!--Optional:-->
                    <JENIS_SUBKONTRAK>?</JENIS_SUBKONTRAK>
                    </rkbiSubkontraktorReq>
                    <!--1 or more repetitions:-->
                    <rkbiDetailsReq>
                    <NO>?</NO>
                    <KIMAP>?</KIMAP>
                    <HSCODE>?</HSCODE>
                    <DESCRIPTION>?</DESCRIPTION>
                    <QUANTITY>?</QUANTITY>
                    <UNIT>?</UNIT>
                    <CONDITION>?</CONDITION>
                    <VALUE_USD>?</VALUE_USD>
                    <PPN_USD>?</PPN_USD>
                    <LOCATION>?</LOCATION>
                    <PURPOSE>?</PURPOSE>
                    <ACTIVITY>?</ACTIVITY>
                    <CUSTOMS_OFFICE>?</CUSTOMS_OFFICE>
                    <PORT>?</PORT>
                    <REMARKS>?</REMARKS>
                    <WF_REVISION>?</WF_REVISION>
                    <WF_REVISION_DT>?</WF_REVISION_DT>
                    <WF_REVISION_USER>?</WF_REVISION_USER>
                    </rkbiDetailsReq>
                    <!--1 or more repetitions:-->
                    <rkbiWfDocAttach>
                    <FILEPATH>?</FILEPATH>
                    <ATTACHMENT_NAME>?</ATTACHMENT_NAME>
                    </rkbiWfDocAttach>
                </reqInswSiprs>
            </wss:reqInswData>
        </soapenv:Body>
        </soapenv:Envelope>
      `;
  
      const {response} = await soapRequest({ url: process.env.HOST_MIGAS, headers: sampleHeaders, xml: obj, timeout: 1000 });
  
      const { headers, body, statusCode } = response;
      var content = body.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
      var json = xml2json.parser(content);
      console.log(json);
      res.status(200).json({
        code: '01',
        message: 'Behasil mengirimkan payload',
        data: {
          isPPJKKI: 'TRUE'
        }
      })
  
      model.logServiceBKIPM.update({
        payload_output: JSON.stringify(json),
        is_read: 1,
        kd_proses: "01",
      }, {
        where:{
          id_log: uuid
        }
      });
    }).catch(function (err){
      console.log("err" + err);
  
      model.logServiceBKIPM.update({
        is_read: 0,
        kd_proses: "02",
      }, {
        where: {
          id_log: uuid
        }
      });
    })
  });
  
  module.exports = router;
  