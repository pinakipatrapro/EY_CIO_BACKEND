/*Load Project data*/

function loadData(dataGenerator){
	var counter = 0;
	var aDistinctInitiatives = genObj.getTableColumnAsDistinctArray('"CIO"."CIO.GenerateData.DB.Tables::Initiative"','InitiativeID',' 1=1 ');
	
	for(var i = 0 ; i < genObj.projectName.length; i++){

		var sql = ' insert into "CIO"."CIO.GenerateData.DB.Tables::Project" values( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? ,?,?,?,?,?,?, ? , ? , ? ) ';
		var statement = genObj.connection.prepareStatement(sql);
		
		// 1 - 6
		var projectId = genObj.generateRandomAlphaNum(11,{
			aPossibilities : '1234567890',
			prefix : "PRO-"
		});
		var initiativeID =  aDistinctInitiatives[genObj.generateRandomDecimal(0,aDistinctInitiatives.length -1)];
		
		var projName = genObj.projectName[i];
		
		var projMgr = genObj.generateRandomAlphaNum(1,{
			aPossibilities : genObj.distinctNames,
			prefix : ""
		});
		
		var projClass = genObj.generateRandomAlphaNum(1,{
			aPossibilities :  ['A','B','C'],
			prefix : ""
		});
		
		var projCat = genObj.generateRandomAlphaNum(1,{
			aPossibilities : genObj.projectCategory,
			prefix : ""
		});
		
		////7-10
		var standaloneOrGroup = genObj.generateRandomAlphaNum(1,{
			aPossibilities : ['Standalone','Groupwide'],
			prefix : ""
		});
		var projectType = genObj.generateRandomAlphaNum(1,{
			aPossibilities : ['Product /  Service Development'],
			prefix : ""
		});
		
		var statusPhase = genObj.generateRandomAlphaNum(1,{
			aPossibilities : ['Qualify','Plan','Design','Implement','Rollout','Closed'],
			prefix : ""
		});
		
		var statusScope = genObj.generateRandomAlphaNum(1,{
			aPossibilities : ['Unchanged','Scaled Up','Scaled Down'],
			prefix : ""
		});
		
		// Phase dates
		var QSD = genObj.generateRandDate('20170101','20181231');  
		var QED = genObj.addDaysToDate(QSD,genObj.generateRandomDecimal(1,30));  
		 
		var PSD = genObj.addDaysToDate(QED,genObj.generateRandomDecimal(1,1));  
		var PED = genObj.addDaysToDate(PSD,genObj.generateRandomDecimal(1,30));  
		
		var DSD = genObj.addDaysToDate(PED,genObj.generateRandomDecimal(1,1));  
		var DED = genObj.addDaysToDate(DSD,genObj.generateRandomDecimal(1,30));  
		
		var ISD = genObj.addDaysToDate(DED,genObj.generateRandomDecimal(1,1));  
		var IED = genObj.addDaysToDate(ISD,genObj.generateRandomDecimal(1,30));  
		
		var RSD = genObj.addDaysToDate(IED,genObj.generateRandomDecimal(1,1));  
		var RED = genObj.addDaysToDate(RSD,genObj.generateRandomDecimal(1,30));  
		
		var CSD = genObj.addDaysToDate(RED,genObj.generateRandomDecimal(1,1));  
		var CED = genObj.addDaysToDate(CSD,genObj.generateRandomDecimal(1,30)); 
		
		//Budget
		var lLim = 999;
		var uLim = 99999;
		var QB = genObj.generateRandomDecimal(lLim,uLim);
		var PB = genObj.generateRandomDecimal(lLim,uLim);
		var DB = genObj.generateRandomDecimal(lLim,uLim);
		var IB = genObj.generateRandomDecimal(lLim,uLim);
		var RB = genObj.generateRandomDecimal(lLim,uLim);
		var CB = genObj.generateRandomDecimal(lLim,uLim);
		
		//Description Fields
		var projDesc = 'Description about ' + genObj.projectName[i];
		var ProjectStatusComment = '';
		var ProjectRiskMitigation = '';
		
		
		statement.setString(1,projectId);
		statement.setString(2,initiativeID);
		statement.setString(3,projName);
		statement.setString(4,projMgr);
		statement.setString(5,projClass);
		statement.setString(6,projCat);
		statement.setString(7,standaloneOrGroup);
		statement.setString(8,projectType);
		statement.setString(9,statusScope);
		statement.setString(10,statusPhase);
		
		statement.setString(11,QSD);
		statement.setString(12,QED);
		statement.setString(13,PSD);
		statement.setString(14,PED);
		statement.setString(15,DSD);
		statement.setString(16,DED);
		statement.setString(17,ISD);
		statement.setString(18,IED);
		statement.setString(19,RSD);
		statement.setString(20,RED);
		statement.setString(21,CSD);
		statement.setString(22,CSD);
		
		
		statement.setDecimal(23,QB);
		statement.setDecimal(24,PB);
		statement.setDecimal(25,DB);
		statement.setDecimal(26,IB);
		statement.setDecimal(27,RB);
		statement.setDecimal(28,CB);
		
		statement.setString(29,projDesc);
		statement.setString(30,ProjectStatusComment);
		statement.setString(31,ProjectRiskMitigation);


		var resultSet= statement.executeQuery();
		counter++;

	}
	genObj.connection.commit();
	genObj.addMessage("Total number of projects generated : "+ counter , "Success");
}
