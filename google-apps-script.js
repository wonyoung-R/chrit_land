/**
 * Google Apps Script for Chrit Email Collection
 * This script handles email submissions from the landing page
 * and stores them in Google Sheets starting from cell B2
 */

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    const timestamp = data.timestamp;
    
    // Validate email format
    if (!isValidEmail(email)) {
      return ContentService
        .createTextOutput(JSON.stringify({success: false, error: 'Invalid email format'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Check if email already exists
    const existingEmails = sheet.getRange('B:B').getValues().flat();
    if (existingEmails.includes(email)) {
      return ContentService
        .createTextOutput(JSON.stringify({success: false, error: 'Email already exists'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Find the next empty row starting from B2
    const lastRow = sheet.getLastRow();
    const nextRow = Math.max(lastRow + 1, 2); // Start from row 2 if sheet is empty
    
    // Add headers if this is the first entry
    if (nextRow === 2 && lastRow === 0) {
      sheet.getRange('A1').setValue('순번');
      sheet.getRange('B1').setValue('이메일');
      sheet.getRange('C1').setValue('등록일시');
      sheet.getRange('D1').setValue('상태');
      
      // Style the headers
      const headerRange = sheet.getRange('A1:D1');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
    }
    
    // Insert the new email data
    sheet.getRange(nextRow, 1).setValue(nextRow - 1); // 순번
    sheet.getRange(nextRow, 2).setValue(email); // 이메일
    sheet.getRange(nextRow, 3).setValue(new Date(timestamp)); // 등록일시
    sheet.getRange(nextRow, 4).setValue('대기중'); // 상태
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 4);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Email added successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: 'Server error'}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput(JSON.stringify({message: 'Chrit Email Collection API is running'}))
    .setMimeType(ContentService.MimeType.JSON);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function testEmailSubmission() {
  // Test function to verify the script works
  const testData = {
    email: 'test@example.com',
    timestamp: new Date().toISOString()
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}

/**
 * Setup function to initialize the spreadsheet
 * Run this once to set up the initial structure
 */
function setupSpreadsheet() {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  // Clear existing data
  sheet.clear();
  
  // Set up headers
  sheet.getRange('A1').setValue('순번');
  sheet.getRange('B1').setValue('이메일');
  sheet.getRange('C1').setValue('등록일시');
  sheet.getRange('D1').setValue('상태');
  
  // Style headers
  const headerRange = sheet.getRange('A1:D1');
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
  
  // Set column widths
  sheet.setColumnWidth(1, 80);  // 순번
  sheet.setColumnWidth(2, 250); // 이메일
  sheet.setColumnWidth(3, 180); // 등록일시
  sheet.setColumnWidth(4, 100); // 상태
  
  console.log('Spreadsheet setup completed!');
}

/**
 * Function to get email statistics
 */
function getEmailStats() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    return {
      totalEmails: 0,
      todayEmails: 0,
      lastEmailDate: null
    };
  }
  
  const emails = sheet.getRange(2, 2, lastRow - 1, 1).getValues().flat();
  const dates = sheet.getRange(2, 3, lastRow - 1, 1).getValues().flat();
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayEmails = dates.filter(date => {
    const emailDate = new Date(date);
    emailDate.setHours(0, 0, 0, 0);
    return emailDate.getTime() === today.getTime();
  }).length;
  
  const lastEmailDate = dates.length > 0 ? new Date(Math.max(...dates.map(d => new Date(d)))) : null;
  
  return {
    totalEmails: emails.length,
    todayEmails: todayEmails,
    lastEmailDate: lastEmailDate
  };
}
