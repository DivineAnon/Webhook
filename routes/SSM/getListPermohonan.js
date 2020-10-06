var express = require('express');
var router = express.Router();
const xml2json = require('simple-xml2json');
const soapRequest = require('easy-soap-request');
require('dotenv').config()

router.post('/getListPermohonan', async function(req, res) {
  const sampleHeaders = {
    'user-agent': 'sampleTest',
    'Content-Type': 'text/xml;charset=UTF-8',
    'soapAction': 'urn:getListPermohonanwsdl#getListPermohonan',
  };

  const NPWP_IMP = req.body.PAYLOAD.CHECKPJ.NPWP_IMP;
  const NPWP_PPJK = req.body.PAYLOAD.CHECKPJ.NPWP_PPJK;
  const UPT = req.body.PAYLOAD.CHECKPJ.UPT;

  const obj = `
  <soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:checkPJwsdl">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:checkPJ soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <user xsi:type="xsd:string">userinsw</user>
         <password xsi:type="xsd:string">inswpassssm</password>
         <npwp_imp xsi:type="xsd:string">${NPWP_IMP}</npwp_imp>
         <npwp_ppjk xsi:type="xsd:string">${NPWP_PPJK}</npwp_ppjk>
         <upt xsi:type="xsd:string">${UPT}</upt>
      </urn:checkPJ>
   </soapenv:Body>
  </soapenv:Envelope>
  `;

  try{
    const {response} = await soapRequest({ url: process.env.HOST_KARANTINA, headers: sampleHeaders, xml: obj, timeout: 1000 });

    const { headers, body, statusCode } = response;
    var content = body.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
    var json = xml2json.parser(content);
    console.log(json);
    res.status(200).json({
      code: '01',
      message: 'Behasil mengirimkan payload',
      data: {
        isPJ: 'true'
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
