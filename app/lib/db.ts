import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!); // dont forget ssl options if needed when connecting to production databases

export default sql;
