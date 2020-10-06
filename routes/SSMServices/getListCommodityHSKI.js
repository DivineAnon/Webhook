var express = require('express');
var router = express.Router();
const xml2json = require('simple-xml2json');
const soapRequest = require('easy-soap-request');
require('dotenv').config()

router.post('/getListCommodityKI', async function(req, res) {
  const sampleHeaders = {
    'user-agent': 'sampleTest',
    'Content-Type': 'text/xml;charset=UTF-8',
    'soapAction': 'urn:GetListCommodityHSKI#GetListCommodityHSKI',
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

  try{
    const {response} = await soapRequest({ url: process.env.HOST_KARIMUTU, headers: sampleHeaders, xml: obj, timeout: 1000 });

    const { headers, body, statusCode } = response;
    console.log(response);
    var content = body.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
    var json = xml2json.parser(content);
    console.log(json);
    res.status(200).json({
      code: '01',
      message: 'Behasil mengirimkan payload',
      data: json
    })
  }
  catch(err){
    res.status(400).json({
      code: '02',
      message: err.message
    })
  }
});

module.exports = router;
