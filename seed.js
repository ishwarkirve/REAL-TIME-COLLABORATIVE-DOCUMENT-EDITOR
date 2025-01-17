const mongoose = require('mongoose');
const Document = require('../backend/models/Document'); // Adjust path if necessary

// MongoDB connection string
const MONGO_URI = 'mongodb://localhost:27017/collaborative_editor';

// Sample data
const seedData = [
  {
    title: 'Sample Document',
    content: 'This is a sample document content.',
  },
];

const seedDatabase = async () => {
  try {
    // Connect to the database
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected!');

    // Clear the collection
    await Document.deleteMany({});
    console.log('Collection cleared!');

    // Insert seed data
    await Document.insertMany(seedData);
    console.log('Seed data inserted!');

    // Close the connection
    mongoose.connection.close();
    console.log('Database connection closed!');
  } catch (error) {
    console.error('Error seeding the database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();
