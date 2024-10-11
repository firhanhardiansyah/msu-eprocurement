interface UserResponse {
  res_user: ResUser; // Object berisi data user (id, name)
  refresh_token: string; // Token untuk refresh, tipe data string
  token: string; // Token utama, tipe data string
  token_live: number; // Waktu hidup token, tipe data number
}

interface ResUser {
  id: number; // ID user, tipe data number
  name: string; // Nama user, tipe data string
}

interface UserSession {
  // Add your own fields
}

interface SecureSessionData {
  // Add your own fields
}
