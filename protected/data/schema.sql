-- ----------------------------------------------------------------------------
-- my_sql workbench migration
-- migrated schemata: jmt
-- source schemata: jmt
-- created: wed jan 30 17:08:23 2013
-- ----------------------------------------------------------------------------

set foreign_key_checks = 0;;

-- ----------------------------------------------------------------------------
-- schema jmt
-- ----------------------------------------------------------------------------
drop schema if exists `jmt` ;
create schema if not exists `jmt` collate utf8_general_ci ;

-- ----------------------------------------------------------------------------
-- table jmt.client_banks
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`client_banks` (
  `client_bank_id` int not null auto_increment ,
  `bank_name` varchar(250) null ,
  `default_bank_id` int null ,
  `client_id` int null ,
  `description` varchar(1000) null ,
  `connection_type` varchar(100) null ,
  `web_address` varchar(250) null ,
  `username` varchar(50) null ,
  `password` varchar(50) null ,
  `security_word` varchar(50) null ,
  `apikey` varchar(50) null ,
  `created_date` datetime null ,
  `created_by_id` int null ,
  `modified_date` datetime null ,
  `modified_by_id` int null ,
  `is_visible` tinyint(1) null ,
  primary key (`client_bank_id`) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.user_credit_cards
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`user_credit_cards` (
  `credit_card_id` int not null auto_increment ,
  `user_id` int null ,
  `client_bank_id` int null ,
  `credit_card_number` varchar(50) null ,
  primary key (`credit_card_id`) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt._permissions
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`permissions` (
  `permission_id` int null ,
  `permission_name` varchar(50) null ,
  `description` varchar(250) null )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.user_permission
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`user_permission` (
  `user_id` int null ,
  `permission_id` int null )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.departments
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`departments` (
  `department_id` int not null auto_increment ,
  `department_name` varchar(50) not null ,
  `client_id` int null ,
  `dept_auth_limit` decimal(18,2) null ,
  `is_auth_required` tinyint(1) null ,
  `is_super_department` tinyint(1) null ,
  `is_processing` tinyint(1) null ,
  primary key (`department_id`) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.invoices
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`invoices` (
  `invoice_id` int not null auto_increment ,
  `client_id` int null ,
  `invoice_number` varchar(50) null ,
  `invoice_type_id` int null ,
  `invoice_status_id` int null ,
  `created_date` datetime null ,
  `invoice_date` datetime null ,
  `receipt_file` varchar(512) null ,
  `submitted_date` datetime null ,
  `submitted_by_id` int null ,
  `requested_by_id` int null ,
  `required_date` datetime null ,
  `acc_approved_date` datetime null ,
  `acc_approved_by_id` int null ,
  `approved_date` datetime null ,
  `approved_by_id` int null ,
  `exported_date` datetime null ,
  `exported_by_id` int null ,
  `rejected_date` datetime null ,
  `rejected_by_id` int null ,
  `rejected_reason` longtext null ,
  `rejected_invoice_id` int null ,
  `vendor_id` int null ,
  `project_name` varchar(150) null ,
  `address` varchar(255) null ,
  `address2` varchar(255) null ,
  `city` varchar(50) null ,
  `state_id` varchar(50) null ,
  `zipcode` varchar(50) null ,
  `country_id` varchar(100) null ,
  `bank_name` varchar(100) null ,
  `bank_address` varchar(255) null ,
  `bank_routing_number` varchar(50) null ,
  `bank_acct_number` varchar(50) null ,
  `is_wire_transfer` tinyint(1) null ,
  `description` varchar(2000) null ,
  `total_amount` decimal(18,2) null ,
  `is_deleted` tinyint(1) null ,
  `is_expense` tinyint(1) null ,
  `is_saved` tinyint(1) null ,
  `is_archived` tinyint(1) null ,
  `is_billable` tinyint(1) null ,
  `accounting_system_file` varchar(50) null ,
  `accounting_system_session_id` varchar(50) null ,
  `invoice_source` varchar(50) null ,
  `send_via` varchar(50) null ,
  `acc_approver` int null ,
  `send_invoice` tinyint(1) null ,
  `forward_approver` int null ,
  `created_by_id` int null ,
  `modified_date` datetime null ,
  `modified_by_id` int null ,
  primary key (`invoice_id`) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt._countries
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`countries` (
  `country_id` int not null auto_increment ,
  `country_code` varchar(100) null ,
  `country_name` varchar(150) null ,
  `country_name_short` varchar(100) null ,
  `display_order` int null ,
  `is_visible` tinyint(1) null ,
  primary key (`country_id`) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt._states
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`states` (
  `state_id` int not null auto_increment ,
  `state_name` varchar(50) null ,
  `state_code` varchar(50) null ,
  `country_id` int null ,
  `display_order` int null ,
  primary key (`state_id`) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.client_segment_rules
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`client_segment_rules` (
  `client_segment_rule_id` int not null auto_increment ,
  `client_id` int null ,
  `accounting_segment_id` int null ,
  `account_code_list` varchar(500) null ,
  `approvers_list` varchar(500) null ,
  `operator` varchar(50) null ,
  `line_amount` decimal(19,4) null ,
  `is_active` tinyint(1) null ,
  `created_date` datetime null ,
  `created_by_id` int null ,
  primary key (`client_segment_rule_id`) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.todo_lists
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`todo_lists` (
  `todo_list_id` int not null auto_increment ,
  `client_id` int not null ,
  `status_id` int not null ,
  `todo_list_title` varchar(255) null ,
  `todo_list_desc` longtext null ,
  `created_by` int not null ,
  `create_date` timestamp not null default current_timestamp ,
  `is_deleted` tinyint(1) not null default 0 ,
  primary key (`todo_list_id`) ,
  constraint `fk_todo_lists_clients`
    foreign key (`client_id` )
    references `jmt`.`clients` (`client_id` )
    on delete no action
    on update no action)
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.invoice_files
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`invoice_files` (
  `invoice_image_id` int not null auto_increment ,
  `invoice_line_id` int null ,
  `attached_file` varchar(500) null ,
  `attached_zoom_file` varchar(500) null ,
  `original_file` varchar(500) null ,
  `created_by_id` int null ,
  `created_date` datetime null ,
  primary key (`invoice_image_id`) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.invoice_lines
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`invoice_lines` (
  `invoice_line_id` int not null auto_increment ,
  `invoice_id` int null ,
  `amount` decimal(18,2) null ,
  `line_date` datetime null ,
  `rejection_reason` varchar(2000) null ,
  `rejected_by_id` int null ,
  `rejected_date` datetime null ,
  `comment` varchar(500) null ,
  `attached_file` varchar(255) null ,
  `attached_zoom_file` varchar(255) null ,
  `original_file` varchar(255) null ,
  primary key (`invoice_line_id`) ,
  constraint `fk_invoice_lines_invoices`
    foreign key (`invoice_id` )
    references `jmt`.`invoices` (`invoice_id` )
    on delete cascade
    on update no action)
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.templates
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`templates` (
  `id` int not null ,
  `user_id` int not null ,
  `format` varchar(300) null ,
  `template_name` varchar(300) null ,
  `is_default` tinyint(1) not null default 0 ,
  `invoice_type_id` int not null default 0 ,
  `start` int not null default 0 ,
  `end` int not null default 0 )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt._accounting_system_types
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`accounting_system_types` (
  `accounting_system_type_id` int not null auto_increment ,
  `accounting_system_type_name` varchar(50) null ,
  `display_order` int null ,
  primary key (`accounting_system_type_id`) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.admin
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`admin` (
  `id` int not null ,
  `name` varchar(100) null ,
  `username` varchar(100) null ,
  `password` varchar(100) null )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.acm_admin_groups
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`acm_admin_groups` (
  `id` int not null ,
  `admin_id` int not null ,
  `group_id` int not null )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.acm_tasks
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`acm_tasks` (
  `id` int not null ,
  `name` varchar(50) null )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.acm_group_tasks
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`acm_group_tasks` (
  `id` int not null ,
  `group_id` int not null ,
  `task_id` int not null )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.acm_groups
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`acm_groups` (
  `id` int not null ,
  `name` varchar(50) null )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.client_mile_rates
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`client_mile_rates` (
  `id` int not null ,
  `client_id` int null ,
  `mile` decimal(18,2) not null default 0 ,
  `rate` decimal(18,2) not null default 0 )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.user_department
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`user_department` (
  `user_id` int not null ,
  `department_id` int not null ,
  `created_date` datetime null ,
  primary key (`user_id`, `department_id`) ,
  index `ix_user_department` (`user_id` asc, `department_id` asc) ,
  constraint `fk_user_department_department_id`
    foreign key (`department_id` )
    references `jmt`.`departments` (`department_id` )
    on delete no action
    on update no action)
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.client_rule_approvers
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`client_rule_approvers` (
  `approver_id` int not null auto_increment ,
  `client_rule_id` int null ,
  `user_id` int null ,
  `created_date` datetime null ,
  `created_by_id` int null ,
  primary key (`approver_id`) ,
  index `ix_client_rule_approvers` (`client_rule_id` asc, `user_id` asc) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.invoice_amount_bracket
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`invoice_amount_bracket` (
  `id` int not null ,
  `client_id` int null ,
  `invoice_amount` decimal(18,2) null default 0 )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.invoice_amount_bracket_approvers
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`invoice_amount_bracket_approvers` (
  `id` int not null ,
  `client_id` int null ,
  `invoice_amount_bracket_id` int null ,
  `user_id` int null )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.accounting_segments
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`accounting_segments` (
  `accounting_segment_id` int not null ,
  `segment_title` varchar(50) null ,
  `description` varchar(500) null ,
  `segment_auth_limit` decimal(18,2) null ,
  `accounting_system_id` varchar(50) null ,
  `client_id` int null ,
  `is_visible` tinyint(1) null ,
  `display_order` int null ,
  `created_date` datetime null ,
  `created_by_id` int null ,
  `modified_date` datetime null ,
  `modified_by_id` int null )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.department_heads
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`department_heads` (
  `department_head_id` int not null ,
  `department_id` int not null ,
  `user_id` int not null )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.invoice_line_segments
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`invoice_line_segments` (
  `invoice_line_segmentation_id` int not null auto_increment ,
  `invoice_line_id` int null ,
  `amount` decimal(18,2) null ,
  `comment` varchar(500) null ,
  `segment01` varchar(50) null ,
  `segment02` varchar(50) null ,
  `segment03` varchar(50) null ,
  `segment04` varchar(50) null ,
  `segment05` varchar(50) null ,
  `segment06` varchar(50) null ,
  `segment07` varchar(50) null ,
  `segment08` varchar(50) null ,
  `segment09` varchar(50) null ,
  `segment10` varchar(50) null ,
  `segment11` varchar(50) null ,
  `segment12` varchar(50) null ,
  `segment13` varchar(50) null ,
  `segment14` varchar(50) null ,
  `segment15` varchar(50) null ,
  `account01` varchar(50) null ,
  `account02` varchar(50) null ,
  `segment00` varchar(50) null ,
  `account00` varchar(50) null ,
  `account03` varchar(50) null ,
  `account04` varchar(50) null ,
  `account05` varchar(50) null ,
  primary key (`invoice_line_segmentation_id`) ,
  constraint `fk_invoice_line_segments_invoice_lines`
    foreign key (`invoice_line_id` )
    references `jmt`.`invoice_lines` (`invoice_line_id` )
    on delete cascade
    on update no action)
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt._record_types
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`record_types` (
  `record_type_id` int not null auto_increment ,
  `record_type_name` varchar(50) null ,
  primary key (`record_type_id`) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt._invoice_type
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`invoice_type` (
  `invoice_type_id` int not null auto_increment ,
  `invoice_type_name` varchar(100) null ,
  `invoice_type_code` varchar(50) null ,
  primary key (`invoice_type_id`) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt._invoice_status
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`invoice_status` (
  `invoice_status_id` int not null auto_increment ,
  `invoice_status_name` varchar(100) null ,
  primary key (`invoice_status_id`) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt._user_roles
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`user_roles` (
  `user_role_id` int not null auto_increment ,
  `user_role_name` varchar(50) null ,
  primary key (`user_role_id`) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.users
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`users` (
  `user_id` int not null auto_increment ,
  `client_id` int null ,
  `user_role_id` int null ,
  `is_super_user` tinyint(1) null ,
  `first_name` varchar(200) null ,
  `last_name` varchar(200) null ,
  `username` varchar(200) null ,
  `email` varchar(350) null ,
  `password` varchar(200) null ,
  `is_active` tinyint(1) null ,
  `job_title` varchar(350) null ,
  `supervisor_id` int null ,
  `department_id` int null ,
  `address` varchar(350) null ,
  `address2` varchar(350) null ,
  `city` varchar(350) null ,
  `zip_code` varchar(50) null ,
  `state_id` int null ,
  `country_id` int null ,
  `phone` varchar(50) null ,
  `fax` varchar(50) null ,
  `user_auth_limit` decimal(18,2) null ,
  `region_account_code` varchar(50) null ,
  `vendor_id` int null ,
  `is_deleted` tinyint(1) null ,
  `created_date` datetime null ,
  `created_by_id` int null ,
  `modified_date` datetime null ,
  `modified_by_id` int null ,
  primary key (`user_id`) ,
  index `ix_users` (`email`(255) asc) ,
  constraint `fk_users_clients`
    foreign key (`client_id` )
    references `jmt`.`clients` (`client_id` )
    on delete no action
    on update no action,
  constraint `fk_users__states`
    foreign key (`state_id` )
    references `jmt`.`states` (`state_id` )
    on delete no action
    on update no action,
  constraint `fk_users__countries`
    foreign key (`country_id` )
    references `jmt`.`countries` (`country_id` )
    on delete no action
    on update no action,
  constraint `fk_users_departments`
    foreign key (`department_id` )
    references `jmt`.`departments` (`department_id` )
    on delete no action
    on update no action)
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt._vendor_types
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`vendor_types` (
  `vendor_type_id` int not null auto_increment ,
  `vendor_type_name` varchar(50) null ,
  `is_company` tinyint(1) null ,
  primary key (`vendor_type_id`) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.accounting_system_files
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`accounting_system_files` (
  `accounting_system_file_id` int not null auto_increment ,
  `clientid` int not null ,
  `accounting_system_session_id` varchar(50) null ,
  `accounting_system_file` varchar(50) null ,
  `export_date` datetime null ,
  `create_date` timestamp not null default current_timestamp ,
  primary key (`accounting_system_file_id`) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.invoice_approvers
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`invoice_approvers` (
  `invoice_approver_id` int not null auto_increment ,
  `invoice_id` int not null ,
  `invoice_line_id` int null ,
  `client_rule_id` int null ,
  `user_id` int null ,
  `approval_date` datetime null ,
  `rejection_date` datetime null ,
  `rejection_reason` varchar(500) null ,
  `_approval_date` datetime null ,
  `reject_date` datetime null ,
  primary key (`invoice_approver_id`) ,
  index `ix_invoice_approvers` (`invoice_id` asc, `user_id` asc) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.track_changes
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`track_changes` (
  `change_id` int not null auto_increment ,
  `record_id` int null ,
  `record_type_id` int null ,
  `details` longtext null ,
  `user_id` int null ,
  `created_date` datetime null ,
  primary key (`change_id`) ,
  constraint `fk_track_changes__record_types`
    foreign key (`record_type_id` )
    references `jmt`.`record_types` (`record_type_id` )
    on delete no action
    on update no action)
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.accounting_segment_permissions
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`accounting_segment_permissions` (
  `department_id` int null ,
  `accounting_segment_id` int null ,
  `is_shown` tinyint(1) null ,
  `account_id` int null ,
  index `ix_accounting_segment_departments` (`department_id` asc, `accounting_segment_id` asc) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.accounting_coa
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`accounting_coa` (
  `account_id` int not null auto_increment ,
  `accounting_segment_id` int null ,
  `account_code` varchar(150) null ,
  `segment_id` int null ,
  `account_title` varchar(500) null ,
  `account_short_title` varchar(200) null ,
  `account_status` tinyint(1) null ,
  `account_type` varchar(50) null ,
  `account_auth_limit` decimal(18,2) null ,
  `alias` varchar(200) null ,
  `cbsaname` varchar(200) null ,
  `client_id` int null ,
  `is_visible` tinyint(1) null ,
  `created_date` datetime null ,
  `created_by_id` int null ,
  `modified_date` datetime null ,
  `modified_by_id` int null ,
  `segment04` varchar(100) null ,
  `account04` varchar(100) null ,
  `segment01` varchar(100) null ,
  `account01` varchar(100) null ,
  `segment00` varchar(100) null ,
  `account00` varchar(100) null ,
  `segment02` varchar(100) null ,
  `account02` varchar(100) null ,
  `segment05` varchar(100) null ,
  `account05` varchar(100) null ,
  `segment03` varchar(100) null ,
  `account03` varchar(100) null ,
  `segment06` varchar(100) null ,
  `account06` varchar(100) null ,
  primary key (`account_id`) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.vendors
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`vendors` (
  `vendor_id` int not null auto_increment ,
  `vendor_name` varchar(250) null ,
  `vendor_type_id` int null ,
  `address` varchar(250) null ,
  `address2` varchar(250) null ,
  `city` varchar(100) null ,
  `zipcode` varchar(50) null ,
  `phone` varchar(50) null ,
  `fax` varchar(50) null ,
  `email` varchar(350) null ,
  `first_name` varchar(150) null ,
  `last_name` varchar(150) null ,
  `title` varchar(150) null ,
  `state_id` int null ,
  `country_id` int null ,
  `client_id` int null ,
  `accounting_system_id` varchar(50) null ,
  `is_credit_card` tinyint(1) null ,
  `is_visible` tinyint(1) null ,
  `is_active` tinyint(1) null ,
  `is_approved` tinyint(1) null ,
  `is_deleted` int null ,
  `created_date` datetime null ,
  `created_by_id` int null ,
  `modified_date` datetime null ,
  `modified_by_id` int null ,
  `approved_to_import_date` datetime null ,
  primary key (`vendor_id`) ,
  constraint `fk_vendors_clients`
    foreign key (`client_id` )
    references `jmt`.`clients` (`client_id` )
    on delete no action
    on update no action,
  constraint `fk_vendors__countries`
    foreign key (`country_id` )
    references `jmt`.`countries` (`country_id` )
    on delete no action
    on update no action,
  constraint `fk_vendors__states`
    foreign key (`state_id` )
    references `jmt`.`states` (`state_id` )
    on delete no action
    on update no action,
  constraint `fk_vendors__vendor_types`
    foreign key (`vendor_type_id` )
    references `jmt`.`vendor_types` (`vendor_type_id` )
    on delete no action
    on update no action)
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.accounting_coapermissions
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`accounting_coapermissions` (
  `account_id` int null ,
  `department_id` int null ,
  index `ix_accounting_coapermissions` (`account_id` asc, `department_id` asc) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.client_rules
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`client_rules` (
  `client_rule_id` int not null auto_increment ,
  `client_id` int null ,
  `default_rule_id` int null ,
  `default_auth_limit` decimal(18,2) null ,
  `is_active` tinyint(1) null ,
  `priority` int null ,
  `default_approvers` varchar(500) null ,
  `client_approvers` varchar(500) null ,
  `created_date` datetime null ,
  `created_by_id` int null ,
  `modified_date` datetime null ,
  `modified_by_id` int null ,
  primary key (`client_rule_id`) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt._default_rules
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`default_rules` (
  `default_rule_id` int not null auto_increment ,
  `default_rule_type` varchar(150) null ,
  `default_rule_name` varchar(500) null ,
  `default_authorization_limit` decimal(18,2) null ,
  `default_approvers` varchar(500) null ,
  `comment` varchar(1000) null ,
  primary key (`default_rule_id`) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.sysdiagrams
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`sysdiagrams` (
  `name` varchar(160) not null ,
  `principal_id` int not null ,
  `diagram_id` int not null auto_increment ,
  `version` int null ,
  `definition` longblob null ,
  primary key (`diagram_id`) ,
  unique index `uk_principal_name` (`principal_id` asc, `name` asc) )
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- table jmt.clients
-- ----------------------------------------------------------------------------
create  table if not exists `jmt`.`clients` (
  `client_id` int not null auto_increment ,
  `client_name` varchar(250) null ,
  `address` varchar(250) null ,
  `address2` varchar(250) null ,
  `city` varchar(100) null ,
  `postal_code` varchar(50) null ,
  `state_id` int null ,
  `country_id` int null ,
  `phone` varchar(50) null ,
  `fax` varchar(50) null ,
  `accounting_system_type_id` int null ,
  `cfdsn` varchar(100) null ,
  `server_address` varchar(1024) null ,
  `server_port` int null ,
  `server_type` varchar(50) null ,
  `dbname` varchar(100) null ,
  `dblogin` varchar(100) null ,
  `dbpassword` varchar(150) null ,
  `accounts_payable_code` varchar(150) null ,
  `is_active` tinyint(1) null ,
  `is_deleted` tinyint(1) null ,
  `is_setup_displayed` tinyint(1) null ,
  `client_code` varchar(50) null ,
  `client_folder` varchar(50) null ,
  `created_date` datetime null ,
  `created_by_id` int null ,
  `modified_date` datetime null ,
  `modified_by_id` int null ,
  `last_sync_date` datetime null ,
  `billing_address` varchar(250) null ,
  `billing_address2` varchar(250) null ,
  `billing_city` varchar(250) null ,
  `billing_state_id` int null ,
  `card_holder_name` varchar(250) null ,
  `credit_card_expiration` varchar(50) null ,
  `credit_card_number` varchar(250) null ,
  `mile_rate` decimal(18,2) not null default 0 ,
  `subscription_id` int null ,
  `with_setup_fee` varchar(50) null ,
  primary key (`client_id`) ,
  constraint `fk_clients__states`
    foreign key (`state_id` )
    references `jmt`.`states` (`state_id` )
    on delete no action
    on update no action,
  constraint `fk_clients__accounting_system_types`
    foreign key (`accounting_system_type_id` )
    references `jmt`.`accounting_system_types` (`accounting_system_type_id` )
    on delete no action
    on update no action,
  constraint `fk_clients__countries`
    foreign key (`country_id` )
    references `jmt`.`countries` (`country_id` )
    on delete no action
    on update no action)
collate = utf8_general_ci;

-- ----------------------------------------------------------------------------
-- routine jmt.sp_helpdiagrams
-- ----------------------------------------------------------------------------
-- delimiter $$
-- 
-- delimiter $$
-- use `jmt`$$
-- 

-- 	create procedure dbo.sp_helpdiagrams

-- 	(

-- 		@diagramname sysname = null,

-- 		@owner_id int = null

-- 	)

-- 	with execute as n'dbo'

-- 	as

-- 	begin

-- 		declare @user sysname

-- 		declare @dbo_login bit

-- 		execute as caller;

-- 			set @user = user_name();

-- 			set @dbo_login = convert(bit,is_member('db_owner'));

-- 		revert;

-- 		select

-- 			[database] = db_name(),

-- 			[name] = name,

-- 			[id] = diagram_id,

-- 			[owner] = user_name(principal_id),

-- 			[owner_id] = principal_id

-- 		from

-- 			sysdiagrams

-- 		where

-- 			(@dbo_login = 1 or user_name(principal_id) = @user) and

-- 			(@diagramname is null or name = @diagramname) and

-- 			(@owner_id is null or principal_id = @owner_id)

-- 		order by

-- 			4, 5, 1

-- 	end

-- 	$$
-- 
-- delimiter ;
-- 
-- ----------------------------------------------------------------------------
-- routine jmt.sp_helpdiagramdefinition
-- ----------------------------------------------------------------------------
-- delimiter $$
-- 
-- delimiter $$
-- use `jmt`$$
-- 

-- 	create procedure dbo.sp_helpdiagramdefinition

-- 	(

-- 		@diagramname 	sysname,

-- 		@owner_id	int	= null 		

-- 	)

-- 	with execute as n'dbo'

-- 	as

-- 	begin

-- 		set nocount on

-- 

-- 		declare @the_id 		int

-- 		declare @is_dbo 		int

-- 		declare @diag_id		int

-- 		declare @uidfound	int

-- 	

-- 		if(@diagramname is null)

-- 		begin

-- 			raiserror (n'e_invalidarg', 16, 1);

-- 			return -1

-- 		end

-- 	

-- 		execute as caller;

-- 		select @the_id = database_principal_id();

-- 		select @is_dbo = is_member(n'db_owner');

-- 		if(@owner_id is null)

-- 			select @owner_id = @the_id;

-- 		revert; 

-- 	

-- 		select @diag_id = diagram_id, @uidfound = principal_id from dbo.sysdiagrams where principal_id = @owner_id and name = @diagramname;

-- 		if(@diag_id is null or (@is_dbo = 0 and @uidfound <> @the_id ))

-- 		begin

-- 			raiserror ('diagram does not exist or you do not have permission.', 16, 1);

-- 			return -3

-- 		end

-- 

-- 		select version, definition from dbo.sysdiagrams where diagram_id = @diag_id ; 

-- 		return 0

-- 	end

-- 	$$
-- 
-- delimiter ;
-- 
-- ----------------------------------------------------------------------------
-- routine jmt.sp_creatediagram
-- ----------------------------------------------------------------------------
-- delimiter $$
-- 
-- delimiter $$
-- use `jmt`$$
-- 

-- 	create procedure dbo.sp_creatediagram

-- 	(

-- 		@diagramname 	sysname,

-- 		@owner_id		int	= null, 	

-- 		@version 		int,

-- 		@definition 	varbinary(max)

-- 	)

-- 	with execute as 'dbo'

-- 	as

-- 	begin

-- 		set nocount on

-- 	

-- 		declare @the_id int

-- 		declare @retval int

-- 		declare @is_dbo	int

-- 		declare @user_name sysname

-- 		if(@version is null or @diagramname is null)

-- 		begin

-- 			raiserror (n'e_invalidarg', 16, 1);

-- 			return -1

-- 		end

-- 	

-- 		execute as caller;

-- 		select @the_id = database_principal_id(); 

-- 		select @is_dbo = is_member(n'db_owner');

-- 		revert; 

-- 		

-- 		if @owner_id is null

-- 		begin

-- 			select @owner_id = @the_id;

-- 		end

-- 		else

-- 		begin

-- 			if @the_id <> @owner_id

-- 			begin

-- 				if @is_dbo = 0

-- 				begin

-- 					raiserror (n'e_invalidarg', 16, 1);

-- 					return -1

-- 				end

-- 				select @the_id = @owner_id

-- 			end

-- 		end

-- 		-- next 2 line only for test, will be removed after define name unique

-- 		if exists(select diagram_id from dbo.sysdiagrams where principal_id = @the_id and name = @diagramname)

-- 		begin

-- 			raiserror ('the name is already used.', 16, 1);

-- 			return -2

-- 		end

-- 	

-- 		insert into dbo.sysdiagrams(name, principal_id , version, definition)

-- 				values(@diagramname, @the_id, @version, @definition) ;

-- 		

-- 		select @retval = @@identity 

-- 		return @retval

-- 	end

-- 	$$
-- 
-- delimiter ;
-- 
-- ----------------------------------------------------------------------------
-- routine jmt.sp_renamediagram
-- ----------------------------------------------------------------------------
-- delimiter $$
-- 
-- delimiter $$
-- use `jmt`$$
-- 

-- 	create procedure dbo.sp_renamediagram

-- 	(

-- 		@diagramname 		sysname,

-- 		@owner_id		int	= null,

-- 		@new_diagramname	sysname

-- 	

-- 	)

-- 	with execute as 'dbo'

-- 	as

-- 	begin

-- 		set nocount on

-- 		declare @the_id 			int

-- 		declare @is_dbo 			int

-- 		

-- 		declare @uidfound 		int

-- 		declare @diag_id			int

-- 		declare @diag_id_targ		int

-- 		declare @u_name			sysname

-- 		if((@diagramname is null) or (@new_diagramname is null))

-- 		begin

-- 			raiserror ('invalid value', 16, 1);

-- 			return -1

-- 		end

-- 	

-- 		execute as caller;

-- 		select @the_id = database_principal_id();

-- 		select @is_dbo = is_member(n'db_owner'); 

-- 		if(@owner_id is null)

-- 			select @owner_id = @the_id;

-- 		revert;

-- 	

-- 		select @u_name = user_name(@owner_id)

-- 	

-- 		select @diag_id = diagram_id, @uidfound = principal_id from dbo.sysdiagrams where principal_id = @owner_id and name = @diagramname 

-- 		if(@diag_id is null or (@is_dbo = 0 and @uidfound <> @the_id))

-- 		begin

-- 			raiserror ('diagram does not exist or you do not have permission.', 16, 1)

-- 			return -3

-- 		end

-- 	

-- 		-- if((@u_name is not null) and (@new_diagramname = @diagramname))	-- nothing will change

-- 		--	return 0;

-- 	

-- 		if(@u_name is null)

-- 			select @diag_id_targ = diagram_id from dbo.sysdiagrams where principal_id = @the_id and name = @new_diagramname

-- 		else

-- 			select @diag_id_targ = diagram_id from dbo.sysdiagrams where principal_id = @owner_id and name = @new_diagramname

-- 	

-- 		if((@diag_id_targ is not null) and  @diag_id <> @diag_id_targ)

-- 		begin

-- 			raiserror ('the name is already used.', 16, 1);

-- 			return -2

-- 		end		

-- 	

-- 		if(@u_name is null)

-- 			update dbo.sysdiagrams set [name] = @new_diagramname, principal_id = @the_id where diagram_id = @diag_id

-- 		else

-- 			update dbo.sysdiagrams set [name] = @new_diagramname where diagram_id = @diag_id

-- 		return 0

-- 	end

-- 	$$
-- 
-- delimiter ;
-- 
-- ----------------------------------------------------------------------------
-- routine jmt.sp_alterdiagram
-- ----------------------------------------------------------------------------
-- delimiter $$
-- 
-- delimiter $$
-- use `jmt`$$
-- 

-- 	create procedure dbo.sp_alterdiagram

-- 	(

-- 		@diagramname 	sysname,

-- 		@owner_id	int	= null,

-- 		@version 	int,

-- 		@definition 	varbinary(max)

-- 	)

-- 	with execute as 'dbo'

-- 	as

-- 	begin

-- 		set nocount on

-- 	

-- 		declare @the_id 			int

-- 		declare @retval 		int

-- 		declare @is_dbo 			int

-- 		

-- 		declare @uidfound 		int

-- 		declare @diag_id			int

-- 		declare @should_change_uid	int

-- 	

-- 		if(@diagramname is null)

-- 		begin

-- 			raiserror ('invalid arg', 16, 1)

-- 			return -1

-- 		end

-- 	

-- 		execute as caller;

-- 		select @the_id = database_principal_id();	 

-- 		select @is_dbo = is_member(n'db_owner'); 

-- 		if(@owner_id is null)

-- 			select @owner_id = @the_id;

-- 		revert;

-- 	

-- 		select @should_change_uid = 0

-- 		select @diag_id = diagram_id, @uidfound = principal_id from dbo.sysdiagrams where principal_id = @owner_id and name = @diagramname 

-- 		

-- 		if(@diag_id is null or (@is_dbo = 0 and @the_id <> @uidfound))

-- 		begin

-- 			raiserror ('diagram does not exist or you do not have permission.', 16, 1);

-- 			return -3

-- 		end

-- 	

-- 		if(@is_dbo <> 0)

-- 		begin

-- 			if(@uidfound is null or user_name(@uidfound) is null) -- invalid principal_id

-- 			begin

-- 				select @should_change_uid = 1 ;

-- 			end

-- 		end

-- 

-- 		-- update dds data			

-- 		update dbo.sysdiagrams set definition = @definition where diagram_id = @diag_id ;

-- 

-- 		-- change owner

-- 		if(@should_change_uid = 1)

-- 			update dbo.sysdiagrams set principal_id = @the_id where diagram_id = @diag_id ;

-- 

-- 		-- update dds version

-- 		if(@version is not null)

-- 			update dbo.sysdiagrams set version = @version where diagram_id = @diag_id ;

-- 

-- 		return 0

-- 	end

-- 	$$
-- 
-- delimiter ;
-- 
-- ----------------------------------------------------------------------------
-- routine jmt.sp_dropdiagram
-- ----------------------------------------------------------------------------
-- delimiter $$
-- 
-- delimiter $$
-- use `jmt`$$
-- 

-- 	create procedure dbo.sp_dropdiagram

-- 	(

-- 		@diagramname 	sysname,

-- 		@owner_id	int	= null

-- 	)

-- 	with execute as 'dbo'

-- 	as

-- 	begin

-- 		set nocount on

-- 		declare @the_id 			int

-- 		declare @is_dbo 			int

-- 		

-- 		declare @uidfound 		int

-- 		declare @diag_id			int

-- 	

-- 		if(@diagramname is null)

-- 		begin

-- 			raiserror ('invalid value', 16, 1);

-- 			return -1

-- 		end

-- 	

-- 		execute as caller;

-- 		select @the_id = database_principal_id();

-- 		select @is_dbo = is_member(n'db_owner'); 

-- 		if(@owner_id is null)

-- 			select @owner_id = @the_id;

-- 		revert; 

-- 		

-- 		select @diag_id = diagram_id, @uidfound = principal_id from dbo.sysdiagrams where principal_id = @owner_id and name = @diagramname 

-- 		if(@diag_id is null or (@is_dbo = 0 and @uidfound <> @the_id))

-- 		begin

-- 			raiserror ('diagram does not exist or you do not have permission.', 16, 1)

-- 			return -3

-- 		end

-- 	

-- 		delete from dbo.sysdiagrams where diagram_id = @diag_id;

-- 	

-- 		return 0;

-- 	end

-- 	$$
-- 
-- delimiter ;
-- 
-- ----------------------------------------------------------------------------
-- routine jmt.re_vendor_list
-- ----------------------------------------------------------------------------
-- delimiter $$
-- 
-- delimiter $$
-- use `jmt`$$
-- create procedure [dbo].[sp_vendor_list]

-- 	-- add the parameters for the stored procedure here

-- 	@start_row int = 1,

-- 	@end_row int = 20,

-- 	@client_id int = 1 

-- 	--,@order_by varchar = 'vendor_name'

-- 	--,@sort_order varchar = 'asc'

-- as

-- begin

-- 	-- set nocount on added to prevent extra result sets from

-- 	-- interfering with select statements.

-- 	set nocount on;

-- 

--     -- insert statements for procedure here

-- 	with q_vendors as  

-- 	(	select row_number() over (order by vendor_id) as row_number, v.*, st.state_name, st.state_code

-- 		from vendors v

-- 			left join _states st on st.state_id = v.state_id

-- 		

-- 	)

-- 	select * from q_vendors

-- 	where row_number between @start_row and @end_row

-- 			and client_id = @client_id

-- 

-- end$$
-- 
-- delimiter ;
-- 
-- ----------------------------------------------------------------------------
-- routine jmt.sp_upgraddiagrams
-- ----------------------------------------------------------------------------
-- delimiter $$
-- 
-- delimiter $$
-- use `jmt`$$
-- 

-- 	create procedure dbo.sp_upgraddiagrams

-- 	as

-- 	begin

-- 		if object_id(n'dbo.sysdiagrams') is not null

-- 			return 0;

-- 	

-- 		create table dbo.sysdiagrams

-- 		(

-- 			name sysname not null,

-- 			principal_id int not null,	-- we may change it to varbinary(85)

-- 			diagram_id int primary key identity,

-- 			version int,

-- 	

-- 			definition varbinary(max)

-- 			constraint uk_principal_name unique

-- 			(

-- 				principal_id,

-- 				name

-- 			)

-- 		);

-- 

-- 

-- 		/* add this if we need to have some form of extended properties for diagrams */

-- 		/*

-- 		if object_id(n'dbo.sysdiagram_properties') is null

-- 		begin

-- 			create table dbo.sysdiagram_properties

-- 			(

-- 				diagram_id int,

-- 				name sysname,

-- 				value varbinary(max) not null

-- 			)

-- 		end

-- 		*/

-- 

-- 		if object_id(n'dbo.dtproperties') is not null

-- 		begin

-- 			insert into dbo.sysdiagrams

-- 			(

-- 				[name],

-- 				[principal_id],

-- 				[version],

-- 				[definition]

-- 			)

-- 			select	 

-- 				convert(sysname, dgnm.[uvalue]),

-- 				database_principal_id(n'dbo'),			-- will change to the sid of sa

-- 				0,							-- zero for old format, dgdef.[version],

-- 				dgdef.[lvalue]

-- 			from dbo.[dtproperties] dgnm

-- 				inner join dbo.[dtproperties] dggd on dggd.[property] = 'dtg_schema_guid' and dggd.[objectid] = dgnm.[objectid]	

-- 				inner join dbo.[dtproperties] dgdef on dgdef.[property] = 'dtg_schema_data' and dgdef.[objectid] = dgnm.[objectid]

-- 				

-- 			where dgnm.[property] = 'dtg_schema_name' and dggd.[uvalue] like n'_ea3e6268-d998-11ce-9454-00aa00a3f36e_' 

-- 			return 2;

-- 		end

-- 		return 1;

-- 	end

-- 	$$
-- 
-- delimiter ;
-- 
-- ----------------------------------------------------------------------------
-- routine jmt.fn_diagramobjects
-- ----------------------------------------------------------------------------
-- delimiter $$
-- 
-- delimiter $$
-- use `jmt`$$
-- 

-- 	create function dbo.fn_diagramobjects() 

-- 	returns int

-- 	with execute as n'dbo'

-- 	as

-- 	begin

-- 		declare @id_upgraddiagrams		int

-- 		declare @id_sysdiagrams			int

-- 		declare @id_helpdiagrams		int

-- 		declare @id_helpdiagramdefinition	int

-- 		declare @id_creatediagram	int

-- 		declare @id_renamediagram	int

-- 		declare @id_alterdiagram 	int 

-- 		declare @id_dropdiagram		int

-- 		declare @installed_objects	int

-- 

-- 		select @installed_objects = 0

-- 

-- 		select 	@id_upgraddiagrams = object_id(n'dbo.sp_upgraddiagrams'),

-- 			@id_sysdiagrams = object_id(n'dbo.sysdiagrams'),

-- 			@id_helpdiagrams = object_id(n'dbo.sp_helpdiagrams'),

-- 			@id_helpdiagramdefinition = object_id(n'dbo.sp_helpdiagramdefinition'),

-- 			@id_creatediagram = object_id(n'dbo.sp_creatediagram'),

-- 			@id_renamediagram = object_id(n'dbo.sp_renamediagram'),

-- 			@id_alterdiagram = object_id(n'dbo.sp_alterdiagram'), 

-- 			@id_dropdiagram = object_id(n'dbo.sp_dropdiagram')

-- 

-- 		if @id_upgraddiagrams is not null

-- 			select @installed_objects = @installed_objects + 1

-- 		if @id_sysdiagrams is not null

-- 			select @installed_objects = @installed_objects + 2

-- 		if @id_helpdiagrams is not null

-- 			select @installed_objects = @installed_objects + 4

-- 		if @id_helpdiagramdefinition is not null

-- 			select @installed_objects = @installed_objects + 8

-- 		if @id_creatediagram is not null

-- 			select @installed_objects = @installed_objects + 16

-- 		if @id_renamediagram is not null

-- 			select @installed_objects = @installed_objects + 32

-- 		if @id_alterdiagram  is not null

-- 			select @installed_objects = @installed_objects + 64

-- 		if @id_dropdiagram is not null

-- 			select @installed_objects = @installed_objects + 128

-- 		

-- 		return @installed_objects 

-- 	end

-- 	$$
-- 
-- delimiter ;
-- set foreign_key_checks = 1;;
