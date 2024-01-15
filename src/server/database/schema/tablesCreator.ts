/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable linebreak-style */


import {integer, pgTable, serial, timestamp, varchar, date, primaryKey, doublePrecision} from 'drizzle-orm/pg-core';


export const usuario = pgTable('usuario', {
	id: serial('id').primaryKey(),
	nome: varchar('nome', { length: 45 }),
	email: varchar('email', { length: 100 }).unique(),
	senha: varchar('senha', { length: 45 }),
	id_especialidade: integer('id_especialidade').notNull().references(() => especialidade.id, { onDelete: "cascade", onUpdate: "cascade" }),
	id_area: integer('id_area').notNull().references(() => area.id, { onDelete: "cascade", onUpdate: "cascade" }),
	id_pdi: integer('id_pdi').notNull().references(() => pdi.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const especialidade = pgTable('especialidade',{
	id: serial('id').primaryKey(),
	name: varchar('name', {length:45}).unique().notNull(),
	id_area: integer('id_area').notNull().references(()=>area.id, {onDelete:"cascade", onUpdate:"cascade"})
});

export const area = pgTable('area', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 45 }).unique().notNull()
});


export const pdi = pgTable('pdi',{
	id: serial('id').primaryKey(),
	descricao: varchar('descricao', {length:256})
});



export const equipe = pgTable('equipe',{
	id: serial('id').primaryKey(),
	nome: varchar('nome', {length: 45},),
	quantidade_membros: integer('quantidade_membros'),
	id_diretor: integer('id_diretor').notNull().references(()=>diretor.id, {onDelete:"cascade", onUpdate:"cascade"})
});


export const meta = pgTable('meta', {
	id: serial('id').primaryKey(),
	nome: varchar('nome',{length:100}),
	objetivo: varchar('objetivo', {length: 200})
});


export const diretor = pgTable('diretor',{
	id: serial('id').primaryKey(),
	quatidade_de_times : integer('quantidade_de_times'),
	id_usuario: integer('id_usuario').notNull().references(()=>usuario.id, {onDelete:"cascade", onUpdate:"cascade"})
});

