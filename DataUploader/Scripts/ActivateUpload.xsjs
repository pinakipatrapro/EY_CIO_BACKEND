var tableName = $.request.parameters.get('tableName');
var tempTableName = $.request.parameters.get('tempTableName');
var mode = $.request.parameters.get('mode');

try{
	
	var connection = $.db.getConnection();
	if(mode=='FL'){
		var sql = 	'delete from ' + tableName ;
		var statement = connection.prepareStatement(sql);
		var resultSet= statement.execute();
		connection.commit();
	}
	
	var sql = 	'insert into ' + tableName + ' select * from  ' + tempTableName;
	var statement = connection.prepareStatement(sql);
	var resultSet= statement.execute();
	connection.commit();
	
	var sql = 	'drop table ' + tempTableName;
	var statement = connection.prepareStatement(sql);
	var resultSet= statement.execute();
	connection.commit();
	
	
	connection.close();
	$.response.setBody(JSON.stringify({status : 'Success',mode:mode}));
	$.response.status = $.net.http.OK;

}catch(e){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(JSON.stringify(e));
}
