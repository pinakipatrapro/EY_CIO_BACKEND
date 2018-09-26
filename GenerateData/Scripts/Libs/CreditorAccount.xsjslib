/*Load Cost Center data*/
function loadData(dataGenerator){
	var counter = 0;
	
	var aDistinctCreditorAccNumber = genObj.getTableColumnAsDistinctArray('"CIO"."CIO.GenerateData.DB.Tables::ITVendors"','CreditorAccNumber',' 1=1 ');
	
	for(var i = 0 ; i < aDistinctCreditorAccNumber.length; i++){
		
		var sql = 	'insert into "CIO"."CIO.GenerateData.DB.Tables::CreditorAccount" values(?,?,?,?)';
		var statement = genObj.connection.prepareStatement(sql);
		
		var credAcNum = aDistinctCreditorAccNumber[i];
		
		var credName = "Creditor - " + credAcNum;
		
		var states = genObj.generateRandomAlphaNum(1,{
			aPossibilities : genObj.states,
			prefix : ""
		});
		var country = genObj.countries[genObj.states.indexOf(states)];
		
		statement.setString(1,credAcNum);
		statement.setString(2,credName);
		statement.setString(3,states);
		statement.setString(4,country);
		
		var resultSet= statement.executeQuery();
		genObj.connection.commit();
		counter++;
	}
	
	genObj.addMessage("Total number of creditor account generated : "+ counter , "Success")
}