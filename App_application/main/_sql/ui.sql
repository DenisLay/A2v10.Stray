-- application ui

-----------------------------------------------
-- main menu
begin
	set nocount on;

	if not exists (select * from a2security.Acl where [Object] = N'std:menu' and ObjectId = 1 and GroupId = 1)
		insert into a2security.[Acl] ([Object], [ObjectId], GroupId, CanView) values (N'std:menu', 1, 1, 1);

	declare @menu a2ui.[Menu2.TableType];
	insert into @menu(Id, Parent, [Order], [Name], [Url], Icon) values
	(1, null, 0, N'ROOT', null, null),
	(10,   1, 1, N'Main', N'main', null),
	(20,   1, 2, N'Documents', N'documents', null),
	(40,   1, 3, N'Operations', N'operations', null),
	(30,   1, 4, N'Registers', N'registers', null),
	
	(200,   20, 1, N'Push numbers', N'push_numbers', null),
	(201,   20, 2, N'Execute Stray Operation', N'execute_stray_operation', null),
	
	(300,   30, 1, N'Push numbers register', N'push_numbers_register', null);

	exec a2ui.[Menu.Merge] @menu, 1, 1000;
	exec [a2security].[Permission.UpdateAcl.Menu];
end
go

