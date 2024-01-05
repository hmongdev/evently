import mongoose from 'mongoose';

// import from .env.local
const MDB_URI = process.env.MDB_URI;

// global cached variable that is created to hold the connection from dB
// set cached to empty object if no mongoose connection exists
let cached = (global as any).mongoose || { conn: null, promise: null };

// create a connection to DB
export const connectToDatabase = async () => {
	// check if cached connection exists
	if (cached.conn) return cached.conn;

	// check if MDB_URI exists
	if (!MDB_URI)
		throw new Error('MONGODB_URI is missing. Check .env.local');

	// create cached conn
	cached.promise =
		cached.promise ||
		mongoose.connect(MDB_URI, {
			dbName: 'Evently',
			bufferCommands: false,
		});

	cached.conn = await cached.promise;

	return cached.conn;
};
