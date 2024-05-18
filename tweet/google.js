// This key will only live until May 4th.
const API_KEY = "AIzaSyDXWHLKHwePQILYFT6mt19H6bTVX1-jZNk";
const GOOGLE_SHEET_ID = "1ik82_qiMtygUaEPlGZuVEDR4ttbK7H_4bG-19x1OgSM";

async function getValuesFromGoogleSheet(range) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${range}?key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.values;
}

export async function getImageUrlsFromGoogleSheet() {
  const rawValues = await getValuesFromGoogleSheet("'Background Images'!B2:B");
  const links = rawValues
    .filter((e) => !!e[0])
    .map((e) => e[0].split(", "))
    .flat()
    .map((e) => e.replace("https://drive.google.com/open?id=", ""));
  return links.map(
    (e) =>
      `https://www.googleapis.com/drive/v3/files/${e}?key=${API_KEY}&alt=media`
  );
}

export async function getMessagesFromGoogleSheet() {
  return getValuesFromGoogleSheet("'Message Stream'!A1:B");
}
