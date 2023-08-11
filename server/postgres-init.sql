CREATE DATABASE notes_app_radency;
CREATE USER postgres WITH ENCRYPTED PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE notes_app_radency TO postgres;