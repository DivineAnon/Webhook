var express = require('express');
var router = express.Router();
const xml2json = require('simple-xml2json');
const soapRequest = require('easy-soap-request');
const model = require('../../config/model/index');
const { v4: uuidv4 } = require('uuid');
const dateFormat = require('dateformat');
require('dotenv').config()

router.post('/getListCommodityKI', async function(req, res) {
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
      'soapAction': 'urn:GetListCommodityKI#GetListCommodityKI',
    };

    const NPWP = req.body.PAYLOAD.LIST_COMMODITY_TRADER_KI.NPWP;
    const UPT = req.body.PAYLOAD.LIST_COMMODITY_TRADER_KI.UPT;

    const obj = `
    <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:GetListCommodityKI">
        <soapenv:Header/>
        <soapenv:Body>
          <urn:GetListCommodityKI soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
              <USERNAME xsi:type="xsd:string">WsINSW</USERNAME>
              <PASSWORD xsi:type="xsd:string">1#nsw@SsM!</PASSWORD>
              <PAYLOAD xsi:type="xsd:string">
                <LIST_COMMODITY_TRADER_KI>
                  <NPWP>${NPWP}</NPWP>
                  <UPT>${UPT}</UPT>
                </LIST_COMMODITY_TRADER_KI>
              </PAYLOAD>
          </urn:GetListCommodityKI>
        </soapenv:Body>
    </soapenv:Envelope>
  `;

  const {response} = await soapRequest({ url: process.env.HOST_KARIMUTU, headers: sampleHeaders, xml: obj, timeout: 1000 });

    const { headers, body, statusCode } = response;
    console.log(response);
    var content = body.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
    var json = xml2json.parser(content);
    res.status(200).json({
      code: '01',
      message: 'Behasil mengirimkan payload',
      data: json
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
