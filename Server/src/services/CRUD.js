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
    "SELECT username FROM account WHERE username = $1",
    [username]
  );
  return rows;
};

const CreateAcc = async (usr, pass, name, role) => {
  await pool.query(
    `INSERT INTO account (username, password, fullname, role)
     VALUES ($1, $2, $3, $4)`,
    [usr, pass, name, role]
  );
};

const DeleteAccById = async (id) => {
  await pool.query(
    `DELETE FROM account WHERE id = $1`,
    [id]
  );
};

const updateAccoutById = async (id, pass, role, name) => {
  await pool.query(
    `UPDATE account
     SET password = $1,
         role = $2,
         fullname = $3
     WHERE id = $4`,
    [pass, role, name, id]
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
    [id, end, start] // chú ý thứ tự để check overlap chuẩn
  );

  return rows[0] || null;
};

const Bookings = async (userId, roomId, startTime, endTime) => {
  await pool.query(
    `INSERT INTO bookings 
     (user_id, room_id, start_at, end_at, status)
     VALUES ($1, $2, $3, $4, 'PENDING')`,
    [userId, roomId, startTime, endTime]
  );
};

module.exports = {
  getAllRooms,
  creatNewRooms,
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
};