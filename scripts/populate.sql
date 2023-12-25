insert into carts(created_at, updated_at, status)
values (CURRENT_TIMESTAMP,
									CURRENT_TIMESTAMP,
									'OPEN');


insert into carts(created_at, updated_at, status)
values (CURRENT_TIMESTAMP,
									CURRENT_TIMESTAMP,
									'ORDERED');


insert into cart_items (cart_id, product_id, count)
values ('7e961775-fc3d-46c8-8588-d6198409f29b',
									'7567ec4b-b10c-48c5-9345-fc73c48a80aa',
									2);


insert into cart_items (cart_id, product_id, count)
values ('edd5e2c8-259c-47f8-b603-bb929ab6422a',
									'7567ec4b-b10c-48c5-9345-fc73c48a80a1',
									5);