import Knex from 'knex';

export type DatabaseMigration = (
	knex: Knex,
	Promise: PromiseConstructor,
) => Knex.SchemaBuilder;
