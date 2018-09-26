function purgeTables(){

	try{
		var connection = $.db.getConnection();
		var sql = 'select TABLE_NAME from sys.M_TABLE_STATISTICS where schema_name = \'TEMP\'and LAST_MODIFY_TIME < (select add_seconds(current_timestamp,60*60) from dummy)'
			var statement = connection.prepareStatement(sql);
		var resultSet= statement.executeQuery();
		while (resultSet.next()) {
			var tableName = resultSet.getString(1);
			var dropStatement = 'drop table "TEMP"."'+tableName+'"';
			var statement = connection.prepareStatement(dropStatement);
			statement.execute();
			connection.commit();
		}	


		connection.commit();
		connection.close();
		$.response.setBody(a);
	}catch(e){
	}
}