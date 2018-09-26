var content = $.request.body.asString();
content = JSON.parse(content);	

var saveExecutor = function(content){
	this.data = content;
	this.connection = $.db.getConnection();
};
saveExecutor.prototype = {
		generateGuid : function(){
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		},
		saveAllocations : function(){
			var sql = 	'insert into "CIO"."CIO.Allocation.DB.Tables::Allocations" values(?,?,?,?,?,?,?)';
			var statement = this.connection.prepareStatement(sql);
			this.allocationGuid = this.generateGuid();
			
			statement.setString(1,this.allocationGuid);
			statement.setString(2,this.data.alllcationType);
			statement.setString(3,this.data.allocationSubType);
			statement.setString(4,this.data.actualPeriod);
			statement.setString(5,this.data.budgetPeriod);
			statement.setString(6,this.data.name);
			statement.setString(7,this.data.description);
			
			statement.execute();
			this.connection.commit();
		},
		saveAllocationsLog : function(){
			var sql = 	'insert into "CIO"."CIO.Allocation.DB.Tables::AllocationChangeLog" values(?,?,?,CURRENT_TIMESTAMP,CURRENT_USER,?,?,?,?,?,?)';
			var statement = this.connection.prepareStatement(sql);
			this.changeLogGuid = this.generateGuid();
			
			statement.setString(1,this.changeLogGuid);
			statement.setString(2,this.allocationGuid);
			statement.setString(3,'X');
			statement.setString(4,this.data.deviceInfo);
			statement.setString(5,this.data.changeData);
			statement.setString(6,this.data.changes.toString());
			statement.setString(7,this.data.userName);
			statement.setString(8,this.data.userId);
			statement.setString(9,this.data.mode);
			
			statement.execute();
			this.connection.commit();
		},
		saveAllocationsData : function(){
			var sql = 	'insert into "CIO"."CIO.Allocation.DB.Tables::AllocationData" values(?,?,?,?,?,?,?,?,?,?,?)';
			var statement = this.connection.prepareStatement(sql);
			var allocatedData = this.data.allocatedData;
			var i,type,typeDescription;
			
			for( i=0 ;i < allocatedData.length ; i++){
				type = allocatedData[i].type;
				typeDescription = allocatedData[i].typeDescription;
					
				allocatedData[i].data.forEach(function(e){
					if(!e.valueInPercentage){
						e.valueInPercentage = 0;
					}
					statement.setString(1,this.generateGuid());
					statement.setString(2,this.changeLogGuid);
					statement.setString(3,type);
					statement.setString(4,typeDescription);
					
					statement.setString(5,e.FromID);
					statement.setString(6,e.ToID);
					statement.setDecimal(7,e.valueInPercentage);
					statement.setDecimal(8,e.value);
					statement.setDecimal(9,e.allocatedValue);
					statement.setString(10,e.FromName);
					statement.setString(11,e.ToName);
					statement.execute();
				}.bind(this));
			}
			this.connection.commit();
		},
		updateAllocationLog : function(){
			this.allocationGuid = this.data.allocationGuid;
			
			var sql = 	'update "CIO"."CIO.Allocation.DB.Tables::AllocationChangeLog" set "IsActive" = \'\' where "AllocatonGUID" = \''+this.allocationGuid +'\'';
			var statement = this.connection.prepareStatement(sql);
			
			statement.execute();
			this.connection.commit();
		
		}
};

var saveExecutor = new saveExecutor(content);
if(content.mode==='Create'){
	saveExecutor.saveAllocations();
	saveExecutor.saveAllocationsLog();	
	saveExecutor.saveAllocationsData();
}else if(content.mode==='Edit'){
	saveExecutor.updateAllocationLog();
	saveExecutor.saveAllocationsLog();	
	saveExecutor.saveAllocationsData();
}
