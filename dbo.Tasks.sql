CREATE TABLE [dbo].[TaskItems] (
    [Id]            INT            IDENTITY (1, 1) NOT NULL,
    [Title]         NVARCHAR (256) NOT NULL,
    [Details]       NVARCHAR (MAX) NULL,
    [DueDate]       DATE           NULL,
    [CompletedDate] DATE           NULL,
    [CreatedBy]     NVARCHAR (256) NOT NULL,
    [CreatedDate]   DATETIME       NOT NULL,
    [ModifiedBy]    NVARCHAR (256) NULL,
    [ModifiedDate]  DATETIME       NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);
