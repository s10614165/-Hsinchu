import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID; // 替換為你的Google Sheet ID

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS, // 指向你的服務帳戶密鑰文件
  scopes: SCOPES,
});
