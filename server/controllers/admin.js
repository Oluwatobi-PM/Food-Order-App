router.post('/orders/exportdata', auth, authRole, async(req,res) => {
    try{
        var workbook = XLSX.utils.book_new(); //new workbook
        Order.find((err,data) => {
            if (err) {
                console.log(err)
            }else {
                var orders=JSON.stringify(data);
                orders = JSON.parse(orders);
                var worksheet = XLSX.utils.json_to_sheet(orders)
                var download = __dirname+"\public\exportdata.xlsx"
                XLSX.utils.book_append_sheet(workbook,worksheet,"sheet1")
                XLSX.writeFile(workbook,download)
                res.download(download)
            }
        })
    
    } catch (e){ 
        res.status(500).send(e)
    }