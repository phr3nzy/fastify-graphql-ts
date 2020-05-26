import { DatabaseMigration } from './index.d';

exports.up = ((knex, Promise) => {
	return knex.schema.createTable('user_account', table => {
		table.bigIncrements('id');
		table.string('full_name', 256).notNullable();
		table.string('email', 256).notNullable().unique();
		table.string('phone_number', 32).notNullable().unique();
		table.boolean('is_deleted').defaultTo(false);
		table.string('password').notNullable();
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
	});
}) as DatabaseMigration;

exports.down = ((knex, Promise) =>
	knex.schema.dropTableIfExists('user_account')) as DatabaseMigration;
