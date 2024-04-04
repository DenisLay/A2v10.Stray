-- database stucture
if not exists(select * from INFORMATION_SCHEMA.SCHEMATA where SCHEMA_NAME=N'app')
	exec sp_executesql N'create schema app';
go

if not exists(select * from INFORMATION_SCHEMA.SCHEMATA where SCHEMA_NAME=N'doc')
	exec sp_executesql N'create schema doc';
go

if not exists(select * from INFORMATION_SCHEMA.SCHEMATA where SCHEMA_NAME=N'subdoc')
	exec sp_executesql N'create schema subdoc';
go

if not exists(select * from INFORMATION_SCHEMA.SCHEMATA where SCHEMA_NAME=N'meta')
	exec sp_executesql N'create schema meta';
go

if not exists(select * from INFORMATION_SCHEMA.SCHEMATA where SCHEMA_NAME=N'reg')
	exec sp_executesql N'create schema reg';
go

if not exists(select * from INFORMATION_SCHEMA.TABLES where TABLE_NAME=N'TablePartMetadata')
	create table meta.TablePartMetadata(
		[Id] bigint identity(100, 1)
			constraint PK_TablePartMetadata primary key,
		[TableOwnerName] nvarchar(255),
		[TableName] nvarchar(255),
        [DisplayName] nvarchar(255)
	)
go

if not exists(select * from INFORMATION_SCHEMA.TABLES where TABLE_NAME=N'PushNumbers')
	create table doc.PushNumbers(
		[Id] bigint identity(100, 1)
			constraint PK_PushNumbers primary key,
		[Apply] bit,
		[Memo] nvarchar(255)
	)
go

if not exists(select * from INFORMATION_SCHEMA.TABLES where TABLE_NAME=N'PushNumbersDetails')
	create table subdoc.PushNumbersDetails(
		[Id] bigint identity(100, 1)
			constraint PK_PushNumbersDetails primary key,
		[OwnerId] bigint,
		[Date] date,

		foreign key (OwnerId) references doc.PushNumbers(Id)
	)
go

if not exists(select * from INFORMATION_SCHEMA.TABLES where TABLE_NAME=N'PushNumbersRows')
	create table subdoc.PushNumbersRows(
		[Id] bigint identity(100, 1)
			constraint PK_PushNumbersRows primary key,
		[OwnerId] bigint,
		[No] bigint,
		[Number] bigint,

		foreign key (OwnerId) references doc.PushNumbers(Id)
	)
go

if not exists(select * from INFORMATION_SCHEMA.TABLES where TABLE_NAME=N'PushNumbersRegister')
	create table reg.PushNumbersRegister(
		[Id] bigint identity(100, 1)
			constraint PK_PushNumbersRegister primary key,
		[OwnerId] bigint,
		[Date] date,
		[Sign] nvarchar(10),
		[Number] bigint,
		[Order] bigint,

		foreign key (OwnerId) references doc.PushNumbers(Id)
	)
go