--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

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
-- Name: book; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying NOT NULL,
    "averageRating" double precision DEFAULT '-1'::double precision NOT NULL,
    "ratingCount" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.book OWNER TO postgres;

--
-- Name: book_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.book_id_seq OWNER TO postgres;

--
-- Name: book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.book_id_seq OWNED BY public.book.id;


--
-- Name: borrow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.borrow (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "borrowDate" timestamp without time zone NOT NULL,
    "returnDate" timestamp without time zone,
    rating double precision,
    "userId" integer,
    "bookId" integer
);


ALTER TABLE public.borrow OWNER TO postgres;

--
-- Name: borrow_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.borrow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.borrow_id_seq OWNER TO postgres;

--
-- Name: borrow_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.borrow_id_seq OWNED BY public.borrow.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: book id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book ALTER COLUMN id SET DEFAULT nextval('public.book_id_seq'::regclass);


--
-- Name: borrow id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrow ALTER COLUMN id SET DEFAULT nextval('public.borrow_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: book; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.book (id, "createdAt", name, "averageRating", "ratingCount") FROM stdin;
3	2024-05-23 13:13:01.362458	Dune	-1	0
4	2024-05-23 13:13:11.751938	1984	-1	0
5	2024-05-23 13:13:18.847478	Brave New World	-1	0
1	2024-05-23 13:12:45.441693	The Hitchhiker's Guide to the Galaxy	10	1
2	2024-05-23 13:12:54.1956	I, Robot	5.33	2
\.


--
-- Data for Name: borrow; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.borrow (id, "createdAt", "borrowDate", "returnDate", rating, "userId", "bookId") FROM stdin;
3	2024-05-23 13:14:39.405717	2024-05-23 13:14:39.405	\N	\N	2	5
2	2024-05-23 13:14:37.757028	2024-05-23 13:14:37.756	2024-05-23 13:16:53.301	5	2	2
1	2024-05-23 13:14:33.529072	2024-05-23 13:14:33.527	2024-05-23 13:17:04.047	10	2	1
4	2024-05-23 13:19:37.681314	2024-05-23 13:19:37.679	2024-05-23 13:19:57.303	5.66	5	2
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, "createdAt", name) FROM stdin;
1	2024-05-23 13:08:05.443721	Eray Aslan
2	2024-05-23 13:08:15.755948	Enes Faruk Meniz
3	2024-05-23 13:08:26.756465	Sefa Eren Şahin
4	2024-05-23 13:08:37.180238	Kadir Mutlu
5	2024-05-23 13:18:25.066965	Erdem Bektaş
\.


--
-- Name: book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.book_id_seq', 5, true);


--
-- Name: borrow_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.borrow_id_seq', 4, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 5, true);


--
-- Name: book PK_a3afef72ec8f80e6e5c310b28a4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: borrow PK_dff0c680b9c6fc99f5a20d67a97; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrow
    ADD CONSTRAINT "PK_dff0c680b9c6fc99f5a20d67a97" PRIMARY KEY (id);


--
-- Name: borrow FK_395ef8d1ea4a0ff8f1fa17f67ad; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrow
    ADD CONSTRAINT "FK_395ef8d1ea4a0ff8f1fa17f67ad" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: borrow FK_f5c8ea379eee06ce1482f20d101; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.borrow
    ADD CONSTRAINT "FK_f5c8ea379eee06ce1482f20d101" FOREIGN KEY ("bookId") REFERENCES public.book(id);


--
-- PostgreSQL database dump complete
--

