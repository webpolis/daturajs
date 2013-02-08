--
-- PostgreSQL database dump
--

-- Dumped from database version 9.2.2
-- Dumped by pg_dump version 9.2.2
-- Started on 2013-01-31 19:28:47 ART

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 2484 (class 1262 OID 16411)
-- Name: resteasy; Type: DATABASE; Schema: -; Owner: resteasy
--

CREATE DATABASE resteasy WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';


ALTER DATABASE resteasy OWNER TO resteasy;

\connect resteasy

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO resteasy;

--
-- TOC entry 2485 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 212 (class 3079 OID 11732)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2487 (class 0 OID 0)
-- Dependencies: 212
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 181 (class 1259 OID 18463)
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE accounts (
    id serial NOT NULL,
    account_code character varying(150) DEFAULT NULL::character varying,
    segment_id integer,
    account_title character varying(500) DEFAULT NULL::character varying,
    account_short_title character varying(200) DEFAULT NULL::character varying,
    account_status boolean,
    account_type character varying(50) DEFAULT NULL::character varying,
    account_auth_limit numeric(18,2) DEFAULT NULL::numeric,
    alias character varying(200) DEFAULT NULL::character varying,
    cbsaname character varying(200) DEFAULT NULL::character varying,
    is_visible boolean,
    created_date timestamp without time zone,
    created_by_id integer,
    modified_date timestamp without time zone,
    modified_by_id integer,
    segment04 character varying(100) DEFAULT NULL::character varying,
    account04 character varying(100) DEFAULT NULL::character varying,
    segment01 character varying(100) DEFAULT NULL::character varying,
    account01 character varying(100) DEFAULT NULL::character varying,
    segment00 character varying(100) DEFAULT NULL::character varying,
    account00 character varying(100) DEFAULT NULL::character varying,
    segment02 character varying(100) DEFAULT NULL::character varying,
    account02 character varying(100) DEFAULT NULL::character varying,
    segment05 character varying(100) DEFAULT NULL::character varying,
    account05 character varying(100) DEFAULT NULL::character varying,
    segment03 character varying(100) DEFAULT NULL::character varying,
    account03 character varying(100) DEFAULT NULL::character varying,
    segment06 character varying(100) DEFAULT NULL::character varying,
    account06 character varying(100) DEFAULT NULL::character varying,
    accounting_segment_id integer NOT NULL,
    client_id integer NOT NULL
);


ALTER TABLE public.accounts OWNER TO resteasy;

--
-- TOC entry 183 (class 1259 OID 18508)
-- Name: account_permissions; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE account_permissions (
    id serial NOT NULL,
    account_id integer NOT NULL,
    department_id integer NOT NULL
);


ALTER TABLE public.account_permissions OWNER TO resteasy;

--
-- TOC entry 184 (class 1259 OID 18518)
-- Name: accounting_segment_permissions; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE accounting_segment_permissions (
    id serial NOT NULL,
    is_shown boolean,
    account_id integer,
    accounting_segment_id integer NOT NULL,
    department_id integer NOT NULL
);


ALTER TABLE public.accounting_segment_permissions OWNER TO resteasy;

--
-- TOC entry 180 (class 1259 OID 18446)
-- Name: accounting_segments; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE accounting_segments (
    id serial NOT NULL,
    segment_title character varying(50) DEFAULT NULL::character varying,
    description character varying(500) DEFAULT NULL::character varying,
    segment_auth_limit numeric(18,2) DEFAULT NULL::numeric,
    accounting_system_id character varying(50) DEFAULT NULL::character varying,
    is_visible boolean,
    display_order integer,
    created_date timestamp without time zone,
    created_by_id integer,
    modified_date timestamp without time zone,
    modified_by_id integer,
    client_id integer NOT NULL
);


ALTER TABLE public.accounting_segments OWNER TO resteasy;

--
-- TOC entry 185 (class 1259 OID 18533)
-- Name: accounting_system_files; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE accounting_system_files (
    id serial NOT NULL,
    accounting_system_session_id character varying(50) DEFAULT NULL::character varying,
    accounting_system_file character varying(50) DEFAULT NULL::character varying,
    export_date timestamp without time zone,
    create_date timestamp without time zone DEFAULT now() NOT NULL,
    client_id integer NOT NULL
);


ALTER TABLE public.accounting_system_files OWNER TO resteasy;

--
-- TOC entry 176 (class 1259 OID 18371)
-- Name: accounting_system_types; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE accounting_system_types (
    id serial NOT NULL,
    accounting_system_type_name character varying(50) DEFAULT NULL::character varying,
    display_order integer
);


ALTER TABLE public.accounting_system_types OWNER TO resteasy;

--
-- TOC entry 186 (class 1259 OID 18546)
-- Name: acm_admin_groups; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE acm_admin_groups (
    id serial NOT NULL,
    admin_id integer NOT NULL,
    acm_groups_id integer NOT NULL
);


ALTER TABLE public.acm_admin_groups OWNER TO resteasy;

--
-- TOC entry 188 (class 1259 OID 18567)
-- Name: acm_group_tasks; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE acm_group_tasks (
    id serial NOT NULL,
    acm_groups_id integer NOT NULL,
    acm_tasks_id integer NOT NULL
);


ALTER TABLE public.acm_group_tasks OWNER TO resteasy;

--
-- TOC entry 182 (class 1259 OID 18502)
-- Name: acm_groups; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE acm_groups (
    id serial NOT NULL,
    name character varying(50) DEFAULT NULL::character varying
);


ALTER TABLE public.acm_groups OWNER TO resteasy;

--
-- TOC entry 187 (class 1259 OID 18561)
-- Name: acm_tasks; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE acm_tasks (
    id serial NOT NULL,
    name character varying(50) DEFAULT NULL::character varying
);


ALTER TABLE public.acm_tasks OWNER TO resteasy;

--
-- TOC entry 169 (class 1259 OID 18307)
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE admins (
    id serial NOT NULL,
    name character varying(100) DEFAULT NULL::character varying,
    username character varying(100) DEFAULT NULL::character varying,
    password character varying(100) DEFAULT NULL::character varying
);


ALTER TABLE public.admins OWNER TO resteasy;

--
-- TOC entry 189 (class 1259 OID 18582)
-- Name: client_banks; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE client_banks (
    id serial NOT NULL,
    bank_name character varying(250) DEFAULT NULL::character varying,
    default_bank_id integer,
    description character varying(1000) DEFAULT NULL::character varying,
    connection_type character varying(100) DEFAULT NULL::character varying,
    web_address character varying(250) DEFAULT NULL::character varying,
    username character varying(50) DEFAULT NULL::character varying,
    password character varying(50) DEFAULT NULL::character varying,
    security_word character varying(50) DEFAULT NULL::character varying,
    apikey character varying(50) DEFAULT NULL::character varying,
    created_date timestamp without time zone,
    created_by_id integer,
    modified_date timestamp without time zone,
    modified_by_id integer,
    is_visible boolean,
    client_id integer NOT NULL
);


ALTER TABLE public.client_banks OWNER TO resteasy;

--
-- TOC entry 190 (class 1259 OID 18603)
-- Name: client_mile_rates; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE client_mile_rates (
    id serial NOT NULL,
    mile numeric(18,2) DEFAULT 0.00 NOT NULL,
    rate numeric(18,2) DEFAULT 0.00 NOT NULL,
    client_id integer NOT NULL
);


ALTER TABLE public.client_mile_rates OWNER TO resteasy;

--
-- TOC entry 195 (class 1259 OID 18732)
-- Name: client_rule_approvers; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE client_rule_approvers (
    id serial NOT NULL,
    created_date timestamp without time zone,
    created_by_id integer,
    client_rule_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.client_rule_approvers OWNER TO resteasy;

--
-- TOC entry 191 (class 1259 OID 18613)
-- Name: client_rules; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE client_rules (
    id serial NOT NULL,
    default_auth_limit numeric(18,2) DEFAULT NULL::numeric,
    is_active boolean,
    priority integer,
    default_approvers character varying(500) DEFAULT NULL::character varying,
    client_approvers character varying(500) DEFAULT NULL::character varying,
    created_date timestamp without time zone,
    created_by_id integer,
    modified_date timestamp without time zone,
    modified_by_id integer,
    client_id integer NOT NULL,
    default_rule_id integer NOT NULL
);


ALTER TABLE public.client_rules OWNER TO resteasy;

--
-- TOC entry 196 (class 1259 OID 18747)
-- Name: client_segment_rules; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE client_segment_rules (
    id serial NOT NULL,
    account_code_list character varying(500) DEFAULT NULL::character varying,
    approvers_list character varying(500) DEFAULT NULL::character varying,
    operator character varying(50) DEFAULT NULL::character varying,
    line_amount numeric(19,4) DEFAULT NULL::numeric,
    is_active boolean,
    created_date timestamp without time zone,
    created_by_id integer,
    client_id integer NOT NULL,
    accounting_segment_id integer NOT NULL
);


ALTER TABLE public.client_segment_rules OWNER TO resteasy;

--
-- TOC entry 177 (class 1259 OID 18377)
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE clients (
    id serial NOT NULL,
    client_name character varying(250) DEFAULT NULL::character varying,
    address character varying(250) DEFAULT NULL::character varying,
    address2 character varying(250) DEFAULT NULL::character varying,
    city character varying(100) DEFAULT NULL::character varying,
    postal_code character varying(50) DEFAULT NULL::character varying,
    phone character varying(50) DEFAULT NULL::character varying,
    fax character varying(50) DEFAULT NULL::character varying,
    cfdsn character varying(100) DEFAULT NULL::character varying,
    server_address character varying(1024) DEFAULT NULL::character varying,
    server_port integer,
    server_type character varying(50) DEFAULT NULL::character varying,
    dbname character varying(100) DEFAULT NULL::character varying,
    dblogin character varying(100) DEFAULT NULL::character varying,
    dbpassword character varying(150) DEFAULT NULL::character varying,
    accounts_payable_code character varying(150) DEFAULT NULL::character varying,
    is_active boolean,
    is_deleted boolean,
    is_setup_displayed boolean,
    client_code character varying(50) DEFAULT NULL::character varying,
    client_folder character varying(50) DEFAULT NULL::character varying,
    created_date timestamp without time zone,
    created_by_id integer,
    modified_date timestamp without time zone,
    modified_by_id integer,
    last_sync_date timestamp without time zone,
    billing_address character varying(250) DEFAULT NULL::character varying,
    billing_address2 character varying(250) DEFAULT NULL::character varying,
    billing_city character varying(250) DEFAULT NULL::character varying,
    billing_state_id integer,
    card_holder_name character varying(250) DEFAULT NULL::character varying,
    credit_card_expiration character varying(50) DEFAULT NULL::character varying,
    credit_card_number character varying(250) DEFAULT NULL::character varying,
    mile_rate numeric(18,2) DEFAULT 0.00 NOT NULL,
    subscription_id integer,
    with_setup_fee character varying(50) DEFAULT NULL::character varying,
    state_id integer NOT NULL,
    country_id integer NOT NULL,
    accounting_system_type_id integer
);


ALTER TABLE public.clients OWNER TO resteasy;

--
-- TOC entry 171 (class 1259 OID 18328)
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE countries (
    id serial NOT NULL,
    country_code character varying(100) DEFAULT NULL::character varying,
    country_name character varying(150) DEFAULT NULL::character varying,
    country_name_short character varying(100) DEFAULT NULL::character varying,
    display_order integer,
    is_visible boolean
);


ALTER TABLE public.countries OWNER TO resteasy;

--
-- TOC entry 170 (class 1259 OID 18315)
-- Name: default_rules; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE default_rules (
    id serial NOT NULL,
    default_rule_type character varying(150) DEFAULT NULL::character varying,
    default_rule_name character varying(500) DEFAULT NULL::character varying,
    default_authorization_limit numeric(18,2) DEFAULT NULL::numeric,
    default_approvers character varying(500) DEFAULT NULL::character varying,
    comment character varying(1000) DEFAULT NULL::character varying
);


ALTER TABLE public.default_rules OWNER TO resteasy;

--
-- TOC entry 197 (class 1259 OID 18769)
-- Name: department_heads; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE department_heads (
    id serial NOT NULL,
    department_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.department_heads OWNER TO resteasy;

--
-- TOC entry 179 (class 1259 OID 18435)
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE departments (
    id serial NOT NULL,
    department_name character varying(50) NOT NULL,
    dept_auth_limit numeric(18,2) DEFAULT NULL::numeric,
    is_auth_required boolean,
    is_super_department boolean,
    is_processing boolean,
    client_id integer NOT NULL
);


ALTER TABLE public.departments OWNER TO resteasy;

--
-- TOC entry 178 (class 1259 OID 18424)
-- Name: invoice_amount_bracket; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE invoice_amount_bracket (
    id serial NOT NULL,
    invoice_amount numeric(18,2) DEFAULT 0.00,
    client_id integer NOT NULL
);


ALTER TABLE public.invoice_amount_bracket OWNER TO resteasy;

--
-- TOC entry 202 (class 1259 OID 18867)
-- Name: invoice_amount_bracket_approvers; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE invoice_amount_bracket_approvers (
    id serial NOT NULL,
    client_id integer NOT NULL,
    user_id integer NOT NULL,
    invoice_amount_bracket_id integer NOT NULL
);


ALTER TABLE public.invoice_amount_bracket_approvers OWNER TO resteasy;

--
-- TOC entry 203 (class 1259 OID 18885)
-- Name: invoice_approvers; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE invoice_approvers (
    id serial NOT NULL,
    approval_date timestamp without time zone,
    rejection_date timestamp without time zone,
    rejection_reason character varying(500) DEFAULT NULL::character varying,
    _approval_date timestamp without time zone,
    reject_date timestamp without time zone,
    invoice_id integer NOT NULL,
    invoice_line_id integer NOT NULL,
    client_rule_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.invoice_approvers OWNER TO resteasy;

--
-- TOC entry 204 (class 1259 OID 18914)
-- Name: invoice_files; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE invoice_files (
    id serial NOT NULL,
    attached_file character varying(500) DEFAULT NULL::character varying,
    attached_zoom_file character varying(500) DEFAULT NULL::character varying,
    original_file character varying(500) DEFAULT NULL::character varying,
    created_by_id integer,
    created_date timestamp without time zone,
    invoice_line_id integer NOT NULL
);


ALTER TABLE public.invoice_files OWNER TO resteasy;

--
-- TOC entry 205 (class 1259 OID 18930)
-- Name: invoice_line_segments; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE invoice_line_segments (
    id serial NOT NULL,
    amount numeric(18,2) DEFAULT NULL::numeric,
    comment character varying(500) DEFAULT NULL::character varying,
    segment01 character varying(50) DEFAULT NULL::character varying,
    segment02 character varying(50) DEFAULT NULL::character varying,
    segment03 character varying(50) DEFAULT NULL::character varying,
    segment04 character varying(50) DEFAULT NULL::character varying,
    segment05 character varying(50) DEFAULT NULL::character varying,
    segment06 character varying(50) DEFAULT NULL::character varying,
    segment07 character varying(50) DEFAULT NULL::character varying,
    segment08 character varying(50) DEFAULT NULL::character varying,
    segment09 character varying(50) DEFAULT NULL::character varying,
    segment10 character varying(50) DEFAULT NULL::character varying,
    segment11 character varying(50) DEFAULT NULL::character varying,
    segment12 character varying(50) DEFAULT NULL::character varying,
    segment13 character varying(50) DEFAULT NULL::character varying,
    segment14 character varying(50) DEFAULT NULL::character varying,
    segment15 character varying(50) DEFAULT NULL::character varying,
    account01 character varying(50) DEFAULT NULL::character varying,
    account02 character varying(50) DEFAULT NULL::character varying,
    segment00 character varying(50) DEFAULT NULL::character varying,
    account00 character varying(50) DEFAULT NULL::character varying,
    account03 character varying(50) DEFAULT NULL::character varying,
    account04 character varying(50) DEFAULT NULL::character varying,
    account05 character varying(50) DEFAULT NULL::character varying,
    invoice_line_id integer NOT NULL
);


ALTER TABLE public.invoice_line_segments OWNER TO resteasy;

--
-- TOC entry 201 (class 1259 OID 18848)
-- Name: invoice_lines; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE invoice_lines (
    id serial NOT NULL,
    amount numeric(18,2) DEFAULT NULL::numeric,
    line_date timestamp without time zone,
    rejection_reason character varying(2000) DEFAULT NULL::character varying,
    rejected_by_id integer,
    rejected_date timestamp without time zone,
    comment character varying(500) DEFAULT NULL::character varying,
    attached_file character varying(255) DEFAULT NULL::character varying,
    attached_zoom_file character varying(255) DEFAULT NULL::character varying,
    original_file character varying(255) DEFAULT NULL::character varying,
    invoice_id integer NOT NULL
);


ALTER TABLE public.invoice_lines OWNER TO resteasy;

--
-- TOC entry 198 (class 1259 OID 18784)
-- Name: invoice_status; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE invoice_status (
    id serial NOT NULL,
    invoice_status_name character varying(100) DEFAULT NULL::character varying
);


ALTER TABLE public.invoice_status OWNER TO resteasy;

--
-- TOC entry 199 (class 1259 OID 18790)
-- Name: invoice_type; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE invoice_type (
    id serial NOT NULL,
    invoice_type_name character varying(100) DEFAULT NULL::character varying,
    invoice_type_code character varying(50) DEFAULT NULL::character varying
);


ALTER TABLE public.invoice_type OWNER TO resteasy;

--
-- TOC entry 200 (class 1259 OID 18797)
-- Name: invoices; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE invoices (
    id serial NOT NULL,
    invoice_number character varying(50) DEFAULT NULL::character varying,
    created_date timestamp without time zone,
    invoice_date timestamp without time zone,
    receipt_file character varying(512) DEFAULT NULL::character varying,
    submitted_date timestamp without time zone,
    submitted_by_id integer,
    requested_by_id integer,
    required_date timestamp without time zone,
    acc_approved_date timestamp without time zone,
    acc_approved_by_id integer,
    approved_date timestamp without time zone,
    approved_by_id integer,
    exported_date timestamp without time zone,
    exported_by_id integer,
    rejected_date timestamp without time zone,
    rejected_by_id integer,
    rejected_reason text,
    rejected_invoice_id integer,
    project_name character varying(150) DEFAULT NULL::character varying,
    address character varying(255) DEFAULT NULL::character varying,
    address2 character varying(255) DEFAULT NULL::character varying,
    city character varying(50) DEFAULT NULL::character varying,
    state_id character varying(50) DEFAULT NULL::character varying,
    zipcode character varying(50) DEFAULT NULL::character varying,
    country_id character varying(100) DEFAULT NULL::character varying,
    bank_name character varying(100) DEFAULT NULL::character varying,
    bank_address character varying(255) DEFAULT NULL::character varying,
    bank_routing_number character varying(50) DEFAULT NULL::character varying,
    bank_acct_number character varying(50) DEFAULT NULL::character varying,
    is_wire_transfer boolean,
    description character varying(2000) DEFAULT NULL::character varying,
    total_amount numeric(18,2) DEFAULT NULL::numeric,
    is_deleted boolean,
    is_expense boolean,
    is_saved boolean,
    is_archived boolean,
    is_billable boolean,
    accounting_system_session_id character varying(50) DEFAULT NULL::character varying,
    invoice_source character varying(50) DEFAULT NULL::character varying,
    send_via character varying(50) DEFAULT NULL::character varying,
    acc_approver integer,
    send_invoice boolean,
    forward_approver integer,
    created_by_id integer,
    modified_date timestamp without time zone,
    modified_by_id integer,
    client_id integer NOT NULL,
    invoice_type_id integer NOT NULL,
    invoice_status_id integer NOT NULL,
    vendor_id integer NOT NULL,
    accounting_system_file_id integer NOT NULL
);


ALTER TABLE public.invoices OWNER TO resteasy;

--
-- TOC entry 173 (class 1259 OID 18348)
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE permissions (
    id serial NOT NULL,
    permission_name character varying(50) DEFAULT NULL::character varying,
    description character varying(250) DEFAULT NULL::character varying
);


ALTER TABLE public.permissions OWNER TO resteasy;

--
-- TOC entry 174 (class 1259 OID 18355)
-- Name: record_types; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE record_types (
    id serial NOT NULL,
    record_type_name character varying(50) DEFAULT NULL::character varying
);


ALTER TABLE public.record_types OWNER TO resteasy;

--
-- TOC entry 172 (class 1259 OID 18336)
-- Name: states; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE states (
    id serial NOT NULL,
    state_name character varying(50) DEFAULT NULL::character varying,
    state_code character varying(50) DEFAULT NULL::character varying,
    display_order integer,
    country_id integer NOT NULL
);


ALTER TABLE public.states OWNER TO resteasy;

--
-- TOC entry 175 (class 1259 OID 18361)
-- Name: sysdiagrams; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE sysdiagrams (
    id serial NOT NULL,
    name character varying(160) NOT NULL,
    principal_id integer NOT NULL,
    version integer,
    definition bytea
);


ALTER TABLE public.sysdiagrams OWNER TO resteasy;

--
-- TOC entry 206 (class 1259 OID 18967)
-- Name: templates; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE templates (
    id serial NOT NULL,
    format character varying(300) DEFAULT NULL::character varying,
    template_name character varying(300) DEFAULT NULL::character varying,
    is_default boolean DEFAULT false NOT NULL,
    start integer DEFAULT 0 NOT NULL,
    "end" integer DEFAULT 0 NOT NULL,
    user_id integer NOT NULL,
    invoice_type_id integer NOT NULL
);


ALTER TABLE public.templates OWNER TO resteasy;

--
-- TOC entry 207 (class 1259 OID 18988)
-- Name: todo_lists; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE todo_lists (
    id serial NOT NULL,
    status_id integer NOT NULL,
    todo_list_title character varying(255) DEFAULT NULL::character varying,
    todo_list_desc text,
    created_by integer NOT NULL,
    create_date timestamp without time zone DEFAULT now() NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    client_id integer NOT NULL
);


ALTER TABLE public.todo_lists OWNER TO resteasy;

--
-- TOC entry 208 (class 1259 OID 19004)
-- Name: track_changes; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE track_changes (
    id serial NOT NULL,
    record_id integer,
    details text,
    created_date timestamp without time zone,
    user_id integer NOT NULL,
    record_type_id integer NOT NULL
);


ALTER TABLE public.track_changes OWNER TO resteasy;

--
-- TOC entry 209 (class 1259 OID 19022)
-- Name: user_credit_cards; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE user_credit_cards (
    id serial NOT NULL,
    credit_card_number character varying(50) DEFAULT NULL::character varying,
    user_id integer NOT NULL,
    client_bank_id integer NOT NULL
);


ALTER TABLE public.user_credit_cards OWNER TO resteasy;

--
-- TOC entry 192 (class 1259 OID 18634)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE user_roles (
    id serial NOT NULL,
    user_role_name character varying(50) DEFAULT NULL::character varying
);


ALTER TABLE public.user_roles OWNER TO resteasy;

--
-- TOC entry 194 (class 1259 OID 18680)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE users (
    id serial NOT NULL,
    is_super_user boolean,
    first_name character varying(200) DEFAULT NULL::character varying,
    last_name character varying(200) DEFAULT NULL::character varying,
    username character varying(200) DEFAULT NULL::character varying,
    email character varying(350) DEFAULT NULL::character varying,
    password character varying(200) DEFAULT NULL::character varying,
    is_active boolean,
    job_title character varying(350) DEFAULT NULL::character varying,
    address character varying(350) DEFAULT NULL::character varying,
    address2 character varying(350) DEFAULT NULL::character varying,
    city character varying(350) DEFAULT NULL::character varying,
    zip_code character varying(50) DEFAULT NULL::character varying,
    phone character varying(50) DEFAULT NULL::character varying,
    fax character varying(50) DEFAULT NULL::character varying,
    user_auth_limit numeric(18,2) DEFAULT NULL::numeric,
    region_account_code character varying(50) DEFAULT NULL::character varying,
    is_deleted boolean,
    created_date timestamp without time zone,
    created_by_id integer,
    modified_date timestamp without time zone,
    modified_by_id integer,
    user_role_id integer NOT NULL,
    department_id integer NOT NULL,
    client_id integer NOT NULL,
    supervisor_id integer,
    vendor_id integer,
    state_id integer NOT NULL,
    country_id integer NOT NULL
);


ALTER TABLE public.users OWNER TO resteasy;

--
-- TOC entry 210 (class 1259 OID 19038)
-- Name: users_departments; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE users_departments (
    id serial NOT NULL,
    departments_department_id integer NOT NULL,
    users_user_id integer NOT NULL
);


ALTER TABLE public.users_departments OWNER TO resteasy;

--
-- TOC entry 211 (class 1259 OID 19053)
-- Name: users_permissions; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE users_permissions (
    id serial NOT NULL,
    permissions_permission_id integer NOT NULL,
    users_user_id integer NOT NULL
);


ALTER TABLE public.users_permissions OWNER TO resteasy;

--
-- TOC entry 168 (class 1259 OID 18301)
-- Name: vendor_types; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE vendor_types (
    id serial NOT NULL,
    vendor_type_name character varying(50) DEFAULT NULL::character varying,
    is_company boolean
);


ALTER TABLE public.vendor_types OWNER TO resteasy;

--
-- TOC entry 193 (class 1259 OID 18640)
-- Name: vendors; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE vendors (
    id serial NOT NULL,
    vendor_name character varying(250) DEFAULT NULL::character varying,
    address character varying(250) DEFAULT NULL::character varying,
    address2 character varying(250) DEFAULT NULL::character varying,
    city character varying(100) DEFAULT NULL::character varying,
    zipcode character varying(50) DEFAULT NULL::character varying,
    phone character varying(50) DEFAULT NULL::character varying,
    fax character varying(50) DEFAULT NULL::character varying,
    email character varying(350) DEFAULT NULL::character varying,
    first_name character varying(150) DEFAULT NULL::character varying,
    last_name character varying(150) DEFAULT NULL::character varying,
    title character varying(150) DEFAULT NULL::character varying,
    accounting_system_id character varying(50) DEFAULT NULL::character varying,
    is_credit_card boolean,
    is_visible boolean,
    is_active boolean,
    is_approved boolean,
    is_deleted integer,
    created_date timestamp without time zone,
    created_by_id integer,
    modified_date timestamp without time zone,
    modified_by_id integer,
    approved_to_import_date timestamp without time zone,
    vendor_type_id integer NOT NULL,
    state_id integer NOT NULL,
    country_id integer NOT NULL,
    client_id integer NOT NULL
);


ALTER TABLE public.vendors OWNER TO resteasy;

--
-- TOC entry 2322 (class 2606 OID 18512)
-- Name: account_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY account_permissions
    ADD CONSTRAINT account_permissions_pkey PRIMARY KEY (id);


--
-- TOC entry 2318 (class 2606 OID 18491)
-- Name: account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY accounts
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- TOC entry 2324 (class 2606 OID 18522)
-- Name: accounting_segment_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY accounting_segment_permissions
    ADD CONSTRAINT accounting_segment_permissions_pkey PRIMARY KEY (id);


--
-- TOC entry 2316 (class 2606 OID 18457)
-- Name: accounting_segments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY accounting_segments
    ADD CONSTRAINT accounting_segments_pkey PRIMARY KEY (id);


--
-- TOC entry 2326 (class 2606 OID 18540)
-- Name: accounting_system_files_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY accounting_system_files
    ADD CONSTRAINT accounting_system_files_pkey PRIMARY KEY (id);


--
-- TOC entry 2308 (class 2606 OID 18376)
-- Name: accounting_system_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY accounting_system_types
    ADD CONSTRAINT accounting_system_types_pkey PRIMARY KEY (id);


--
-- TOC entry 2328 (class 2606 OID 18550)
-- Name: acm_admin_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY acm_admin_groups
    ADD CONSTRAINT acm_admin_groups_pkey PRIMARY KEY (id);


--
-- TOC entry 2332 (class 2606 OID 18571)
-- Name: acm_group_tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY acm_group_tasks
    ADD CONSTRAINT acm_group_tasks_pkey PRIMARY KEY (id);


--
-- TOC entry 2320 (class 2606 OID 18507)
-- Name: acm_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY acm_groups
    ADD CONSTRAINT acm_groups_pkey PRIMARY KEY (id);


--
-- TOC entry 2330 (class 2606 OID 18566)
-- Name: acm_tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY acm_tasks
    ADD CONSTRAINT acm_tasks_pkey PRIMARY KEY (id);


--
-- TOC entry 2292 (class 2606 OID 18314)
-- Name: admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY admins
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


--
-- TOC entry 2334 (class 2606 OID 18597)
-- Name: client_banks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY client_banks
    ADD CONSTRAINT client_banks_pkey PRIMARY KEY (id);


--
-- TOC entry 2344 (class 2606 OID 18736)
-- Name: client_rule_approvers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY client_rule_approvers
    ADD CONSTRAINT client_rule_approvers_pkey PRIMARY KEY (id);


--
-- TOC entry 2336 (class 2606 OID 18623)
-- Name: client_rules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY client_rules
    ADD CONSTRAINT client_rules_pkey PRIMARY KEY (id);


--
-- TOC entry 2346 (class 2606 OID 18758)
-- Name: client_segment_rules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY client_segment_rules
    ADD CONSTRAINT client_segment_rules_pkey PRIMARY KEY (id);


--
-- TOC entry 2310 (class 2606 OID 18408)
-- Name: clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- TOC entry 2296 (class 2606 OID 18335)
-- Name: countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- TOC entry 2294 (class 2606 OID 18327)
-- Name: default_rules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY default_rules
    ADD CONSTRAINT default_rules_pkey PRIMARY KEY (id);


--
-- TOC entry 2348 (class 2606 OID 18773)
-- Name: department_heads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY department_heads
    ADD CONSTRAINT department_heads_pkey PRIMARY KEY (id);


--
-- TOC entry 2314 (class 2606 OID 18440)
-- Name: departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- TOC entry 2312 (class 2606 OID 18429)
-- Name: invoice_amount_bracket_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY invoice_amount_bracket
    ADD CONSTRAINT invoice_amount_bracket_pkey PRIMARY KEY (id);


--
-- TOC entry 2358 (class 2606 OID 18893)
-- Name: invoice_approvers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY invoice_approvers
    ADD CONSTRAINT invoice_approvers_pkey PRIMARY KEY (id);


--
-- TOC entry 2360 (class 2606 OID 18924)
-- Name: invoice_files_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY invoice_files
    ADD CONSTRAINT invoice_files_pkey PRIMARY KEY (id);


--
-- TOC entry 2362 (class 2606 OID 18961)
-- Name: invoice_line_segments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY invoice_line_segments
    ADD CONSTRAINT invoice_line_segments_pkey PRIMARY KEY (id);


--
-- TOC entry 2356 (class 2606 OID 18861)
-- Name: invoice_lines_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY invoice_lines
    ADD CONSTRAINT invoice_lines_pkey PRIMARY KEY (id);


--
-- TOC entry 2350 (class 2606 OID 18789)
-- Name: invoice_status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY invoice_status
    ADD CONSTRAINT invoice_status_pkey PRIMARY KEY (id);


--
-- TOC entry 2352 (class 2606 OID 18796)
-- Name: invoice_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY invoice_type
    ADD CONSTRAINT invoice_type_pkey PRIMARY KEY (id);


--
-- TOC entry 2354 (class 2606 OID 18822)
-- Name: invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);


--
-- TOC entry 2300 (class 2606 OID 18354)
-- Name: permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- TOC entry 2302 (class 2606 OID 18360)
-- Name: record_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY record_types
    ADD CONSTRAINT record_types_pkey PRIMARY KEY (id);


--
-- TOC entry 2298 (class 2606 OID 18342)
-- Name: states_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY states
    ADD CONSTRAINT states_pkey PRIMARY KEY (id);


--
-- TOC entry 2304 (class 2606 OID 18368)
-- Name: sysdiagrams_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY sysdiagrams
    ADD CONSTRAINT sysdiagrams_pkey PRIMARY KEY (id);


--
-- TOC entry 2364 (class 2606 OID 18998)
-- Name: todo_lists_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY todo_lists
    ADD CONSTRAINT todo_lists_pkey PRIMARY KEY (id);


--
-- TOC entry 2366 (class 2606 OID 19011)
-- Name: track_changes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY track_changes
    ADD CONSTRAINT track_changes_pkey PRIMARY KEY (id);


--
-- TOC entry 2306 (class 2606 OID 18370)
-- Name: uk_principal_name; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY sysdiagrams
    ADD CONSTRAINT uk_principal_name UNIQUE (principal_id, name);


--
-- TOC entry 2368 (class 2606 OID 19027)
-- Name: user_credit_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_credit_cards
    ADD CONSTRAINT user_credit_cards_pkey PRIMARY KEY (id);


--
-- TOC entry 2338 (class 2606 OID 18639)
-- Name: user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- TOC entry 2370 (class 2606 OID 19042)
-- Name: users_departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users_departments
    ADD CONSTRAINT users_departments_pkey PRIMARY KEY (id);


--
-- TOC entry 2372 (class 2606 OID 19057)
-- Name: users_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users_permissions
    ADD CONSTRAINT users_permissions_pkey PRIMARY KEY (id);


--
-- TOC entry 2342 (class 2606 OID 18701)
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2290 (class 2606 OID 18306)
-- Name: vendor_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY vendor_types
    ADD CONSTRAINT vendor_types_pkey PRIMARY KEY (id);


--
-- TOC entry 2340 (class 2606 OID 18659)
-- Name: vendors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY vendors
    ADD CONSTRAINT vendors_pkey PRIMARY KEY (id);


--
-- TOC entry 2382 (class 2606 OID 18513)
-- Name: fk_account_permissions_ref_departments; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY account_permissions
    ADD CONSTRAINT fk_account_permissions_ref_departments FOREIGN KEY (department_id) REFERENCES departments(id);


--
-- TOC entry 2380 (class 2606 OID 18492)
-- Name: fk_account_ref_accounting_segments; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY accounts
    ADD CONSTRAINT fk_account_ref_accounting_segments FOREIGN KEY (accounting_segment_id) REFERENCES accounting_segments(id);


--
-- TOC entry 2381 (class 2606 OID 18497)
-- Name: fk_account_ref_clients; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY accounts
    ADD CONSTRAINT fk_account_ref_clients FOREIGN KEY (client_id) REFERENCES clients(id);


--
-- TOC entry 2383 (class 2606 OID 18523)
-- Name: fk_accounting_segment_permissions_ref_accounting_segments; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY accounting_segment_permissions
    ADD CONSTRAINT fk_accounting_segment_permissions_ref_accounting_segments FOREIGN KEY (accounting_segment_id) REFERENCES accounting_segments(id);


--
-- TOC entry 2384 (class 2606 OID 18528)
-- Name: fk_accounting_segment_permissions_ref_departments; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY accounting_segment_permissions
    ADD CONSTRAINT fk_accounting_segment_permissions_ref_departments FOREIGN KEY (department_id) REFERENCES departments(id);


--
-- TOC entry 2379 (class 2606 OID 18458)
-- Name: fk_accounting_segments_ref_clients; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY accounting_segments
    ADD CONSTRAINT fk_accounting_segments_ref_clients FOREIGN KEY (client_id) REFERENCES clients(id);


--
-- TOC entry 2385 (class 2606 OID 18541)
-- Name: fk_accounting_system_files_ref_clients; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY accounting_system_files
    ADD CONSTRAINT fk_accounting_system_files_ref_clients FOREIGN KEY (client_id) REFERENCES clients(id);


--
-- TOC entry 2387 (class 2606 OID 18556)
-- Name: fk_acm_admin_groups_ref_acm_groups; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY acm_admin_groups
    ADD CONSTRAINT fk_acm_admin_groups_ref_acm_groups FOREIGN KEY (acm_groups_id) REFERENCES acm_groups(id);


--
-- TOC entry 2386 (class 2606 OID 18551)
-- Name: fk_acm_admin_groups_ref_admin; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY acm_admin_groups
    ADD CONSTRAINT fk_acm_admin_groups_ref_admin FOREIGN KEY (admin_id) REFERENCES admins(id);


--
-- TOC entry 2388 (class 2606 OID 18572)
-- Name: fk_acm_group_tasks_ref_acm_groups; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY acm_group_tasks
    ADD CONSTRAINT fk_acm_group_tasks_ref_acm_groups FOREIGN KEY (acm_groups_id) REFERENCES acm_groups(id);


--
-- TOC entry 2389 (class 2606 OID 18577)
-- Name: fk_acm_group_tasks_ref_acm_tasks; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY acm_group_tasks
    ADD CONSTRAINT fk_acm_group_tasks_ref_acm_tasks FOREIGN KEY (acm_tasks_id) REFERENCES acm_tasks(id);


--
-- TOC entry 2390 (class 2606 OID 18598)
-- Name: fk_client_banks_ref_clients; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY client_banks
    ADD CONSTRAINT fk_client_banks_ref_clients FOREIGN KEY (client_id) REFERENCES clients(id);


--
-- TOC entry 2391 (class 2606 OID 18608)
-- Name: fk_client_mile_rates_ref_clients; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY client_mile_rates
    ADD CONSTRAINT fk_client_mile_rates_ref_clients FOREIGN KEY (client_id) REFERENCES clients(id);


--
-- TOC entry 2404 (class 2606 OID 18737)
-- Name: fk_client_rule_approvers_ref_client_rules; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY client_rule_approvers
    ADD CONSTRAINT fk_client_rule_approvers_ref_client_rules FOREIGN KEY (client_rule_id) REFERENCES client_rules(id);


--
-- TOC entry 2405 (class 2606 OID 18742)
-- Name: fk_client_rule_approvers_ref_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY client_rule_approvers
    ADD CONSTRAINT fk_client_rule_approvers_ref_users FOREIGN KEY (user_id) REFERENCES users(id);


--
-- TOC entry 2392 (class 2606 OID 18624)
-- Name: fk_client_rules_ref_clients; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY client_rules
    ADD CONSTRAINT fk_client_rules_ref_clients FOREIGN KEY (client_id) REFERENCES clients(id);


--
-- TOC entry 2393 (class 2606 OID 18629)
-- Name: fk_client_rules_ref_default_rules; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY client_rules
    ADD CONSTRAINT fk_client_rules_ref_default_rules FOREIGN KEY (default_rule_id) REFERENCES default_rules(id);


--
-- TOC entry 2407 (class 2606 OID 18764)
-- Name: fk_client_segment_rules_ref_accounting_segments; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY client_segment_rules
    ADD CONSTRAINT fk_client_segment_rules_ref_accounting_segments FOREIGN KEY (accounting_segment_id) REFERENCES accounting_segments(id);


--
-- TOC entry 2406 (class 2606 OID 18759)
-- Name: fk_client_segment_rules_ref_clients; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY client_segment_rules
    ADD CONSTRAINT fk_client_segment_rules_ref_clients FOREIGN KEY (client_id) REFERENCES clients(id);


--
-- TOC entry 2376 (class 2606 OID 18419)
-- Name: fk_clients_ref_accounting_system_types; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY clients
    ADD CONSTRAINT fk_clients_ref_accounting_system_types FOREIGN KEY (accounting_system_type_id) REFERENCES accounting_system_types(id);


--
-- TOC entry 2375 (class 2606 OID 18414)
-- Name: fk_clients_ref_countries; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY clients
    ADD CONSTRAINT fk_clients_ref_countries FOREIGN KEY (country_id) REFERENCES countries(id);


--
-- TOC entry 2374 (class 2606 OID 18409)
-- Name: fk_clients_ref_states; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY clients
    ADD CONSTRAINT fk_clients_ref_states FOREIGN KEY (state_id) REFERENCES states(id);


--
-- TOC entry 2408 (class 2606 OID 18774)
-- Name: fk_department_heads_ref_departments; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY department_heads
    ADD CONSTRAINT fk_department_heads_ref_departments FOREIGN KEY (department_id) REFERENCES departments(id);


--
-- TOC entry 2409 (class 2606 OID 18779)
-- Name: fk_department_heads_ref_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY department_heads
    ADD CONSTRAINT fk_department_heads_ref_users FOREIGN KEY (user_id) REFERENCES users(id);


--
-- TOC entry 2378 (class 2606 OID 18441)
-- Name: fk_departments_ref_clients; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY departments
    ADD CONSTRAINT fk_departments_ref_clients FOREIGN KEY (client_id) REFERENCES clients(id);


--
-- TOC entry 2416 (class 2606 OID 18870)
-- Name: fk_invoice_amount_bracket_approvers_ref_clients; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invoice_amount_bracket_approvers
    ADD CONSTRAINT fk_invoice_amount_bracket_approvers_ref_clients FOREIGN KEY (client_id) REFERENCES clients(id);


--
-- TOC entry 2418 (class 2606 OID 18880)
-- Name: fk_invoice_amount_bracket_approvers_ref_invoice_amount_bracket; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invoice_amount_bracket_approvers
    ADD CONSTRAINT fk_invoice_amount_bracket_approvers_ref_invoice_amount_bracket FOREIGN KEY (invoice_amount_bracket_id) REFERENCES invoice_amount_bracket(id);


--
-- TOC entry 2417 (class 2606 OID 18875)
-- Name: fk_invoice_amount_bracket_approvers_ref_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invoice_amount_bracket_approvers
    ADD CONSTRAINT fk_invoice_amount_bracket_approvers_ref_users FOREIGN KEY (user_id) REFERENCES users(id);


--
-- TOC entry 2377 (class 2606 OID 18430)
-- Name: fk_invoice_amount_bracket_ref_clients; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invoice_amount_bracket
    ADD CONSTRAINT fk_invoice_amount_bracket_ref_clients FOREIGN KEY (client_id) REFERENCES clients(id);


--
-- TOC entry 2421 (class 2606 OID 18904)
-- Name: fk_invoice_approvers_ref_client_rules; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invoice_approvers
    ADD CONSTRAINT fk_invoice_approvers_ref_client_rules FOREIGN KEY (client_rule_id) REFERENCES client_rules(id);


--
-- TOC entry 2420 (class 2606 OID 18899)
-- Name: fk_invoice_approvers_ref_invoice_lines; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invoice_approvers
    ADD CONSTRAINT fk_invoice_approvers_ref_invoice_lines FOREIGN KEY (invoice_line_id) REFERENCES invoice_lines(id);


--
-- TOC entry 2419 (class 2606 OID 18894)
-- Name: fk_invoice_approvers_ref_invoices; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invoice_approvers
    ADD CONSTRAINT fk_invoice_approvers_ref_invoices FOREIGN KEY (invoice_id) REFERENCES invoices(id);


--
-- TOC entry 2422 (class 2606 OID 18909)
-- Name: fk_invoice_approvers_ref_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invoice_approvers
    ADD CONSTRAINT fk_invoice_approvers_ref_users FOREIGN KEY (user_id) REFERENCES users(id);


--
-- TOC entry 2423 (class 2606 OID 18925)
-- Name: fk_invoice_files_ref_invoice_lines; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invoice_files
    ADD CONSTRAINT fk_invoice_files_ref_invoice_lines FOREIGN KEY (invoice_line_id) REFERENCES invoice_lines(id);


--
-- TOC entry 2424 (class 2606 OID 18962)
-- Name: fk_invoice_line_segments_ref_invoice_lines; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invoice_line_segments
    ADD CONSTRAINT fk_invoice_line_segments_ref_invoice_lines FOREIGN KEY (invoice_line_id) REFERENCES invoice_lines(id);


--
-- TOC entry 2415 (class 2606 OID 18862)
-- Name: fk_invoice_lines_ref_invoices; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invoice_lines
    ADD CONSTRAINT fk_invoice_lines_ref_invoices FOREIGN KEY (invoice_id) REFERENCES invoices(id);


--
-- TOC entry 2414 (class 2606 OID 18843)
-- Name: fk_invoices_ref_accounting_system_files; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invoices
    ADD CONSTRAINT fk_invoices_ref_accounting_system_files FOREIGN KEY (accounting_system_file_id) REFERENCES accounting_system_files(id);


--
-- TOC entry 2410 (class 2606 OID 18823)
-- Name: fk_invoices_ref_clients; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invoices
    ADD CONSTRAINT fk_invoices_ref_clients FOREIGN KEY (client_id) REFERENCES clients(id);


--
-- TOC entry 2412 (class 2606 OID 18833)
-- Name: fk_invoices_ref_invoice_status; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invoices
    ADD CONSTRAINT fk_invoices_ref_invoice_status FOREIGN KEY (invoice_status_id) REFERENCES invoice_status(id);


--
-- TOC entry 2411 (class 2606 OID 18828)
-- Name: fk_invoices_ref_invoice_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invoices
    ADD CONSTRAINT fk_invoices_ref_invoice_type FOREIGN KEY (invoice_type_id) REFERENCES invoice_type(id);


--
-- TOC entry 2413 (class 2606 OID 18838)
-- Name: fk_invoices_ref_vendors; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY invoices
    ADD CONSTRAINT fk_invoices_ref_vendors FOREIGN KEY (vendor_id) REFERENCES vendors(id);


--
-- TOC entry 2373 (class 2606 OID 18343)
-- Name: fk_states_ref_countries; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY states
    ADD CONSTRAINT fk_states_ref_countries FOREIGN KEY (country_id) REFERENCES countries(id);


--
-- TOC entry 2426 (class 2606 OID 18983)
-- Name: fk_templates_ref_invoice_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY templates
    ADD CONSTRAINT fk_templates_ref_invoice_type FOREIGN KEY (invoice_type_id) REFERENCES invoice_type(id);


--
-- TOC entry 2425 (class 2606 OID 18978)
-- Name: fk_templates_ref_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY templates
    ADD CONSTRAINT fk_templates_ref_users FOREIGN KEY (user_id) REFERENCES users(id);


--
-- TOC entry 2427 (class 2606 OID 18999)
-- Name: fk_todo_lists_ref_clients; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY todo_lists
    ADD CONSTRAINT fk_todo_lists_ref_clients FOREIGN KEY (client_id) REFERENCES clients(id);


--
-- TOC entry 2429 (class 2606 OID 19017)
-- Name: fk_track_changes_ref_record_types; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY track_changes
    ADD CONSTRAINT fk_track_changes_ref_record_types FOREIGN KEY (record_type_id) REFERENCES record_types(id);


--
-- TOC entry 2428 (class 2606 OID 19012)
-- Name: fk_track_changes_ref_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY track_changes
    ADD CONSTRAINT fk_track_changes_ref_users FOREIGN KEY (user_id) REFERENCES users(id);


--
-- TOC entry 2431 (class 2606 OID 19033)
-- Name: fk_user_credit_cards_ref_client_banks; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_credit_cards
    ADD CONSTRAINT fk_user_credit_cards_ref_client_banks FOREIGN KEY (client_bank_id) REFERENCES client_banks(id);


--
-- TOC entry 2430 (class 2606 OID 19028)
-- Name: fk_user_credit_cards_ref_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_credit_cards
    ADD CONSTRAINT fk_user_credit_cards_ref_users FOREIGN KEY (user_id) REFERENCES users(id);


--
-- TOC entry 2432 (class 2606 OID 19043)
-- Name: fk_users_departments_ref_departments; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users_departments
    ADD CONSTRAINT fk_users_departments_ref_departments FOREIGN KEY (departments_department_id) REFERENCES departments(id);


--
-- TOC entry 2433 (class 2606 OID 19048)
-- Name: fk_users_departments_ref_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users_departments
    ADD CONSTRAINT fk_users_departments_ref_users FOREIGN KEY (users_user_id) REFERENCES users(id);


--
-- TOC entry 2434 (class 2606 OID 19058)
-- Name: fk_users_permissions_ref_permissions; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users_permissions
    ADD CONSTRAINT fk_users_permissions_ref_permissions FOREIGN KEY (permissions_permission_id) REFERENCES permissions(id);


--
-- TOC entry 2435 (class 2606 OID 19063)
-- Name: fk_users_permissions_ref_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users_permissions
    ADD CONSTRAINT fk_users_permissions_ref_users FOREIGN KEY (users_user_id) REFERENCES users(id);


--
-- TOC entry 2400 (class 2606 OID 18712)
-- Name: fk_users_ref_clients; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT fk_users_ref_clients FOREIGN KEY (client_id) REFERENCES clients(id);


--
-- TOC entry 2403 (class 2606 OID 18727)
-- Name: fk_users_ref_countries; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT fk_users_ref_countries FOREIGN KEY (country_id) REFERENCES countries(id);


--
-- TOC entry 2399 (class 2606 OID 18707)
-- Name: fk_users_ref_departments; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT fk_users_ref_departments FOREIGN KEY (department_id) REFERENCES departments(id);


--
-- TOC entry 2402 (class 2606 OID 18722)
-- Name: fk_users_ref_states; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT fk_users_ref_states FOREIGN KEY (state_id) REFERENCES states(id);


--
-- TOC entry 2398 (class 2606 OID 18702)
-- Name: fk_users_ref_user_roles; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT fk_users_ref_user_roles FOREIGN KEY (user_role_id) REFERENCES user_roles(id);


--
-- TOC entry 2401 (class 2606 OID 18717)
-- Name: fk_users_ref_vendors; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT fk_users_ref_vendors FOREIGN KEY (vendor_id) REFERENCES vendors(id);


--
-- TOC entry 2397 (class 2606 OID 18675)
-- Name: fk_vendors_ref_clients; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vendors
    ADD CONSTRAINT fk_vendors_ref_clients FOREIGN KEY (client_id) REFERENCES clients(id);


--
-- TOC entry 2396 (class 2606 OID 18670)
-- Name: fk_vendors_ref_countries; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vendors
    ADD CONSTRAINT fk_vendors_ref_countries FOREIGN KEY (country_id) REFERENCES countries(id);


--
-- TOC entry 2395 (class 2606 OID 18665)
-- Name: fk_vendors_ref_states; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vendors
    ADD CONSTRAINT fk_vendors_ref_states FOREIGN KEY (state_id) REFERENCES states(id);


--
-- TOC entry 2394 (class 2606 OID 18660)
-- Name: fk_vendors_ref_vendor_types; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vendors
    ADD CONSTRAINT fk_vendors_ref_vendor_types FOREIGN KEY (vendor_type_id) REFERENCES vendor_types(id);


--
-- TOC entry 2486 (class 0 OID 0)
-- Dependencies: 5
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO resteasy;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2013-01-31 19:28:48 ART

--
-- PostgreSQL database dump complete
--

