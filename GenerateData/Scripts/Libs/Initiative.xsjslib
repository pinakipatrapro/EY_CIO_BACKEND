function loadData(dataGenerator) {
	var counter = 0;
    
    var sql = 'insert into "CIO"."CIO.GenerateData.DB.Tables::Initiative" values(?,?,?,?)';
	var statement = genObj.connection.prepareStatement(sql);
	for(var i=0;i<genObj.initiativesName.length;i++){
		
		var initiativeID = genObj.generateRandomAlphaNum(11, {
			aPossibilities: '1234567890',
			prefix: "INIT-"
		});
		var initiativeName =  genObj.initiativesName[i];
		
		var budget = genObj.generateRandomDecimal(100000,99999999) ;
		
		var projectMgr =  genObj.generateRandomAlphaNum(1,{
			aPossibilities : genObj.distinctNames,
			prefix : ""
		});
		
		statement.setString(1,initiativeID);
		statement.setString(2,initiativeName);
		statement.setDecimal(3,budget);
		statement.setString(4,projectMgr);
		var resultSet= statement.executeQuery();
		counter++;
	}
	genObj.addMessage("Total number of Initiatives generated : " + counter, "Success")
	genObj.connection.commit();
}