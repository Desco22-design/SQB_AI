/**
 * SQB AI — Resume (CV) intake Web App.
 *
 * Receives a resume from the careers form, saves it to Google Drive (this
 * account's Drive), and appends the applicant's ФИО + a clickable CV link to the
 * recruitment spreadsheet. Runs as the account that deploys it, so files are
 * owned by — and live in — that account's Drive.
 *
 * DEPLOY: see DEPLOY.md next to this file.
 */

// ── Config ──────────────────────────────────────────────────────────────────
var SECRET = 'CHANGE_ME_to_a_long_random_string'; // MUST equal NEXT_PUBLIC_RESUME_UPLOAD_TOKEN
var SHEET_ID = '13ILX7X1bTbRu7YqH__CF89QgxtAZvnnUpecWaJuB7uA';
var FOLDER_NAME = 'SQB AI — Rezyumelar'; // Drive folder for resumes (auto-created)
var FIO_COL = 12; // column L = ФИО
var CV_COL = 13;  // column M = CV
var MAX_BYTES = 15 * 1024 * 1024;
var MAX_PER_DAY = 300; // coarse abuse cap: reject once this many uploads land in one day

// Resumes are PII. By default files stay PRIVATE (owned by this account); the
// HYPERLINK in the sheet opens for YOU (and anyone you share the Drive folder
// with). Only flip this to true if you truly need world-readable-by-link files.
var MAKE_LINK_PUBLIC = false;

// ── Entry point ─────────────────────────────────────────────────────────────
function doPost(e) {
  try {
    // Fail closed if the script was deployed without setting a real secret.
    if (!SECRET || SECRET === 'CHANGE_ME_to_a_long_random_string') {
      return out_({ ok: false, error: 'not_configured' });
    }
    if (!e || !e.postData || !e.postData.contents) {
      return out_({ ok: false, error: 'no_body' });
    }
    var body = JSON.parse(e.postData.contents);

    if (String(body.token) !== SECRET) {
      return out_({ ok: false, error: 'unauthorized' });
    }
    // Bot honeypot: the form's hidden "website" field must stay empty.
    if (String(body.website || '').trim() !== '') {
      return out_({ ok: false, error: 'rejected' });
    }

    var name = String(body.name || '').trim().slice(0, 200);
    var filename = sanitizeName_(String(body.filename || 'CV'));
    var mime = String(body.mimeType || '');
    var b64 = String(body.fileB64 || '');
    console.log('CV intake start: name="%s" file="%s" mime="%s"', name, filename, mime);
    if (!b64) { console.warn('reject no_file: name="%s"', name); return out_({ ok: false, error: 'no_file' }); }

    // Cheap size pre-check before decoding (base64 ≈ 4/3 of raw bytes).
    if (b64.length > Math.ceil(MAX_BYTES * 1.4)) {
      console.warn('reject too_large (pre-decode): name="%s" file="%s"', name, filename);
      return out_({ ok: false, error: 'too_large' });
    }

    var bytes = Utilities.base64Decode(b64);
    if (bytes.length > MAX_BYTES) {
      console.warn('reject too_large: name="%s" bytes=%s', name, bytes.length);
      return out_({ ok: false, error: 'too_large' });
    }
    if (!isAllowed_(bytes, filename)) {
      console.warn('reject bad_type: name="%s" file="%s" bytes=%s', name, filename, bytes.length);
      return out_({ ok: false, error: 'bad_type' });
    }

    // Coarse daily rate limit to bound abuse of the browser-visible token.
    var todayCount = bumpDailyCount_();
    if (todayCount > MAX_PER_DAY) {
      console.warn('reject rate_limited: count=%s name="%s"', todayCount, name);
      return out_({ ok: false, error: 'rate_limited' });
    }

    // Save to Drive. File is owned by this account; kept private by default.
    var folder = getFolder_(FOLDER_NAME);
    var blob = Utilities.newBlob(bytes, mime || 'application/octet-stream', filename);
    var file = folder.createFile(blob);
    if (MAKE_LINK_PUBLIC) {
      try {
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      } catch (shareErr) {
        // Some accounts restrict ANYONE sharing; the link still works for the owner.
      }
    }
    var url = file.getUrl();

    // Append ФИО (L) + clickable CV link (M) at the very end of the sheet.
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    var row = sheet.getLastRow() + 1;
    var fioCell = sheet.getRange(row, FIO_COL);
    fioCell.setNumberFormat('@'); // force plain text — never interpret as a formula
    fioCell.setValue(safeCell_(name || '(no name)'));
    // Column D is a server-built formula; the label is user text, so escape
    // quotes AND neutralize a leading formula trigger inside the string literal.
    var label = safeCell_(name ? name + ' — CV' : filename).replace(/"/g, '""');
    sheet.getRange(row, CV_COL).setFormula('=HYPERLINK("' + url + '","' + label + '")');

    console.log('CV saved OK: row=%s name="%s" file="%s" bytes=%s url=%s',
      row, name, filename, bytes.length, url);
    return out_({ ok: true, url: url, row: row });
  } catch (err) {
    console.error('CV intake ERROR: %s', String(err));
    return out_({ ok: false, error: String(err) });
  }
}

// ── Helpers ─────────────────────────────────────────────────────────────────

// Validate the real file signature (magic bytes) + extension. Bytes from
// base64Decode are signed Java bytes, so mask with & 0xFF before comparing.
function isAllowed_(bytes, filename) {
  if (!bytes || bytes.length < 4) return false;
  var ext = (filename.split('.').pop() || '').toLowerCase();
  var u = function (i) { return bytes[i] & 0xFF; };
  // PDF: 25 50 44 46  (%PDF)
  if (u(0) === 0x25 && u(1) === 0x50 && u(2) === 0x44 && u(3) === 0x46) return ext === 'pdf';
  // DOCX (ZIP container): 50 4B  (PK) — must actually contain a Word part,
  // otherwise any .zip/.xlsx/.pptx renamed to .docx would slip through.
  if (u(0) === 0x50 && u(1) === 0x4B) {
    return ext === 'docx' && hasAscii_(bytes, 'word/document.xml');
  }
  // Legacy DOC (OLE compound): D0 CF 11 E0
  if (u(0) === 0xD0 && u(1) === 0xCF && u(2) === 0x11 && u(3) === 0xE0) return ext === 'doc';
  return false;
}

// Search only the head + tail of the byte array for an ASCII marker. A ZIP
// stores entry names in local headers (near the start) and the central
// directory (at the end), so scanning both ends finds "word/document.xml"
// without walking a 15 MB buffer.
function hasAscii_(bytes, str) {
  var WINDOW = 32 * 1024;
  var n = bytes.length;
  if (scanAscii_(bytes, str, 0, Math.min(n, WINDOW))) return true;
  var tailStart = Math.max(0, n - WINDOW);
  return scanAscii_(bytes, str, tailStart, n);
}

function scanAscii_(bytes, str, from, to) {
  var t = [];
  for (var i = 0; i < str.length; i++) t.push(str.charCodeAt(i));
  var last = to - t.length;
  for (var p = from; p <= last; p++) {
    var ok = true;
    for (var j = 0; j < t.length; j++) {
      if ((bytes[p + j] & 0xFF) !== t[j]) { ok = false; break; }
    }
    if (ok) return true;
  }
  return false;
}

// Neutralize spreadsheet formula injection: a cell whose text starts with
// = + - @ (or tab/CR) is treated as a live formula by Sheets. Prefix with an
// apostrophe so it is stored as literal text.
function safeCell_(s) {
  s = String(s == null ? '' : s);
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
}

function sanitizeName_(n) {
  n = n.replace(/[\/\\:*?"<>|\r\n]/g, '_').slice(0, 120).trim();
  return n || 'CV';
}

// Per-day counter in Script Properties (persists across invocations).
function bumpDailyCount_() {
  var props = PropertiesService.getScriptProperties();
  var key = 'cnt_' + Utilities.formatDate(new Date(), 'Etc/UTC', 'yyyyMMdd');
  var n = parseInt(props.getProperty(key) || '0', 10) + 1;
  props.setProperty(key, String(n));
  return n;
}

function getFolder_(name) {
  var it = DriveApp.getFoldersByName(name);
  return it.hasNext() ? it.next() : DriveApp.createFolder(name);
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
