var express = require('express');
var router = express.Router();
const xml2json = require('simple-xml2json');
const soapRequest = require('easy-soap-request');
require('dotenv').config()

router.post('/checkPPJKKI', async function(req, res) {
  const sampleHeaders = {
    'user-agent': 'sampleTest',
    'Content-Type': 'text/xml;charset=UTF-8',
    'soapAction': 'urn:GetImpPPJKKI#GetImpPPJKKI',
  };

  const NPWP = req.body.PAYLOAD.CHECKTRADERKI.NPWP;
  const NPWP_PPJK = req.body.PAYLOAD.CHECKTRADERKI.NPWP_PPJK;
  const UPT = req.body.PAYLOAD.CHECKTRADERKI.UPT;

  const obj = `
  <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:checkTraderKI">
    <soapenv:Header/>
    <soapenv:Body>
      <urn:checkTraderKI soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
        <USERNAME xsi:type="xsd:string">WsINSW</USERNAME>
        <PASSWORD xsi:type="xsd:string">1#nsw@SsM!</PASSWORD>
        <PAYLOAD xsi:type="xsd:string">
          <CHECKTRADERKI>
            <NPWP_IMP>${NPWP}</NPWP_IMP>
            <NPWP_PPJK>${NPWP_PPJK}</NPWP_PPJK>
            <UPT>${UPT}</UPT>
          </CHECKTRADERKI>
        </PAYLOAD>
      </urn:checkTraderKI>
    </soapenv:Body>
  </soapenv:Envelope>
  `;

  try{
    const {response} = await soapRequest({ url: process.env.HOST_KARIMUTU, headers: sampleHeaders, xml: obj, timeout: 1000 });

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
  }
  catch(err){
    res.status(400).json({
      code: '02',
      message: err.message
    })
  }
});

module.exports = router;
