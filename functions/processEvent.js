module.exports.handler = async (event) => {
    let records = event.Records
    let batchItemFailures = []

    if (records.length){
        for (const record of records){
            try{
                const parsedBody = JSON.parse(record.body)
                if (typeof parsedBody.detail.vehicleNo != 'string'){
                    throw new Error("Vehicle No. Must be String")
                }
                console.log("Processing Vehicle Details: " + parsedBody.detail.vehicleNo)
                console.log("Processing is Successful: " + record.messageId )
            }catch(err){
                batchItemFailures.push({
                    itemIdentifier: record.messageId
                })
            }

        }
    }
    return {
        batchItemFailures: batchItemFailures 
    }
}