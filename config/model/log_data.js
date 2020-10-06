const Sequelize = require('sequelize');
const db = require('../database/database');

const logServiceBKIPM = db.define('tb_log_service_bkipm', {
	id_log: {
		type: Sequelize.CHAR(100),
		primaryKey: true,
	},
	kd_layanan: {
		type: Sequelize.NUMBER,
	},
	id_permohonan: {
		type: Sequelize.CHAR(13),
	},
	action_type: {
		type: Sequelize.CHAR(200),
	},
	username: {
		type: Sequelize.CHAR(200),
	},
	date_action: {
		type: Sequelize.DATE,
	},
	is_read: {
		type: Sequelize.CHAR(1),
	},
	payload_input: {
		type: Sequelize.STRING,
	},
	payload_output: {
		type: Sequelize.STRING,
	},
	kd_proses: {
		type: Sequelize.NUMBER,
	},
}, {
	schema: 'log_inswii',
	freezeTableName: true,
	timestamps: false
});

module.exports = logServiceBKIPM;