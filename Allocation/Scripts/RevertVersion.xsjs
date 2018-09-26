var guid = $.request.parameters.get('guid');
var allocationGuid = $.request.parameters.get('allocationGuid');

var generateGuid = function(){
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};


try{
	var connection = $.db.getConnection(); 
	var sql = 	'update "CIO"."CIO.Allocation.DB.Tables::AllocationChangeLog" set "IsActive" = \'\' '+
				'where "AllocatonGUID" = \'' +allocationGuid+'\'';
	var statement = connection.prepareStatement(sql);
	statement.execute();
	connection.commit();
	
	var statement = connection.prepareStatement(sql);
	var connection = $.db.getConnection(); 
	var sql = 	'update "CIO"."CIO.Allocation.DB.Tables::AllocationChangeLog" set "IsActive" = \'X\' '+
				'where "AllocatonGUID" = \'' +allocationGuid+'\' and '+
				' "GUID" = \'' +guid+'\'';
	
	var statement = connection.prepareStatement(sql);
	
	
	statement.execute();
	connection.commit();
	$.response.setBody('Reverted Successfully');
	$.response.status = $.net.http.OK;

}catch(e){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(JSON.stringify(e));
}



