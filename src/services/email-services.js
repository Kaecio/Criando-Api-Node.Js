'use strict';
const config = require('../config');
const sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'kaecio@yahoo.com.br',
        subject: subject,
        html: body
    })
    console.log('caiu no export')
}