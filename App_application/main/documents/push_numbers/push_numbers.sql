-- PushNumbers model
-----------------------------------------------

create type app.[PushNumbers.TableType]
as table(
	Id bigint,
	Memo nvarchar(255)
)
go

create type app.[PushNumbers.Details.TableType]
as table(
	Id bigint,
	[Date] date
)
go

create type app.[PushNumbers.Rows.TableType]
as table(
	Id bigint,
	[No] bigint,
	Number bigint
)
go

create or alter procedure app.[PushNumbers.Index]
@UserId bigint
as
begin
	set nocount on;
	set transaction isolation level read uncommitted;
	
	select [Documents!TDocument!Array] = null,
		[Id!!Id] = p.[Id],
		[Memo],
		--[Details!TDetail!RefId] = null
		d.[Date]
	from doc.PushNumbers p
	left join subdoc.PushNumbersDetails d on p.Id = d.OwnerId;

	/*select [!TDetail!Map] = null,
		[Date]
	from subdoc.PushNumbersDetails;*/
end
go

exec app.[PushNumbers.Load] @UserId = 0, @Id = 101;
go

create or alter procedure app.[PushNumbers.Load]
@UserId bigint,
@Id bigint = null
as
begin
	set nocount on;
	set transaction isolation level read uncommitted;
	
	select [PushNumbers!TPushNumbers!Object] = null,
		[Id!!Id] = [Id],
		[Memo],
		[Details!TDetail!RefId] = null
		--[Rows!TRow!Array] = null
	from doc.PushNumbers
	where [Id] = @Id;

	select top(1) [!TDetail!Map] = null,
		[Date]
	from subdoc.PushNumbersDetails
	where [OwnerId] = @Id;

	select [Rows!TRow!Array] = null,
		[Id!!Id] = [Id],
		[OwnerId],
		[No],
		[Number]
	from subdoc.PushNumbersRows
	where [OwnerId] = @Id;
end
go

create or alter procedure app.[PushNumbers.Metadata]
as
begin
	set nocount on;
	set transaction isolation level read uncommitted;

	declare @PushNumbers app.[PushNumbers.TableType];
	declare @PushNumbersDetails app.[PushNumbers.Details.TableType];
	declare @PushNumbersRows app.[PushNumbers.Rows.TableType];

	select [PushNumbers!PushNumbers!Metadata] = null, * from @PushNumbers;
	select [PushNumbersDetails!PushNumbers.Details!Metadata] = null, * from @PushNumbersDetails;
	select [PushNumbersRows!PushNumbers.Rows!Metadata] = null, * from @PushNumbersRows;
end
go

create or alter procedure app.[PushNumbers.Update]
@UserId bigint,
@PushNumbers app.[PushNumbers.TableType] readonly,
@PushNumbersDetails app.[PushNumbers.Details.TableType] readonly,
@PushNumbersRows app.[PushNumbers.Rows.TableType] readonly
as
begin
	set nocount on;
	set transaction isolation level read committed;

	declare @rtable table(id int);
	declare @detailsTable table(id int);
	declare @rowsTable table(id int);

	declare @id bigint;

	merge doc.PushNumbers as t
	using @PushNumbers as s
	on t.Id = s.Id
	when matched then update set
		t.[Memo] = s.[Memo]
	when not matched by target then insert 
		([Memo]) values
		(s.[Memo])
	output inserted.Id into @rtable(id);
	select top(1) @id = id from @rtable;

	merge subdoc.PushNumbersDetails as t
	using @PushNumbersDetails as s
	on t.[OwnerId] = @id
	when matched then update set
		t.[Date] = s.[Date]
	when not matched by target then insert 
		([OwnerId], [Date]) values
		(@id, s.[Date]);

	merge subdoc.PushNumbersRows as t
	using @PushNumbersRows as s
	on t.[OwnerId] = @id and t.Id = s.Id
	when matched then update set
		t.[OwnerId] = @id,
		t.[No] = s.[No],
		t.[Number] = s.[Number]
	when not matched by target then insert 
		([OwnerId], [No], [Number]) values
		(@id, s.[No], s.[Number]);

	exec app.[PushNumbers.Load] @UserId = @UserId, @Id = @id;
end
go

