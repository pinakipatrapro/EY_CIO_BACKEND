var tableName = $.request.parameters.get('tableName');

try{
	var connection = $.db.getConnection();
	var sql = 	'select cast(sysuuid as varchar(36)) from dummy';
	var statement = connection.prepareStatement(sql);
	var resultSet= statement.executeQuery();

	var tempTableName = 'TEMP"."';

		while (resultSet.next()) {
			tempTableName = tempTableName +  resultSet.getString(1);
		}


	var sql = 	'create   table "' + tempTableName + '" like  '+tableName ;
	var statement = connection.prepareStatement(sql);
	var resultSet= statement.execute();
	connection.close();
	$.response.setBody(tempTableName);
	$.response.status = $.net.http.OK;

}catch(e){
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(JSON.stringify(e));
}
