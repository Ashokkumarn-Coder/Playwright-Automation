const ExcelJs =require('exceljs'); //importing the exceljs module to read and write excel files

async  function writeExcelTest(searchText,replaceText,change,filePath) //function to write to an excel file, which takes three parameters: searchText, replaceText, and filePath
{

//let output ={row:-1,column:-1}; //creating an object to store the row and column number of the cell with value 'Apple'
const workbook = new ExcelJs.Workbook(); //creating a new workbook object using the exceljs module
await workbook.xlsx.readFile(filePath); //reading the excel file using the readFile() method of the workbook object, which returns a promise that resolves to the workbook object
const worksheet = workbook.getWorksheet('Sheet1');
const output = await readExcel(workbook,searchText); //creating an object to store the row and column number of the cell with value 'Apple'

if (output.row === -1 || output.column === -1) {
    console.log(`Value '${searchText}' not found in Sheet1`);
    return;
}

const cell = worksheet.getCell(output.row,output.column + change.colChange); //getting the cell at the specified row and column using the getCell() method of the worksheet object
cell.value=replaceText;
await workbook.xlsx.writeFile(filePath); //writing the updated value of the cell back to the excel file using the writeFile() method of the workbook object
console.log(`Updated '${searchText}' to '${replaceText}' at row ${output.row}, column ${output.column}`);
}

async function readExcel(workbook,searchText,change) //function to read an excel file, which takes two parameters: workbook and searchText
{
    let output ={row:-1,column:-1}; //creating an object to store the row and column number of the cell with value 'Apple'
    const worksheet = workbook.getWorksheet('Sheet1');
    worksheet.eachRow((row, rowNumber) =>
    {
        row.eachCell((cell, colNumber) => //iterating through each cell in the row using the eachCell() method of the row object
        {
            if(cell.value === searchText) //checking if the value of the cell is 'Apple', and if it is, logging the row number and column number to the console
            {
                output.row=rowNumber + change.rowChange;
                output.column=colNumber + change.colChange;
            }
        })
    })
    return output; //returning the object with the row and column number of the cell with value 'Apple'
}

// writeExcelTest("Mango", 250 ,{rowChange:0,colChange:2},"C:/Users/ashokkumarn/Downloads/download (1).xlsx")
//     .catch((error) => console.error(error.message)); //calling the writeExcelTest() function with the parameters 'Apple', 'Mango', and the path to the excel file


    //upload and download test case:-
test('Upload download excel validation', async ({ page }) => 

    {
  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
 
  const downloadPromise = page.waitForEvent('download'); //keep an eye on the download event, which is triggered when the user clicks the download button
  await page.getByRole('button', { name: 'Download' }).click();
  const dl = await downloadPromise;
  const filePath = '/Users/rahulshetty/downloads/download.xlsx'; // or await dl.path()

  // ✅ Ensure the edit finishes before upload
  
  await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);
 
  await page.locator('#fileinput').setInputFiles(filePath);  //setInputFiles() method is used to set the file input field with the specified file path, which simulates the user selecting a file to upload.
 //setInputfiles is valid only for input type file, so we need to use locator to find the input field and then set the file path.
  const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
  await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});
