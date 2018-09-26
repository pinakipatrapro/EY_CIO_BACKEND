
function logData(name,desc,data){
	var connection = $.db.getConnection();
	var sql = 	'insert into  "CIO"."CIO.GenerateData.DB.Tables.Util::GeneratedDataLogger" values(SYSUUID,?,?,?,CURRENT_USER,(select CURRENT_TIMESTAMP from dummy),?)';
	var statement = connection.prepareStatement(sql);

	statement.setString(1,name);
	statement.setString(2,desc);
	statement.setString(3,data);
	statement.setString(4,'A');

	statement.executeQuery();
	connection.commit();

}
