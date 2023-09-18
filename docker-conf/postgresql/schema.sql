--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-1.pgdg20.04+1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-1.pgdg20.04+1)

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

--
-- Name: forum; Type: DATABASE; Schema: -; Owner: student
--

CREATE DATABASE forum WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'fr_FR.UTF-8' LC_CTYPE = 'fr_FR.UTF-8';


ALTER DATABASE forum OWNER TO student;

\connect forum

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
-- Name: channels; Type: TABLE; Schema: public; Owner: student
--

CREATE TABLE public.channels (
    id integer NOT NULL,
    name character varying(255),
    slug character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone,
    description text,
    user_id integer
);


ALTER TABLE public.channels OWNER TO student;

--
-- Name: channels_id_seq; Type: SEQUENCE; Schema: public; Owner: student
--

CREATE SEQUENCE public.channels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.channels_id_seq OWNER TO student;

--
-- Name: channels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: student
--

ALTER SEQUENCE public.channels_id_seq OWNED BY public.channels.id;


--
-- Name: favorites; Type: TABLE; Schema: public; Owner: student
--

CREATE TABLE public.favorites (
    user_id integer NOT NULL,
    favorited_id integer NOT NULL,
    favorited_type character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public.favorites OWNER TO student;

--
-- Name: replies; Type: TABLE; Schema: public; Owner: student
--

CREATE TABLE public.replies (
    id integer NOT NULL,
    thread_id integer,
    user_id integer,
    body text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public.replies OWNER TO student;

--
-- Name: replies_id_seq; Type: SEQUENCE; Schema: public; Owner: student
--

CREATE SEQUENCE public.replies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.replies_id_seq OWNER TO student;

--
-- Name: replies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: student
--

ALTER SEQUENCE public.replies_id_seq OWNED BY public.replies.id;


--
-- Name: thread_subscriptions; Type: TABLE; Schema: public; Owner: student
--

CREATE TABLE public.thread_subscriptions (
    id integer NOT NULL,
    name character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public.thread_subscriptions OWNER TO student;

--
-- Name: thread_subscriptions_id_seq; Type: SEQUENCE; Schema: public; Owner: student
--

CREATE SEQUENCE public.thread_subscriptions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.thread_subscriptions_id_seq OWNER TO student;

--
-- Name: thread_subscriptions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: student
--

ALTER SEQUENCE public.thread_subscriptions_id_seq OWNED BY public.thread_subscriptions.id;


--
-- Name: threads; Type: TABLE; Schema: public; Owner: student
--

CREATE TABLE public.threads (
    id integer NOT NULL,
    title character varying(255),
    body text,
    user_id integer NOT NULL,
    channel_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone,
    tags text[]
);


ALTER TABLE public.threads OWNER TO student;

--
-- Name: threads_id_seq; Type: SEQUENCE; Schema: public; Owner: student
--

CREATE SEQUENCE public.threads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.threads_id_seq OWNER TO student;

--
-- Name: threads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: student
--

ALTER SEQUENCE public.threads_id_seq OWNED BY public.threads.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: student
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255),
    email text NOT NULL,
    password character varying(255),
    avatar character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public.users OWNER TO student;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: student
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO student;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: student
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: channels id; Type: DEFAULT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.channels ALTER COLUMN id SET DEFAULT nextval('public.channels_id_seq'::regclass);


--
-- Name: replies id; Type: DEFAULT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.replies ALTER COLUMN id SET DEFAULT nextval('public.replies_id_seq'::regclass);


--
-- Name: thread_subscriptions id; Type: DEFAULT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.thread_subscriptions ALTER COLUMN id SET DEFAULT nextval('public.thread_subscriptions_id_seq'::regclass);


--
-- Name: threads id; Type: DEFAULT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.threads ALTER COLUMN id SET DEFAULT nextval('public.threads_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: channels channels_pkey; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT channels_pkey PRIMARY KEY (id);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (user_id, favorited_id, favorited_type);


--
-- Name: replies replies_pkey; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.replies
    ADD CONSTRAINT replies_pkey PRIMARY KEY (id);


--
-- Name: thread_subscriptions thread_subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.thread_subscriptions
    ADD CONSTRAINT thread_subscriptions_pkey PRIMARY KEY (id);


--
-- Name: threads threads_pkey; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.threads
    ADD CONSTRAINT threads_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: student
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

