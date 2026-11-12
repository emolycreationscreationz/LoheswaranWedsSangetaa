/**
 * RSVP backend — Loheswaran & Sangetaa
 * ------------------------------------
 * 1. Create a new Google Sheet > Extensions > Apps Script.
 * 2. Delete the sample code, paste this file, Save.
 * 3. Deploy > New deployment > Type: Web app
 *      Execute as: Me
 *      Who has access: Anyone
 * 4. Copy the Web App URL (ends with /exec) into js/config.js -> rsvp.apiUrl.
 *
 * Each RSVP becomes one row in the "RSVP" tab.
 * If you edit this code later: Deploy > Manage deployments > Edit > New version
 * (keeps the same URL).
 */

var TAB = 'RSVP';
var HEADERS = ['Timestamp', 'Name', 'Phone', 'Pax', 'Meal', 'Wishes'];
var MEALS = ['Vegetarian', 'Non-Vegetarian'];

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(TAB);
  if (!sh) {
    sh = ss.insertSheet(TAB);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Stop spreadsheet formula injection (text starting with = + - @)
function clean_(s, max) {
  s = String(s == null ? '' : s).trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function doGet() {
  return json_({ ok: true });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var d = JSON.parse(e.postData.contents);
    var name = clean_(d.name, 80);
    var phone = clean_(String(d.phone || '').replace(/[^\d+\s-]/g, ''), 20);
    var pax = Math.min(Math.max(parseInt(d.pax, 10) || 0, 1), 20);
    var meal = MEALS.indexOf(d.meal) >= 0 ? d.meal : '';
    var wishes = clean_(d.wishes, 500);
    if (!name || !phone || !meal) return json_({ ok: false, error: 'Name, phone and meal are required' });
    sheet_().appendRow([new Date(), name, "'" + phone, pax, meal, wishes]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}
