const Sequelize = require('sequelize');
const db = require('../database/database');

const logSKKMIGAS = db.define('tb_log_service_bkipm', {
	id_log_skkmigas: {
		type: Sequelize.CHAR(100),
		primaryKey: true,
	},
	nomer_aju: {
		type: Sequelize.CHAR(26),
	},
	no_pengantar_rkbi: {
		type: Sequelize.CHAR(50),
	},
	no_putusan_rkbi_skk: {
		type: Sequelize.CHAR(50),
	},
	tgl_putusan: {
		type: Sequelize.CHAR(8),
	},
	keterangan: {
		type: Sequelize.CHAR(1000),
	},
	status: {
		type: Sequelize.CHAR(100),
	},
	file_putusan: {
		type: Sequelize.CHAR(1000),
	},
	waktu_rekam: {
		type: Sequelize.DATE,
	},
}, {
	schema: 'log_inswii',
	freezeTableName: true,
	timestamps: false
});

module.exports = logSKKMIGAS;