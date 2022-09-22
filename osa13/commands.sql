CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INT DEFAULT 0
);

insert into blogs 
(author, url, title) 
values 
('A', 'www', 'B');

insert into blogs 
(author, url, title) 
values 
('C', '.ru', 'D');

SELECT * FROM blogs;