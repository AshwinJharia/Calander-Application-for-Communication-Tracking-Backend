const dotenv = require('dotenv');
const mongoose = require("mongoose");
dotenv.config();
console.log(process.env.MONGO_URL);

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_URL}`);

// Models
const Company = mongoose.model("Company", new mongoose.Schema({
  name: String,
  location: String,
  linkedIn: String,
  emails: [String],
  phoneNumbers: [String],
  comments: String,
  periodicity: String,
}));

const CommunicationMethod = mongoose.model("CommunicationMethod", new mongoose.Schema({
  name: String,
  description: String,
  sequence: Number,
  mandatory: Boolean
}));

// Communication Model
const Communication = mongoose.model("Communication", new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  type: { type: mongoose.Schema.Types.ObjectId, ref: "CommunicationMethod" },
  date: Date,
  notes: String,
}));

// Notification Model
const Notification = mongoose.model("Notification", new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  communication: { type: mongoose.Schema.Types.ObjectId, ref: "Communication" },
  type: String, // 'overdue' or 'due today'
  message: String,
}));

// Seed Data
const seedData = async () => {
  await Company.deleteMany();
  await CommunicationMethod.deleteMany();
  await Communication.deleteMany();
  await Notification.deleteMany();

  const companies = [
    {
      name: "Digital Solutions Ltd",
      location: "London",
      linkedIn: "https://linkedin.com/company/digitalsolutions",
      emails: ["contact@digitalsolutions.com", "sales@digitalsolutions.com"],
      phoneNumbers: ["+44 20 1234 5678", "+44 20 8765 4321"],
      comments: "Enterprise client, interested in AI solutions",
      periodicity: "1 week",
    },
    {
      name: "Global Tech Partners",
      location: "Singapore",
      linkedIn: "https://linkedin.com/company/globaltechpartners",
      emails: ["info@globaltechpartners.com", "partnerships@globaltechpartners.com"],
      phoneNumbers: ["+65 6789 0123"],
      comments: "Strategic partner in APAC region",
      periodicity: "2 weeks",
    },
    {
      name: "Nordic Innovation AS",
      location: "Oslo",
      linkedIn: "https://linkedin.com/company/nordicinnovation",
      emails: ["post@nordicinnovation.no"],
      phoneNumbers: ["+47 123 45 678"],
      comments: "Scandinavian market leader",
      periodicity: "1 month",
    },
    {
      name: "Smart Systems GmbH",
      location: "Berlin",
      linkedIn: "https://linkedin.com/company/smartsystems",
      emails: ["kontakt@smartsystems.de", "support@smartsystems.de"],
      phoneNumbers: ["+49 30 12345678"],
      comments: "German industrial automation specialist",
      periodicity: "2 weeks",
    },
    {
      name: "Future Dynamics",
      location: "Dubai",
      linkedIn: "https://linkedin.com/company/futuredynamics",
      emails: ["hello@futuredynamics.ae"],
      phoneNumbers: ["+971 4 123 4567"],
      comments: "Middle East expansion planned",
      periodicity: "1 week",
    }
  ];

  const createdCompanies = await Company.insertMany(companies);

  const communications = [
    { name: 'Video Conference', description: 'Zoom/Teams meeting', sequence: 1, mandatory: true },
    { name: 'WhatsApp Business', description: 'Instant messaging', sequence: 2, mandatory: false },
    { name: 'In-Person Meeting', description: 'Face to face meeting', sequence: 3, mandatory: true },
    { name: 'Project Update', description: 'Regular status update', sequence: 4, mandatory: true },
    { name: 'Newsletter', description: 'Monthly company newsletter', sequence: 5, mandatory: false },
    { name: 'Social Media Engagement', description: 'Platform interaction', sequence: 6, mandatory: true },
    { name: 'Quarterly Review', description: 'Business review meeting', sequence: 7, mandatory: true }
  ];

  const createdMethods = await CommunicationMethod.insertMany(communications);

  // Adding communications for companies
  const communicationEntries = [
    {
      company: createdCompanies[0]._id,
      type: createdMethods[0]._id,
      date: new Date('2024-01-15'),
      notes: "Quarterly strategy discussion"
    },
    {
      company: createdCompanies[0]._id,
      type: createdMethods[1]._id,
      date: new Date('2024-01-20'),
      notes: "Product demo follow-up"
    },
    {
      company: createdCompanies[1]._id,
      type: createdMethods[2]._id,
      date: new Date('2024-02-01'),
      notes: "Partnership expansion meeting"
    },
    {
      company: createdCompanies[2]._id,
      type: createdMethods[3]._id,
      date: new Date('2024-02-10'),
      notes: "Market entry planning"
    },
    {
      company: createdCompanies[3]._id,
      type: createdMethods[4]._id,
      date: new Date('2024-02-15'),
      notes: "Technical integration discussion"
    }
  ];

  await Communication.insertMany(communicationEntries);

  // Adding notifications for overdue or due communications
  const notifications = [
    {
      user: new mongoose.Types.ObjectId("6748460ea8ccd99f8fae3010"),
      company: createdCompanies[0]._id,
      communication: communicationEntries[0]._id,
      type: 'due today',
      message: 'Video conference with Digital Solutions Ltd scheduled today'
    },
    {
      user: new mongoose.Types.ObjectId("6748460ea8ccd99f8fae3010"),
      company: createdCompanies[1]._id,
      communication: communicationEntries[1]._id,
      type: 'overdue',
      message: 'Follow-up meeting with Global Tech Partners pending'
    },
    {
      user: new mongoose.Types.ObjectId("67484f7b1ebb59a6291f394d"),
      company: createdCompanies[2]._id,
      communication: communicationEntries[2]._id,
      type: 'due today',
      message: 'Nordic Innovation project update due'
    },
    {
      user: new mongoose.Types.ObjectId("67484f7b1ebb59a6291f394d"),
      company: createdCompanies[3]._id,
      communication: communicationEntries[3]._id,
      type: 'overdue',
      message: 'Smart Systems GmbH quarterly review overdue'
    }
  ];

  await Notification.insertMany(notifications);

  console.log("\n\nSeed data added successfully!");
  mongoose.connection.close();
};

seedData();
