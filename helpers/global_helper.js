const model = require('../config/model/index');
const { Op } = require('sequelize');
const queue = require("../middlewares/amqp_lib.js");
const helpers = {};
const path = require('path');
const fs = require('fs');
const chmodr = require('chmodr');
const mkdirp = require('mkdirp');


helpers.createLog = function (param) {

	try {
		let data_log = [];
		data_log['date_action'] = Date.now();
		data_log['is_read'] = 0;
		data_log['payload'] = JSON.stringify(param.payload[0]);
		for (var key in param) {
			if (key == 'payload') {
				continue;
			} else {
				data_log[key] = param[key];
			}
		}
		data_log = Object.assign({}, data_log);
		const save_log = model.tb_log.create(data_log)
		return
	} catch (err) {
		console.log(err);
	}
}

helpers.sendEmail = function (id_permohonan) {

	let rs = model.masterList.findOne({
		where: {
			id_permohonan: id_permohonan
		}
	}).then((ress) => {
		console.log(ress);
		let email = ress.dataValues.email;
		var message = {
			attributes: {
				userId: "john.doe", 		// username
				fullName: "John Doe", 		// nama
				tokenClient: "kaskd", 		// token login
				phoneNumber: "085", 		// no_telp
				mailTo: email 				// email
			},
			contents: {
				data: {
					uri: "/login/success", 		// ?
					moduleName: ress.dataValues.kd_layanan, //kd_layanan
					transactionId: ress.dataValues.id_permohonan, 	// id_permohonan masterlist
					transactionData: {
						requestNumber: "<b>" + ress.dataValues.id_permohonan + "</b>", 		 	// kd_proses
						moduleName: ress.dataValues.kd_layanan,   	// kd_layanan
						dateAccepted: ress.dataValues.tgl_pengajuan, 	// tgl_pengajuan
						acceptedNumber: "<b>" + ress.dataValues.no_keputusan + "</b>" 	// ?
					}
				},
				message: {
					type: "Notification",
					status: "<b>Success</b>",
					subject: "Send email with builder", // jika user kirm = permohonan perngajuan / jika admin kirim = persetujuan pengiriman
					text: "<b>Ini isi Text</b>" 		// ?
				}
			}
		}
		queue.publishExchange('lnsw.e.notice', 'direct', 'notice.email', JSON.stringify(message));
		console.log(message);
		return true;

	}).catch((err) => {
		console.log(err);
	})
}

helpers.uploadData = async (param) => {
	/*
	set parameter to upload
		1.id_permohonan
		2.kd_layanan
		3.file_upload
	*/
	let ext = path.extname(param.file_upload.name);

	const ress = {};
	let id_permohonan = param.id_permohonan;
	let file_name = Date.now() + '_' + id_permohonan+ext;
	console.log(file_name);

	let data_masterlist = await model.masterList.findOne({
		where: {
			id_permohonan: id_permohonan
		}
	});
	let nib = data_masterlist.dataValues.nib;
	let kd_layanan = data_masterlist.dataValues.kd_layanan;

	let data_layanan = await model.layanan.findOne({
		where: {
			kd_layanan: kd_layanan
		}
	});

	//define upload path
	let path_upload = data_layanan.dataValues.path_upload + nib + '/';

	//check folder exsist or not
	if (!fs.existsSync(path_upload)) {
		fs.mkdir(path_upload, { recursive: true }, (err) => {
			if (err) console.log(err);
		});
	}

	//give privilege to upload
	chmodr(data_layanan.dataValues.path_upload, 0o777, (err) => {
		if (err) console.log(err);
	});

	//concat dir and upload name
	let upload_file = param.file_upload;
	const full_path = path_upload + file_name;

	//do upload file
	upload_file.mv(full_path, (err) => {
		if (err) console.log(err);
	});

	//close privilege to read only
	/*chmodr(path_upload, 5554, (err) => {
		if (err) console.log(err);
	});*/

	ress.nib = nib;
	ress.path = full_path;
	return ress;

}

helpers.deleteFile = async (full_path) => {

	fs.access(full_path, fs.F_OK, (err) => {
		if (err) {
			// file not exsist
			console.error(err)
		} else {

			//give privilege to remove file
			chmodr(full_path, 0o777, (err) => {
				if (err) console.log(err);
			});

			// do remove file
			fs.unlink(full_path, (err) => {
				if (err) console.log(err);
			});

			//close privilege
			/*chmodr(full_path, 0o544, (err) => {
				if (err) console.log(err);
			});*/
		}
		return
	})

}

helpers.uploadGaLogo = async (param) => {
	/*
	set parameter to upload
		1.id
		2.id_file
	*/
	let ext = path.extname(param.file_upload.name);

	const ress = {};
	let file_name = Date.now()+ext;
	// console.log(file_name);

	let data_layanan = await model.layanan.findOne({
		where: {
			kd_layanan: '11'
		}
	});

	//define upload path
	let path_upload = data_layanan.dataValues.path_upload;

	//check folder exsist or not
	if (!fs.existsSync(path_upload)) {
		fs.mkdir(path_upload, { recursive: true }, (err) => {
			if (err) console.log(err);
		});
	}

	//give privilege to upload
	chmodr(data_layanan.dataValues.path_upload, 0o777, (err) => {
		if (err) console.log(err);
	});

	//concat dir and upload name
	let upload_file = param.file_upload;
	const full_path = path_upload + file_name;

	//do upload file
	upload_file.mv(full_path, (err) => {
		if (err) console.log(err);
	});

	//close privilege to read only
	/*chmodr(path_upload, 5554, (err) => {
		if (err) console.log(err);
	});*/

	// ress.nib = nib;
	ress.path = full_path;
	return ress;

}



helpers.uploadIntr = async (param) => {
	/*
	set parameter to upload
		1.id
		2.id_file
	*/
	let ext = path.extname(param.file_upload.name);

	const ress = {};
	let file_name = Date.now()+ext;
	// console.log(file_name);

	let data_layanan = await model.layanan.findOne({
		where: {
			kd_layanan: '12'
		}
	});

	//define upload path
	let path_upload = data_layanan.dataValues.path_upload;

	//check folder exsist or not
	if (!fs.existsSync(path_upload)) {
		fs.mkdir(path_upload, { recursive: true }, (err) => {
			if (err) console.log(err);
		});
	}

	//give privilege to upload
	chmodr(data_layanan.dataValues.path_upload, 0o777, (err) => {
		if (err) console.log(err);
	});

	//concat dir and upload name
	let upload_file = param.file_upload;
	const full_path = path_upload + file_name;

	//do upload file
	upload_file.mv(full_path, (err) => {
		if (err) console.log(err);
	});

	//close privilege to read only
	/*chmodr(path_upload, 5554, (err) => {
		if (err) console.log(err);
	});*/

	// ress.nib = nib;
	ress.path = full_path;
	return ress;

}

module.exports = helpers;