// const excel = require('exceljs')
// const Order = require('../models/order')

// const exportToExcelUtility = async (order) => {
//     let workbook = new excel.Workbook()
//         workbook.creator = "Raji"
//     let worksheet = workbook.addWorksheet("Orders")
//         worksheet.state = "visible"
//         worksheet.properties.defaultColWidth = 30
//         worksheet.addTable(order)
//     return workbook
// }


// const exportToExcel = async () => {
//         try{
//             const order = await Order.find()
//             return exportToExcelUtility(order)
//         }catch(err){
//             throw err
//     }
// }

// module.exports = exportToExcel
