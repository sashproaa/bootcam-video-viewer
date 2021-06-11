--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3 (Debian 13.3-1.pgdg100+1)
-- Dumped by pg_dump version 13.3 (Debian 13.3-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account_emailaddress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_emailaddress (
    id integer NOT NULL,
    email character varying(254) NOT NULL,
    verified boolean NOT NULL,
    "primary" boolean NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.account_emailaddress OWNER TO postgres;

--
-- Name: account_emailaddress_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_emailaddress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_emailaddress_id_seq OWNER TO postgres;

--
-- Name: account_emailaddress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_emailaddress_id_seq OWNED BY public.account_emailaddress.id;


--
-- Name: account_emailconfirmation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_emailconfirmation (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    sent timestamp with time zone,
    key character varying(64) NOT NULL,
    email_address_id integer NOT NULL
);


ALTER TABLE public.account_emailconfirmation OWNER TO postgres;

--
-- Name: account_emailconfirmation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_emailconfirmation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_emailconfirmation_id_seq OWNER TO postgres;

--
-- Name: account_emailconfirmation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_emailconfirmation_id_seq OWNED BY public.account_emailconfirmation.id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: authtoken_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authtoken_token (
    key character varying(40) NOT NULL,
    created timestamp with time zone NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.authtoken_token OWNER TO postgres;

--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: django_site; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_site (
    id integer NOT NULL,
    domain character varying(100) NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.django_site OWNER TO postgres;

--
-- Name: django_site_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_site_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_site_id_seq OWNER TO postgres;

--
-- Name: django_site_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_site_id_seq OWNED BY public.django_site.id;


--
-- Name: easyviewer_adminproject; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.easyviewer_adminproject (
    id integer NOT NULL,
    "isAdmin" boolean NOT NULL,
    id_project_id integer NOT NULL,
    id_user_id integer
);


ALTER TABLE public.easyviewer_adminproject OWNER TO postgres;

--
-- Name: easyviewer_adminproject_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.easyviewer_adminproject_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.easyviewer_adminproject_id_seq OWNER TO postgres;

--
-- Name: easyviewer_adminproject_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.easyviewer_adminproject_id_seq OWNED BY public.easyviewer_adminproject.id;


--
-- Name: easyviewer_projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.easyviewer_projects (
    id integer NOT NULL,
    hash character varying(200) NOT NULL,
    name character varying(400) NOT NULL,
    subscription_id_id integer NOT NULL
);


ALTER TABLE public.easyviewer_projects OWNER TO postgres;

--
-- Name: easyviewer_projects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.easyviewer_projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.easyviewer_projects_id_seq OWNER TO postgres;

--
-- Name: easyviewer_projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.easyviewer_projects_id_seq OWNED BY public.easyviewer_projects.id;


--
-- Name: easyviewer_projectsubscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.easyviewer_projectsubscriptions (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    description text NOT NULL,
    disk_size integer NOT NULL,
    fee double precision NOT NULL,
    price numeric(6,2) NOT NULL,
    duration interval NOT NULL,
    CONSTRAINT easyviewer_projectsubscriptions_disk_size_check CHECK ((disk_size >= 0))
);


ALTER TABLE public.easyviewer_projectsubscriptions OWNER TO postgres;

--
-- Name: easyviewer_projectsubscriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.easyviewer_projectsubscriptions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.easyviewer_projectsubscriptions_id_seq OWNER TO postgres;

--
-- Name: easyviewer_projectsubscriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.easyviewer_projectsubscriptions_id_seq OWNED BY public.easyviewer_projectsubscriptions.id;


--
-- Name: easyviewer_transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.easyviewer_transactions (
    id integer NOT NULL,
    hash character varying(200) NOT NULL,
    title character varying(200) NOT NULL,
    status character varying(200) NOT NULL,
    price numeric(6,2) NOT NULL,
    json_description jsonb NOT NULL,
    created_at timestamp with time zone NOT NULL,
    project_id_id integer NOT NULL,
    user_id_id integer NOT NULL
);


ALTER TABLE public.easyviewer_transactions OWNER TO postgres;

--
-- Name: easyviewer_transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.easyviewer_transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.easyviewer_transactions_id_seq OWNER TO postgres;

--
-- Name: easyviewer_transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.easyviewer_transactions_id_seq OWNED BY public.easyviewer_transactions.id;


--
-- Name: easyviewer_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.easyviewer_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(150) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    email character varying(254) NOT NULL,
    mobile character varying(128),
    date_of_birth date,
    gender character varying(10)
);


ALTER TABLE public.easyviewer_user OWNER TO postgres;

--
-- Name: easyviewer_user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.easyviewer_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.easyviewer_user_groups OWNER TO postgres;

--
-- Name: easyviewer_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.easyviewer_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.easyviewer_user_groups_id_seq OWNER TO postgres;

--
-- Name: easyviewer_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.easyviewer_user_groups_id_seq OWNED BY public.easyviewer_user_groups.id;


--
-- Name: easyviewer_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.easyviewer_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.easyviewer_user_id_seq OWNER TO postgres;

--
-- Name: easyviewer_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.easyviewer_user_id_seq OWNED BY public.easyviewer_user.id;


--
-- Name: easyviewer_user_user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.easyviewer_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.easyviewer_user_user_permissions OWNER TO postgres;

--
-- Name: easyviewer_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.easyviewer_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.easyviewer_user_user_permissions_id_seq OWNER TO postgres;

--
-- Name: easyviewer_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.easyviewer_user_user_permissions_id_seq OWNED BY public.easyviewer_user_user_permissions.id;


--
-- Name: easyviewer_video; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.easyviewer_video (
    id integer NOT NULL,
    title character varying(200) NOT NULL,
    description text NOT NULL,
    meta character varying(500) NOT NULL,
    genre character varying(133) NOT NULL,
    actors character varying(400) NOT NULL,
    price numeric(6,2) NOT NULL,
    created_at date NOT NULL,
    duration interval NOT NULL,
    image character varying(100),
    preview_video character varying(100),
    url character varying(400),
    project_id_id integer NOT NULL
);


ALTER TABLE public.easyviewer_video OWNER TO postgres;

--
-- Name: easyviewer_video_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.easyviewer_video_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.easyviewer_video_id_seq OWNER TO postgres;

--
-- Name: easyviewer_video_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.easyviewer_video_id_seq OWNED BY public.easyviewer_video.id;


--
-- Name: easyviewer_video_subscription; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.easyviewer_video_subscription (
    id integer NOT NULL,
    video_id integer NOT NULL,
    videosubscriptions_id integer NOT NULL
);


ALTER TABLE public.easyviewer_video_subscription OWNER TO postgres;

--
-- Name: easyviewer_video_subscription_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.easyviewer_video_subscription_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.easyviewer_video_subscription_id_seq OWNER TO postgres;

--
-- Name: easyviewer_video_subscription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.easyviewer_video_subscription_id_seq OWNED BY public.easyviewer_video_subscription.id;


--
-- Name: easyviewer_videocontent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.easyviewer_videocontent (
    id integer NOT NULL,
    data_start timestamp with time zone NOT NULL,
    data_end timestamp with time zone NOT NULL,
    user_id_id integer NOT NULL,
    video_id_id integer NOT NULL,
    video_subscription_id integer NOT NULL
);


ALTER TABLE public.easyviewer_videocontent OWNER TO postgres;

--
-- Name: easyviewer_videocontent_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.easyviewer_videocontent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.easyviewer_videocontent_id_seq OWNER TO postgres;

--
-- Name: easyviewer_videocontent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.easyviewer_videocontent_id_seq OWNED BY public.easyviewer_videocontent.id;


--
-- Name: easyviewer_videosubscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.easyviewer_videosubscriptions (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    description text NOT NULL,
    duration interval NOT NULL,
    price numeric(6,2) NOT NULL,
    project_id_id integer NOT NULL
);


ALTER TABLE public.easyviewer_videosubscriptions OWNER TO postgres;

--
-- Name: easyviewer_videosubscriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.easyviewer_videosubscriptions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.easyviewer_videosubscriptions_id_seq OWNER TO postgres;

--
-- Name: easyviewer_videosubscriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.easyviewer_videosubscriptions_id_seq OWNED BY public.easyviewer_videosubscriptions.id;


--
-- Name: socialaccount_socialaccount; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.socialaccount_socialaccount (
    id integer NOT NULL,
    provider character varying(30) NOT NULL,
    uid character varying(191) NOT NULL,
    last_login timestamp with time zone NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    extra_data text NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.socialaccount_socialaccount OWNER TO postgres;

--
-- Name: socialaccount_socialaccount_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.socialaccount_socialaccount_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.socialaccount_socialaccount_id_seq OWNER TO postgres;

--
-- Name: socialaccount_socialaccount_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.socialaccount_socialaccount_id_seq OWNED BY public.socialaccount_socialaccount.id;


--
-- Name: socialaccount_socialapp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.socialaccount_socialapp (
    id integer NOT NULL,
    provider character varying(30) NOT NULL,
    name character varying(40) NOT NULL,
    client_id character varying(191) NOT NULL,
    secret character varying(191) NOT NULL,
    key character varying(191) NOT NULL
);


ALTER TABLE public.socialaccount_socialapp OWNER TO postgres;

--
-- Name: socialaccount_socialapp_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.socialaccount_socialapp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.socialaccount_socialapp_id_seq OWNER TO postgres;

--
-- Name: socialaccount_socialapp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.socialaccount_socialapp_id_seq OWNED BY public.socialaccount_socialapp.id;


--
-- Name: socialaccount_socialapp_sites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.socialaccount_socialapp_sites (
    id integer NOT NULL,
    socialapp_id integer NOT NULL,
    site_id integer NOT NULL
);


ALTER TABLE public.socialaccount_socialapp_sites OWNER TO postgres;

--
-- Name: socialaccount_socialapp_sites_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.socialaccount_socialapp_sites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.socialaccount_socialapp_sites_id_seq OWNER TO postgres;

--
-- Name: socialaccount_socialapp_sites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.socialaccount_socialapp_sites_id_seq OWNED BY public.socialaccount_socialapp_sites.id;


--
-- Name: socialaccount_socialtoken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.socialaccount_socialtoken (
    id integer NOT NULL,
    token text NOT NULL,
    token_secret text NOT NULL,
    expires_at timestamp with time zone,
    account_id integer NOT NULL,
    app_id integer NOT NULL
);


ALTER TABLE public.socialaccount_socialtoken OWNER TO postgres;

--
-- Name: socialaccount_socialtoken_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.socialaccount_socialtoken_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.socialaccount_socialtoken_id_seq OWNER TO postgres;

--
-- Name: socialaccount_socialtoken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.socialaccount_socialtoken_id_seq OWNED BY public.socialaccount_socialtoken.id;


--
-- Name: account_emailaddress id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_emailaddress ALTER COLUMN id SET DEFAULT nextval('public.account_emailaddress_id_seq'::regclass);


--
-- Name: account_emailconfirmation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_emailconfirmation ALTER COLUMN id SET DEFAULT nextval('public.account_emailconfirmation_id_seq'::regclass);


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: django_site id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_site ALTER COLUMN id SET DEFAULT nextval('public.django_site_id_seq'::regclass);


--
-- Name: easyviewer_adminproject id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_adminproject ALTER COLUMN id SET DEFAULT nextval('public.easyviewer_adminproject_id_seq'::regclass);


--
-- Name: easyviewer_projects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_projects ALTER COLUMN id SET DEFAULT nextval('public.easyviewer_projects_id_seq'::regclass);


--
-- Name: easyviewer_projectsubscriptions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_projectsubscriptions ALTER COLUMN id SET DEFAULT nextval('public.easyviewer_projectsubscriptions_id_seq'::regclass);


--
-- Name: easyviewer_transactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_transactions ALTER COLUMN id SET DEFAULT nextval('public.easyviewer_transactions_id_seq'::regclass);


--
-- Name: easyviewer_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_user ALTER COLUMN id SET DEFAULT nextval('public.easyviewer_user_id_seq'::regclass);


--
-- Name: easyviewer_user_groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_user_groups ALTER COLUMN id SET DEFAULT nextval('public.easyviewer_user_groups_id_seq'::regclass);


--
-- Name: easyviewer_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.easyviewer_user_user_permissions_id_seq'::regclass);


--
-- Name: easyviewer_video id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_video ALTER COLUMN id SET DEFAULT nextval('public.easyviewer_video_id_seq'::regclass);


--
-- Name: easyviewer_video_subscription id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_video_subscription ALTER COLUMN id SET DEFAULT nextval('public.easyviewer_video_subscription_id_seq'::regclass);


--
-- Name: easyviewer_videocontent id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_videocontent ALTER COLUMN id SET DEFAULT nextval('public.easyviewer_videocontent_id_seq'::regclass);


--
-- Name: easyviewer_videosubscriptions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_videosubscriptions ALTER COLUMN id SET DEFAULT nextval('public.easyviewer_videosubscriptions_id_seq'::regclass);


--
-- Name: socialaccount_socialaccount id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socialaccount_socialaccount ALTER COLUMN id SET DEFAULT nextval('public.socialaccount_socialaccount_id_seq'::regclass);


--
-- Name: socialaccount_socialapp id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socialaccount_socialapp ALTER COLUMN id SET DEFAULT nextval('public.socialaccount_socialapp_id_seq'::regclass);


--
-- Name: socialaccount_socialapp_sites id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socialaccount_socialapp_sites ALTER COLUMN id SET DEFAULT nextval('public.socialaccount_socialapp_sites_id_seq'::regclass);


--
-- Name: socialaccount_socialtoken id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socialaccount_socialtoken ALTER COLUMN id SET DEFAULT nextval('public.socialaccount_socialtoken_id_seq'::regclass);


--
-- Data for Name: account_emailaddress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account_emailaddress (id, email, verified, "primary", user_id) FROM stdin;
1	user@gmail.com	f	t	2
2	user1@gmail.com	f	t	3
\.


--
-- Data for Name: account_emailconfirmation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account_emailconfirmation (id, created, sent, key, email_address_id) FROM stdin;
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add session	5	add_session
18	Can change session	5	change_session
19	Can delete session	5	delete_session
20	Can view session	5	view_session
21	Can add Token	6	add_token
22	Can change Token	6	change_token
23	Can delete Token	6	delete_token
24	Can view Token	6	view_token
25	Can add token	7	add_tokenproxy
26	Can change token	7	change_tokenproxy
27	Can delete token	7	delete_tokenproxy
28	Can view token	7	view_tokenproxy
29	Can add site	8	add_site
30	Can change site	8	change_site
31	Can delete site	8	delete_site
32	Can view site	8	view_site
33	Can add email address	9	add_emailaddress
34	Can change email address	9	change_emailaddress
35	Can delete email address	9	delete_emailaddress
36	Can view email address	9	view_emailaddress
37	Can add email confirmation	10	add_emailconfirmation
38	Can change email confirmation	10	change_emailconfirmation
39	Can delete email confirmation	10	delete_emailconfirmation
40	Can view email confirmation	10	view_emailconfirmation
41	Can add social account	11	add_socialaccount
42	Can change social account	11	change_socialaccount
43	Can delete social account	11	delete_socialaccount
44	Can view social account	11	view_socialaccount
45	Can add social application	12	add_socialapp
46	Can change social application	12	change_socialapp
47	Can delete social application	12	delete_socialapp
48	Can view social application	12	view_socialapp
49	Can add social application token	13	add_socialtoken
50	Can change social application token	13	change_socialtoken
51	Can delete social application token	13	delete_socialtoken
52	Can view social application token	13	view_socialtoken
53	Can add user	14	add_user
54	Can change user	14	change_user
55	Can delete user	14	delete_user
56	Can view user	14	view_user
57	Can add admin project	15	add_adminproject
58	Can change admin project	15	change_adminproject
59	Can delete admin project	15	delete_adminproject
60	Can view admin project	15	view_adminproject
61	Can add projects	16	add_projects
62	Can change projects	16	change_projects
63	Can delete projects	16	delete_projects
64	Can view projects	16	view_projects
65	Can add project subscriptions	17	add_projectsubscriptions
66	Can change project subscriptions	17	change_projectsubscriptions
67	Can delete project subscriptions	17	delete_projectsubscriptions
68	Can view project subscriptions	17	view_projectsubscriptions
69	Can add video	18	add_video
70	Can change video	18	change_video
71	Can delete video	18	delete_video
72	Can view video	18	view_video
73	Can add video subscriptions	19	add_videosubscriptions
74	Can change video subscriptions	19	change_videosubscriptions
75	Can delete video subscriptions	19	delete_videosubscriptions
76	Can view video subscriptions	19	view_videosubscriptions
77	Can add video content	20	add_videocontent
78	Can change video content	20	change_videocontent
79	Can delete video content	20	delete_videocontent
80	Can view video content	20	view_videocontent
81	Can add transactions	21	add_transactions
82	Can change transactions	21	change_transactions
83	Can delete transactions	21	delete_transactions
84	Can view transactions	21	view_transactions
\.


--
-- Data for Name: authtoken_token; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.authtoken_token (key, created, user_id) FROM stdin;
1e9ab3941bb8a3b6d626517ddcf365d3a7e5e131	2021-05-18 17:46:27.310666+00	2
04e24b526eb09cc65431b22b7f7a620cb0644309	2021-05-18 17:57:25.683304+00	3
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2021-05-18 17:41:24.035325+00	1	ProjectSubscriptions object (1)	1	[{"added": {}}]	17	1
2	2021-05-18 17:41:42.187975+00	1	Projects object (1)	1	[{"added": {}}]	16	1
3	2021-05-18 17:43:15.096129+00	1	VideoSubscriptions object (1)	1	[{"added": {}}]	19	1
4	2021-05-18 17:43:55.94329+00	2	VideoSubscriptions object (2)	1	[{"added": {}}]	19	1
5	2021-05-18 17:44:19.605191+00	3	VideoSubscriptions object (3)	1	[{"added": {}}]	19	1
6	2021-05-19 17:44:37.900982+00	1	Video object (1)	1	[{"added": {}}]	18	1
7	2021-05-19 17:45:18.500597+00	1	Video object (1)	2	[{"changed": {"fields": ["title", "description"]}}]	18	1
8	2021-05-19 17:50:02.702189+00	2	Video object (2)	1	[{"added": {}}]	18	1
9	2021-05-21 21:40:47.199089+00	3	Video object (3)	1	[{"added": {}}]	18	1
10	2021-05-21 21:45:46.415048+00	1	Video object (1)	2	[{"changed": {"fields": ["title", "description", "genre", "actors", "price", "duration", "subscription"]}}]	18	1
11	2021-05-21 21:46:45.246992+00	1	Video object (1)	2	[{"changed": {"fields": ["created_at"]}}]	18	1
12	2021-05-21 21:51:26.081964+00	2	Video object (2)	2	[{"changed": {"fields": ["title", "description", "genre", "actors", "price", "created_at", "duration"]}}]	18	1
13	2021-05-21 21:55:21.719597+00	4	Video object (4)	1	[{"added": {}}]	18	1
14	2021-05-21 21:55:49.751306+00	3	Video object (3)	2	[{"changed": {"fields": ["subscription"]}}]	18	1
15	2021-05-21 21:56:24.344553+00	1	Video object (1)	2	[{"changed": {"fields": ["subscription"]}}]	18	1
16	2021-05-21 22:03:05.824425+00	5	Video object (5)	1	[{"added": {}}]	18	1
17	2021-05-21 22:05:57.811093+00	6	Video object (6)	1	[{"added": {}}]	18	1
18	2021-05-21 22:09:48.34277+00	7	Video object (7)	1	[{"added": {}}]	18	1
19	2021-05-21 22:15:06.17373+00	8	Video object (8)	1	[{"added": {}}]	18	1
20	2021-05-21 22:18:41.718358+00	9	Video object (9)	1	[{"added": {}}]	18	1
21	2021-05-21 22:20:54.213207+00	10	Video object (10)	1	[{"added": {}}]	18	1
22	2021-05-27 07:03:49.874857+00	1	Печальный спектакль	2	[{"changed": {"fields": ["image"]}}]	18	1
23	2021-05-27 07:04:05.342948+00	2	Я... ОНА не Я и Я	2	[{"changed": {"fields": ["image"]}}]	18	1
24	2021-05-27 07:04:24.199223+00	3	Ужин с дураком	2	[{"changed": {"fields": ["image"]}}]	18	1
25	2021-05-27 07:04:40.455239+00	4	NOVECENTO	2	[{"changed": {"fields": ["image"]}}]	18	1
26	2021-05-27 07:04:52.393594+00	5	Чмо	2	[{"changed": {"fields": ["image"]}}]	18	1
27	2021-05-27 07:05:06.748802+00	6	Ищу работу	2	[{"changed": {"fields": ["image"]}}]	18	1
28	2021-05-27 07:05:23.891266+00	7	Украденное счастье	2	[{"changed": {"fields": ["image"]}}]	18	1
29	2021-05-27 07:08:56.211396+00	8	Оркестр	2	[{"changed": {"fields": ["image"]}}]	18	1
30	2021-05-27 07:09:06.930714+00	9	Зайцы повсюду!	2	[{"changed": {"fields": ["image"]}}]	18	1
31	2021-05-27 07:09:22.741775+00	10	Начать сначала	2	[{"changed": {"fields": ["image"]}}]	18	1
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	contenttypes	contenttype
5	sessions	session
6	authtoken	token
7	authtoken	tokenproxy
8	sites	site
9	account	emailaddress
10	account	emailconfirmation
11	socialaccount	socialaccount
12	socialaccount	socialapp
13	socialaccount	socialtoken
14	easyviewer	user
15	easyviewer	adminproject
16	easyviewer	projects
17	easyviewer	projectsubscriptions
18	easyviewer	video
19	easyviewer	videosubscriptions
20	easyviewer	videocontent
21	easyviewer	transactions
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2021-05-18 17:10:41.488674+00
2	contenttypes	0002_remove_content_type_name	2021-05-18 17:10:41.518417+00
3	auth	0001_initial	2021-05-18 17:10:41.541547+00
4	auth	0002_alter_permission_name_max_length	2021-05-18 17:10:41.559591+00
5	auth	0003_alter_user_email_max_length	2021-05-18 17:10:41.564793+00
6	auth	0004_alter_user_username_opts	2021-05-18 17:10:41.569905+00
7	auth	0005_alter_user_last_login_null	2021-05-18 17:10:41.574905+00
8	auth	0006_require_contenttypes_0002	2021-05-18 17:10:41.576546+00
9	auth	0007_alter_validators_add_error_messages	2021-05-18 17:10:41.581373+00
10	auth	0008_alter_user_username_max_length	2021-05-18 17:10:41.586996+00
11	auth	0009_alter_user_last_name_max_length	2021-05-18 17:10:41.591671+00
12	auth	0010_alter_group_name_max_length	2021-05-18 17:10:41.5965+00
13	auth	0011_update_proxy_permissions	2021-05-18 17:10:41.602287+00
14	easyviewer	0001_initial	2021-05-18 17:10:41.753055+00
15	account	0001_initial	2021-05-18 17:10:41.820538+00
16	account	0002_email_max_length	2021-05-18 17:10:41.839273+00
17	admin	0001_initial	2021-05-18 17:10:41.857836+00
18	admin	0002_logentry_remove_auto_add	2021-05-18 17:10:41.872302+00
19	admin	0003_logentry_add_action_flag_choices	2021-05-18 17:10:41.882192+00
20	authtoken	0001_initial	2021-05-18 17:10:41.897061+00
21	authtoken	0002_auto_20160226_1747	2021-05-18 17:10:41.967557+00
22	authtoken	0003_tokenproxy	2021-05-18 17:10:41.970426+00
23	sessions	0001_initial	2021-05-18 17:10:41.975482+00
24	sites	0001_initial	2021-05-18 17:10:41.982423+00
25	sites	0002_alter_domain_unique	2021-05-18 17:10:41.98793+00
26	socialaccount	0001_initial	2021-05-18 17:10:42.04111+00
27	socialaccount	0002_token_max_lengths	2021-05-18 17:10:42.072595+00
28	socialaccount	0003_extra_data_default_dict	2021-05-18 17:10:42.07941+00
29	socialaccount	0004_auto_20210518_1710	2021-05-18 17:10:42.088882+00
30	easyviewer	0002_auto_20210518_1724	2021-05-18 17:24:40.768268+00
31	easyviewer	0003_auto_20210518_1756	2021-05-18 17:56:53.109087+00
32	easyviewer	0002_auto_20210519_1743	2021-05-19 17:43:40.575743+00
33	socialaccount	0004_auto_20210519_1743	2021-05-19 17:43:40.602873+00
34	socialaccount	0004_auto_20210521_2035	2021-05-21 20:36:00.165026+00
35	socialaccount	0004_auto_20210527_0653	2021-05-27 06:53:56.544011+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
58r9c2yqm9pdst6mfivxez0bgpn8qnkl	MDgwZWY4OTcyMWUwNDdhMThiY2MxOGUyYzBmMWZiM2JlZjIxNmRhODp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiYWxsYXV0aC5hY2NvdW50LmF1dGhfYmFja2VuZHMuQXV0aGVudGljYXRpb25CYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiNjgyNDhlZTRlODM3M2FmY2UzMjhkMjk4MzgwMjBkYzRiNTdkMzc4NSJ9	2021-06-01 18:06:02.144141+00
vv6o3pjhk64d61wtucxohoxdiswg4kw6	MDgwZWY4OTcyMWUwNDdhMThiY2MxOGUyYzBmMWZiM2JlZjIxNmRhODp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiYWxsYXV0aC5hY2NvdW50LmF1dGhfYmFja2VuZHMuQXV0aGVudGljYXRpb25CYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiNjgyNDhlZTRlODM3M2FmY2UzMjhkMjk4MzgwMjBkYzRiNTdkMzc4NSJ9	2021-06-02 17:43:55.148123+00
sk17egkyfgzx2do977tgtr9f40031tc5	MDgwZWY4OTcyMWUwNDdhMThiY2MxOGUyYzBmMWZiM2JlZjIxNmRhODp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiYWxsYXV0aC5hY2NvdW50LmF1dGhfYmFja2VuZHMuQXV0aGVudGljYXRpb25CYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiNjgyNDhlZTRlODM3M2FmY2UzMjhkMjk4MzgwMjBkYzRiNTdkMzc4NSJ9	2021-06-04 20:47:41.304511+00
\.


--
-- Data for Name: django_site; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_site (id, domain, name) FROM stdin;
1	example.com	example.com
\.


--
-- Data for Name: easyviewer_adminproject; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.easyviewer_adminproject (id, "isAdmin", id_project_id, id_user_id) FROM stdin;
\.


--
-- Data for Name: easyviewer_projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.easyviewer_projects (id, hash, name, subscription_id_id) FROM stdin;
1	4WwUyKfu3zTNrxg_jFXjAoP8ZLA6Op3zO6a02qb42YE	MDT	1
\.


--
-- Data for Name: easyviewer_projectsubscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.easyviewer_projectsubscriptions (id, name, description, disk_size, fee, price, duration) FROM stdin;
1	Base	Base	5000	0.01	5.00	00:00:30
\.


--
-- Data for Name: easyviewer_transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.easyviewer_transactions (id, hash, title, status, price, json_description, created_at, project_id_id, user_id_id) FROM stdin;
\.


--
-- Data for Name: easyviewer_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.easyviewer_user (id, password, last_login, is_superuser, first_name, last_name, is_staff, is_active, date_joined, email, mobile, date_of_birth, gender) FROM stdin;
3	pbkdf2_sha256$150000$2ZdAtGij4foU$r4Xe51+F88brbrcnNfYdLMwvR2SkEd9BWsubWoW9or4=	2021-05-18 17:57:25.687033+00	f			f	t	2021-05-18 17:57:25.591874+00	user1@gmail.com	\N	\N	\N
2	pbkdf2_sha256$150000$L8bRvOLMJBx4$nEsWMJsoScPrLaCJ81aCyX3v4FiBrpgb669Fchc4I0o=	2021-05-18 18:01:43.337213+00	f			f	t	2021-05-18 17:46:27.218217+00	user@gmail.com	\N	\N	\N
1	pbkdf2_sha256$150000$idNSKrOTSJM1$AWgKrVvCN24MlF5fQX7Vi73uxaX332vRnBBMKKvaLfA=	2021-05-21 20:47:41.287224+00	t			t	t	2021-05-18 17:15:46.359136+00	admin@gmail.com	\N	\N	\N
\.


--
-- Data for Name: easyviewer_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.easyviewer_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: easyviewer_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.easyviewer_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: easyviewer_video; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.easyviewer_video (id, title, description, meta, genre, actors, price, created_at, duration, image, preview_video, url, project_id_id) FROM stdin;
1	Печальный спектакль	Спектакль, который вам нужно увидеть.\r\n\r\nУспешно играющий по всей Украине спектакль "Ужин с дураком" актер и режиссер Алексей Райт создал проект Страсти по Идиоту, а также ранее осуществил постановку спектаклей: "Дракон", "Ужин с дураком", "Монолог ангела или Е.Ж.", "Печальный спектакль", "Падший ангел", "Новеченто", "Однорукий из Спокана", "Сиротливый запад" и др. спектакли идут на малой сцене Дворца студентов юридического университета.		DRAMA,MELODRAMA	Анастасия Колесникова	120.00	2021-05-22	02:00:00	uploads/image/block-1_rC8nMZJ.jpg		\N	1
2	Я... ОНА не Я и Я	Я не знаю, как вам описать то, что будет происходить...\r\n\r\nя не уверен, что это описание будет о спектакле ...\r\n\r\nя не знаю, имеет ли вообще это, какое отношение к театру…\r\n\r\nя даже не знаю, если я вам расскажу, о чем спектакль придете ли вы на него... Этот текст, текст надежды... Я попытаюсь вам все рассказать, что бы вы пришли, потому что без вас ничего не получиться.\r\n\r\nЭто план побега. Я пытаюсь найти упражнения, что бы вернуть своему телу и своей душе красоту, что бы Гении-Божества снова обратили на меня внимание.		DRAMA,COMEDY,TRAGEDY	Алексей Райт	190.00	2021-05-22	02:10:00	uploads/image/block-2.jpg		\N	1
3	Ужин с дураком	В этот вечер Вы узнаете, что такое настоящая французская комедия. Эта феноменальная история… Представьте, что сегодня у вас традиционный ужин с друзьями, обязательным условием которого является необходимость привести с собой … дурака! Дурак, естественно, не должен ни о чем догадаться. Суть такой шутки в том, чтобы развязать необычному гостю язык. Тот из участников ужина, кто приведет «лучшего» дурака – победитель!		COMEDY	Алексей Райт, Богдан Адаменко, Сергей Анипченко, Лара Читака, Елизавета Любимова, Евгений Шинкарев, Геннадий Выпинашко	150.00	2021-05-21	02:30:00	uploads/image/block-3.jpg		\N	1
4	NOVECENTO	История о пианисте — это целая эпоха, впитавшая в себя множество историй, множество людей.\r\nЧеловек, который видел сушу только с корабля, непонятным образом научившийся виртуозно играть на пианино,  он впитал в себя эту эпоху.		DRAMA,TRAGEDY	Андрей Пятаха	210.00	2021-05-22	01:50:00	uploads/image/block-4.jpg		\N	1
6	Ищу работу	Cпектакль по пьесе Жорди Гальсерана. Групповое собеседование в 1 действии.\r\n\r\nДобро пожаловать в мир корпоративных манипуляций, предательств и лицемерия. Устраивайтесь поудобнее - специалисты по отбору персонала тайно анализируют каждый Ваш шаг. Современный офис крупной корпорации. Четыре кандидата пришли сюда на собеседование, каждый рассчитывает занять вакантное место топ-менеджера, каждый уверен, что с ним будут проводить индивидуальное собеседование. Но общаться четверым кандидатам приходится только друг с другом, следуя воле невидимых экзаменаторов и выполняя их абсурдные задания, психологические тесты и проверки. Впрочем, постепенно выясняется, что не все четверо — кандидаты…		MORALITY,PARODY,SOTI,Extravaganza	Евгения Белова/ Наталья Иванская (Мерседес), Олег Дидык (Фернандо), Сергей Листунов (Энрике), Юрий Николаенко (Карлос)	185.00	2021-05-21	01:45:00	uploads/image/block-6.jpg		\N	1
5	Чмо	ЧМО - «человек малообразованный», «человек мешающий обществу», «человек морально отсталый», «человек морально опущенный», «чемпион московской области», «чемпион московской олимпиады», «чрезвычайно мобильный организм», «человек материально обеспеченный», «чрезвычайно малогабаритный объект» (фольклорн.).\r\n\r\nЧМО - человек морально опустившийся (аббревиатура, употреблявшаяся работниками исправительных учреждений).\r\n\r\nОднажды в подсобном хозяйстве одного воинского подразделения, где сержант Хрустяшин по прозвищу Хруст выращивает свиней, появляется "пополнение": вчерашний студент из-под Питера Андрей Новиков, играющий на скрипке и верящий в Бога...\r\n\r\nЭто пронзительная и трогательная, одновременно смешная и грустная история о дружбе, совести и страхе, подлости и благородстве. Этот спектакль не об армии, он - о жизни. Свиньи людей - или люди свиней: кто кого?.. И еще наш спектакль пытается дать ответ на вопрос: так что же такое ЧМО?		MIME,MONODRAMA,PASTORAL,FARCE	Сергей Савлук / Максим Стерлик (Хрустяшин (Хруст), Юрий Николаенко (Новиков), Олег Дидык (Бес), Сергей Листунов (Алтынов), Наталья Иванская (Анна), Евгения Белова (Катя)	159.99	2021-05-21	02:35:00	uploads/image/block-5.jpg		\N	1
7	Украденное счастье	Конфликт в спектакле - в одном противостоянии между чисто житейскими установками и законами, которые отражают непреложную гармонию Вселенной.\r\n\r\nНа фоне быта бойков, населяющих украинские Карпаты, вырисовываются судьбы героев в так называемом любовном треугольнике.\r\n\r\nАвторы спектакля отстранились от социальной направленности пьесы и тем самым приблизили зрителей к душевной катастрофе Анны, ее нелюбимого мужа Николая и издавна влюбленного в нее Михаила.\r\n\r\nКаждый из них борется за свое человеческое право на любовь.Но неумолимый Бог Карпат Мольфар - персонаж, введенный в спектакль режиссером, - жестоко наказывает всех троих.\r\n\r\nМастерски разработанные массовые сцены спектакля (ритуальные, танцевальные, песенные) дают представление о быте бойков позапрошлого века.		DRAMA,MELODRAMA,TRAGEDY	А Жиляков, Р. Жиров, М. Козюлина, А. Шпилевой, Ю. Забутная.	210.00	2021-05-22	02:15:00	uploads/image/block-7.jpg		\N	1
8	Оркестр	Если Вы мечтаете о Париже, считайте, что Ваши сокровенные желания осуществились. Стоит только посетить спектакль «Оркестр» на малой сцене театра. В уютном кафе Вас ждут «сюрпризы» от эксцентричных персонажей этого действа. Ануив оркестр - женский ...		MIME,MONODRAMA,MORALITY,SOTI,TRAGICOMEDY	Александр Гричаный, Юлия Шаршонь, Игорь Гайденко, Алексей Серегин	115.00	2021-05-21	01:45:00	uploads/image/block-8.jpg		\N	1
9	Зайцы повсюду!	Куда пойти с ребенком, чтобы было интересно и ему, и родителям? Новое шоу-представление "Зайцы повсюду!" театра "Стрекоза" ни за что не оставит никого равнодушными. Ведь дети всех возрастов смогут и поиграть, и увидеть необыкновенные перевоплощения! В нашем интерактивном иллюзионном игровом представлении каждый ребенок сможет принять участие. А какое животное может быть милее, чем кролик? А если они появляются в самый неожиданный момент? Разных размеров, цветов, из ниоткуда, везде!		COMEDY,MIME,MUSICAL,PARODY	Олег Русов, Игорь Ладенко	290.00	2021-05-22	01:55:00	uploads/image/block-9.jpg		\N	1
10	Начать сначала	Герои без имен и фамилий, без географических координат и временных рамок. Они видели спасение и будущее в загранице, но стали заложниками самих себя – вечные гости. Одиночество - главный спутник героев на протяжении всей постановки. Дружба этих людей - абсолютно непохожих – не могла бы родиться в другой ситуации. Они – это единственное, что есть друг у друга настоящего.\r\n\r\nСобытия происходят в новогоднюю ночь – весь мир застыл в ожидании чего-то нового. Под влиянием момента герои пьесы решаются на отчаянные поступки ради своего освобождения, ведь это ли не время, чтобы начать все сначала?		MYSTERY,PARODY,PASTORAL,SOTI	Николай Михальченко, Богдан Синявский	250.00	2021-05-21	02:15:00	uploads/image/block-10.jpg		\N	1
\.


--
-- Data for Name: easyviewer_video_subscription; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.easyviewer_video_subscription (id, video_id, videosubscriptions_id) FROM stdin;
1	1	1
4	2	1
5	2	2
6	2	3
7	3	3
8	4	1
9	4	2
10	4	3
11	3	1
12	3	2
13	1	2
14	1	3
15	5	1
16	5	2
17	5	3
18	6	1
19	6	2
20	6	3
21	7	1
22	7	2
23	7	3
24	8	1
25	8	2
26	8	3
27	9	1
28	9	2
29	9	3
30	10	1
31	10	2
32	10	3
\.


--
-- Data for Name: easyviewer_videocontent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.easyviewer_videocontent (id, data_start, data_end, user_id_id, video_id_id, video_subscription_id) FROM stdin;
\.


--
-- Data for Name: easyviewer_videosubscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.easyviewer_videosubscriptions (id, name, description, duration, price, project_id_id) FROM stdin;
1	Base	Base	00:00:30	5.00	1
2	Friend	Friend	00:03:00	20.00	1
3	Fanat	Fanat	00:06:00	100.00	1
\.


--
-- Data for Name: socialaccount_socialaccount; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.socialaccount_socialaccount (id, provider, uid, last_login, date_joined, extra_data, user_id) FROM stdin;
\.


--
-- Data for Name: socialaccount_socialapp; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.socialaccount_socialapp (id, provider, name, client_id, secret, key) FROM stdin;
\.


--
-- Data for Name: socialaccount_socialapp_sites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.socialaccount_socialapp_sites (id, socialapp_id, site_id) FROM stdin;
\.


--
-- Data for Name: socialaccount_socialtoken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.socialaccount_socialtoken (id, token, token_secret, expires_at, account_id, app_id) FROM stdin;
\.


--
-- Name: account_emailaddress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_emailaddress_id_seq', 2, true);


--
-- Name: account_emailconfirmation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_emailconfirmation_id_seq', 1, false);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 84, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 31, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 21, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 35, true);


--
-- Name: django_site_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_site_id_seq', 1, true);


--
-- Name: easyviewer_adminproject_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.easyviewer_adminproject_id_seq', 1, false);


--
-- Name: easyviewer_projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.easyviewer_projects_id_seq', 1, true);


--
-- Name: easyviewer_projectsubscriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.easyviewer_projectsubscriptions_id_seq', 1, true);


--
-- Name: easyviewer_transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.easyviewer_transactions_id_seq', 1, false);


--
-- Name: easyviewer_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.easyviewer_user_groups_id_seq', 1, false);


--
-- Name: easyviewer_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.easyviewer_user_id_seq', 3, true);


--
-- Name: easyviewer_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.easyviewer_user_user_permissions_id_seq', 1, false);


--
-- Name: easyviewer_video_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.easyviewer_video_id_seq', 10, true);


--
-- Name: easyviewer_video_subscription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.easyviewer_video_subscription_id_seq', 32, true);


--
-- Name: easyviewer_videocontent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.easyviewer_videocontent_id_seq', 1, false);


--
-- Name: easyviewer_videosubscriptions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.easyviewer_videosubscriptions_id_seq', 3, true);


--
-- Name: socialaccount_socialaccount_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.socialaccount_socialaccount_id_seq', 1, false);


--
-- Name: socialaccount_socialapp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.socialaccount_socialapp_id_seq', 1, false);


--
-- Name: socialaccount_socialapp_sites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.socialaccount_socialapp_sites_id_seq', 1, false);


--
-- Name: socialaccount_socialtoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.socialaccount_socialtoken_id_seq', 1, false);


--
-- Name: account_emailaddress account_emailaddress_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_emailaddress
    ADD CONSTRAINT account_emailaddress_email_key UNIQUE (email);


--
-- Name: account_emailaddress account_emailaddress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_emailaddress
    ADD CONSTRAINT account_emailaddress_pkey PRIMARY KEY (id);


--
-- Name: account_emailconfirmation account_emailconfirmation_key_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_emailconfirmation
    ADD CONSTRAINT account_emailconfirmation_key_key UNIQUE (key);


--
-- Name: account_emailconfirmation account_emailconfirmation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_emailconfirmation
    ADD CONSTRAINT account_emailconfirmation_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: authtoken_token authtoken_token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_pkey PRIMARY KEY (key);


--
-- Name: authtoken_token authtoken_token_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_key UNIQUE (user_id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: django_site django_site_domain_a2e37b91_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_site
    ADD CONSTRAINT django_site_domain_a2e37b91_uniq UNIQUE (domain);


--
-- Name: django_site django_site_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_site
    ADD CONSTRAINT django_site_pkey PRIMARY KEY (id);


--
-- Name: easyviewer_adminproject easyviewer_adminproject_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_adminproject
    ADD CONSTRAINT easyviewer_adminproject_pkey PRIMARY KEY (id);


--
-- Name: easyviewer_projects easyviewer_projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_projects
    ADD CONSTRAINT easyviewer_projects_pkey PRIMARY KEY (id);


--
-- Name: easyviewer_projectsubscriptions easyviewer_projectsubscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_projectsubscriptions
    ADD CONSTRAINT easyviewer_projectsubscriptions_pkey PRIMARY KEY (id);


--
-- Name: easyviewer_transactions easyviewer_transactions_hash_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_transactions
    ADD CONSTRAINT easyviewer_transactions_hash_key UNIQUE (hash);


--
-- Name: easyviewer_transactions easyviewer_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_transactions
    ADD CONSTRAINT easyviewer_transactions_pkey PRIMARY KEY (id);


--
-- Name: easyviewer_user easyviewer_user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_user
    ADD CONSTRAINT easyviewer_user_email_key UNIQUE (email);


--
-- Name: easyviewer_user_groups easyviewer_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_user_groups
    ADD CONSTRAINT easyviewer_user_groups_pkey PRIMARY KEY (id);


--
-- Name: easyviewer_user_groups easyviewer_user_groups_user_id_group_id_0abd3205_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_user_groups
    ADD CONSTRAINT easyviewer_user_groups_user_id_group_id_0abd3205_uniq UNIQUE (user_id, group_id);


--
-- Name: easyviewer_user easyviewer_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_user
    ADD CONSTRAINT easyviewer_user_pkey PRIMARY KEY (id);


--
-- Name: easyviewer_user_user_permissions easyviewer_user_user_per_user_id_permission_id_6e57c44f_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_user_user_permissions
    ADD CONSTRAINT easyviewer_user_user_per_user_id_permission_id_6e57c44f_uniq UNIQUE (user_id, permission_id);


--
-- Name: easyviewer_user_user_permissions easyviewer_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_user_user_permissions
    ADD CONSTRAINT easyviewer_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: easyviewer_video easyviewer_video_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_video
    ADD CONSTRAINT easyviewer_video_pkey PRIMARY KEY (id);


--
-- Name: easyviewer_video_subscription easyviewer_video_subscri_video_id_videosubscripti_105dbd7d_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_video_subscription
    ADD CONSTRAINT easyviewer_video_subscri_video_id_videosubscripti_105dbd7d_uniq UNIQUE (video_id, videosubscriptions_id);


--
-- Name: easyviewer_video_subscription easyviewer_video_subscription_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_video_subscription
    ADD CONSTRAINT easyviewer_video_subscription_pkey PRIMARY KEY (id);


--
-- Name: easyviewer_videocontent easyviewer_videocontent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_videocontent
    ADD CONSTRAINT easyviewer_videocontent_pkey PRIMARY KEY (id);


--
-- Name: easyviewer_videosubscriptions easyviewer_videosubscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_videosubscriptions
    ADD CONSTRAINT easyviewer_videosubscriptions_pkey PRIMARY KEY (id);


--
-- Name: socialaccount_socialaccount socialaccount_socialaccount_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socialaccount_socialaccount
    ADD CONSTRAINT socialaccount_socialaccount_pkey PRIMARY KEY (id);


--
-- Name: socialaccount_socialaccount socialaccount_socialaccount_provider_uid_fc810c6e_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socialaccount_socialaccount
    ADD CONSTRAINT socialaccount_socialaccount_provider_uid_fc810c6e_uniq UNIQUE (provider, uid);


--
-- Name: socialaccount_socialapp_sites socialaccount_socialapp__socialapp_id_site_id_71a9a768_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socialaccount_socialapp_sites
    ADD CONSTRAINT socialaccount_socialapp__socialapp_id_site_id_71a9a768_uniq UNIQUE (socialapp_id, site_id);


--
-- Name: socialaccount_socialapp socialaccount_socialapp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socialaccount_socialapp
    ADD CONSTRAINT socialaccount_socialapp_pkey PRIMARY KEY (id);


--
-- Name: socialaccount_socialapp_sites socialaccount_socialapp_sites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socialaccount_socialapp_sites
    ADD CONSTRAINT socialaccount_socialapp_sites_pkey PRIMARY KEY (id);


--
-- Name: socialaccount_socialtoken socialaccount_socialtoken_app_id_account_id_fca4e0ac_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socialaccount_socialtoken
    ADD CONSTRAINT socialaccount_socialtoken_app_id_account_id_fca4e0ac_uniq UNIQUE (app_id, account_id);


--
-- Name: socialaccount_socialtoken socialaccount_socialtoken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socialaccount_socialtoken
    ADD CONSTRAINT socialaccount_socialtoken_pkey PRIMARY KEY (id);


--
-- Name: account_emailaddress_email_03be32b2_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX account_emailaddress_email_03be32b2_like ON public.account_emailaddress USING btree (email varchar_pattern_ops);


--
-- Name: account_emailaddress_user_id_2c513194; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX account_emailaddress_user_id_2c513194 ON public.account_emailaddress USING btree (user_id);


--
-- Name: account_emailconfirmation_email_address_id_5b7f8c58; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX account_emailconfirmation_email_address_id_5b7f8c58 ON public.account_emailconfirmation USING btree (email_address_id);


--
-- Name: account_emailconfirmation_key_f43612bd_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX account_emailconfirmation_key_f43612bd_like ON public.account_emailconfirmation USING btree (key varchar_pattern_ops);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: authtoken_token_key_10f0b77e_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX authtoken_token_key_10f0b77e_like ON public.authtoken_token USING btree (key varchar_pattern_ops);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: django_site_domain_a2e37b91_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_site_domain_a2e37b91_like ON public.django_site USING btree (domain varchar_pattern_ops);


--
-- Name: easyviewer_adminproject_id_project_id_d0a67761; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX easyviewer_adminproject_id_project_id_d0a67761 ON public.easyviewer_adminproject USING btree (id_project_id);


--
-- Name: easyviewer_adminproject_id_user_id_49854a7e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX easyviewer_adminproject_id_user_id_49854a7e ON public.easyviewer_adminproject USING btree (id_user_id);


--
-- Name: easyviewer_projects_subscription_id_id_a7a7506e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX easyviewer_projects_subscription_id_id_a7a7506e ON public.easyviewer_projects USING btree (subscription_id_id);


--
-- Name: easyviewer_transactions_hash_60f39cf0_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX easyviewer_transactions_hash_60f39cf0_like ON public.easyviewer_transactions USING btree (hash varchar_pattern_ops);


--
-- Name: easyviewer_transactions_project_id_id_97a12d62; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX easyviewer_transactions_project_id_id_97a12d62 ON public.easyviewer_transactions USING btree (project_id_id);


--
-- Name: easyviewer_transactions_user_id_id_8ef0aa72; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX easyviewer_transactions_user_id_id_8ef0aa72 ON public.easyviewer_transactions USING btree (user_id_id);


--
-- Name: easyviewer_user_email_d23f9ef1_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX easyviewer_user_email_d23f9ef1_like ON public.easyviewer_user USING btree (email varchar_pattern_ops);


--
-- Name: easyviewer_user_groups_group_id_4edc8843; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX easyviewer_user_groups_group_id_4edc8843 ON public.easyviewer_user_groups USING btree (group_id);


--
-- Name: easyviewer_user_groups_user_id_5d232961; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX easyviewer_user_groups_user_id_5d232961 ON public.easyviewer_user_groups USING btree (user_id);


--
-- Name: easyviewer_user_user_permissions_permission_id_860bf438; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX easyviewer_user_user_permissions_permission_id_860bf438 ON public.easyviewer_user_user_permissions USING btree (permission_id);


--
-- Name: easyviewer_user_user_permissions_user_id_564bd2d4; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX easyviewer_user_user_permissions_user_id_564bd2d4 ON public.easyviewer_user_user_permissions USING btree (user_id);


--
-- Name: easyviewer_video_project_id_id_7a5e291e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX easyviewer_video_project_id_id_7a5e291e ON public.easyviewer_video USING btree (project_id_id);


--
-- Name: easyviewer_video_subscription_video_id_eaadb8e8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX easyviewer_video_subscription_video_id_eaadb8e8 ON public.easyviewer_video_subscription USING btree (video_id);


--
-- Name: easyviewer_video_subscription_videosubscriptions_id_0c1e3663; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX easyviewer_video_subscription_videosubscriptions_id_0c1e3663 ON public.easyviewer_video_subscription USING btree (videosubscriptions_id);


--
-- Name: easyviewer_videocontent_user_id_id_76d42024; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX easyviewer_videocontent_user_id_id_76d42024 ON public.easyviewer_videocontent USING btree (user_id_id);


--
-- Name: easyviewer_videocontent_video_id_id_f0ec9f5d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX easyviewer_videocontent_video_id_id_f0ec9f5d ON public.easyviewer_videocontent USING btree (video_id_id);


--
-- Name: easyviewer_videocontent_video_subscription_id_1d0b1d2f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX easyviewer_videocontent_video_subscription_id_1d0b1d2f ON public.easyviewer_videocontent USING btree (video_subscription_id);


--
-- Name: easyviewer_videosubscriptions_project_id_id_b9b2dd5e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX easyviewer_videosubscriptions_project_id_id_b9b2dd5e ON public.easyviewer_videosubscriptions USING btree (project_id_id);


--
-- Name: socialaccount_socialaccount_user_id_8146e70c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX socialaccount_socialaccount_user_id_8146e70c ON public.socialaccount_socialaccount USING btree (user_id);


--
-- Name: socialaccount_socialapp_sites_site_id_2579dee5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX socialaccount_socialapp_sites_site_id_2579dee5 ON public.socialaccount_socialapp_sites USING btree (site_id);


--
-- Name: socialaccount_socialapp_sites_socialapp_id_97fb6e7d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX socialaccount_socialapp_sites_socialapp_id_97fb6e7d ON public.socialaccount_socialapp_sites USING btree (socialapp_id);


--
-- Name: socialaccount_socialtoken_account_id_951f210e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX socialaccount_socialtoken_account_id_951f210e ON public.socialaccount_socialtoken USING btree (account_id);


--
-- Name: socialaccount_socialtoken_app_id_636a42d7; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX socialaccount_socialtoken_app_id_636a42d7 ON public.socialaccount_socialtoken USING btree (app_id);


--
-- Name: account_emailaddress account_emailaddress_user_id_2c513194_fk_easyviewer_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_emailaddress
    ADD CONSTRAINT account_emailaddress_user_id_2c513194_fk_easyviewer_user_id FOREIGN KEY (user_id) REFERENCES public.easyviewer_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: account_emailconfirmation account_emailconfirm_email_address_id_5b7f8c58_fk_account_e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_emailconfirmation
    ADD CONSTRAINT account_emailconfirm_email_address_id_5b7f8c58_fk_account_e FOREIGN KEY (email_address_id) REFERENCES public.account_emailaddress(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: authtoken_token authtoken_token_user_id_35299eff_fk_easyviewer_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_35299eff_fk_easyviewer_user_id FOREIGN KEY (user_id) REFERENCES public.easyviewer_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_easyviewer_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_easyviewer_user_id FOREIGN KEY (user_id) REFERENCES public.easyviewer_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: easyviewer_adminproject easyviewer_adminproj_id_project_id_d0a67761_fk_easyviewe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_adminproject
    ADD CONSTRAINT easyviewer_adminproj_id_project_id_d0a67761_fk_easyviewe FOREIGN KEY (id_project_id) REFERENCES public.easyviewer_projects(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: easyviewer_adminproject easyviewer_adminproj_id_user_id_49854a7e_fk_easyviewe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_adminproject
    ADD CONSTRAINT easyviewer_adminproj_id_user_id_49854a7e_fk_easyviewe FOREIGN KEY (id_user_id) REFERENCES public.easyviewer_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: easyviewer_projects easyviewer_projects_subscription_id_id_a7a7506e_fk_easyviewe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_projects
    ADD CONSTRAINT easyviewer_projects_subscription_id_id_a7a7506e_fk_easyviewe FOREIGN KEY (subscription_id_id) REFERENCES public.easyviewer_projectsubscriptions(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: easyviewer_transactions easyviewer_transacti_project_id_id_97a12d62_fk_easyviewe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_transactions
    ADD CONSTRAINT easyviewer_transacti_project_id_id_97a12d62_fk_easyviewe FOREIGN KEY (project_id_id) REFERENCES public.easyviewer_projects(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: easyviewer_transactions easyviewer_transacti_user_id_id_8ef0aa72_fk_easyviewe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_transactions
    ADD CONSTRAINT easyviewer_transacti_user_id_id_8ef0aa72_fk_easyviewe FOREIGN KEY (user_id_id) REFERENCES public.easyviewer_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: easyviewer_user_groups easyviewer_user_groups_group_id_4edc8843_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_user_groups
    ADD CONSTRAINT easyviewer_user_groups_group_id_4edc8843_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: easyviewer_user_groups easyviewer_user_groups_user_id_5d232961_fk_easyviewer_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_user_groups
    ADD CONSTRAINT easyviewer_user_groups_user_id_5d232961_fk_easyviewer_user_id FOREIGN KEY (user_id) REFERENCES public.easyviewer_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: easyviewer_user_user_permissions easyviewer_user_user_permission_id_860bf438_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_user_user_permissions
    ADD CONSTRAINT easyviewer_user_user_permission_id_860bf438_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: easyviewer_user_user_permissions easyviewer_user_user_user_id_564bd2d4_fk_easyviewe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_user_user_permissions
    ADD CONSTRAINT easyviewer_user_user_user_id_564bd2d4_fk_easyviewe FOREIGN KEY (user_id) REFERENCES public.easyviewer_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: easyviewer_video easyviewer_video_project_id_id_7a5e291e_fk_easyviewe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_video
    ADD CONSTRAINT easyviewer_video_project_id_id_7a5e291e_fk_easyviewe FOREIGN KEY (project_id_id) REFERENCES public.easyviewer_projects(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: easyviewer_video_subscription easyviewer_video_sub_video_id_eaadb8e8_fk_easyviewe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_video_subscription
    ADD CONSTRAINT easyviewer_video_sub_video_id_eaadb8e8_fk_easyviewe FOREIGN KEY (video_id) REFERENCES public.easyviewer_video(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: easyviewer_video_subscription easyviewer_video_sub_videosubscriptions_i_0c1e3663_fk_easyviewe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_video_subscription
    ADD CONSTRAINT easyviewer_video_sub_videosubscriptions_i_0c1e3663_fk_easyviewe FOREIGN KEY (videosubscriptions_id) REFERENCES public.easyviewer_videosubscriptions(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: easyviewer_videocontent easyviewer_videocont_user_id_id_76d42024_fk_easyviewe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_videocontent
    ADD CONSTRAINT easyviewer_videocont_user_id_id_76d42024_fk_easyviewe FOREIGN KEY (user_id_id) REFERENCES public.easyviewer_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: easyviewer_videocontent easyviewer_videocont_video_id_id_f0ec9f5d_fk_easyviewe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_videocontent
    ADD CONSTRAINT easyviewer_videocont_video_id_id_f0ec9f5d_fk_easyviewe FOREIGN KEY (video_id_id) REFERENCES public.easyviewer_video(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: easyviewer_videocontent easyviewer_videocont_video_subscription_i_1d0b1d2f_fk_easyviewe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_videocontent
    ADD CONSTRAINT easyviewer_videocont_video_subscription_i_1d0b1d2f_fk_easyviewe FOREIGN KEY (video_subscription_id) REFERENCES public.easyviewer_videosubscriptions(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: easyviewer_videosubscriptions easyviewer_videosubs_project_id_id_b9b2dd5e_fk_easyviewe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.easyviewer_videosubscriptions
    ADD CONSTRAINT easyviewer_videosubs_project_id_id_b9b2dd5e_fk_easyviewe FOREIGN KEY (project_id_id) REFERENCES public.easyviewer_projects(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: socialaccount_socialtoken socialaccount_social_account_id_951f210e_fk_socialacc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socialaccount_socialtoken
    ADD CONSTRAINT socialaccount_social_account_id_951f210e_fk_socialacc FOREIGN KEY (account_id) REFERENCES public.socialaccount_socialaccount(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: socialaccount_socialtoken socialaccount_social_app_id_636a42d7_fk_socialacc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socialaccount_socialtoken
    ADD CONSTRAINT socialaccount_social_app_id_636a42d7_fk_socialacc FOREIGN KEY (app_id) REFERENCES public.socialaccount_socialapp(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: socialaccount_socialapp_sites socialaccount_social_site_id_2579dee5_fk_django_si; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socialaccount_socialapp_sites
    ADD CONSTRAINT socialaccount_social_site_id_2579dee5_fk_django_si FOREIGN KEY (site_id) REFERENCES public.django_site(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: socialaccount_socialapp_sites socialaccount_social_socialapp_id_97fb6e7d_fk_socialacc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socialaccount_socialapp_sites
    ADD CONSTRAINT socialaccount_social_socialapp_id_97fb6e7d_fk_socialacc FOREIGN KEY (socialapp_id) REFERENCES public.socialaccount_socialapp(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: socialaccount_socialaccount socialaccount_social_user_id_8146e70c_fk_easyviewe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socialaccount_socialaccount
    ADD CONSTRAINT socialaccount_social_user_id_8146e70c_fk_easyviewe FOREIGN KEY (user_id) REFERENCES public.easyviewer_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--
