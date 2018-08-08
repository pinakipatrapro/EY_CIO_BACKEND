/*Load Cost Pool data*/

function loadData(dataGenerator){
	var counter = 0;
	
	for(var i = 0 ; i < genObj.companyName.length; i++){
		
		var sql = 	'insert into  "CIO"."CIO.GenerateData.DB.Tables::ReportingUnit" values(?,?,?,?)';
		var statement = genObj.connection.prepareStatement(sql);
		
		var cCode = genObj.generateRandomAlphaNum(10,{
			aPossibilities : '1234567890',
			prefix : "1000"
		});
		var companyName = genObj.generateRandomAlphaNum(1,{
			aPossibilities : [genObj.companyName[i]],
			prefix : ""
		});
		var states = genObj.generateRandomAlphaNum(1,{
			aPossibilities : genObj.states,
			prefix : ""
		});
		var country = genObj.countries[genObj.states.indexOf(states)];
		
		statement.setString(1,cCode);
		statement.setString(2,companyName);
		statement.setString(3,country);
		statement.setString(4,states);

		var resultSet= statement.executeQuery();
		genObj.connection.commit();
		counter++;
	}
	
	genObj.addMessage("Total number of reporting units generated : "+ counter , "Success")
}