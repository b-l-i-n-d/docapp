import 'dotenv/config.js';
import mongoose from 'mongoose';
import { departmentsModel } from './components/departments/index.js';
import { dbConfig } from './configs/index.js';

mongoose
    .connect(dbConfig.URL, dbConfig.OPTIONS)
    .then(() => {
        console.log('Server connected to database');
    })
    .catch((error) => console.log(`${error}. Server did not connect`));

const departments = [
    {
        name: 'Medicine / General Physician',
    },
    {
        name: 'Gynaecology',
    },
    {
        name: 'Pediatrics / Child Care',
    },
    {
        name: 'Dermatology /Skin',
    },
    {
        name: 'Psychiatry',
    },
    {
        name: 'Psychology / Counselling',
    },
    {
        name: 'Nutrition & Dietetics',
    },
    {
        name: 'Ophthalmology / Eye',
    },
    {
        name: 'Complemetary and Alternative Medicine',
    },
    {
        name: 'Neurology / Brain',
    },
    {
        name: 'Orthopedics',
    },
    {
        name: 'Internal Medicine',
    },
    {
        name: 'Gastroenterology',
    },
    {
        name: 'Endocrinology / Diabetes',
    },
    {
        name: 'Cardiology / Heart',
    },
    {
        name: 'Dentistry / Dental Care',
    },
    {
        name: 'Ear, Nose and Throat / ENT',
    },
    {
        name: 'Urology',
    },
    {
        name: 'Pulmonology / Lungs',
    },
    {
        name: 'Nephrology / Kidney',
    },
    {
        name: 'Oncology / Cancer',
    },
    {
        name: 'Hematology / Blood',
    },
    {
        name: 'Physical Medicine and Rehabilitation / Physiotherapy',
    },
    {
        name: 'Rheumatology',
    },
    {
        name: 'General Surgery',
    },
    {
        name: 'Neurosurgery',
    },
    {
        name: 'Vascular Surgery',
    },
    {
        name: 'Plastic Surgery',
    },
    {
        name: 'Colorectal Surgery',
    },
    {
        name: 'Pediatric Gastroenterology',
    },
    {
        name: 'Obstetrics',
    },
    {
        name: 'Family Medicine',
    },
    {
        name: 'Podiatry',
    },
    {
        name: 'Nuclear Medicine',
    },
    {
        name: 'Pediatric Neurology',
    },
    {
        name: 'Parasitology',
    },
    {
        name: 'Occupatioal Therapy',
    },
    {
        name: 'Optometry',
    },
    {
        name: 'Herbal Medicine',
    },
    {
        name: 'Neonatology',
    },
    {
        name: 'Chiropractic',
    },
];

const seedDB = async () => {
    try {
        await departmentsModel.deleteMany({});
        await departmentsModel.insertMany(departments);
        console.log('Seeded departments');
    } catch (error) {
        console.error(error.message);
    }
};

seedDB().then(() => {
    mongoose.disconnect();
    console.log('Disconnected from database');
});
