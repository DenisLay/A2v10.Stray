-- PushNumbersRegister model
-----------------------------------------------

create or alter procedure app.[PushNumbersRegister.Index]
@UserId bigint
as
begin
	set nocount on;
	set transaction isolation level read uncommitted;
	
	select [Records!TRecord!Array] = null,
		[Id!!Id] = [Id],
		*
	from reg.PushNumbersRegister;
end
go

create or alter procedure app.[PushNumbersRegister.Load]
@UserId bigint,
@Id bigint = null
as
begin
	set nocount on;
	set transaction isolation level read uncommitted;
	
	
end
go

create or alter procedure app.[PushNumbersRegisterEntity.Load]
@UserId bigint,
@Id bigint = null
as
begin
	set nocount on;
	set transaction isolation level read uncommitted;
	
	select [EntityRecord!TRecord!Array] = null,
		[Id!!Id] = [Id],
		*
	from reg.PushNumbersRegister
	where [Id] = @Id;
end
go

create or alter procedure app.[PushNumbersRegisterSelect.Load]
@UserId bigint,
@Id bigint = null
as
begin
	set nocount on;
	set transaction isolation level read uncommitted;
	
	exec app.[PushNumbersRegister.Index] @UserId = @UserId;
end
go

