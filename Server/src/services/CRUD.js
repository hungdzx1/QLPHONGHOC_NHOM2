const pool = require("../config/database");

// ================= ROOMS =================

const getAllRooms = async () => {
  const { rows } = await pool.query("SELECT * FROM rooms");
  return rows;
};

const creatNewRooms = async (roomName, roomType, capacity, status) => {
  await pool.query(
    `INSERT INTO rooms (room_name, room_type, so_luong, is_available)
     VALUES ($1, $2, $3, $4)`,
    [roomName, roomType, capacity, status]
  );
};

const getRoomByID = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM rooms WHERE id = $1",
    [id]
  );
  return rows[0] || null;
};

const UpdateRooms = async (id, name, roomType, capacity, status) => {
  await pool.query(
    `UPDATE rooms
     SET room_name = $1,
         room_type = $2,
         so_luong = $3,
         is_available = $4
     WHERE id = $5`,
    [name, roomType, capacity, status, id]
  );
};

const DeleteRoomById = async (id) => {
  await pool.query(
    `DELETE FROM rooms WHERE id = $1`,
    [id]
  );
};

const GetRoomByName = async (name) => {
  const { rows } = await pool.query(
    `SELECT * FROM rooms WHERE room_name ILIKE $1`,
    [`%${name}%`]
  );
  return rows;
};

const GetIdRoomByName = async (name) => {
  const { rows } = await pool.query(
    `SELECT id FROM rooms WHERE room_name = $1`,
    [name]
  );
  return rows[0]?.id;
};

// ================= ACCOUNT =================

const checkAccount = async (username, password) => {
  const { rows } = await pool.query(
    "SELECT * FROM account WHERE username = $1 AND password = $2",
    [username, password]
  );

  return rows[0] || null;
};

const getUserByID = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM account WHERE id = $1",
    [id]
  );
  return rows[0] || null;
};

const getFullAcc = async () => {
  const { rows } = await pool.query("SELECT * FROM account");
  return rows;
};

const getUserByUS = async (username) => {
  const { rows } = await pool.query(
    "SELECT * FROM account WHERE username ILIKE '%' || $1 || '%'",
    [username]
  );
  return rows;
};

const CreateAcc = async ( username, password, email, fullname, role) => {
  await pool.query(
    `INSERT INTO account (username, password,  email, fullname, role)
     VALUES ($1, $2, $3, $4, $5)`,
    [username, password, email, fullname, role]
  );
};

const DeleteAccById = async (id) => {
  await pool.query(
    `DELETE FROM account WHERE id = $1`,
    [id]
  );
};

const updateAccoutById = async (id, password, email, name, role) => {
  await pool.query(
    `UPDATE account
     SET password = $1,
         email = $2,
         fullname = $3,
         role = $4
     WHERE id = $5`,
    [password, email, name, role, id]
  );
};

// ================= BOOKINGS =================

const CheckBookingRoom = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM bookings WHERE room_id = $1`,
    [id]
  );
  return rows[0] || null;
};

const CheckTimeBookings = async (id, start, end) => {
  const { rows } = await pool.query(
    `SELECT * FROM bookings
     WHERE room_id = $1
     AND status IN ('PENDING','APPROVED')
     AND (
          start_at < $2
          AND end_at > $3
         )`,
    [id, end, start] 
  );

  return rows[0] || null;
};

const Bookings = async (userId, roomId, ca_hoc, date, purpose) => {
  await pool.query(
    `INSERT INTO bookings 
     (user_id, room_id, ca_hoc, status, date, li_do)
     VALUES ($1, $2, $3, 'PENDING', $4, $5)`,
    [userId, roomId, ca_hoc, date, purpose]
  );
};

/*================== TOTAL ROWS =================*/
const getTotalRooms = async () => {
  const { rows } = await pool.query("SELECT COUNT(*) FROM rooms");
  return parseInt(rows[0].count, 10);
};

const getTotalAccounts = async () => {
  const { rows } = await pool.query("SELECT COUNT(*) FROM account");
  return parseInt(rows[0].count, 10);
};

const getTotalBookings = async () => {
  const { rows } = await pool.query("SELECT COUNT(*) FROM bookings");
  return parseInt(rows[0].count, 10);
}

/*================== GET STATUS =================*/

const getStatus1 = async (id, date) => {
  const { rows } = await pool.query(
    `SELECT * FROM bookings 
     WHERE status = 'APPROVED'
     AND room_id = $1
     AND date = $2
     AND ca_hoc = '1'`,
    [id, date]
  );

  return rows.length > 0 ? "1" : "0";
}

const getStatus2 = async (id, date) => {
  const { rows } = await pool.query(
    `SELECT * FROM bookings 
     WHERE status = 'APPROVED'
     AND room_id = $1
     AND date = $2
     AND ca_hoc = '2'`,
    [id, date]
  );

  return rows.length > 0 ? "1" : "0";
}

const getStatus3 = async (id, date) => {
  const { rows } = await pool.query(
    `SELECT * FROM bookings 
     WHERE status = 'APPROVED'
     AND room_id = $1
     AND date = $2
     AND ca_hoc = '3'`,
    [id, date]
  );

  return rows.length > 0 ? "1" : "0";
}

const getStatus4 = async (id, date) => {
  const { rows } = await pool.query(
    `SELECT * FROM bookings 
     WHERE status = 'APPROVED'
     AND room_id = $1
     AND date = $2
     AND ca_hoc = '4'`,
    [id, date]
  );

  return rows.length > 0 ? "1" : "0";
}
/*================== EXPORTS =================*/

module.exports = {
  getAllRooms, getStatus1, getStatus2, getStatus3, getStatus4,
  creatNewRooms, GetIdRoomByName,
  checkAccount,
  getUserByID,
  getFullAcc,
  getUserByUS,
  CreateAcc,
  getRoomByID,
  UpdateRooms,
  DeleteRoomById,
  GetRoomByName,
  DeleteAccById,
  updateAccoutById,
  CheckBookingRoom,
  CheckTimeBookings,
  Bookings,
  getTotalRooms,
  getTotalAccounts,
  getTotalBookings,
};