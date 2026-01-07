const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing with URL-encoded password...');
console.log('Password in URI: Yaswanth%401881%40');
console.log('Decoded: Yaswanth@1881@');

const uri = 'mongodb+srv://yaswanthharit_db_user:Yaswanth%401881%40@cancer-cluster.mongodb.net/cancer-care?retryWrites=true&w=majority';

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000
})
.then(() => {
  console.log('✅ ✅ ✅ SUCCESS! Connected with your original password!');
  console.log('👤 Username: yaswanthharit_db_user');
  console.log('🔑 Password: Yaswanth@1881@ (URL encoded as %40)');
  console.log('🚀 Database ready for cancer care platform!');
  process.exit(0);
})
.catch(err => {
  console.log('❌ Error:', err.message);
  console.log('\n💡 If still failing:');
  console.log('1. Go to MongoDB → Network Access');
  console.log('2. Add IP Address: 0.0.0.0/0');
  console.log('3. Wait 2 minutes');
  process.exit(1);
});