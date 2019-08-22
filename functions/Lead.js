// const firebase = require('/Users/Aurea/Documents/Gama Academy/Assigments/ClienteTech/firebase.js');
const firebase = require('./firebase.js');
const stringify = require('csv-stringify');

const create = ({ name, email }) => {
    const leads = firebase.database().ref('leads');
    const lead = leads.push([name, email]);
    return lead;
};

const csv = (callback) => {
    const leads = firebase.database().ref('leads');
    const data =[['name', 'email']];
    leads.on('value', (snapshot) => {
        snapshot.forEach((lead)=> {
            const jsonLead = lead.toJSON();
            data.push([jsonLead[0], jsonLead[1]]);
        });
            stringify(data, (err, output) => {
            callback(output);
        });
    });
};

module.exports = {
    create,
    csv,
};



// const newLead = dataForm => {
//     let date = new Date();
//     leoct brDate = date.toLaleDateString('pt-BR')
//     let brTime = date.toLocaleTimeString('pt-BR')
//     const leads = firebase.database().ref('leads');
//     const lead = leads.push([dataForm.email, dataForm.name, , dataForm.ip, 'B2C', `${brDate} ${brTime}`]);
//     return lead;
// };

