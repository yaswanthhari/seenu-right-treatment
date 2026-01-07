// Test connection to YOUR cancer-care database
use('cancer-care');

// Create a test document
db.test.insertOne({
  message: "Cancer Care Database is Working!",
  timestamp: new Date(),
  status: "active"
});

// Read it back
const result = db.test.find().toArray();

console.log("✅ MongoDB Atlas Connection SUCCESSFUL!");
console.log("📊 Database: cancer-care");
console.log("📝 Test document:", result);

// Clean up
db.test.drop();

console.log("🎉 Your database is ready for cancer care platform!");