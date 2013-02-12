INSERT INTO user_roles(user_role_name) VALUES ('Administrator'),('Approver'),('User');

CREATE TABLE subscriptions
(
  id serial NOT NULL,
  subscription_code character varying(3) NOT NULL,
  subscription_label character varying(255) NOT NULL,
  CONSTRAINT subscriptions_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE subscriptions
  OWNER TO resteasy;

ALTER TABLE clients
    ADD CONSTRAINT fk_clients_ref_subscriptions FOREIGN KEY (subscription_id)
          REFERENCES subscriptions (id) MATCH SIMPLE
          ON UPDATE SET NULL ON DELETE SET NULL;

INSERT INTO subscriptions(subscription_code, subscription_label) VALUES ('USA', 'Up to 5 Users $79/month');
INSERT INTO subscriptions(subscription_code, subscription_label) VALUES ('USB', 'Up to 10 Users $129/month');
INSERT INTO subscriptions(subscription_code, subscription_label) VALUES ('USC', 'Up to 20 Users $179/month');
INSERT INTO subscriptions(subscription_code, subscription_label) VALUES ('USD', 'Up to 50 Users $399/month');
INSERT INTO subscriptions(subscription_code, subscription_label) VALUES ('USE', 'Up to 100 Users $699/month');
INSERT INTO subscriptions(subscription_code, subscription_label) VALUES ('USF', '100 + Users - Call for pricing');
