PGDMP         )                z            mobilestore    13.1    13.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    40971    mobilestore    DATABASE     h   CREATE DATABASE mobilestore WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_Zambia.1252';
    DROP DATABASE mobilestore;
                ryan    false            �            1259    40974    phones    TABLE     k   CREATE TABLE public.phones (
    pid integer NOT NULL,
    name text,
    count integer,
    brand text
);
    DROP TABLE public.phones;
       public         heap    ryan    false            �            1259    40972    phones_pid_seq    SEQUENCE     �   CREATE SEQUENCE public.phones_pid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.phones_pid_seq;
       public          ryan    false    201            �           0    0    phones_pid_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.phones_pid_seq OWNED BY public.phones.pid;
          public          ryan    false    200            #           2604    40977 
   phones pid    DEFAULT     h   ALTER TABLE ONLY public.phones ALTER COLUMN pid SET DEFAULT nextval('public.phones_pid_seq'::regclass);
 9   ALTER TABLE public.phones ALTER COLUMN pid DROP DEFAULT;
       public          ryan    false    200    201    201            �          0    40974    phones 
   TABLE DATA           9   COPY public.phones (pid, name, count, brand) FROM stdin;
    public          ryan    false    201   &
       �           0    0    phones_pid_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.phones_pid_seq', 8, true);
          public          ryan    false    200            %           2606    40982    phones phones_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.phones
    ADD CONSTRAINT phones_pkey PRIMARY KEY (pid);
 <   ALTER TABLE ONLY public.phones DROP CONSTRAINT phones_pkey;
       public            ryan    false    201            �   >   x�3�6�42�N�-.�K�2�(�45��,���K����/�W��42���sr�b���� ��s     