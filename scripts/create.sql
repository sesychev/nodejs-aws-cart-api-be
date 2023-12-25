create type status_type_enum AS ENUM ('OPEN', 'ORDERED');


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


create table carts (id uuid primary key default uuid_generate_v4() NOT NULL, user_id uuid default uuid_generate_v4 () NOT NULL, created_at TIMESTAMP default CURRENT_TIMESTAMP NOT NULL, updated_at TIMESTAMP default CURRENT_TIMESTAMP NOT NULL, status status_type_enum);


create table cart_items (cart_id uuid NOT NULL REFERENCES carts(id), product_id uuid NOT NULL, count int NOT NULL);